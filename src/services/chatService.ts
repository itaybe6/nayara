import { Message } from '../store/slices/chatSlice';

export interface ChatService {
  sendMessage(message: string, history: Message[]): Promise<string>;
}

class NayaraChatService implements ChatService {
  private readonly systemPrompt = `את עוזרת אמפתית לחולות סרטן. תני מידע כללי, תמיכה רגשית וטיפים פרקטיים (תקשורת עם צוות רפואי, רווחה, התמודדות כללית עם תופעות לוואי). אל תתני אבחנה, מינונים או הנחיות טיפול. הדגישי שפניה לרופא חובה בהחלטות רפואיות. במקרה סימני חירום—הנחי לפנות מיד למד״א 101/מוקד חירום מקומי. שמרי על שפה עדינה, ברורה ולא שיפוטית.`;

  async sendMessage(message: string, history: Message[]): Promise<string> {
    // Simulate AI processing with realistic delay
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 2000));
    
    // Context-aware responses based on user input
    const lowerMessage = message.toLowerCase();
    
    // Emotional support responses
    if (lowerMessage.includes('פחד') || lowerMessage.includes('חשש') || lowerMessage.includes('afraid') || lowerMessage.includes('scared')) {
      const responses = [
        'זה טבעי לחוש פחד במצב כזה. הפחד שלך מובן לחלוטין. איך אני יכולה לעזור לך להתמודד עם הרגשות האלה?',
        'אני מבינה שזה מפחיד. זכרי שיש אנשים שאוהבים אותך ותומכים בך. רוצה לדבר על מה שהכי מדאיג אותך?',
        'הפחד הוא תגובה נורמלית. בואי ננסה לזהות יחד מה עוזר לך להרגיש יותר בשליטה.',
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Treatment-related but non-medical responses
    if (lowerMessage.includes('תופעות') || lowerMessage.includes('side effects') || lowerMessage.includes('נמאס')) {
      const responses = [
        'תופעות הלוואי יכולות להיות מתישות. חשוב לשתף את הצוות הרפואי בכל מה שאת חווה. איך אני יכולה לעזור לך להתמודד עם זה?',
        'זה מובן שנמאס לך. המסע הזה קשה, ואת עושה עבודה מדהימה. רוצה לדבר על דרכים לטפח את עצמך?',
        'כל מה שאת חווה הוא תקף. בואי נחשוב יחד על דרכים קטנות לעשות לך טוב במהלך היום.',
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Family and relationships
    if (lowerMessage.includes('משפחה') || lowerMessage.includes('בן זוג') || lowerMessage.includes('family') || lowerMessage.includes('partner')) {
      const responses = [
        'יחסים יכולים להיות מורכבים במהלך הטיפול. זה טבעי שיש שינויים. איך אני יכולה לעזור לך לתקשר טוב יותר עם האנשים החשובים לך?',
        'האנשים הקרובים אליך אולי לא יודעים איך לעזור. בואי נחשוב על דרכים להסביר להם מה את צריכה.',
        'לפעמים המשפחה רוצה לעזור אבל לא יודעת איך. רוצה לדבר על דרכים לשתף אותם במה שאת עוברת?',
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Work and practical matters
    if (lowerMessage.includes('עבודה') || lowerMessage.includes('כסף') || lowerMessage.includes('work') || lowerMessage.includes('money')) {
      const responses = [
        'שאלות כלכליות ומקצועיות חשובות. יש זכויות וסיוע שמגיעים לך. רוצה שאעזור לך לחשוב על השלבים הבאים?',
        'זה לגיטימי להיות מודאגת מהיבטים מעשיים. יש ארגונים שיכולים לעזור עם תמיכה כלכלית וייעוץ זכויות.',
        'האתגרים המעשיים חשובים לא פחות מהטיפול הרפואי. בואי נחשוב יחד על משאבים שיכולים לעזור לך.',
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Default supportive responses
    const defaultResponses = [
      'תודה שחלקת איתי. אני כאן כדי לתמוך בך. איך את מרגישה עכשיו?',
      'זה נשמע מאתגר. רוצה שנדבר על דרכים להתמודד עם זה?',
      'חשוב לזכור שאת לא לבד במסע הזה. יש לך תמיכה.',
      'האם שיתפת את הרופא שלך בנושא הזה? זה יכול להיות חשוב.',
      'אני מבינה שזה קשה. בואי ננסה למצוא דרכים לעזור לך להרגיש טוב יותר.',
      'כל רגש שאת חווה הוא תקף. רוצה לספר לי יותר על מה שעובר עליך?',
      'זה מראה כמה את חזקה שאת מחפשת תמיכה. איך אני יכולה לעזור לך הכי טוב?',
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  }
}

export const chatService = new NayaraChatService();