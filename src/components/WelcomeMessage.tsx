import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Heart, ArrowLeft } from 'lucide-react-native';
import { useTheme } from '../theme/useTheme';
import { spacing, typography, borderRadius, shadows } from '../theme/tokens';

interface WelcomeMessageProps {
  onGetStarted: () => void;
  onLearnMore: () => void;
  isRTL: boolean;
}

export function WelcomeMessage({ onGetStarted, onLearnMore, isRTL }: WelcomeMessageProps) {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: spacing.xl,
      backgroundColor: colors.bg,
    },
    iconContainer: {
      width: 80,
      height: 80,
      borderRadius: borderRadius.full,
      backgroundColor: colors.primaryRose,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: spacing.xl,
      ...shadows.md,
    },
    title: {
      fontSize: typography.fontSize.xxxl,
      fontWeight: typography.fontWeight.bold,
      color: colors.ink,
      textAlign: 'center',
      marginBottom: spacing.lg,
      lineHeight: typography.lineHeight.tight * typography.fontSize.xxxl,
    },
    subtitle: {
      fontSize: typography.fontSize.lg,
      color: colors.mutedInk,
      textAlign: 'center',
      lineHeight: typography.lineHeight.relaxed * typography.fontSize.lg,
      marginBottom: spacing.xxxl,
      maxWidth: 300,
    },
    buttonContainer: {
      width: '100%',
      gap: spacing.lg,
    },
    primaryButton: {
      backgroundColor: colors.primaryRose,
      borderRadius: borderRadius.full,
      paddingVertical: spacing.lg,
      paddingHorizontal: spacing.xxxl,
      alignItems: 'center',
      ...shadows.sm,
    },
    primaryButtonText: {
      fontSize: typography.fontSize.lg,
      fontWeight: typography.fontWeight.semibold,
      color: colors.bg,
    },
    secondaryButton: {
      borderWidth: 2,
      borderColor: colors.lavender,
      borderRadius: borderRadius.full,
      paddingVertical: spacing.lg,
      paddingHorizontal: spacing.xxxl,
      alignItems: 'center',
      flexDirection: isRTL ? 'row-reverse' : 'row',
      justifyContent: 'center',
      gap: spacing.sm,
    },
    secondaryButtonText: {
      fontSize: typography.fontSize.lg,
      fontWeight: typography.fontWeight.medium,
      color: colors.ink,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Heart size={40} color={colors.bg} fill={colors.bg} />
      </View>
      
      <Text style={styles.title}>
        {isRTL ? 'ברוכה הבאה לניארה' : 'Welcome to Nayara'}
      </Text>
      
      <Text style={styles.subtitle}>
        {isRTL 
          ? 'אני כאן כדי לתמוך בך במסע שלך. בואי נתחיל לדבר'
          : 'I\'m here to support you on your journey. Let\'s start talking'
        }
      </Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.primaryButton} onPress={onGetStarted}>
          <Text style={styles.primaryButtonText}>{t('askAnything')}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.secondaryButton} onPress={onLearnMore}>
          <Text style={styles.secondaryButtonText}>{t('learnMore')}</Text>
          <ArrowLeft 
            size={20} 
            color={colors.ink}
            style={{ transform: [{ scaleX: isRTL ? 1 : -1 }] }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}