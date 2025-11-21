# 리팩토링 제안서

## 📋 목차

1. [폴더 구조 개선](#1-폴더-구조-개선)
2. [CSS 구조 개선](#2-css-구조-개선)
3. [파일 구조 개선](#3-파일-구조-개선)
4. [코드 구조 개선](#4-코드-구조-개선)
5. [타입 정의 개선](#5-타입-정의-개선)
6. [상수 관리 개선](#6-상수-관리-개선)
7. [유틸리티 함수 개선](#7-유틸리티-함수-개선)

---

## 1. 폴더 구조 개선

### 현재 문제점

- 빈 폴더 존재: `Parameters/`, `Visualizer/`, `contexts/`, `services/`
- 컴포넌트 폴더 구조가 일관성 없음
- 관련 파일들이 분산되어 있음

### 제안 구조

```
src/
├── app/                          # 앱 레벨 설정
│   ├── App.tsx
│   └── routes.tsx                # 라우팅 설정 분리
│
├── features/                     # 기능별 모듈화 (Feature-based)
│   ├── landing/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── constants.ts
│   │   ├── types.ts
│   │   └── index.ts
│   │
│   ├── player/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── store/
│   │   ├── constants.ts
│   │   ├── types.ts
│   │   └── index.ts
│   │
│   ├── preplay/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── constants.ts
│   │   └── index.ts
│   │
│   └── visualizer/              # 향후 확장용
│       └── index.ts
│
├── shared/                       # 공유 리소스
│   ├── components/              # 공통 컴포넌트
│   │   ├── ui/                  # 기본 UI 컴포넌트
│   │   ├── common/              # 공통 컴포넌트
│   │   └── index.ts
│   │
│   ├── hooks/                   # 공통 훅
│   │   ├── useWindowSize.ts     # useWindowWidth + useWindowHeight 통합
│   │   ├── useTheme.ts
│   │   └── index.ts
│   │
│   ├── utils/                   # 공통 유틸리티
│   │   ├── className.ts
│   │   ├── theme.ts
│   │   ├── time.ts
│   │   └── index.ts
│   │
│   ├── constants/               # 공통 상수
│   │   └── index.ts
│   │
│   ├── types/                   # 공통 타입
│   │   ├── common.ts
│   │   ├── theme.ts
│   │   └── index.ts
│   │
│   └── styles/                  # 공통 스타일
│       ├── base.css
│       ├── utilities.css
│       ├── animations.css
│       └── index.css
│
├── store/                        # 전역 상태 관리
│   ├── playerStore.ts
│   ├── themeStore.ts
│   └── index.ts
│
├── services/                     # API 서비스 (향후 확장용)
│   └── index.ts
│
├── assets/                       # 정적 자산
│   └── images/
│
└── main.tsx
```

### 주요 변경사항

1. **Feature-based 구조**: 기능별로 모듈화하여 관련 파일들을 그룹화
2. **Shared 폴더**: 공통 리소스를 명확히 분리
3. **빈 폴더 정리**: 사용하지 않는 폴더 제거 또는 향후 확장 계획 명시

---

## 2. CSS 구조 개선

### 현재 문제점

- `index.css`에 모든 스타일이 집중 (636줄)
- 유지보수가 어려움
- 재사용성 낮음

### 제안 구조

```
src/shared/styles/
├── index.css                    # 메인 진입점
├── base/
│   ├── reset.css                # 리셋 스타일
│   ├── typography.css           # 폰트 설정
│   └── variables.css            # CSS 변수
│
├── utilities/
│   ├── glass.css                # 글라스모피즘 효과
│   ├── gradients.css            # 그라데이션 효과
│   ├── buttons.css              # 버튼 스타일
│   └── sliders.css              # 슬라이더 스타일
│
├── animations/
│   ├── keyframes.css            # 키프레임 애니메이션
│   └── transitions.css          # 트랜지션
│
└── components/                  # 컴포넌트별 스타일 (필요시)
    └── player.css
```

### 개선된 index.css 예시

```css
/* index.css */
@import 'pretendard/dist/web/static/pretendard.css';
@import 'tailwindcss';

/* Base Styles */
@import './base/reset.css';
@import './base/typography.css';
@import './base/variables.css';

/* Utilities */
@import './utilities/glass.css';
@import './utilities/gradients.css';
@import './utilities/buttons.css';
@import './utilities/sliders.css';

/* Animations */
@import './animations/keyframes.css';
@import './animations/transitions.css';

/* Component Styles (if needed) */
@import './components/player.css';
```

### CSS 변수 활용

```css
/* base/variables.css */
:root {
	/* Colors */
	--color-primary: #a855f7;
	--color-secondary: #06b6d4;

	/* Glass Effects */
	--glass-bg-light: rgba(255, 255, 255, 0.7);
	--glass-bg-dark: rgba(30, 41, 59, 0.6);
	--glass-blur: blur(20px) saturate(180%);

	/* Spacing */
	--spacing-xs: 0.25rem;
	--spacing-sm: 0.5rem;
	/* ... */
}

.dark {
	--glass-bg: var(--glass-bg-dark);
}
```

---

## 3. 파일 구조 개선

### 3.1 컴포넌트 파일 구조

#### 현재

```
components/
├── Player/
│   ├── ParameterPanel.tsx
│   ├── ParameterSlider.tsx
│   └── ...
```

#### 제안

```
features/player/components/
├── ParameterPanel/
│   ├── ParameterPanel.tsx
│   ├── ParameterPanel.test.tsx  # 테스트 파일
│   ├── ParameterPanel.styles.css # 컴포넌트 전용 스타일 (필요시)
│   └── index.ts
├── ParameterSlider/
│   ├── ParameterSlider.tsx
│   └── index.ts
└── index.ts                      # 통합 export
```

### 3.2 상수 파일 통합

#### 현재

```
constants/
├── audioParams.ts
├── carouselConstants.ts
├── musicThemes.ts
├── parameterPanelConstants.ts
├── playerConstants.ts
├── preplayConstants.ts
├── themes.ts
└── visualizerOptions.ts
```

#### 제안

```
features/landing/
└── constants.ts                  # 랜딩 관련 상수만

features/player/
└── constants.ts                  # 플레이어 관련 상수만

shared/constants/
├── themes.ts                     # 공통 테마 상수
└── index.ts
```

### 3.3 유틸리티 파일 통합

#### 현재

```
utils/
├── carouselUtils.ts
├── classNameUtils.ts
├── parameterPanelUtils.ts
├── playerStyleUtils.ts
├── responsiveUtils.ts
├── themeUtils.ts
└── timeUtils.ts
```

#### 제안

```
shared/utils/
├── className.ts                  # classNameUtils → className
├── theme.ts                      # themeUtils → theme
├── time.ts                       # timeUtils → time
└── responsive.ts                 # responsiveUtils → responsive

features/landing/utils/
└── carousel.ts                   # 랜딩 전용

features/player/utils/
├── parameterPanel.ts             # 플레이어 전용
└── playerStyle.ts                # 플레이어 전용
```

---

## 4. 코드 구조 개선

### 4.1 Hook 통합

#### 현재

```typescript
// useWindowWidth.ts
export const useWindowWidth = () => { ... }

// useWindowHeight.ts
export const useWindowHeight = () => { ... }
```

#### 제안

```typescript
// shared/hooks/useWindowSize.ts
export const useWindowSize = () => {
	const [size, setSize] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});

	useEffect(() => {
		const handleResize = () => {
			setSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return size;
};

// 개별 훅도 제공 (하위 호환성)
export const useWindowWidth = () => useWindowSize().width;
export const useWindowHeight = () => useWindowSize().height;
```

### 4.2 타입 정의 분리

#### 현재

```typescript
// types/index.ts - 모든 타입이 한 파일에
```

#### 제안

```typescript
// shared/types/common.ts
export type ThemeMode = 'light' | 'dark';
export interface ApiResponse<T> { ... }

// shared/types/theme.ts
export type ThemeCategory = 'focus' | 'energy' | ...;
export interface MusicTheme { ... }

// features/player/types.ts
export interface AudioParams { ... }
export interface Track { ... }

// shared/types/index.ts
export * from './common';
export * from './theme';
```

### 4.3 상수 파일 구조화

#### 제안

```typescript
// features/player/constants.ts
export const PLAYER_CONSTANTS = {
  ANIMATIONS: {
    playerControls: { ... },
    // ...
  },
  STYLES: {
    glassButton: { ... },
    // ...
  },
} as const;

// 사용 시
import { PLAYER_CONSTANTS } from '../constants';
PLAYER_CONSTANTS.ANIMATIONS.playerControls
```

---

## 5. 타입 정의 개선

### 5.1 타입 파일 분리

```
shared/types/
├── common.ts                     # 공통 타입
│   ├── ThemeMode
│   ├── ApiResponse
│   └── ...
│
├── theme.ts                      # 테마 관련 타입
│   ├── ThemeCategory
│   ├── MusicTheme
│   ├── MusicGenre
│   └── ...
│
└── index.ts                      # 통합 export

features/player/types.ts          # 플레이어 전용 타입
├── AudioParams
├── Track
├── AudioQueue
└── ...
```

### 5.2 타입 네이밍 일관성

- 인터페이스: `PascalCase` (예: `MusicGenre`)
- 타입 별칭: `PascalCase` (예: `ThemeMode`)
- 제네릭: `T`, `K`, `V` 등 단일 대문자

---

## 6. 상수 관리 개선

### 6.1 상수 그룹화

```typescript
// features/player/constants.ts
export const PLAYER_CONFIG = {
  DEFAULT_VOLUME: 70,
  MIN_VOLUME: 0,
  MAX_VOLUME: 100,
} as const;

export const PLAYER_ANIMATIONS = {
  playerControls: { ... },
  // ...
} as const;

export const PLAYER_STYLES = {
  glassButton: { ... },
  // ...
} as const;
```

### 6.2 환경 변수 분리

```typescript
// shared/config/env.ts
export const ENV = {
	API_BASE_URL: import.meta.env.VITE_API_BASE_URL || '',
	// ...
} as const;
```

---

## 7. 유틸리티 함수 개선

### 7.1 유틸리티 함수 그룹화

```typescript
// shared/utils/responsive.ts
export const ResponsiveUtils = {
  getTextSize: (width: number, type: 'heading' | 'subtitle' | 'caption') => { ... },
  getNavTextSize: (width: number) => { ... },
  // ...
} as const;

// 사용 시
import { ResponsiveUtils } from '@/shared/utils/responsive';
ResponsiveUtils.getTextSize(windowWidth, 'heading');
```

### 7.2 유틸리티 함수 문서화

````typescript
/**
 * 윈도우 너비에 따른 반응형 텍스트 크기를 반환합니다.
 *
 * @param width - 현재 윈도우 너비 (픽셀)
 * @param type - 텍스트 타입 ('heading' | 'subtitle' | 'caption')
 * @returns 계산된 폰트 크기 (픽셀 단위 문자열)
 *
 * @example
 * ```ts
 * const size = getTextSize(1920, 'heading'); // "clamp(2rem, 4vw, 3rem)"
 * ```
 */
export const getTextSize = (width: number, type: TextType): string => {
	// ...
};
````

---

## 8. 추가 개선 사항

### 8.1 경로 별칭 설정

```typescript
// vite.config.ts 또는 tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/features/*": ["./src/features/*"],
      "@/shared/*": ["./src/shared/*"],
      "@/store/*": ["./src/store/*"]
    }
  }
}
```

### 8.2 인덱스 파일 활용

각 폴더에 `index.ts`를 만들어 명확한 export:

```typescript
// features/player/components/index.ts
export { ParameterPanel } from './ParameterPanel';
export { ParameterSlider } from './ParameterSlider';
export { ParameterCarousel } from './ParameterCarousel';
// ...

// 사용 시
import { ParameterPanel, ParameterSlider } from '@/features/player/components';
```

### 8.3 빈 폴더 정리

- 사용하지 않는 폴더 제거
- 또는 향후 확장 계획이 있다면 `README.md` 추가

```
src/components/Parameters/README.md
src/components/Visualizer/README.md
src/contexts/README.md
src/services/README.md
```

---

## 9. 마이그레이션 우선순위

### Phase 1: 즉시 적용 가능

1. ✅ CSS 파일 분리 (`index.css` → 여러 파일로)
2. ✅ 빈 폴더 정리 또는 README 추가
3. ✅ 타입 파일 분리
4. ✅ 경로 별칭 설정

### Phase 2: 점진적 적용

1. ⏳ Hook 통합 (useWindowSize)
2. ⏳ 상수 파일 재구성
3. ⏳ 유틸리티 함수 그룹화

### Phase 3: 장기적 개선

1. 🔄 Feature-based 구조로 전환
2. 🔄 컴포넌트 폴더 구조 개선
3. 🔄 테스트 파일 추가

---

## 10. 예상 효과

### 유지보수성

- ✅ 관련 파일들이 함께 위치하여 찾기 쉬움
- ✅ CSS 파일 분리로 스타일 관리 용이
- ✅ 명확한 폴더 구조로 신규 개발자 온보딩 용이

### 확장성

- ✅ Feature-based 구조로 새 기능 추가 용이
- ✅ 모듈화된 구조로 재사용성 향상
- ✅ 타입 정의 분리로 타입 안정성 향상

### 성능

- ✅ 코드 스플리팅 용이
- ✅ Tree-shaking 최적화 가능
- ✅ 번들 크기 최적화 가능

---

## 결론

이 리팩토링 제안은 프로젝트의 유지보수성, 확장성, 그리고 개발자 경험을 크게 향상시킬 것입니다.
단계적으로 적용하여 기존 기능에 영향을 주지 않으면서 점진적으로 개선할 수 있습니다.
