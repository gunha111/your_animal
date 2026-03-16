function calculateResults(answers) {
  const scores = {
    dog: 0, cat: 0, rabbit: 0, hamster: 0, fish: 0,
    parrot: 0, guinea_pig: 0, turtle: 0, ferret: 0, hedgehog: 0
  };
  const maxPossible = {
    dog: 0, cat: 0, rabbit: 0, hamster: 0, fish: 0,
    parrot: 0, guinea_pig: 0, turtle: 0, ferret: 0, hedgehog: 0
  };

  answers.forEach(({ questionId, optionIndex }) => {
    const question = QUESTIONS.find(q => q.id === questionId);
    if (!question) return;
    const option = question.options[optionIndex];
    if (!option) return;

    Object.keys(scores).forEach(pet => {
      scores[pet] += option.scores[pet] || 0;
    });

    // Track max possible score per question
    question.options.forEach(opt => {
      Object.keys(maxPossible).forEach(pet => {
        const val = opt.scores[pet] || 0;
        // We just accumulate to compare ratios - use max per question
      });
    });
  });

  // Calculate max possible for each pet (sum of max score per question)
  const maxScores = {};
  Object.keys(scores).forEach(pet => {
    let max = 0;
    QUESTIONS.forEach(question => {
      const questionMax = Math.max(...question.options.map(opt => opt.scores[pet] || 0));
      max += questionMax;
    });
    maxScores[pet] = max;
  });

  // Calculate percentage match
  const results = Object.keys(scores).map(pet => ({
    pet,
    score: scores[pet],
    maxScore: maxScores[pet],
    percentage: Math.round((scores[pet] / maxScores[pet]) * 100)
  }));

  // Sort by percentage descending
  results.sort((a, b) => b.percentage - a.percentage);

  return results;
}

function getMatchLabel(percentage) {
  if (percentage >= 90) return { label: "완벽한 매칭", color: "#10B981", star: "⭐⭐⭐⭐⭐" };
  if (percentage >= 80) return { label: "매우 잘 맞아요", color: "#3B82F6", star: "⭐⭐⭐⭐" };
  if (percentage >= 70) return { label: "잘 맞아요", color: "#8B5CF6", star: "⭐⭐⭐" };
  if (percentage >= 60) return { label: "나쁘지 않아요", color: "#F59E0B", star: "⭐⭐" };
  return { label: "고려해보세요", color: "#6B7280", star: "⭐" };
}
