module.exports = function diagnose(prakriti, symptoms, lifestyle) {
  const vataSymptoms = ['dry skin', 'constipation', 'joint pain', 'anxiety', 'insomnia'];
  const pittaSymptoms = ['acidity', 'inflammation', 'anger', 'rashes', 'sweating'];
  const kaphaSymptoms = ['lethargy', 'indigestion', 'weight gain', 'congestion', 'sluggishness'];

  let vataScore = 0, pittaScore = 0, kaphaScore = 0;

  symptoms.forEach(symptom => {
    if (vataSymptoms.includes(symptom)) vataScore++;
    if (pittaSymptoms.includes(symptom)) pittaScore++;
    if (kaphaSymptoms.includes(symptom)) kaphaScore++;
  });

  const scores = { vata: vataScore, pitta: pittaScore, kapha: kaphaScore };
  const dominant = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);

  if (scores[dominant] === 0) {
    return { imbalance: null, message: 'Could not detect a dosha imbalance.' };
  }

  const suggestions = {
    vata: {
      foods: ['Warm soups', 'Cooked grains', 'Nuts', 'Ghee', 'Root vegetables'],
      yoga: ['Hatha yoga', 'Slow sun salutations', 'Grounding poses'],
      tip: 'Stick to regular meals, keep warm, and avoid cold/raw foods.'
    },
    pitta: {
      foods: ['Cooling fruits', 'Coconut water', 'Leafy greens', 'Bitter vegetables'],
      yoga: ['Cooling pranayama', 'Twists', 'Moon salutation'],
      tip: 'Avoid heat, spicy food, and intense workouts.'
    },
    kapha: {
      foods: ['Light grains', 'Spices like ginger', 'Legumes', 'Steamed greens'],
      yoga: ['Vinyasa flow', 'Fast sun salutations', 'Backbends'],
      tip: 'Stay active, eat light, and avoid oily, heavy meals.'
    }
  };

  return {
    imbalance: dominant,
    prakriti: prakriti,
    message: `${dominant.toUpperCase()} imbalance detected.`,
    foods: suggestions[dominant].foods,
    yoga: suggestions[dominant].yoga,
    tip: suggestions[dominant].tip
  };
};



