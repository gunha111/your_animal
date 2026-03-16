const QUESTIONS = [
  {
    id: 1,
    category: "lifestyle",
    question: "당신의 하루 일과 중 얼마나 집에 있나요?",
    options: [
      { text: "거의 항상 집에 있어요 (8시간 이상)", scores: { dog: 5, cat: 3, rabbit: 4, hamster: 3, fish: 2, parrot: 5, guinea_pig: 4, turtle: 3, ferret: 5, hedgehog: 2 } },
      { text: "대부분 집에 있어요 (5~8시간)", scores: { dog: 4, cat: 4, rabbit: 3, hamster: 3, fish: 3, parrot: 3, guinea_pig: 3, turtle: 3, ferret: 3, hedgehog: 3 } },
      { text: "보통 외출이 많아요 (2~5시간)", scores: { dog: 2, cat: 5, rabbit: 3, hamster: 4, fish: 4, parrot: 2, guinea_pig: 3, turtle: 4, ferret: 2, hedgehog: 4 } },
      { text: "거의 집에 없어요 (2시간 이하)", scores: { dog: 0, cat: 4, rabbit: 2, hamster: 4, fish: 5, parrot: 0, guinea_pig: 2, turtle: 5, ferret: 0, hedgehog: 4 } }
    ]
  },
  {
    id: 2,
    category: "lifestyle",
    question: "어떤 주거 환경에 살고 있나요?",
    options: [
      { text: "작은 원룸/스튜디오", scores: { dog: 1, cat: 5, rabbit: 2, hamster: 5, fish: 5, parrot: 2, guinea_pig: 3, turtle: 4, ferret: 2, hedgehog: 4 } },
      { text: "중간 크기 아파트", scores: { dog: 3, cat: 5, rabbit: 4, hamster: 4, fish: 4, parrot: 3, guinea_pig: 4, turtle: 4, ferret: 3, hedgehog: 4 } },
      { text: "넓은 아파트/빌라", scores: { dog: 4, cat: 4, rabbit: 5, hamster: 3, fish: 3, parrot: 4, guinea_pig: 4, turtle: 3, ferret: 5, hedgehog: 3 } },
      { text: "마당이 있는 단독주택", scores: { dog: 5, cat: 4, rabbit: 5, hamster: 2, fish: 2, parrot: 3, guinea_pig: 5, turtle: 3, ferret: 5, hedgehog: 3 } }
    ]
  },
  {
    id: 3,
    category: "lifestyle",
    question: "얼마나 자주 여행이나 출장을 가나요?",
    options: [
      { text: "거의 안 가요 (연 1~2회)", scores: { dog: 5, cat: 4, rabbit: 4, hamster: 3, fish: 3, parrot: 5, guinea_pig: 4, turtle: 3, ferret: 5, hedgehog: 3 } },
      { text: "가끔 가요 (월 1회)", scores: { dog: 3, cat: 5, rabbit: 3, hamster: 4, fish: 4, parrot: 3, guinea_pig: 3, turtle: 4, ferret: 3, hedgehog: 4 } },
      { text: "자주 가요 (주 1회)", scores: { dog: 1, cat: 4, rabbit: 2, hamster: 4, fish: 5, parrot: 1, guinea_pig: 2, turtle: 5, ferret: 1, hedgehog: 4 } },
      { text: "거의 매주 집을 비워요", scores: { dog: 0, cat: 3, rabbit: 1, hamster: 4, fish: 5, parrot: 0, guinea_pig: 1, turtle: 5, ferret: 0, hedgehog: 3 } }
    ]
  },
  {
    id: 4,
    category: "lifestyle",
    question: "하루에 운동이나 야외 활동을 얼마나 하나요?",
    options: [
      { text: "매일 1시간 이상 활발하게", scores: { dog: 5, cat: 2, rabbit: 3, hamster: 1, fish: 1, parrot: 2, guinea_pig: 2, turtle: 1, ferret: 4, hedgehog: 1 } },
      { text: "주 3~4회 적당히", scores: { dog: 4, cat: 3, rabbit: 4, hamster: 2, fish: 2, parrot: 3, guinea_pig: 3, turtle: 2, ferret: 4, hedgehog: 2 } },
      { text: "주 1~2회 가볍게", scores: { dog: 3, cat: 4, rabbit: 4, hamster: 3, fish: 3, parrot: 3, guinea_pig: 4, turtle: 3, ferret: 3, hedgehog: 3 } },
      { text: "거의 운동 안 해요", scores: { dog: 1, cat: 5, rabbit: 3, hamster: 4, fish: 5, parrot: 3, guinea_pig: 3, turtle: 5, ferret: 1, hedgehog: 4 } }
    ]
  },
  {
    id: 5,
    category: "lifestyle",
    question: "한 달에 반려동물을 위해 얼마를 쓸 수 있나요?",
    options: [
      { text: "5만원 이하", scores: { dog: 0, cat: 2, rabbit: 3, hamster: 5, fish: 5, parrot: 0, guinea_pig: 4, turtle: 4, ferret: 2, hedgehog: 4 } },
      { text: "5~15만원", scores: { dog: 2, cat: 4, rabbit: 5, hamster: 4, fish: 4, parrot: 3, guinea_pig: 5, turtle: 4, ferret: 4, hedgehog: 4 } },
      { text: "15~30만원", scores: { dog: 4, cat: 4, rabbit: 4, hamster: 3, fish: 3, parrot: 4, guinea_pig: 4, turtle: 3, ferret: 4, hedgehog: 3 } },
      { text: "30만원 이상 가능해요", scores: { dog: 5, cat: 4, rabbit: 3, hamster: 2, fish: 2, parrot: 5, guinea_pig: 3, turtle: 2, ferret: 5, hedgehog: 2 } }
    ]
  },
  {
    id: 6,
    category: "personality",
    question: "자신의 성격을 가장 잘 표현하는 것은?",
    options: [
      { text: "활발하고 사교적이에요 - 사람들과 어울리는 걸 좋아해요", scores: { dog: 5, cat: 2, rabbit: 3, hamster: 2, fish: 1, parrot: 5, guinea_pig: 3, turtle: 1, ferret: 5, hedgehog: 1 } },
      { text: "차분하고 독립적이에요 - 혼자만의 시간이 중요해요", scores: { dog: 2, cat: 5, rabbit: 3, hamster: 4, fish: 4, parrot: 2, guinea_pig: 3, turtle: 5, ferret: 2, hedgehog: 5 } },
      { text: "따뜻하고 돌봄을 좋아해요 - 누군가를 챙기는 게 즐거워요", scores: { dog: 4, cat: 3, rabbit: 5, hamster: 3, fish: 2, parrot: 4, guinea_pig: 5, turtle: 2, ferret: 4, hedgehog: 3 } },
      { text: "관찰하고 분석하기 좋아해요 - 차분히 지켜보는 걸 즐겨요", scores: { dog: 2, cat: 4, rabbit: 3, hamster: 3, fish: 5, parrot: 3, guinea_pig: 3, turtle: 5, ferret: 3, hedgehog: 4 } }
    ]
  },
  {
    id: 7,
    category: "personality",
    question: "반려동물과 어떤 관계를 원하나요?",
    options: [
      { text: "친구처럼 - 항상 함께하고 소통하고 싶어요", scores: { dog: 5, cat: 3, rabbit: 4, hamster: 2, fish: 1, parrot: 5, guinea_pig: 4, turtle: 1, ferret: 5, hedgehog: 2 } },
      { text: "파트너처럼 - 서로 존중하며 공간을 나누고 싶어요", scores: { dog: 3, cat: 5, rabbit: 4, hamster: 3, fish: 3, parrot: 3, guinea_pig: 4, turtle: 3, ferret: 3, hedgehog: 4 } },
      { text: "아이처럼 - 돌봐주고 성장하는 걸 보고 싶어요", scores: { dog: 4, cat: 4, rabbit: 5, hamster: 5, fish: 3, parrot: 4, guinea_pig: 5, turtle: 4, ferret: 4, hedgehog: 4 } },
      { text: "감상하듯 - 그저 바라보는 것만으로도 힐링이 돼요", scores: { dog: 1, cat: 3, rabbit: 2, hamster: 3, fish: 5, parrot: 2, guinea_pig: 2, turtle: 5, ferret: 2, hedgehog: 3 } }
    ]
  },
  {
    id: 8,
    category: "personality",
    question: "스트레스 받을 때 어떻게 푸나요?",
    options: [
      { text: "격렬한 운동이나 야외 활동으로", scores: { dog: 5, cat: 2, rabbit: 3, hamster: 1, fish: 1, parrot: 3, guinea_pig: 2, turtle: 1, ferret: 5, hedgehog: 1 } },
      { text: "조용히 혼자만의 시간을 보내며", scores: { dog: 1, cat: 5, rabbit: 3, hamster: 4, fish: 5, parrot: 1, guinea_pig: 2, turtle: 5, ferret: 1, hedgehog: 5 } },
      { text: "누군가(펫 포함)와 함께 있으면서", scores: { dog: 5, cat: 3, rabbit: 4, hamster: 3, fish: 2, parrot: 5, guinea_pig: 4, turtle: 2, ferret: 4, hedgehog: 2 } },
      { text: "취미 활동이나 새로운 것 배우기", scores: { dog: 3, cat: 3, rabbit: 3, hamster: 3, fish: 4, parrot: 4, guinea_pig: 3, turtle: 4, ferret: 4, hedgehog: 3 } }
    ]
  },
  {
    id: 9,
    category: "personality",
    question: "아침형 인간인가요, 저녁형 인간인가요?",
    options: [
      { text: "완전 아침형 - 일찍 일어나고 일찍 자요", scores: { dog: 5, cat: 3, rabbit: 4, hamster: 1, fish: 3, parrot: 4, guinea_pig: 4, turtle: 3, ferret: 3, hedgehog: 1 } },
      { text: "약간 아침형", scores: { dog: 4, cat: 4, rabbit: 4, hamster: 2, fish: 3, parrot: 3, guinea_pig: 4, turtle: 3, ferret: 3, hedgehog: 2 } },
      { text: "약간 저녁형", scores: { dog: 3, cat: 4, rabbit: 3, hamster: 4, fish: 3, parrot: 3, guinea_pig: 3, turtle: 3, ferret: 4, hedgehog: 4 } },
      { text: "완전 저녁형 - 밤이 진짜 내 시간", scores: { dog: 2, cat: 5, rabbit: 2, hamster: 5, fish: 3, parrot: 1, guinea_pig: 2, turtle: 3, ferret: 5, hedgehog: 5 } }
    ]
  },
  {
    id: 10,
    category: "personality",
    question: "인내심은 어느 정도인가요?",
    options: [
      { text: "매우 높아요 - 무엇이든 꼼꼼하게 오래 집중해요", scores: { dog: 4, cat: 3, rabbit: 4, hamster: 3, fish: 5, parrot: 5, guinea_pig: 3, turtle: 5, ferret: 3, hedgehog: 4 } },
      { text: "보통이에요 - 필요할 때 참을 수 있어요", scores: { dog: 4, cat: 4, rabbit: 4, hamster: 4, fish: 3, parrot: 3, guinea_pig: 4, turtle: 4, ferret: 4, hedgehog: 4 } },
      { text: "약간 부족해요 - 빠른 반응을 좋아해요", scores: { dog: 3, cat: 4, rabbit: 3, hamster: 4, fish: 2, parrot: 4, guinea_pig: 3, turtle: 2, ferret: 4, hedgehog: 3 } },
      { text: "많이 부족해요 - 즉각적인 상호작용이 좋아요", scores: { dog: 5, cat: 3, rabbit: 3, hamster: 3, fish: 1, parrot: 4, guinea_pig: 3, turtle: 1, ferret: 5, hedgehog: 2 } }
    ]
  },
  {
    id: 11,
    category: "practical",
    question: "알레르기나 건강 문제가 있나요?",
    options: [
      { text: "동물 털에 알레르기가 있어요", scores: { dog: 0, cat: 0, rabbit: 0, hamster: 0, fish: 5, parrot: 3, guinea_pig: 0, turtle: 5, ferret: 0, hedgehog: 2 } },
      { text: "경미한 털 알레르기 (저알레르기 품종 가능)", scores: { dog: 3, cat: 3, rabbit: 2, hamster: 2, fish: 5, parrot: 4, guinea_pig: 2, turtle: 5, ferret: 2, hedgehog: 3 } },
      { text: "알레르기는 없지만 청결에 예민해요", scores: { dog: 3, cat: 4, rabbit: 3, hamster: 3, fish: 5, parrot: 3, guinea_pig: 3, turtle: 5, ferret: 2, hedgehog: 4 } },
      { text: "아무 문제 없어요", scores: { dog: 5, cat: 5, rabbit: 5, hamster: 5, fish: 5, parrot: 5, guinea_pig: 5, turtle: 5, ferret: 5, hedgehog: 5 } }
    ]
  },
  {
    id: 12,
    category: "practical",
    question: "어린 자녀나 함께 사는 가족이 있나요?",
    options: [
      { text: "6세 이하 어린아이가 있어요", scores: { dog: 4, cat: 3, rabbit: 2, hamster: 2, fish: 4, parrot: 2, guinea_pig: 4, turtle: 3, ferret: 1, hedgehog: 1 } },
      { text: "7세 이상 어린이가 있어요", scores: { dog: 5, cat: 4, rabbit: 4, hamster: 4, fish: 3, parrot: 4, guinea_pig: 5, turtle: 3, ferret: 3, hedgehog: 3 } },
      { text: "성인 가족만 있어요", scores: { dog: 5, cat: 5, rabbit: 5, hamster: 5, fish: 5, parrot: 5, guinea_pig: 5, turtle: 5, ferret: 5, hedgehog: 5 } },
      { text: "혼자 살아요", scores: { dog: 4, cat: 5, rabbit: 4, hamster: 5, fish: 5, parrot: 4, guinea_pig: 4, turtle: 5, ferret: 4, hedgehog: 5 } }
    ]
  },
  {
    id: 13,
    category: "practical",
    question: "이미 기르고 있는 반려동물이 있나요?",
    options: [
      { text: "개가 있어요", scores: { dog: 4, cat: 3, rabbit: 2, hamster: 1, fish: 4, parrot: 3, guinea_pig: 2, turtle: 4, ferret: 3, hedgehog: 2 } },
      { text: "고양이가 있어요", scores: { dog: 3, cat: 4, rabbit: 2, hamster: 1, fish: 4, parrot: 2, guinea_pig: 2, turtle: 4, ferret: 2, hedgehog: 2 } },
      { text: "다른 소동물이 있어요", scores: { dog: 3, cat: 3, rabbit: 4, hamster: 5, fish: 4, parrot: 3, guinea_pig: 5, turtle: 4, ferret: 3, hedgehog: 4 } },
      { text: "반려동물이 없어요", scores: { dog: 5, cat: 5, rabbit: 5, hamster: 5, fish: 5, parrot: 5, guinea_pig: 5, turtle: 5, ferret: 5, hedgehog: 5 } }
    ]
  },
  {
    id: 14,
    category: "practical",
    question: "반려동물 케어에 얼마나 많은 시간을 쓸 수 있나요?",
    options: [
      { text: "하루 2시간 이상 (훈련, 놀기, 산책 등)", scores: { dog: 5, cat: 2, rabbit: 3, hamster: 2, fish: 1, parrot: 5, guinea_pig: 3, turtle: 1, ferret: 5, hedgehog: 2 } },
      { text: "하루 1~2시간", scores: { dog: 4, cat: 3, rabbit: 4, hamster: 3, fish: 2, parrot: 4, guinea_pig: 4, turtle: 2, ferret: 4, hedgehog: 3 } },
      { text: "하루 30분~1시간", scores: { dog: 2, cat: 4, rabbit: 4, hamster: 4, fish: 3, parrot: 3, guinea_pig: 4, turtle: 3, ferret: 3, hedgehog: 4 } },
      { text: "하루 30분 이내", scores: { dog: 0, cat: 4, rabbit: 3, hamster: 5, fish: 5, parrot: 1, guinea_pig: 3, turtle: 5, ferret: 1, hedgehog: 5 } }
    ]
  },
  {
    id: 15,
    category: "practical",
    question: "주변 환경(이웃, 집주인 등)의 소음 제한은?",
    options: [
      { text: "전혀 제한 없어요", scores: { dog: 5, cat: 4, rabbit: 4, hamster: 3, fish: 4, parrot: 5, guinea_pig: 4, turtle: 4, ferret: 4, hedgehog: 3 } },
      { text: "약간의 소음은 괜찮아요", scores: { dog: 4, cat: 4, rabbit: 4, hamster: 3, fish: 4, parrot: 3, guinea_pig: 4, turtle: 4, ferret: 4, hedgehog: 3 } },
      { text: "조용해야 해요 (소음에 예민한 환경)", scores: { dog: 2, cat: 4, rabbit: 4, hamster: 4, fish: 5, parrot: 1, guinea_pig: 4, turtle: 5, ferret: 3, hedgehog: 4 } },
      { text: "아무 소리도 안 돼요", scores: { dog: 0, cat: 3, rabbit: 3, hamster: 5, fish: 5, parrot: 0, guinea_pig: 3, turtle: 5, ferret: 2, hedgehog: 5 } }
    ]
  },
  {
    id: 16,
    category: "preference",
    question: "반려동물이 얼마나 애교스럽길 원하나요?",
    options: [
      { text: "항상 붙어다니며 스킨십을 원해요", scores: { dog: 5, cat: 2, rabbit: 3, hamster: 2, fish: 0, parrot: 4, guinea_pig: 4, turtle: 0, ferret: 5, hedgehog: 1 } },
      { text: "어느 정도 애교는 있었으면 해요", scores: { dog: 4, cat: 4, rabbit: 4, hamster: 3, fish: 1, parrot: 4, guinea_pig: 4, turtle: 1, ferret: 4, hedgehog: 3 } },
      { text: "가끔 와줄 때 더 반가운 편이에요", scores: { dog: 2, cat: 5, rabbit: 4, hamster: 3, fish: 2, parrot: 3, guinea_pig: 3, turtle: 2, ferret: 3, hedgehog: 4 } },
      { text: "바라보는 것만으로도 충분해요", scores: { dog: 1, cat: 3, rabbit: 2, hamster: 3, fish: 5, parrot: 2, guinea_pig: 2, turtle: 5, ferret: 2, hedgehog: 4 } }
    ]
  },
  {
    id: 17,
    category: "preference",
    question: "반려동물이 얼마나 독립적이길 원하나요?",
    options: [
      { text: "완전히 독립적 - 혼자서도 잘 지내길 바라요", scores: { dog: 1, cat: 5, rabbit: 2, hamster: 4, fish: 5, parrot: 1, guinea_pig: 2, turtle: 5, ferret: 2, hedgehog: 5 } },
      { text: "대체로 독립적이지만 가끔 관심 원하는 정도", scores: { dog: 2, cat: 5, rabbit: 4, hamster: 4, fish: 4, parrot: 2, guinea_pig: 3, turtle: 4, ferret: 3, hedgehog: 4 } },
      { text: "나와 함께하길 좋아하지만 강요하지 않는 정도", scores: { dog: 4, cat: 4, rabbit: 4, hamster: 3, fish: 2, parrot: 4, guinea_pig: 4, turtle: 2, ferret: 4, hedgehog: 3 } },
      { text: "나만 바라보는 완전 의존형", scores: { dog: 5, cat: 1, rabbit: 3, hamster: 2, fish: 1, parrot: 5, guinea_pig: 3, turtle: 1, ferret: 5, hedgehog: 1 } }
    ]
  },
  {
    id: 18,
    category: "preference",
    question: "반려동물의 수명에 대한 생각은?",
    options: [
      { text: "오래 함께할수록 좋아요 (10년 이상)", scores: { dog: 5, cat: 5, rabbit: 3, hamster: 0, fish: 2, parrot: 5, guinea_pig: 2, turtle: 5, ferret: 2, hedgehog: 1 } },
      { text: "중간 정도면 좋겠어요 (5~10년)", scores: { dog: 4, cat: 4, rabbit: 5, hamster: 1, fish: 3, parrot: 4, guinea_pig: 3, turtle: 4, ferret: 5, hedgehog: 2 } },
      { text: "짧아도 괜찮아요 (2~5년)", scores: { dog: 2, cat: 2, rabbit: 4, hamster: 5, fish: 4, parrot: 2, guinea_pig: 5, turtle: 3, ferret: 4, hedgehog: 5 } },
      { text: "수명보다 지금 함께하는 게 중요해요", scores: { dog: 5, cat: 5, rabbit: 5, hamster: 5, fish: 5, parrot: 5, guinea_pig: 5, turtle: 5, ferret: 5, hedgehog: 5 } }
    ]
  },
  {
    id: 19,
    category: "preference",
    question: "반려동물이 재주나 기술을 배웠으면 하나요?",
    options: [
      { text: "네! 다양한 트릭을 함께 배우고 싶어요", scores: { dog: 5, cat: 2, rabbit: 3, hamster: 1, fish: 0, parrot: 5, guinea_pig: 2, turtle: 0, ferret: 4, hedgehog: 1 } },
      { text: "기본적인 몇 가지는 배웠으면 해요", scores: { dog: 5, cat: 3, rabbit: 4, hamster: 3, fish: 0, parrot: 4, guinea_pig: 3, turtle: 0, ferret: 4, hedgehog: 2 } },
      { text: "자연스러운 행동으로 충분해요", scores: { dog: 3, cat: 5, rabbit: 4, hamster: 4, fish: 4, parrot: 3, guinea_pig: 4, turtle: 5, ferret: 3, hedgehog: 4 } },
      { text: "그냥 있는 것 자체로 충분해요", scores: { dog: 2, cat: 4, rabbit: 3, hamster: 4, fish: 5, parrot: 2, guinea_pig: 3, turtle: 5, ferret: 2, hedgehog: 4 } }
    ]
  },
  {
    id: 20,
    category: "preference",
    question: "반려동물의 위생/청결 관리에 대해 어떻게 생각하나요?",
    options: [
      { text: "매일 케어해도 전혀 문제없어요", scores: { dog: 5, cat: 3, rabbit: 3, hamster: 2, fish: 3, parrot: 4, guinea_pig: 3, turtle: 3, ferret: 2, hedgehog: 3 } },
      { text: "주 2~3회 정도는 할 수 있어요", scores: { dog: 4, cat: 4, rabbit: 4, hamster: 3, fish: 3, parrot: 3, guinea_pig: 4, turtle: 3, ferret: 3, hedgehog: 3 } },
      { text: "최소한만 하고 싶어요", scores: { dog: 2, cat: 5, rabbit: 4, hamster: 4, fish: 4, parrot: 3, guinea_pig: 4, turtle: 4, ferret: 4, hedgehog: 4 } },
      { text: "거의 손이 안 가는 게 좋아요", scores: { dog: 0, cat: 4, rabbit: 3, hamster: 4, fish: 5, parrot: 1, guinea_pig: 3, turtle: 5, ferret: 2, hedgehog: 4 } }
    ]
  },
  {
    id: 21,
    category: "commitment",
    question: "반려동물을 키우는 가장 큰 이유는 무엇인가요?",
    options: [
      { text: "외로움 해소 & 정서적 지지", scores: { dog: 5, cat: 4, rabbit: 4, hamster: 3, fish: 3, parrot: 5, guinea_pig: 4, turtle: 2, ferret: 5, hedgehog: 3 } },
      { text: "운동 파트너 & 활동적인 생활", scores: { dog: 5, cat: 1, rabbit: 3, hamster: 1, fish: 0, parrot: 2, guinea_pig: 2, turtle: 0, ferret: 4, hedgehog: 0 } },
      { text: "힐링 & 스트레스 해소", scores: { dog: 4, cat: 5, rabbit: 4, hamster: 4, fish: 5, parrot: 4, guinea_pig: 4, turtle: 5, ferret: 3, hedgehog: 4 } },
      { text: "새로운 생명 돌보기 & 책임감", scores: { dog: 4, cat: 4, rabbit: 5, hamster: 5, fish: 4, parrot: 4, guinea_pig: 5, turtle: 4, ferret: 4, hedgehog: 4 } }
    ]
  },
  {
    id: 22,
    category: "commitment",
    question: "반려동물이 관심받지 못하면 어떻게 될지 걱정되나요?",
    options: [
      { text: "매우 걱정돼요 - 항상 함께하고 싶어요", scores: { dog: 5, cat: 3, rabbit: 4, hamster: 3, fish: 3, parrot: 5, guinea_pig: 4, turtle: 3, ferret: 5, hedgehog: 3 } },
      { text: "어느 정도 걱정돼요", scores: { dog: 4, cat: 4, rabbit: 4, hamster: 4, fish: 3, parrot: 4, guinea_pig: 4, turtle: 3, ferret: 4, hedgehog: 4 } },
      { text: "필요한 케어만 제공하면 될 것 같아요", scores: { dog: 2, cat: 5, rabbit: 3, hamster: 4, fish: 4, parrot: 2, guinea_pig: 3, turtle: 5, ferret: 2, hedgehog: 5 } },
      { text: "별로 걱정 안 돼요 - 동물은 알아서 잘 지내요", scores: { dog: 0, cat: 4, rabbit: 2, hamster: 3, fish: 5, parrot: 0, guinea_pig: 2, turtle: 5, ferret: 0, hedgehog: 4 } }
    ]
  },
  {
    id: 23,
    category: "commitment",
    question: "반려동물 관련 공부나 정보 수집에 시간을 쓸 의향이 있나요?",
    options: [
      { text: "네, 많은 것을 배우고 싶어요", scores: { dog: 4, cat: 3, rabbit: 4, hamster: 3, fish: 4, parrot: 5, guinea_pig: 4, turtle: 4, ferret: 4, hedgehog: 4 } },
      { text: "기본적인 것은 공부할 게요", scores: { dog: 4, cat: 4, rabbit: 4, hamster: 4, fish: 3, parrot: 4, guinea_pig: 4, turtle: 4, ferret: 4, hedgehog: 4 } },
      { text: "필요할 때만 찾아볼 것 같아요", scores: { dog: 3, cat: 4, rabbit: 3, hamster: 4, fish: 4, parrot: 2, guinea_pig: 3, turtle: 4, ferret: 3, hedgehog: 4 } },
      { text: "본능적으로 키울 수 있을 것 같아요", scores: { dog: 2, cat: 4, rabbit: 2, hamster: 3, fish: 3, parrot: 1, guinea_pig: 2, turtle: 3, ferret: 2, hedgehog: 3 } }
    ]
  },
  {
    id: 24,
    category: "commitment",
    question: "예상치 못한 의료비나 비용이 발생하면?",
    options: [
      { text: "아무리 비싸도 최선을 다할 거예요", scores: { dog: 5, cat: 5, rabbit: 5, hamster: 3, fish: 2, parrot: 5, guinea_pig: 4, turtle: 4, ferret: 5, hedgehog: 3 } },
      { text: "합리적인 수준에서 최선을 다할 거예요", scores: { dog: 4, cat: 4, rabbit: 4, hamster: 4, fish: 3, parrot: 4, guinea_pig: 4, turtle: 4, ferret: 4, hedgehog: 4 } },
      { text: "어느 정도는 감당할 수 있어요", scores: { dog: 3, cat: 3, rabbit: 3, hamster: 4, fish: 4, parrot: 3, guinea_pig: 3, turtle: 3, ferret: 3, hedgehog: 4 } },
      { text: "큰 비용은 부담이 돼요", scores: { dog: 1, cat: 2, rabbit: 2, hamster: 5, fish: 5, parrot: 1, guinea_pig: 3, turtle: 3, ferret: 2, hedgehog: 4 } }
    ]
  },
  {
    id: 25,
    category: "commitment",
    question: "반려동물에게 가장 중요하게 생각하는 것은?",
    options: [
      { text: "감정적 유대 - 서로 깊이 이해하고 교감하기", scores: { dog: 5, cat: 4, rabbit: 3, hamster: 2, fish: 1, parrot: 5, guinea_pig: 3, turtle: 1, ferret: 5, hedgehog: 2 } },
      { text: "신뢰 - 나를 믿고 안정적으로 지내는 것", scores: { dog: 4, cat: 4, rabbit: 5, hamster: 4, fish: 3, parrot: 4, guinea_pig: 5, turtle: 4, ferret: 4, hedgehog: 4 } },
      { text: "자유 - 본연의 행동을 할 수 있는 환경", scores: { dog: 3, cat: 5, rabbit: 4, hamster: 4, fish: 5, parrot: 3, guinea_pig: 3, turtle: 5, ferret: 3, hedgehog: 5 } },
      { text: "행복 - 풍요롭고 즐거운 삶을 누리게 하기", scores: { dog: 5, cat: 4, rabbit: 4, hamster: 4, fish: 4, parrot: 5, guinea_pig: 4, turtle: 4, ferret: 5, hedgehog: 4 } }
    ]
  }
];
