/**
 * Portfolio Site - 메인 JavaScript 파일
 * 기능: 테마 관리, 폼 유효성 검사, 이벤트 처리
 */

// ========== THEME MANAGER ==========
const ThemeManager = {
  THEME_KEY: 'portfolio-theme',
  LIGHT: 'light',
  DARK: 'dark',

  /**
   * 테마 시스템 초기화
   */
  init() {
    this.applyStoredTheme();
    this.setupThemeToggle();
    this.setupSystemPreference();
  },

  /**
   * 저장된 테마 적용
   */
  applyStoredTheme() {
    const storedTheme = this.getStoredTheme();
    if (storedTheme) {
      this.setTheme(storedTheme);
    } else if (this.hasSystemDarkMode()) {
      this.setTheme(this.DARK);
    }
  },

  /**
   * 테마 설정
   * @param {string} theme - 'light' 또는 'dark'
   */
  setTheme(theme) {
    const htmlElement = document.documentElement;
    if (theme === this.DARK) {
      htmlElement.setAttribute('data-theme', this.DARK);
    } else {
      htmlElement.removeAttribute('data-theme');
    }
    this.saveTheme(theme);
    this.updateToggleIcon(theme);
  },

  /**
   * 테마 토글
   */
  toggle() {
    const currentTheme = this.getCurrentTheme();
    const newTheme = currentTheme === this.DARK ? this.LIGHT : this.DARK;
    this.setTheme(newTheme);
  },

  /**
   * 현재 테마 조회
   * @returns {string} 현재 테마
   */
  getCurrentTheme() {
    const htmlElement = document.documentElement;
    return htmlElement.getAttribute('data-theme') === this.DARK ? this.DARK : this.LIGHT;
  },

  /**
   * 저장된 테마 조회
   * @returns {string|null} 저장된 테마
   */
  getStoredTheme() {
    try {
      return localStorage.getItem(this.THEME_KEY);
    } catch (e) {
      console.error('localStorage 접근 실패:', e);
      return null;
    }
  },

  /**
   * 테마 저장
   * @param {string} theme - 테마
   */
  saveTheme(theme) {
    try {
      localStorage.setItem(this.THEME_KEY, theme);
    } catch (e) {
      console.error('localStorage 저장 실패:', e);
    }
  },

  /**
   * 시스템 다크모드 지원 여부 확인
   * @returns {boolean}
   */
  hasSystemDarkMode() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  },

  /**
   * 토글 버튼 아이콘 업데이트
   * @param {string} theme - 현재 테마
   */
  updateToggleIcon(theme) {
    const toggle = document.getElementById('themeToggle');
    if (toggle) {
      const icon = toggle.querySelector('.theme-toggle__icon');
      if (icon) {
        icon.textContent = theme === this.DARK ? '☀️' : '🌙';
      }
    }
  },

  /**
   * 토글 버튼 이벤트 리스너 설정
   */
  setupThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    if (toggle) {
      toggle.addEventListener('click', () => this.toggle());
    }
  },

  /**
   * 시스템 색상 선호도 변화 감지
   */
  setupSystemPreference() {
    if (!window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
      const storedTheme = this.getStoredTheme();
      if (!storedTheme) {
        this.setTheme(e.matches ? this.DARK : this.LIGHT);
      }
    });
  }
};

