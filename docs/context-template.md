# 포트폴리오 사이트 - 프로젝트 컨텍스트

## 📋 프로젝트 개요

**프로젝트명**: 개인 포트폴리오 사이트  
**목적**: 개인 이력, 프로젝트, 연락처를 소개하는 정적 웹사이트  
**기술 스택**: HTML5, CSS3, Vanilla JavaScript  
**배포 플랫폼**: Vercel  
**타겟 사용자**: 채용담당자, 협력사, 클라이언트  

---

## 🎯 핵심 요구사항

### 필수 기능 (MVP)
1. **홈 섹션** - 프로필, 자기소개, 주요 스킬
2. **프로젝트 섹션** - 과거 프로젝트 포트폴리오 (카드 형식)
3. **기술 섹션** - 기술 스택 (Frontend, Backend, DevOps)
4. **연락처 섹션** - 이메일, 링크드인, GitHub, 이메일 폼
5. **다크모드** - 사용자 선호도에 따른 자동 전환

### 추가 기능 (향후)
- [ ] 프로젝트 상세 페이지
- [ ] 블로그 섹션
- [ ] 이메일 구독 기능
- [ ] 방문 통계 추적

---

## 🎨 디자인 원칙

### 스타일 가이드
- **색상 체계**: 미니멀 (밝은 배경, 어두운 텍스트)
- **다크모드**: 어두운 배경, 밝은 텍스트
- **폰트**: 
  - Heading: 'Segoe UI', system font (굵음, 선명함)
  - Body: 'Segoe UI', system font (가독성 중심)
- **패딩/마진**: 16px 기본 단위
- **Border Radius**: 8px (부드러운 모서리)

### 반응형 브레이크포인트
```css
/* 모바일 우선 (Mobile First) */
- 320px ~ 575px: 모바일
- 576px ~ 767px: 소형 태블릿
- 768px ~ 1023px: 태블릿
- 1024px 이상: 데스크톱
```

### 애니메이션
- Fade-in: 페이지 로드 시
- Hover effect: 버튼, 링크
- Scroll animation: 섹션 진입 시 (선택사항)
- Transition: 테마 전환 (0.3s)

---

## 📂 파일 구조 설명

```
portfolio-site/
├── index.html                 # 메인 HTML (단일 페이지)
│   ├── Header (네비게이션)
│   ├── Hero (자기소개)
│   ├── Projects (포트폴리오)
│   ├── Skills (기술)
│   ├── Contact (연락처)
│   └── Footer
│
├── styles/
│   └── main.css              # 통합 CSS 파일
│       ├── CSS 변수 (색상, 간격)
│       ├── Base styles (reset, typography)
│       ├── Component styles (header, button, card)
│       ├── Layout (grid, flexbox)
│       ├── Utilities (responsive, dark mode)
│       └── 미디어 쿼리 (반응형)
│
├── scripts/
│   └── app.js                # 통합 JavaScript
│       ├── 테마 토글 (light/dark)
│       ├── 네비게이션 (부드러운 스크롤)
│       ├── 폼 유효성 검사
│       ├── 이벤트 리스너
│       └── 유틸리티 함수
│
├── assets/
│   ├── images/               # 이미지 리소스
│   │   ├── profile.jpg       # 프로필 사진
│   │   ├── project-1.jpg     # 프로젝트 썸네일
│   │   └── ...
│   └── documents/            # 문서
│       ├── resume.pdf        # 이력서
│       └── ...
│
└── docs/
    ├── context-template.md   # 이 파일
    ├── CLAUDE.md             # Claude Code 설정
    └── CHANGELOG.md          # 변경 이력
```

---

## 🛠️ 개발 가이드

### 섹션별 HTML 구조

#### Header & Navigation
```html
<header>
  <nav class="navbar">
    <a href="/" class="logo">Your Name</a>
    <ul class="nav-links">
      <li><a href="#home">Home</a></li>
      <li><a href="#projects">Projects</a></li>
      <li><a href="#skills">Skills</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
    <button class="theme-toggle" aria-label="Toggle dark mode"></button>
  </nav>
</header>
```

