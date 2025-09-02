import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

const resources = {
  he: {
    translation: {
       // App
      appName: 'ניארה',
      online: 'מקוונת',
      clearChat: 'נקה שיחה',
      close: 'סגור',
      chatErrorGeneral: 'מצטערת, חלה שגיאה. אנא נסי שוב.',

      // Navigation
      chat: 'צ\'אט',
      resources: 'משאבים',
      profile: 'פרופיל',
      
      // Chat
      chatPlaceholder: 'שאלי אותי כל דבר...',
      send: 'שלח',
      typing: 'כותבת...',
      askAnything: 'שאלי אותי כל דבר',
      learnMore: 'למדי עוד',
      messageInputLabel: 'שדה הודעה',
      messageInputHint: 'כיתבי את ההודעה שלך כאן',
      
      // Quick replies
      sideEffects: 'תופעות לוואי',
      emotions: 'רגשות',
      logistics: 'לוגיסטיקה',
      doctorQuestions: 'שאלות לרופא',
      
      // Safety
      safetyBanner: 'מידע כללי. אינו תחליף לייעוץ רפואי.',
      emergencyTitle: 'מצב חירום?',
      emergencyText: 'אם אתן חשות סכנה מיידית, פני למד"א 101 או לחדר מיון הקרוב.',
      emergencyCall: 'התקשרי למד"א',
      emergencyClose: 'סגור',
      emergencySubtitle: 'עזרה מיידית זמינה',
      emergencyContent: 'אם את חשה בסכנה מיידית או במצוקה חמורה, אנא פני לעזרה מקצועית מיד. אין לך צורך להתמודד עם זה לבד.',
      emergencyCallButton: 'התקשרי למד"א (101)',
      mentalHealthLine: 'קו בריאות הנפש (1201)',
      okForNow: 'אני בסדר כרגע',
      
      // Settings
      settings: 'הגדרות',
      language: 'שפה',
      theme: 'עיצוב',
      clearHistory: 'נקה היסטוריה',
      privacy: 'פרטיות',
      about: 'אודות',
      
      // Resources
      emergencyContacts: 'קשר חירום',
      trustedResources: 'משאבים מהימנים',
      openExternal: 'פתח באתר חיצוני',
      callNow: 'התקשרי עכשיו',
      
      // Privacy
      privacyNotice: 'אנחנו משתמשות בשיטות המתואמות עם HIPAA כדי לשמור על הפרטיות שלך.',
      dataLocal: 'השיחות שלך נשמרות רק במכשיר שלך.',
    }
  },
  en: {
    translation: {
      // App
      appName: 'Nayara',
      online: 'Online',
      clearChat: 'Clear chat',
      close: 'Close',
      chatErrorGeneral: 'Sorry, an error occurred. Please try again.',
      // Navigation
      chat: 'Chat',
      resources: 'Resources',
      profile: 'Profile',
      
      // Chat
      chatPlaceholder: 'Ask me anything...',
      send: 'Send',
      typing: 'Typing...',
      askAnything: 'Ask me anything',
      learnMore: 'Learn more',
      messageInputLabel: 'Message field',
      messageInputHint: 'Type your message here',
      
      // Quick replies
      sideEffects: 'Side effects',
      emotions: 'Emotions',
      logistics: 'Logistics',
      doctorQuestions: 'Doctor questions',
      
      // Safety
      safetyBanner: 'General information. Not a substitute for medical advice.',
      emergencyTitle: 'Emergency?',
      emergencyText: 'If you feel immediate danger, contact 911 or go to the nearest emergency room.',
      emergencyCall: 'Call 911',
      emergencyClose: 'Close',
      emergencySubtitle: 'Immediate help is available',
      emergencyContent: 'If you feel immediate danger or severe distress, please reach out for professional help immediately. You don\'t have to face this alone.',
      emergencyCallButton: 'Call Emergency (101)',
      mentalHealthLine: 'Mental Health Line (1201)',
      okForNow: 'I\'m okay for now',
      
      // Settings
      settings: 'Settings',
      language: 'Language',
      theme: 'Theme',
      clearHistory: 'Clear History',
      privacy: 'Privacy',
      about: 'About',
      
      // Resources
      emergencyContacts: 'Emergency Contacts',
      trustedResources: 'Trusted Resources',
      openExternal: 'Open external site',
      callNow: 'Call now',
      
      // Privacy
      privacyNotice: 'We use HIPAA-aligned practices to protect your privacy.',
      dataLocal: 'Your conversations are stored only on your device.',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: Localization.getLocales()[0]?.languageCode || 'he',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;