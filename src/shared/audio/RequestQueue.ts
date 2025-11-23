/**
 * API 요청 큐 아이템
 */
type QueueItem<T> = {
	resolve: (value: T) => void;
	reject: (error: unknown) => void;
	execute: () => Promise<T>;
	signal?: AbortSignal;
	priority?: number; // 우선순위 (높을수록 우선, 기본값: 0)
};

/**
 * API 요청 큐 시스템
 * 여러 API 요청을 병렬로 처리하되 동시 요청 수를 제한하여 rate limit을 방지합니다.
 */
export class RequestQueue {
	private queue: QueueItem<unknown>[] = [];
	private activeRequests = new Set<QueueItem<unknown>>();
	private readonly maxConcurrent: number; // 최대 동시 요청 수

	constructor(maxConcurrent: number = 2) {
		this.maxConcurrent = maxConcurrent;
	}

	/**
	 * 요청을 큐에 추가하고 실행을 대기합니다.
	 * @param execute - 실행할 비동기 함수
	 * @param signal - 취소 신호 (선택)
	 * @param priority - 우선순위 (높을수록 우선, 기본값: 0)
	 */
	async enqueue<T>(execute: () => Promise<T>, signal?: AbortSignal, priority: number = 0): Promise<T> {
		return new Promise<T>((resolve, reject) => {
			// AbortSignal이 이미 abort된 경우 즉시 거부
			if (signal?.aborted) {
				reject(new DOMException('Operation aborted', 'AbortError'));
				return;
			}

			const queueItem: QueueItem<T> = {
				resolve,
				reject,
				execute,
				signal,
				priority,
			};

			// AbortSignal 리스너 추가
			if (signal) {
				const onAbort = () => {
					const index = this.queue.indexOf(queueItem as QueueItem<unknown>);
					if (index !== -1) {
						this.queue.splice(index, 1);
					}
					// 활성 요청에서도 제거
					if (this.activeRequests.has(queueItem as QueueItem<unknown>)) {
						this.activeRequests.delete(queueItem as QueueItem<unknown>);
						this.processQueue(); // 다른 요청 시작
					}
					reject(new DOMException('Operation aborted', 'AbortError'));
				};
				signal.addEventListener('abort', onAbort, { once: true });
			}

			// 우선순위에 따라 큐에 삽입 (높은 우선순위가 앞으로)
			const insertIndex = this.queue.findIndex((item) => (item.priority ?? 0) < priority);
			if (insertIndex === -1) {
				this.queue.push(queueItem as QueueItem<unknown>);
			} else {
				this.queue.splice(insertIndex, 0, queueItem as QueueItem<unknown>);
			}

			this.processQueue();
		});
	}

	/**
	 * 큐에 있는 요청들을 병렬로 처리합니다 (동시 요청 수 제한).
	 */
	private async processQueue() {
		// 이미 최대 동시 요청 수에 도달했거나 큐가 비어있으면 종료
		if (this.activeRequests.size >= this.maxConcurrent || this.queue.length === 0) {
			return;
		}

		// 시작할 수 있는 요청 수 계산
		const availableSlots = this.maxConcurrent - this.activeRequests.size;
		const itemsToStart: QueueItem<unknown>[] = [];

		// 큐에서 시작할 요청 선택 (우선순위 순서대로)
		for (let i = 0; i < this.queue.length && itemsToStart.length < availableSlots; i++) {
			const item = this.queue[i];
			// AbortSignal이 abort된 경우 건너뛰기
			if (item.signal?.aborted) {
				this.queue.splice(i, 1);
				i--; // 인덱스 조정
				item.reject(new DOMException('Operation aborted', 'AbortError'));
				continue;
			}
			itemsToStart.push(item);
		}

		// 선택된 요청들을 큐에서 제거하고 활성 요청에 추가
		itemsToStart.forEach((item) => {
			const index = this.queue.indexOf(item);
			if (index !== -1) {
				this.queue.splice(index, 1);
			}
			this.activeRequests.add(item);

			// 요청 실행
			item.execute()
				.then((result) => {
					this.activeRequests.delete(item);
					item.resolve(result);
					// 다음 요청 처리
					this.processQueue();
				})
				.catch((error) => {
					this.activeRequests.delete(item);
					item.reject(error);
					// 다음 요청 처리
					this.processQueue();
				});
		});
	}
}
