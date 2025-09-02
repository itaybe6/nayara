# Nayara AI - Cancer Support Assistant

A supportive AI assistant app for women with cancer, providing emotional support, practical guidance, and trusted resources while maintaining strict medical safety boundaries.

## Features

- **AI-Powered Chat**: Supportive conversations with crisis detection and safety moderation
- **Bilingual Support**: Hebrew (RTL) and English with full localization
- **Safety First**: HIPAA-aligned practices, emergency intervention, medical disclaimers
- **Trusted Resources**: Curated organizations and emergency contacts
- **Privacy-Focused**: Local-only data storage, no cloud sync
- **Accessibility**: Full screen reader support, high contrast themes, scalable fonts

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (macOS) or Android Emulator

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open in Expo Go app or simulator

## Project Structure

```
app/
├── (tabs)/
│   ├── index.tsx          # Chat interface (main screen)
│   ├── resources.tsx      # Trusted resources and emergency contacts
│   └── profile.tsx        # Settings and privacy controls
└── _layout.tsx            # Root layout with RTL and Redux setup

src/
├── components/            # Reusable UI components
├── services/             # Chat and moderation services  
├── store/                # Redux slices and hooks
├── theme/                # Design tokens and theme provider
└── utils/                # RTL and accessibility helpers
```

## Key Technologies

- **Framework**: Expo SDK 52+ with expo-router
- **State**: Redux Toolkit
- **Styling**: NativeWind (Tailwind for React Native)
- **Animations**: react-native-reanimated
- **Lists**: @shopify/flash-list
- **Icons**: lucide-react-native
- **Fonts**: Inter (Latin) + Assistant (Hebrew)
- **i18n**: i18next with expo-localization

## Safety & Compliance

- **No Medical Advice**: Strictly informational and emotional support only
- **Crisis Detection**: Automatic intervention for self-harm indicators
- **Emergency Resources**: Direct links to local crisis hotlines
- **Privacy**: Local storage only, HIPAA-aligned practices
- **Disclaimers**: Prominent medical advice disclaimers

## RTL Support

The app fully supports right-to-left languages:
- Automatic layout mirroring for Hebrew
- Proper text alignment and direction
- Icon and component flipping
- Culturally appropriate navigation patterns

## Building for Production

```bash
# Web build
npm run build:web

# iOS build (requires EAS)
eas build --platform ios

# Android build (requires EAS)
eas build --platform android
```

## Configuration

Key settings in `app.json`:
- `supportsRTL: true` - Enables RTL layout
- `extra` - API endpoints and feature flags
- `locales` - Translation file paths

## Contributing

1. Follow the established component patterns
2. Maintain RTL compatibility in all UI changes
3. Add translations for new user-facing strings
4. Test safety moderation for new conversation flows
5. Ensure accessibility compliance

## License

Proprietary - Nayara AI Cancer Support App