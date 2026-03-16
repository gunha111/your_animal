const QUESTIONS = [
  {
    id: 1,
    category: "lifestyle",
    question: "How much time do you typically spend at home each day?",
    options: [
      { text: "Almost always home (8+ hours)", scores: { dog: 5, cat: 3, rabbit: 4, hamster: 3, fish: 2, parrot: 5, guinea_pig: 4, turtle: 3, ferret: 5, hedgehog: 2 } },
      { text: "Mostly home (5–8 hours)", scores: { dog: 4, cat: 4, rabbit: 3, hamster: 3, fish: 3, parrot: 3, guinea_pig: 3, turtle: 3, ferret: 3, hedgehog: 3 } },
      { text: "Out more than I'm home (2–5 hours)", scores: { dog: 2, cat: 5, rabbit: 3, hamster: 4, fish: 4, parrot: 2, guinea_pig: 3, turtle: 4, ferret: 2, hedgehog: 4 } },
      { text: "Rarely home (under 2 hours)", scores: { dog: 0, cat: 4, rabbit: 2, hamster: 4, fish: 5, parrot: 0, guinea_pig: 2, turtle: 5, ferret: 0, hedgehog: 4 } }
    ]
  },
  {
    id: 2,
    category: "lifestyle",
    question: "What kind of home do you live in?",
    options: [
      { text: "Small studio or one-bedroom apartment", scores: { dog: 1, cat: 5, rabbit: 2, hamster: 5, fish: 5, parrot: 2, guinea_pig: 3, turtle: 4, ferret: 2, hedgehog: 4 } },
      { text: "Mid-size apartment", scores: { dog: 3, cat: 5, rabbit: 4, hamster: 4, fish: 4, parrot: 3, guinea_pig: 4, turtle: 4, ferret: 3, hedgehog: 4 } },
      { text: "Spacious apartment or townhouse", scores: { dog: 4, cat: 4, rabbit: 5, hamster: 3, fish: 3, parrot: 4, guinea_pig: 4, turtle: 3, ferret: 5, hedgehog: 3 } },
      { text: "House with a yard", scores: { dog: 5, cat: 4, rabbit: 5, hamster: 2, fish: 2, parrot: 3, guinea_pig: 5, turtle: 3, ferret: 5, hedgehog: 3 } }
    ]
  },
  {
    id: 3,
    category: "lifestyle",
    question: "How often do you travel or go on trips?",
    options: [
      { text: "Rarely — once or twice a year", scores: { dog: 5, cat: 4, rabbit: 4, hamster: 3, fish: 3, parrot: 5, guinea_pig: 4, turtle: 3, ferret: 5, hedgehog: 3 } },
      { text: "Occasionally — once a month", scores: { dog: 3, cat: 5, rabbit: 3, hamster: 4, fish: 4, parrot: 3, guinea_pig: 3, turtle: 4, ferret: 3, hedgehog: 4 } },
      { text: "Often — about once a week", scores: { dog: 1, cat: 4, rabbit: 2, hamster: 4, fish: 5, parrot: 1, guinea_pig: 2, turtle: 5, ferret: 1, hedgehog: 4 } },
      { text: "Very often — away most weekends", scores: { dog: 0, cat: 3, rabbit: 1, hamster: 4, fish: 5, parrot: 0, guinea_pig: 1, turtle: 5, ferret: 0, hedgehog: 3 } }
    ]
  },
  {
    id: 4,
    category: "lifestyle",
    question: "How much do you exercise or spend time outdoors each day?",
    options: [
      { text: "Very active — 1+ hour of exercise daily", scores: { dog: 5, cat: 2, rabbit: 3, hamster: 1, fish: 1, parrot: 2, guinea_pig: 2, turtle: 1, ferret: 4, hedgehog: 1 } },
      { text: "Moderately active — 3–4 times a week", scores: { dog: 4, cat: 3, rabbit: 4, hamster: 2, fish: 2, parrot: 3, guinea_pig: 3, turtle: 2, ferret: 4, hedgehog: 2 } },
      { text: "Light activity — 1–2 times a week", scores: { dog: 3, cat: 4, rabbit: 4, hamster: 3, fish: 3, parrot: 3, guinea_pig: 4, turtle: 3, ferret: 3, hedgehog: 3 } },
      { text: "Not very active — I prefer staying in", scores: { dog: 1, cat: 5, rabbit: 3, hamster: 4, fish: 5, parrot: 3, guinea_pig: 3, turtle: 5, ferret: 1, hedgehog: 4 } }
    ]
  },
  {
    id: 5,
    category: "lifestyle",
    question: "How much can you spend on a pet per month?",
    options: [
      { text: "Under $50", scores: { dog: 0, cat: 2, rabbit: 3, hamster: 5, fish: 5, parrot: 0, guinea_pig: 4, turtle: 4, ferret: 2, hedgehog: 4 } },
      { text: "$50–$120", scores: { dog: 2, cat: 4, rabbit: 5, hamster: 4, fish: 4, parrot: 3, guinea_pig: 5, turtle: 4, ferret: 4, hedgehog: 4 } },
      { text: "$120–$250", scores: { dog: 4, cat: 4, rabbit: 4, hamster: 3, fish: 3, parrot: 4, guinea_pig: 4, turtle: 3, ferret: 4, hedgehog: 3 } },
      { text: "$250+ — money is not the main concern", scores: { dog: 5, cat: 4, rabbit: 3, hamster: 2, fish: 2, parrot: 5, guinea_pig: 3, turtle: 2, ferret: 5, hedgehog: 2 } }
    ]
  },
  {
    id: 6,
    category: "personality",
    question: "How would you best describe your personality?",
    options: [
      { text: "Outgoing and sociable — I love being around people", scores: { dog: 5, cat: 2, rabbit: 3, hamster: 2, fish: 1, parrot: 5, guinea_pig: 3, turtle: 1, ferret: 5, hedgehog: 1 } },
      { text: "Calm and independent — I value my alone time", scores: { dog: 2, cat: 5, rabbit: 3, hamster: 4, fish: 4, parrot: 2, guinea_pig: 3, turtle: 5, ferret: 2, hedgehog: 5 } },
      { text: "Warm and nurturing — I love taking care of others", scores: { dog: 4, cat: 3, rabbit: 5, hamster: 3, fish: 2, parrot: 4, guinea_pig: 5, turtle: 2, ferret: 4, hedgehog: 3 } },
      { text: "Observant and analytical — I enjoy watching and thinking", scores: { dog: 2, cat: 4, rabbit: 3, hamster: 3, fish: 5, parrot: 3, guinea_pig: 3, turtle: 5, ferret: 3, hedgehog: 4 } }
    ]
  },
  {
    id: 7,
    category: "personality",
    question: "What kind of relationship do you want with your pet?",
    options: [
      { text: "Best friends — always together, always communicating", scores: { dog: 5, cat: 3, rabbit: 4, hamster: 2, fish: 1, parrot: 5, guinea_pig: 4, turtle: 1, ferret: 5, hedgehog: 2 } },
      { text: "Respectful partners — sharing space without smothering", scores: { dog: 3, cat: 5, rabbit: 4, hamster: 3, fish: 3, parrot: 3, guinea_pig: 4, turtle: 3, ferret: 3, hedgehog: 4 } },
      { text: "Parent and child — nurturing and watching them grow", scores: { dog: 4, cat: 4, rabbit: 5, hamster: 5, fish: 3, parrot: 4, guinea_pig: 5, turtle: 4, ferret: 4, hedgehog: 4 } },
      { text: "Peaceful coexistence — just watching them is enough", scores: { dog: 1, cat: 3, rabbit: 2, hamster: 3, fish: 5, parrot: 2, guinea_pig: 2, turtle: 5, ferret: 2, hedgehog: 3 } }
    ]
  },
  {
    id: 8,
    category: "personality",
    question: "When you're stressed, how do you usually unwind?",
    options: [
      { text: "Physical exercise or getting outside", scores: { dog: 5, cat: 2, rabbit: 3, hamster: 1, fish: 1, parrot: 3, guinea_pig: 2, turtle: 1, ferret: 5, hedgehog: 1 } },
      { text: "Quiet time alone", scores: { dog: 1, cat: 5, rabbit: 3, hamster: 4, fish: 5, parrot: 1, guinea_pig: 2, turtle: 5, ferret: 1, hedgehog: 5 } },
      { text: "Being around someone (including a pet)", scores: { dog: 5, cat: 3, rabbit: 4, hamster: 3, fish: 2, parrot: 5, guinea_pig: 4, turtle: 2, ferret: 4, hedgehog: 2 } },
      { text: "A hobby or learning something new", scores: { dog: 3, cat: 3, rabbit: 3, hamster: 3, fish: 4, parrot: 4, guinea_pig: 3, turtle: 4, ferret: 4, hedgehog: 3 } }
    ]
  },
  {
    id: 9,
    category: "personality",
    question: "Are you a morning person or a night owl?",
    options: [
      { text: "Total morning person — up early, in bed early", scores: { dog: 5, cat: 3, rabbit: 4, hamster: 1, fish: 3, parrot: 4, guinea_pig: 4, turtle: 3, ferret: 3, hedgehog: 1 } },
      { text: "Leaning morning", scores: { dog: 4, cat: 4, rabbit: 4, hamster: 2, fish: 3, parrot: 3, guinea_pig: 4, turtle: 3, ferret: 3, hedgehog: 2 } },
      { text: "Leaning night owl", scores: { dog: 3, cat: 4, rabbit: 3, hamster: 4, fish: 3, parrot: 3, guinea_pig: 3, turtle: 3, ferret: 4, hedgehog: 4 } },
      { text: "Total night owl — late nights are my thing", scores: { dog: 2, cat: 5, rabbit: 2, hamster: 5, fish: 3, parrot: 1, guinea_pig: 2, turtle: 3, ferret: 5, hedgehog: 5 } }
    ]
  },
  {
    id: 10,
    category: "personality",
    question: "How patient are you in general?",
    options: [
      { text: "Very patient — I can focus on something for a long time", scores: { dog: 4, cat: 3, rabbit: 4, hamster: 3, fish: 5, parrot: 5, guinea_pig: 3, turtle: 5, ferret: 3, hedgehog: 4 } },
      { text: "Fairly patient — I can wait when I need to", scores: { dog: 4, cat: 4, rabbit: 4, hamster: 4, fish: 3, parrot: 3, guinea_pig: 4, turtle: 4, ferret: 4, hedgehog: 4 } },
      { text: "Somewhat impatient — I like quick feedback", scores: { dog: 3, cat: 4, rabbit: 3, hamster: 4, fish: 2, parrot: 4, guinea_pig: 3, turtle: 2, ferret: 4, hedgehog: 3 } },
      { text: "Not very patient — I love instant interaction", scores: { dog: 5, cat: 3, rabbit: 3, hamster: 3, fish: 1, parrot: 4, guinea_pig: 3, turtle: 1, ferret: 5, hedgehog: 2 } }
    ]
  },
  {
    id: 11,
    category: "practical",
    question: "Do you have any allergies or health sensitivities?",
    options: [
      { text: "I'm allergic to pet fur or dander", scores: { dog: 0, cat: 0, rabbit: 0, hamster: 0, fish: 5, parrot: 3, guinea_pig: 0, turtle: 5, ferret: 0, hedgehog: 2 } },
      { text: "Mild allergy — hypoallergenic breeds might work", scores: { dog: 3, cat: 3, rabbit: 2, hamster: 2, fish: 5, parrot: 4, guinea_pig: 2, turtle: 5, ferret: 2, hedgehog: 3 } },
      { text: "No allergies, but I'm sensitive about cleanliness", scores: { dog: 3, cat: 4, rabbit: 3, hamster: 3, fish: 5, parrot: 3, guinea_pig: 3, turtle: 5, ferret: 2, hedgehog: 4 } },
      { text: "No issues at all", scores: { dog: 5, cat: 5, rabbit: 5, hamster: 5, fish: 5, parrot: 5, guinea_pig: 5, turtle: 5, ferret: 5, hedgehog: 5 } }
    ]
  },
  {
    id: 12,
    category: "practical",
    question: "Do you have young children or other family members at home?",
    options: [
      { text: "Young children under 6", scores: { dog: 4, cat: 3, rabbit: 2, hamster: 2, fish: 4, parrot: 2, guinea_pig: 4, turtle: 3, ferret: 1, hedgehog: 1 } },
      { text: "Children aged 7 and older", scores: { dog: 5, cat: 4, rabbit: 4, hamster: 4, fish: 3, parrot: 4, guinea_pig: 5, turtle: 3, ferret: 3, hedgehog: 3 } },
      { text: "Adults only in the household", scores: { dog: 5, cat: 5, rabbit: 5, hamster: 5, fish: 5, parrot: 5, guinea_pig: 5, turtle: 5, ferret: 5, hedgehog: 5 } },
      { text: "I live alone", scores: { dog: 4, cat: 5, rabbit: 4, hamster: 5, fish: 5, parrot: 4, guinea_pig: 4, turtle: 5, ferret: 4, hedgehog: 5 } }
    ]
  },
  {
    id: 13,
    category: "practical",
    question: "Do you already have other pets at home?",
    options: [
      { text: "Yes, a dog", scores: { dog: 4, cat: 3, rabbit: 2, hamster: 1, fish: 4, parrot: 3, guinea_pig: 2, turtle: 4, ferret: 3, hedgehog: 2 } },
      { text: "Yes, a cat", scores: { dog: 3, cat: 4, rabbit: 2, hamster: 1, fish: 4, parrot: 2, guinea_pig: 2, turtle: 4, ferret: 2, hedgehog: 2 } },
      { text: "Yes, a small animal", scores: { dog: 3, cat: 3, rabbit: 4, hamster: 5, fish: 4, parrot: 3, guinea_pig: 5, turtle: 4, ferret: 3, hedgehog: 4 } },
      { text: "No pets currently", scores: { dog: 5, cat: 5, rabbit: 5, hamster: 5, fish: 5, parrot: 5, guinea_pig: 5, turtle: 5, ferret: 5, hedgehog: 5 } }
    ]
  },
  {
    id: 14,
    category: "practical",
    question: "How much time can you dedicate to pet care daily?",
    options: [
      { text: "2+ hours (training, play, walks, etc.)", scores: { dog: 5, cat: 2, rabbit: 3, hamster: 2, fish: 1, parrot: 5, guinea_pig: 3, turtle: 1, ferret: 5, hedgehog: 2 } },
      { text: "1–2 hours a day", scores: { dog: 4, cat: 3, rabbit: 4, hamster: 3, fish: 2, parrot: 4, guinea_pig: 4, turtle: 2, ferret: 4, hedgehog: 3 } },
      { text: "30 minutes to 1 hour", scores: { dog: 2, cat: 4, rabbit: 4, hamster: 4, fish: 3, parrot: 3, guinea_pig: 4, turtle: 3, ferret: 3, hedgehog: 4 } },
      { text: "Under 30 minutes", scores: { dog: 0, cat: 4, rabbit: 3, hamster: 5, fish: 5, parrot: 1, guinea_pig: 3, turtle: 5, ferret: 1, hedgehog: 5 } }
    ]
  },
  {
    id: 15,
    category: "practical",
    question: "What are the noise restrictions in your living situation?",
    options: [
      { text: "No restrictions at all", scores: { dog: 5, cat: 4, rabbit: 4, hamster: 3, fish: 4, parrot: 5, guinea_pig: 4, turtle: 4, ferret: 4, hedgehog: 3 } },
      { text: "Some noise is fine", scores: { dog: 4, cat: 4, rabbit: 4, hamster: 3, fish: 4, parrot: 3, guinea_pig: 4, turtle: 4, ferret: 4, hedgehog: 3 } },
      { text: "Need to keep it pretty quiet", scores: { dog: 2, cat: 4, rabbit: 4, hamster: 4, fish: 5, parrot: 1, guinea_pig: 4, turtle: 5, ferret: 3, hedgehog: 4 } },
      { text: "Completely silent — strict noise rules", scores: { dog: 0, cat: 3, rabbit: 3, hamster: 5, fish: 5, parrot: 0, guinea_pig: 3, turtle: 5, ferret: 2, hedgehog: 5 } }
    ]
  },
  {
    id: 16,
    category: "preference",
    question: "How affectionate do you want your pet to be?",
    options: [
      { text: "Very — always nearby, loves physical contact", scores: { dog: 5, cat: 2, rabbit: 3, hamster: 2, fish: 0, parrot: 4, guinea_pig: 4, turtle: 0, ferret: 5, hedgehog: 1 } },
      { text: "Fairly affectionate — some regular bonding time", scores: { dog: 4, cat: 4, rabbit: 4, hamster: 3, fish: 1, parrot: 4, guinea_pig: 4, turtle: 1, ferret: 4, hedgehog: 3 } },
      { text: "Occasionally — sweeter when it's their idea", scores: { dog: 2, cat: 5, rabbit: 4, hamster: 3, fish: 2, parrot: 3, guinea_pig: 3, turtle: 2, ferret: 3, hedgehog: 4 } },
      { text: "Just watching them is enough for me", scores: { dog: 1, cat: 3, rabbit: 2, hamster: 3, fish: 5, parrot: 2, guinea_pig: 2, turtle: 5, ferret: 2, hedgehog: 4 } }
    ]
  },
  {
    id: 17,
    category: "preference",
    question: "How independent do you want your pet to be?",
    options: [
      { text: "Fully independent — happy doing their own thing", scores: { dog: 1, cat: 5, rabbit: 2, hamster: 4, fish: 5, parrot: 1, guinea_pig: 2, turtle: 5, ferret: 2, hedgehog: 5 } },
      { text: "Mostly independent but occasionally wants attention", scores: { dog: 2, cat: 5, rabbit: 4, hamster: 4, fish: 4, parrot: 2, guinea_pig: 3, turtle: 4, ferret: 3, hedgehog: 4 } },
      { text: "Enjoys being with me but doesn't demand it", scores: { dog: 4, cat: 4, rabbit: 4, hamster: 3, fish: 2, parrot: 4, guinea_pig: 4, turtle: 2, ferret: 4, hedgehog: 3 } },
      { text: "Totally devoted — needs me and only me", scores: { dog: 5, cat: 1, rabbit: 3, hamster: 2, fish: 1, parrot: 5, guinea_pig: 3, turtle: 1, ferret: 5, hedgehog: 1 } }
    ]
  },
  {
    id: 18,
    category: "preference",
    question: "How long do you want to share your life with a pet?",
    options: [
      { text: "The longer the better — 10+ years is ideal", scores: { dog: 5, cat: 5, rabbit: 3, hamster: 0, fish: 2, parrot: 5, guinea_pig: 2, turtle: 5, ferret: 2, hedgehog: 1 } },
      { text: "A medium commitment — 5–10 years", scores: { dog: 4, cat: 4, rabbit: 5, hamster: 1, fish: 3, parrot: 4, guinea_pig: 3, turtle: 4, ferret: 5, hedgehog: 2 } },
      { text: "A shorter commitment is okay — 2–5 years", scores: { dog: 2, cat: 2, rabbit: 4, hamster: 5, fish: 4, parrot: 2, guinea_pig: 5, turtle: 3, ferret: 4, hedgehog: 5 } },
      { text: "Lifespan doesn't matter — I just want to enjoy the now", scores: { dog: 5, cat: 5, rabbit: 5, hamster: 5, fish: 5, parrot: 5, guinea_pig: 5, turtle: 5, ferret: 5, hedgehog: 5 } }
    ]
  },
  {
    id: 19,
    category: "preference",
    question: "Do you want to teach your pet tricks or skills?",
    options: [
      { text: "Absolutely — I want to learn tons of tricks together", scores: { dog: 5, cat: 2, rabbit: 3, hamster: 1, fish: 0, parrot: 5, guinea_pig: 2, turtle: 0, ferret: 4, hedgehog: 1 } },
      { text: "A few basics would be nice", scores: { dog: 5, cat: 3, rabbit: 4, hamster: 3, fish: 0, parrot: 4, guinea_pig: 3, turtle: 0, ferret: 4, hedgehog: 2 } },
      { text: "Natural behavior is enough for me", scores: { dog: 3, cat: 5, rabbit: 4, hamster: 4, fish: 4, parrot: 3, guinea_pig: 4, turtle: 5, ferret: 3, hedgehog: 4 } },
      { text: "Just existing is more than enough", scores: { dog: 2, cat: 4, rabbit: 3, hamster: 4, fish: 5, parrot: 2, guinea_pig: 3, turtle: 5, ferret: 2, hedgehog: 4 } }
    ]
  },
  {
    id: 20,
    category: "preference",
    question: "How much grooming and hygiene care are you willing to do?",
    options: [
      { text: "Daily grooming is totally fine with me", scores: { dog: 5, cat: 3, rabbit: 3, hamster: 2, fish: 3, parrot: 4, guinea_pig: 3, turtle: 3, ferret: 2, hedgehog: 3 } },
      { text: "A few times a week — that's manageable", scores: { dog: 4, cat: 4, rabbit: 4, hamster: 3, fish: 3, parrot: 3, guinea_pig: 4, turtle: 3, ferret: 3, hedgehog: 3 } },
      { text: "I'd rather keep it minimal", scores: { dog: 2, cat: 5, rabbit: 4, hamster: 4, fish: 4, parrot: 3, guinea_pig: 4, turtle: 4, ferret: 4, hedgehog: 4 } },
      { text: "As hands-off as possible, please", scores: { dog: 0, cat: 4, rabbit: 3, hamster: 4, fish: 5, parrot: 1, guinea_pig: 3, turtle: 5, ferret: 2, hedgehog: 4 } }
    ]
  },
  {
    id: 21,
    category: "commitment",
    question: "What's your main reason for wanting a pet?",
    options: [
      { text: "Companionship — I want emotional support and connection", scores: { dog: 5, cat: 4, rabbit: 4, hamster: 3, fish: 3, parrot: 5, guinea_pig: 4, turtle: 2, ferret: 5, hedgehog: 3 } },
      { text: "Activity partner — I want to be more active and outdoorsy", scores: { dog: 5, cat: 1, rabbit: 3, hamster: 1, fish: 0, parrot: 2, guinea_pig: 2, turtle: 0, ferret: 4, hedgehog: 0 } },
      { text: "Stress relief — I need a calming presence in my life", scores: { dog: 4, cat: 5, rabbit: 4, hamster: 4, fish: 5, parrot: 4, guinea_pig: 4, turtle: 5, ferret: 3, hedgehog: 4 } },
      { text: "Responsibility — I want the experience of caring for a life", scores: { dog: 4, cat: 4, rabbit: 5, hamster: 5, fish: 4, parrot: 4, guinea_pig: 5, turtle: 4, ferret: 4, hedgehog: 4 } }
    ]
  },
  {
    id: 22,
    category: "commitment",
    question: "How worried would you be if your pet didn't get enough attention?",
    options: [
      { text: "Very worried — I want to always be there for them", scores: { dog: 5, cat: 3, rabbit: 4, hamster: 3, fish: 3, parrot: 5, guinea_pig: 4, turtle: 3, ferret: 5, hedgehog: 3 } },
      { text: "Moderately worried", scores: { dog: 4, cat: 4, rabbit: 4, hamster: 4, fish: 3, parrot: 4, guinea_pig: 4, turtle: 3, ferret: 4, hedgehog: 4 } },
      { text: "As long as basic needs are met, they'll be fine", scores: { dog: 2, cat: 5, rabbit: 3, hamster: 4, fish: 4, parrot: 2, guinea_pig: 3, turtle: 5, ferret: 2, hedgehog: 5 } },
      { text: "Not too worried — animals are resilient", scores: { dog: 0, cat: 4, rabbit: 2, hamster: 3, fish: 5, parrot: 0, guinea_pig: 2, turtle: 5, ferret: 0, hedgehog: 4 } }
    ]
  },
  {
    id: 23,
    category: "commitment",
    question: "Are you willing to research and learn about pet care?",
    options: [
      { text: "Absolutely — I want to know everything", scores: { dog: 4, cat: 3, rabbit: 4, hamster: 3, fish: 4, parrot: 5, guinea_pig: 4, turtle: 4, ferret: 4, hedgehog: 4 } },
      { text: "Yes — I'll learn the basics for sure", scores: { dog: 4, cat: 4, rabbit: 4, hamster: 4, fish: 3, parrot: 4, guinea_pig: 4, turtle: 4, ferret: 4, hedgehog: 4 } },
      { text: "I'll look things up when I need to", scores: { dog: 3, cat: 4, rabbit: 3, hamster: 4, fish: 4, parrot: 2, guinea_pig: 3, turtle: 4, ferret: 3, hedgehog: 4 } },
      { text: "I'd rather just figure it out instinctively", scores: { dog: 2, cat: 4, rabbit: 2, hamster: 3, fish: 3, parrot: 1, guinea_pig: 2, turtle: 3, ferret: 2, hedgehog: 3 } }
    ]
  },
  {
    id: 24,
    category: "commitment",
    question: "If your pet had an unexpected vet bill, how would you handle it?",
    options: [
      { text: "No matter the cost — I'll do whatever it takes", scores: { dog: 5, cat: 5, rabbit: 5, hamster: 3, fish: 2, parrot: 5, guinea_pig: 4, turtle: 4, ferret: 5, hedgehog: 3 } },
      { text: "I'll do my best within a reasonable budget", scores: { dog: 4, cat: 4, rabbit: 4, hamster: 4, fish: 3, parrot: 4, guinea_pig: 4, turtle: 4, ferret: 4, hedgehog: 4 } },
      { text: "I could handle moderate costs", scores: { dog: 3, cat: 3, rabbit: 3, hamster: 4, fish: 4, parrot: 3, guinea_pig: 3, turtle: 3, ferret: 3, hedgehog: 4 } },
      { text: "Large unexpected bills would be a real challenge", scores: { dog: 1, cat: 2, rabbit: 2, hamster: 5, fish: 5, parrot: 1, guinea_pig: 3, turtle: 3, ferret: 2, hedgehog: 4 } }
    ]
  },
  {
    id: 25,
    category: "commitment",
    question: "What matters most to you in the relationship with your pet?",
    options: [
      { text: "Emotional bond — deep understanding and connection", scores: { dog: 5, cat: 4, rabbit: 3, hamster: 2, fish: 1, parrot: 5, guinea_pig: 3, turtle: 1, ferret: 5, hedgehog: 2 } },
      { text: "Trust — feeling secure and at ease together", scores: { dog: 4, cat: 4, rabbit: 5, hamster: 4, fish: 3, parrot: 4, guinea_pig: 5, turtle: 4, ferret: 4, hedgehog: 4 } },
      { text: "Freedom — letting them live naturally and happily", scores: { dog: 3, cat: 5, rabbit: 4, hamster: 4, fish: 5, parrot: 3, guinea_pig: 3, turtle: 5, ferret: 3, hedgehog: 5 } },
      { text: "Happiness — giving them a rich, joyful life", scores: { dog: 5, cat: 4, rabbit: 4, hamster: 4, fish: 4, parrot: 5, guinea_pig: 4, turtle: 4, ferret: 5, hedgehog: 4 } }
    ]
  }
];