// ========== FORM VALIDATOR ==========
const FormValidator = {
  /**
   * 이메일 유효성 검사
   * @param {string} email - 이메일 주소
   * @returns {boolean}
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * 필수 필드 검사
   * @param {string} value - 필드 값
   * @returns {boolean}
   */
  isRequired(value) {
    return value.trim().length > 0;
  },

  /**
   * 최소 길이 검사
   * @param {string} value - 필드 값
   * @param {number} minLength - 최소 길이
   * @returns {boolean}
   */
  hasMinLength(value, minLength) {
    return value.trim().length >= minLength;
  },

  /**
   * 폼 전체 유효성 검사
   * @param {HTMLFormElement} form - 폼 요소
   * @returns {boolean}
   */
  validateForm(form) {
    const nameInput = form.querySelector('#name');
    const emailInput = form.querySelector('#email');
    const messageInput = form.querySelector('#message');

    let isValid = true;

    // 이름 검증
    if (!this.isRequired(nameInput.value)) {
      this.showError(nameInput, '이름을 입력해주세요.');
      isValid = false;
    } else if (!this.hasMinLength(nameInput.value, 2)) {
      this.showError(nameInput, '이름은 2글자 이상이어야 합니다.');
      isValid = false;
    } else {
      this.clearError(nameInput);
    }

    // 이메일 검증
    if (!this.isRequired(emailInput.value)) {
      this.showError(emailInput, '이메일을 입력해주세요.');
      isValid = false;
    } else if (!this.isValidEmail(emailInput.value)) {
      this.showError(emailInput, '유효한 이메일 주소를 입력해주세요.');
      isValid = false;
    } else {
      this.clearError(emailInput);
    }

    // 메시지 검증
    if (!this.isRequired(messageInput.value)) {
      this.showError(messageInput, '메시지를 입력해주세요.');
      isValid = false;
    } else if (!this.hasMinLength(messageInput.value, 10)) {
      this.showError(messageInput, '메시지는 10글자 이상이어야 합니다.');
      isValid = false;
    } else {
      this.clearError(messageInput);
    }

    return isValid;
  },

  /**
   * 에러 메시지 표시
   * @param {HTMLElement} input - 입력 요소
   * @param {string} message - 에러 메시지
   */
  showError(input, message) {
    const errorElement = document.getElementById(input.id + 'Error');
    if (errorElement) {
      errorElement.textContent = message;
      input.style.borderColor = '#dc3545';
    }
  },

  /**
   * 에러 메시지 제거
   * @param {HTMLElement} input - 입력 요소
   */
  clearError(input) {
    const errorElement = document.getElementById(input.id + 'Error');
    if (errorElement) {
      errorElement.textContent = '';
      input.style.borderColor = '';
    }
  }
};

// ========== CONTACT FORM HANDLER ==========
const ContactForm = {
  /**
   * 폼 핸들러 초기화
   */
  init() {
    const form = document.getElementById('contactForm');
    if (form) {
      form.addEventListener('submit', (e) => this.handleSubmit(e));
      this.setupInputListeners(form);
    }
  },

  /**
   * 입력 필드 리스너 설정 (실시간 유효성 검사)
   * @param {HTMLFormElement} form - 폼 요소
   */
  setupInputListeners(form) {
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        if (input.id === 'email') {
          if (!FormValidator.isValidEmail(input.value)) {
            FormValidator.showError(input, '유효한 이메일 주소를 입력해주세요.');
          } else {
            FormValidator.clearError(input);
          }
        } else if (input.value.trim()) {
          FormValidator.clearError(input);
        }
      });
    });
  },

  /**
   * 폼 제출 처리
   * @param {Event} event - 제출 이벤트
   */
  handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const statusElement = document.getElementById('formStatus');

    // 유효성 검사
    if (!FormValidator.validateForm(form)) {
      this.showStatus(statusElement, '입력 정보를 다시 확인해주세요.', 'error');
      return;
    }

    // 실제 폼 제출 (서버 구현 필요)
    this.submitForm(form, statusElement);
  },

  /**
   * 폼 제출
   * @param {HTMLFormElement} form - 폼 요소
   * @param {HTMLElement} statusElement - 상태 표시 요소
   */
  submitForm(form, statusElement) {
    this.showStatus(statusElement, '메시지를 전송 중입니다...', '');

    // FormData 생성
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // 서버에 전송 (예시 - 실제 엔드포인트로 수정 필요)
    const endpoint = '/api/contact'; // 실제 엔드포인트로 변경

    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('서버 오류');
        }
        return response.json();
      })
      .then(result => {
        this.showStatus(statusElement, '메시지가 성공적으로 전송되었습니다!', 'success');
        form.reset();
        setTimeout(() => {
          statusElement.textContent = '';
        }, 3000);
      })
      .catch(error => {
        console.error('폼 제출 오류:', error);
        this.showStatus(statusElement, '메시지 전송에 실패했습니다. 나중에 다시 시도해주세요.', 'error');
      });
  },

  /**
   * 상태 메시지 표시
   * @param {HTMLElement} element - 상태 요소
   * @param {string} message - 메시지
   * @param {string} type - 메시지 유형 ('success', 'error', '')
   */
  showStatus(element, message, type) {
    element.textContent = message;
    element.className = 'form-status';
    if (type) {
      element.classList.add(type);
    }
  }
};

