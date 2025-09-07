export const colors = {
  // Core brand accents
  primaryRose: '#F1C5D6',
  primaryRoseDark: '#E8A5C0',
  lavender: '#CBB8FF',
  lavenderLight: '#E5DCFF',

  // Light theme (legacy)
  ink: '#111827',
  mutedInk: '#6B7280',
  lightInk: '#9CA3AF',
  bg: '#F5F7FA',
  bgAlt: '#F8FAFC',
  bgCard: '#FFFFFF',

  // Semantic
  success: '#10B981',
  successLight: '#D1FAE5',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  danger: '#EF4444',
  dangerLight: '#FEE2E2',
  border: '#E5E7EB',
  borderLight: '#F3F4F6',

  // Neon / glassmorphism additions (used in dark mode)
  darkBg: '#0A0F1F',
  darkBgElevated: '#0F1629',
  darkInk: '#F1F5F9',
  darkMutedInk: '#98A2B3',
  darkBorder: 'rgba(148, 163, 184, 0.15)',
  glassBg: 'rgba(148, 163, 184, 0.08)',
  glassBorder: 'rgba(148, 163, 184, 0.25)',
  gradientPrimaryStart: '#7C3AED',
  gradientPrimaryEnd: '#22D3EE',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const typography = {
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.6,
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 20,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
};