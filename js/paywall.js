// =====================================================
// YourAnimal 결제 상태 관리
// Toss Payment Links → SETUP.md 참고하여 링크 교체
// =====================================================

const PAYMENT_LINKS = {
  name_gen:     'https://link.tosspayments.com/NAME_GEN_LINK',     // ₩1,900
  care_plan:    'https://link.tosspayments.com/CARE_PLAN_LINK',    // ₩3,900
  quiz_unlock:  'https://link.tosspayments.com/QUIZ_UNLOCK_LINK',  // ₩3,900
  subscription: 'https://link.tosspayments.com/SUBSCRIPTION_LINK', // ₩9,900/월
};

const STORAGE_KEYS = {
  name_gen_uses:   'ya_name_gen_uses',    // 무료 사용 횟수
  name_gen_paid:   'ya_name_gen_paid',    // 1회 결제 여부
  care_plan_paid:  'ya_care_plan_paid',   // 케어플랜 결제 여부
  quiz_paid:       'ya_quiz_paid',        // 퀴즈 TOP5 결제 여부
  sub_expiry:      'ya_sub_expiry',       // 구독 만료 타임스탬프
};

const Paywall = {

  // ── 구독 유효 여부 ─────────────────────────────
  isSubscribed() {
    const expiry = parseInt(localStorage.getItem(STORAGE_KEYS.sub_expiry) || '0');
    return expiry > Date.now();
  },

  // ── 구독 남은 일수 ─────────────────────────────
  subDaysLeft() {
    const expiry = parseInt(localStorage.getItem(STORAGE_KEYS.sub_expiry) || '0');
    const diff = expiry - Date.now();
    return diff > 0 ? Math.ceil(diff / 86400000) : 0;
  },

  // ── 이름 생성기 ────────────────────────────────
  canUseNameGen() {
    if (this.isSubscribed()) return true;
    if (localStorage.getItem(STORAGE_KEYS.name_gen_paid) === '1') return true;
    const uses = parseInt(localStorage.getItem(STORAGE_KEYS.name_gen_uses) || '0');
    return uses < 1; // 1회 무료
  },
  isNameGenFree() {
    if (this.isSubscribed()) return true;
    if (localStorage.getItem(STORAGE_KEYS.name_gen_paid) === '1') return true;
    const uses = parseInt(localStorage.getItem(STORAGE_KEYS.name_gen_uses) || '0');
    return uses === 0;
  },
  recordNameGenUse() {
    const uses = parseInt(localStorage.getItem(STORAGE_KEYS.name_gen_uses) || '0');
    localStorage.setItem(STORAGE_KEYS.name_gen_uses, uses + 1);
  },

  // ── 케어 플랜 ──────────────────────────────────
  canUseCarePlan() {
    if (this.isSubscribed()) return true;
    return localStorage.getItem(STORAGE_KEYS.care_plan_paid) === '1';
  },

  // ── 퀴즈 TOP5 ──────────────────────────────────
  canSeeQuizFull() {
    if (this.isSubscribed()) return true;
    return localStorage.getItem(STORAGE_KEYS.quiz_paid) === '1';
  },

  // ── 결제 페이지로 이동 ──────────────────────────
  pay(type) {
    const returnPath = encodeURIComponent(window.location.pathname + '?paid=' + type);
    const link = PAYMENT_LINKS[type];
    if (!link || link.includes('LINK')) {
      alert('⚙️ 결제 링크가 아직 설정되지 않았어요.\nToss 대시보드에서 결제 링크를 생성 후\njs/paywall.js에 입력해주세요.');
      return;
    }
    window.location.href = link;
  },

  // ── 결제 성공 처리 (success.html → 각 페이지) ───
  handleSuccess(type) {
    switch(type) {
      case 'name_gen':
        localStorage.setItem(STORAGE_KEYS.name_gen_paid, '1');
        break;
      case 'care_plan':
        localStorage.setItem(STORAGE_KEYS.care_plan_paid, '1');
        break;
      case 'quiz_unlock':
        localStorage.setItem(STORAGE_KEYS.quiz_paid, '1');
        break;
      case 'subscription':
        // 30일 구독 설정
        const expiry = Date.now() + (30 * 24 * 60 * 60 * 1000);
        localStorage.setItem(STORAGE_KEYS.sub_expiry, expiry);
        // 구독은 모든 기능 포함
        localStorage.setItem(STORAGE_KEYS.name_gen_paid, '1');
        localStorage.setItem(STORAGE_KEYS.care_plan_paid, '1');
        localStorage.setItem(STORAGE_KEYS.quiz_paid, '1');
        break;
    }
  },

  // ── URL에서 결제 성공 파라미터 감지 ─────────────
  checkReturnFromPayment() {
    const params = new URLSearchParams(window.location.search);
    const paid = params.get('paid');
    if (paid) {
      this.handleSuccess(paid);
      // URL에서 파라미터 제거
      const clean = window.location.pathname;
      window.history.replaceState({}, '', clean);
      return paid;
    }
    return null;
  }
};
