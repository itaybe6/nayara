const CRISIS_KEYWORDS = [
  // Hebrew crisis indicators
  'לפגוע בעצמי', 'להרוג את עצמי', 'לא רוצה לחיות', 'לגמור עם החיים', 
  'מוות', 'למות', 'להתאבד', 'אבדה תקווה', 'כלום לא עוזר',
  'לא שווה', 'מיותר', 'נמאס לי מהכל', 'אין טעם',
  
  // English crisis indicators  
  'harm myself', 'kill myself', 'want to die', 'end it all', 'suicide',
  'not worth living', 'give up', 'hopeless', 'better off dead',
  'end the pain', 'can\'t go on', 'want out'
];

const MEDICAL_ADVICE_KEYWORDS = [
  // Hebrew medical advice requests
  'כמה לקחת', 'מינון', 'איך לקחת תרופה', 'מתי לקחת', 'האם לקחת',
  'לא לקחת תרופה', 'להפסיק תרופה', 'להחליף תרופה', 'תרופה חדשה',
  'כמות התרופה', 'תדירות', 'לשלב תרופות',
  
  // English medical advice requests
  'how much to take', 'dosage', 'medication dose', 'when to take medication',
  'should I take', 'stop taking medication', 'change medication', 'new medication',
  'drug interaction', 'side effect medication', 'reduce dose'
];

export interface ModerationResult {
  isCrisis: boolean;
  isMedicalAdvice: boolean;
  shouldFlag: boolean;
  flaggedWords: string[];
  severity: 'low' | 'medium' | 'high';
}

export function moderateMessage(message: string): ModerationResult {
  const lowerMessage = message.toLowerCase();
  
  const crisisWords = CRISIS_KEYWORDS.filter(keyword => 
    lowerMessage.includes(keyword.toLowerCase())
  );
  
  const medicalWords = MEDICAL_ADVICE_KEYWORDS.filter(keyword => 
    lowerMessage.includes(keyword.toLowerCase())
  );
  
  const isCrisis = crisisWords.length > 0;
  const isMedicalAdvice = medicalWords.length > 0;
  
  // Determine severity
  let severity: 'low' | 'medium' | 'high' = 'low';
  if (isCrisis) severity = 'high';
  else if (isMedicalAdvice) severity = 'medium';
  
  return {
    isCrisis,
    isMedicalAdvice,
    shouldFlag: isCrisis || isMedicalAdvice,
    flaggedWords: [...crisisWords, ...medicalWords],
    severity,
  };
}

export function generateSafetyResponse(moderation: ModerationResult): string {
  if (moderation.isCrisis) {
    return 'אני רואה שאת עוברת תקופה קשה במיוחד. זה חשוב שתדעי שיש עזרה זמינה. אני מעודדת אותך ליצור קשר עם מד"א (101) או עם איש מקצוע בבריאות הנפש. את לא לבד במסע הזה.';
  }
  
  if (moderation.isMedicalAdvice) {
    return 'אני מבינה שיש לך שאלות על הטיפול הרפואי שלך. חשוב שתדעי שאני לא יכולה לתת עצות רפואיות או הנחיות לגבי תרופות. בבקשה פני לרופא שלך או לצוות הטיפול - הם הכי מתאימים לענות על השאלות האלה. אני כאן לתמיכה רגשית ומעשית בכל נושא אחר.';
  }
  
  return '';
}