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

## 토스페이먼츠 결제 연동 방법

> 카카오페이, 네이버페이, 토스페이, 신용/체크카드 모두 지원하는 한국 1위 결제 PG

### 방법 1: 토스페이먼츠 결제 링크 (가장 간단, 추천 ⭐)

백엔드 없이 5분 안에 설정 가능합니다.

1. [토스페이먼츠 대시보드](https://developers.tosspayments.com) 가입 및 로그인
2. 상점 관리 → **결제 링크** → 결제 링크 만들기
3. 상품명: `YourAnimal 반려동물 매칭 전체 결과`, 금액: `3,900`
4. 결제 완료 후 이동 URL: `https://mypetgenerator.com/success.html`
5. 생성된 링크 복사 (예: `https://link.tosspayments.com/xxxx`)

6. `results.html` 파일에서 수정:
```js
const TOSS_PAYMENT_LINK = 'https://link.tosspayments.com/YOUR_LINK_HERE';
```
→ 복사한 URL로 교체

---

### 방법 2: 토스페이먼츠 JS SDK (서버 필요, 더 안전)

Vercel/Netlify 서버리스 함수를 사용하는 경우:

**`api/payment.js`** (Vercel)
```js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { orderId, amount } = req.body;

  const response = await fetch('https://api.tosspayments.com/v1/payments', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(process.env.TOSS_SECRET_KEY + ':').toString('base64')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount,
      orderId,
      orderName: 'YourAnimal 반려동물 매칭 전체 결과',
      successUrl: `${process.env.BASE_URL}/success.html`,
      failUrl: `${process.env.BASE_URL}/results.html`,
    }),
  });

  const data = await response.json();
  res.json(data);
}
```

**환경변수 설정 (.env)**
```
TOSS_SECRET_KEY=test_sk_YOUR_SECRET_KEY
BASE_URL=https://mypetgenerator.com
```

**테스트 키 발급**: 토스페이먼츠 개발자센터 → 내 개발정보 → API 키

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
