claude code
```

**프롬프트:**
```
lala.ai 포트폴리오 사이트 PRD(Product Requirements Document)를 
docs/PRD.md 파일로 작성해줘.

# 프로젝트 개요
- 프로젝트명: lala.ai 포트폴리오 사이트
- 목적: 개인 브랜드 구축 및 비즈니스 홍보
- 타겟: 기업 교육 담당자, HR, 개발자

# 핵심 정보
회사: lala.ai
대표: 신인숙 (Lala)
포지션: AI Vibe Coding Educator & Mentor
이메일: jekeysus@gmail.com

# 주요 프로젝트
1. Multicampus Claude Code & Cursor Pro 강의 (2025.05)
2. Sales Insight Dashboard (React, Vercel)
3. lala.ai AI 교육 사업
4. 정부 혁신 프로젝트 (혁신바우처, 예비창업패키지)

# 기술 스택
- Frontend: HTML5, CSS3, Vanilla JavaScript
- 스타일: AI Soft 파스텔 톤
- 배포: Vercel
- 반응형: Mobile-first

# 브랜드 컬러
- Primary: #A78BFA (Soft Purple)
- Secondary: #93C5FD (Sky Blue)
- Accent: #FCD34D (Pastel Yellow)
- Success: #86EFAC (Mint Green)
- Background: #FEFCE8 (Cream)

# 필수 기능
- 히어로 섹션 (이름, 타이틀, CTA)
- 프로젝트 갤러리 (4개)
- 기술 스택 섹션
- 연락처 폼
- 다크모드 토글
- 모바일 반응형

# 디자인 가이드
- 파스텔 톤으로 친근하고 따뜻한 느낌
- 부드러운 그라데이션
- 둥근 모서리 (12px~24px)
- 스크롤 애니메이션

PRD를 체계적으로 작성해줘.
```

---

### **Step 2: PRD 검토 및 수정 (5분)**

생성된 `docs/PRD.md` 파일을 열어서:
- 누락된 내용 확인
- 우선순위 조정
- 상세 요구사항 추가

---

### **Step 3: PRD 기반 개발 시작**
```
docs/PRD.md 파일 기반으로 포트폴리오 사이트 개발 시작해줘.

1단계: 기본 파일 구조 생성
2단계: 히어로 섹션 구현
3단계: 프로젝트 섹션 구현
4단계: 기술 스택 섹션 구현
5단계: 연락처 섹션 구현
6단계: 다크모드 구현
7단계: 반응형 최적화

각 단계마다 PRD 요구사항 충족 여부 확인하면서 진행해줘.
```

---

## 📁 완성될 파일 구조
```
portfolio-site/
├── .clinerules                    # Cursor 규칙
├── .claude/
│   └── CLAUDE.md                  # Claude Code 규칙
├── docs/
│   ├── PRD.md                     # 🎯 프로젝트 요구사항 정의서
│   └── context-template.md        # 프로젝트 컨텍스트
├── index.html
├── styles/
│   └── main.css
├── scripts/
│   └── app.js
└── assets/
    └── images/