// ========== SMOOTH SCROLL ==========
const SmoothScroll = {
  /**
   * 부드러운 스크롤 설정
   */
  init() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', (e) => this.handleClick(e));
    });
  },

  /**
   * 링크 클릭 처리
   * @param {Event} event - 클릭 이벤트
   */
  handleClick(event) {
    const href = event.currentTarget.getAttribute('href');

    // '#' 만으로 된 링크는 처리하지 않음
    if (href === '#') {
      return;
    }

    const targetElement = document.querySelector(href);

    if (targetElement) {
      event.preventDefault();

      // 헤더 높이를 고려한 스크롤 위치 계산 (약 70px)
      const headerHeight = 70;
      const targetPosition = targetElement.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }
};

// ========== PERFORMANCE & ACCESSIBILITY ==========
const Accessibility = {
  /**
   * 접근성 기능 초기화
   */
  init() {
    this.setupKeyboardNavigation();
    this.setupSkipLink();
  },

  /**
   * 키보드 네비게이션 설정
   */
  setupKeyboardNavigation() {
    // 버튼들이 Tab 키로 접근 가능하도록 설정됨
    // HTML에서 이미 button 태그와 role="button" 사용
  },

  /**
   * Skip to main content 링크 (선택사항)
   */
  setupSkipLink() {
    // 필요시 구현
  }
};

// ========== HAMBURGER MENU ==========
const HamburgerMenu = {
  /**
   * 햄버거 메뉴 초기화
   */
  init() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navbarMenu = document.getElementById('navbarMenu');

    if (!hamburgerBtn || !navbarMenu) return;

    // 햄버거 버튼 클릭 이벤트
    hamburgerBtn.addEventListener('click', () => this.toggle(hamburgerBtn, navbarMenu));

    // 메뉴 링크 클릭 시 메뉴 닫기
    this.closeOnNavLinkClick(navbarMenu, hamburgerBtn);

    // 외부 클릭 시 메뉴 닫기
    this.closeOnOutsideClick(navbarMenu, hamburgerBtn);
  },

  /**
   * 메뉴 토글
   * @param {HTMLElement} btn - 햄버거 버튼
   * @param {HTMLElement} menu - 메뉴 요소
   */
  toggle(btn, menu) {
    menu.classList.toggle('is-open');
    btn.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', menu.classList.contains('is-open'));
  },

  /**
   * 메뉴 닫기
   * @param {HTMLElement} menu - 메뉴 요소
   * @param {HTMLElement} btn - 햄버거 버튼
   */
  close(menu, btn) {
    menu.classList.remove('is-open');
    btn.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
  },

  /**
   * 네비게이션 링크 클릭 시 메뉴 닫기
   * @param {HTMLElement} menu - 메뉴 요소
   * @param {HTMLElement} btn - 햄버거 버튼
   */
  closeOnNavLinkClick(menu, btn) {
    const navLinks = menu.querySelectorAll('.navbar__link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => this.close(menu, btn));
    });
  },

  /**
   * 외부 클릭 시 메뉴 닫기
   * @param {HTMLElement} menu - 메뉴 요소
   * @param {HTMLElement} btn - 햄버거 버튼
   */
  closeOnOutsideClick(menu, btn) {
    document.addEventListener('click', (e) => {
      const header = document.querySelector('.header');
      if (!header.contains(e.target) && menu.classList.contains('is-open')) {
        this.close(menu, btn);
      }
    });
  }
};

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
  // 테마 시스템 초기화
  ThemeManager.init();

  // 햄버거 메뉴 초기화
  HamburgerMenu.init();

  // 폼 핸들러 초기화
  ContactForm.init();

  // 부드러운 스크롤 초기화
  SmoothScroll.init();

  // 접근성 기능 초기화
  Accessibility.init();

  console.log('포트폴리오 사이트 초기화 완료');
});

// ========== CLEANUP ==========
// 페이지 언로드 시 이벤트 리스너 정리 (필요시)
window.addEventListener('beforeunload', () => {
  // 필요한 정리 작업 수행
});
