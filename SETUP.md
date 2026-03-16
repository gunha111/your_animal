# YourAnimal — 설정 가이드

## 구조

```
your_animal/
├── index.html        # 랜딩 페이지
├── quiz.html         # 퀴즈 페이지 (25문항)
├── results.html      # 결과 페이지 (TOP1 무료 / TOP2~5 유료)
├── success.html      # 결제 완료 페이지
├── css/style.css     # 전체 스타일
├── data/
│   ├── questions.js  # 25개 질문 + 점수 데이터
│   └── pets.js       # 10개 반려동물 정보
└── js/scoring.js     # 매칭 알고리즘
```

## Stripe 결제 연동 방법

### 방법 1: Stripe Payment Links (가장 간단, 추천)

1. [Stripe Dashboard](https://dashboard.stripe.com) 로그인
2. Products → Add product → 이름: "YourAnimal 전체 결과", 가격: $2.99
3. Payment Links → Create a link → 해당 상품 선택
4. Confirmation page → "Redirect customers to your website" 선택
5. URL: `https://yourdomain.com/success.html`
6. 생성된 Payment Link URL 복사

7. `results.html` 파일에서 이 줄 수정:
```js
const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/YOUR_PAYMENT_LINK_HERE';
```
→ 복사한 URL로 교체

### 방법 2: Stripe Checkout (서버 필요, 더 안전)

서버리스 함수 (Vercel/Netlify)를 사용하는 경우:

```js
// api/create-checkout.js (Vercel Edge Function)
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: { name: 'YourAnimal 전체 결과 (TOP 2~5)' },
        unit_amount: 299, // $2.99
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: `${req.headers.origin}/success.html?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.origin}/results.html`,
  });
  res.json({ url: session.url });
}
```

## 배포 방법

### Vercel (추천)
```bash
npm i -g vercel
vercel --prod
```

### Netlify
1. netlify.com 접속
2. "Deploy manually" → 폴더 드래그앤드롭

### GitHub Pages
1. GitHub 리포지토리 생성
2. Settings → Pages → Deploy from branch (main)

## 커스터마이징

### 가격 변경
`results.html`에서 표시 가격 텍스트 수정:
```html
<div class="price-highlight">$2.99 <span>일회성 결제</span></div>
```

### 질문 추가/수정
`data/questions.js`에서 질문 배열 편집

### 반려동물 추가
`data/pets.js`에서 새 반려동물 객체 추가 후
`data/questions.js`의 모든 옵션 scores에 해당 키 추가

### 색상/디자인 변경
`css/style.css` 상단의 `:root` 변수 수정:
```css
--primary: #6366F1;    /* 메인 색상 */
--secondary: #EC4899;  /* 보조 색상 */
```
