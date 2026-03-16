// =====================================================
// YourAnimal 결제 상태 관리 — Paddle Billing v2
// 설정 방법:
//   1. Paddle 대시보드 → Developer → Authentication
//      → Client-side token 복사 → PADDLE_CLIENT_TOKEN에 붙여넣기
//   2. Catalog → Products → 각 상품 Price 생성
//      → Price ID (pri_xxx...) 복사 → PADDLE_PRICE_IDS에 붙여넣기
// =====================================================

const PADDLE_CLIENT_TOKEN = 'live_XXXXXXXXXXXXXXXXXXXXXXXXX'; // ← 여기 교체
// 테스트 시: 'test_XXXXXXXXXXXXXXXXXXXXXXXXX'

const PADDLE_PRICE_IDS = {
  name_gen:     'pri_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', // ₩1,900 이름 생성기
  care_plan:    'pri_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', // ₩3,900 케어 플랜
  quiz_unlock:  'pri_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', // ₩3,900 TOP5 잠금해제
  subscription: 'pri_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', // ₩9,900/월 구독
};

const STORAGE_KEYS = {
  name_gen_uses:   'ya_name_gen_uses',
  name_gen_paid:   'ya_name_gen_paid',
  care_plan_paid:  'ya_care_plan_paid',
  quiz_paid:       'ya_quiz_paid',
  sub_expiry:      'ya_sub_expiry',
};

// Paddle 초기화 (paddle.js 로드 후 실행)
function initPaddle() {
  if (typeof Paddle === 'undefined') return;
  Paddle.Initialize({ token: PADDLE_CLIENT_TOKEN });
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPaddle);
} else {
  initPaddle();
}

const Paywall = {

  // ── 구독 유효 여부 ─────────────────────────────
  isSubscribed() {
    const expiry = parseInt(localStorage.getItem(STORAGE_KEYS.sub_expiry) || '0');
    return expiry > Date.now();
  },

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
    return uses < 1;
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

  // ── Paddle 오버레이 결제창 열기 ─────────────────
  pay(type) {
    const priceId = PADDLE_PRICE_IDS[type];

    if (!priceId || priceId.includes('XXXX')) {
      alert('⚙️ Paddle Price ID가 아직 설정되지 않았어요.\nPaddle 대시보드에서 Price ID를 생성 후\njs/paywall.js에 입력해주세요.');
      return;
    }

    if (typeof Paddle === 'undefined') {
      alert('결제 모듈을 불러오는 중이에요. 잠시 후 다시 시도해주세요.');
      return;
    }

    const successUrl = window.location.origin + '/success.html?type=' + type;

    Paddle.Checkout.open({
      items: [{ priceId: priceId, quantity: 1 }],
      settings: {
        displayMode: 'overlay',
        theme: 'light',
        locale: 'ko',
        successUrl: successUrl,
      },
    });
  },

  // ── 결제 성공 처리 (success.html에서 호출) ───────
  handleSuccess(type) {
    switch (type) {
      case 'name_gen':
        localStorage.setItem(STORAGE_KEYS.name_gen_paid, '1');
        break;
      case 'care_plan':
        localStorage.setItem(STORAGE_KEYS.care_plan_paid, '1');
        break;
      case 'quiz_unlock':
        localStorage.setItem(STORAGE_KEYS.quiz_paid, '1');
        break;
      case 'subscription': {
        const expiry = Date.now() + (30 * 24 * 60 * 60 * 1000);
        localStorage.setItem(STORAGE_KEYS.sub_expiry, expiry);
        localStorage.setItem(STORAGE_KEYS.name_gen_paid, '1');
        localStorage.setItem(STORAGE_KEYS.care_plan_paid, '1');
        localStorage.setItem(STORAGE_KEYS.quiz_paid, '1');
        break;
      }
    }
  },

  // ── URL에서 결제 성공 파라미터 감지 ─────────────
  checkReturnFromPayment() {
    const params = new URLSearchParams(window.location.search);
    const paid = params.get('paid');
    if (paid) {
      this.handleSuccess(paid);
      window.history.replaceState({}, '', window.location.pathname);
      return paid;
    }
    return null;
  }
};