#### Hero Section
```html
<section id="home" class="hero">
  <img src="assets/images/profile.jpg" alt="Profile picture" class="avatar">
  <h1>Your Name</h1>
  <p class="subtitle">Full Stack Developer | Problem Solver</p>
  <p class="bio">Brief introduction about yourself...</p>
</section>
```

#### Projects Section
```html
<section id="projects" class="projects">
  <h2>Featured Projects</h2>
  <div class="projects__grid">
    <article class="project-card">
      <img src="assets/images/project-1.jpg" alt="Project name">
      <h3>Project Title</h3>
      <p>Project description</p>
      <div class="project__tags">
        <span class="tag">HTML</span>
        <span class="tag">CSS</span>
      </div>
      <a href="#" class="btn btn--primary">View Project</a>
    </article>
  </div>
</section>
```

### CSS 아키텍처

```css
/* 1. CSS 변수 (색상, 간격, 폰트) */
:root {
  --color-primary: #333;
  --color-accent: #007bff;
  --spacing-unit: 1rem;
}

/* 2. Base 스타일 */
* { box-sizing: border-box; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI'; }

/* 3. 컴포넌트 */
.btn { /* 버튼 스타일 */ }
.card { /* 카드 스타일 */ }

/* 4. 유틸리티 */
.container { max-width: 1200px; }
.grid { display: grid; }

/* 5. 다크모드 */
[data-theme="dark"] { --color-bg: #1a1a1a; }

/* 6. 반응형 */
@media (max-width: 768px) { /* 모바일 스타일 */ }
```

### JavaScript 모듈화

```javascript
// 테마 관리
const ThemeManager = {
  init() { /* 초기화 */ },
  toggle() { /* 토글 */ },
  save() { /* localStorage 저장 */ }
};

// 네비게이션
const Navigation = {
  smoothScroll() { /* 부드러운 스크롤 */ }
};

// 폼 처리
const ContactForm = {
  validate() { /* 유효성 검사 */ },
  submit() { /* 전송 */ }
};

// 초기화
document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  Navigation.smoothScroll();
});
```

---

## 📱 반응형 테스트 체크리스트

### 모바일 (320px)
- [ ] 네비게이션 메뉴 햄버거 메뉴로 표시
- [ ] 텍스트 가독성 (최소 16px)
- [ ] 터치 타겟 최소 44px

### 태블릿 (768px)
- [ ] 2열 그리드 레이아웃
- [ ] 네비게이션 정상 표시
- [ ] 이미지 크기 조정

### 데스크톱 (1024px+)
- [ ] 3열 그리드 레이아웃
- [ ] 호버 효과 정상 작동
- [ ] 최대 너비 1200px 유지

---

## ♿ 접근성 체크리스트

- [ ] 모든 이미지에 alt 텍스트
- [ ] 색상만으로 정보 전달 없음
- [ ] 키보드 네비게이션 지원
- [ ] 충분한 색상 대비 (WCAG AA)
- [ ] 포커스 인디케이터 명확함
- [ ] 의미있는 헤딩 구조 (h1 ~ h3)

---

## 🚀 배포 체크리스트

### 사전 배포
- [ ] Lighthouse 성능 90+ 달성
- [ ] 모든 이미지 최적화 (WebP)
- [ ] 메타 데이터 설정 (OG tags)
- [ ] favicon 설정
- [ ] robots.txt 작성
- [ ] sitemap.xml 생성

### Vercel 설정
```json
// vercel.json
{
  "buildCommand": "exit 0",
  "outputDirectory": ".",
  "cleanUrls": true,
  "trailingSlash": false
}
```

### 배포 후
- [ ] 프로덕션 URL 테스트
- [ ] 모든 링크 작동 확인
- [ ] 다크모드 작동 확인
- [ ] 모바일 렌더링 확인
- [ ] 성능 모니터링 설정

---

## 📚 추천 자료

- [MDN Web Docs](https://developer.mozilla.org/) - HTML/CSS/JS 레퍼런스
- [Web.dev](https://web.dev/) - 웹 성능, 접근성
- [Can I Use](https://caniuse.com/) - 브라우저 호환성
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - 성능 측정

---

## 🔄 버전 관리

- **초기 버전**: MVP 기능 구현
- **계획**: 블로그, 프로젝트 상세 페이지 추가

---

**작성일**: 2026-04-02  
**마지막 수정**: 2026-04-02
