# 포트폴리오 사이트 - Claude Code 설정

## 1. 기술 스택

### Frontend
- **마크업**: HTML5 (시맨틱 구조)
- **스타일링**: CSS3 (Grid, Flexbox, 커스텀 속성)
- **스크립팅**: Vanilla JavaScript (ES6+)
- **패키징**: 없음 (순수 정적 파일)

### 배포
- **호스팅**: Vercel
- **도메인**: TBD
- **성능**: Lighthouse 90+ 목표

### 개발 도구
- **에디터**: VS Code / Cursor
- **버전 관리**: Git
- **패키지 매니저**: 사용 안 함 (HTTP 임포트 가능)

---

## 2. 코딩 규칙

### 네이밍 컨벤션
- **클래스명**: PascalCase (JS), kebab-case (CSS)
- **함수명**: camelCase
- **상수**: UPPER_SNAKE_CASE
- **변수명**: camelCase, 명사 사용

### 코드 스타일
```javascript
// ✅ 권장
const toggleTheme = () => {
  document.body.classList.toggle('dark-mode');
};

// ❌ 비권장
function toggle_theme(){
  let isDark = !isDark;
}
```

### CSS 구조
- 모든 색상은 CSS 커스텀 속성으로 정의
- breakpoint: 576px (mobile), 768px (tablet), 1024px (desktop)
- dark mode는 `[data-theme="dark"]` 속성으로 제어

### 주석 규칙
```javascript
// 섹션 분리 (대문자 + 구분선)
// ========== HEADER SECTION ==========

// 함수 설명 (필요시 JSDoc 사용)
/**
 * 테마를 토글합니다.
 * @param {string} theme - 'light' 또는 'dark'
 */
const setTheme = (theme) => { ... };
```

---

## 3. 금지 사항

### 절대 금지
- ❌ `<div>` 태그로 레이아웃 전부 구성 (시맨틱 태그 사용 필수)
- ❌ 전역 변수 사용
- ❌ inline 스타일 (style="...") 사용
- ❌ 외부 라이브러리 무분별 추가
- ❌ 동기 fetch 사용
- ❌ 반응형 미지원 CSS 작성
- ❌ `.bkit` 디렉토리 및 관련 파일 생성 (.bkit 워크플로우 미사용)
- ❌ bkit 스킬 (.clinerules, /pdca, /phase-* 등) 자동 실행

### 주의 사항
- localStorage 사용 시 `try-catch` 필수
- 이미지는 WebP + fallback 제공
- 폰트는 system font 또는 Google Fonts만 사용
- 다크모드 지원은 필수 (prefers-color-scheme)

### 성능 제약
- 초기 로드 < 3초 (3G 기준)
- 번들 크기 제약 없음 (정적 파일이므로)
- 불필요한 리페인팅/리플로우 최소화

---

## 4. 프로젝트 구조

```
portfolio-site/
├── index.html              # 메인 페이지
├── styles/
│   └── main.css           # 모든 스타일
├── scripts/
│   └── app.js             # 모든 JavaScript 로직
├── assets/
│   ├── images/            # 프로필, 프로젝트 이미지
│   └── documents/         # 이력서, 자료
├── docs/
│   ├── CLAUDE.md          # 이 파일
│   ├── context-template.md # 프로젝트 컨텍스트
│   └── CHANGELOG.md       # 변경 이력
├── .clinerules            # Cursor 규칙
├── vercel.json            # Vercel 설정
└── .gitignore             # Git 제외 파일
```

---

## 5. 주요 기능 (MVP)

- [x] 반응형 레이아웃 (모바일/태블릿/데스크톱)
- [x] 다크모드 지원
- [x] 프로젝트 포트폴리오 섹션
- [x] 연락처 정보 및 링크
- [x] 부드러운 스크롤 및 애니메이션
- [x] 접근성 준수 (WCAG 2.1 AA)

---

## 6. Claude Code 사용 가이드

### 파일 수정 시
1. 먼저 파일을 Read로 읽고 구조 파악
2. Edit로 필요한 부분만 수정
3. 큰 변경은 새 파일 생성 후 설명

### 코드 리뷰 시
- 시맨틱 HTML 사용 확인
- CSS 접근성 및 반응형 확인
- JavaScript 성능 및 보안 확인

### 배포 전 체크리스트
- Lighthouse 성능 검사
- 모든 이미지 최적화
- 메타 데이터 및 SEO 확인
- 다크모드 테스트
