import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Heart, MessageCircle, BookOpen } from 'lucide-react-native';
import { useTheme } from '../theme/useTheme';
import { spacing, typography, borderRadius, shadows } from '../theme/tokens';

interface ChatWelcomeProps {
  onStartChat: () => void;
  isRTL: boolean;
}

export function ChatWelcome({ onStartChat, isRTL }: ChatWelcomeProps) {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: spacing.xl,
      paddingTop: spacing.xxxl,
      backgroundColor: colors.bg,
    },
    logo: {
      width: 160,
      height: 48,
      alignSelf: 'center',
      marginBottom: spacing.xl,
    },
    title: {
      fontSize: 32,
      fontWeight: typography.fontWeight.bold,
      color: colors.primaryRose,
      textAlign: 'center',
      marginBottom: spacing.lg,
      lineHeight: 38,
    },
    subtitle: {
      fontSize: typography.fontSize.lg,
      color: '#F8BFBE',
      textAlign: 'center',
      lineHeight: typography.lineHeight.relaxed * typography.fontSize.lg,
      marginBottom: spacing.xxxl,
      maxWidth: 320,
      alignSelf: 'center',
    },
    buttonContainer: {
      gap: spacing.lg,
      marginBottom: spacing.xxxl,
    },
    primaryButton: {
      backgroundColor: colors.lavender,
      borderRadius: borderRadius.full,
      paddingVertical: spacing.lg,
      paddingHorizontal: spacing.xxxl,
      alignItems: 'center',
      flexDirection: isRTL ? 'row-reverse' : 'row',
      justifyContent: 'center',
      gap: spacing.md,
      ...shadows.sm,
    },
    primaryButtonText: {
      fontSize: typography.fontSize.lg,
      fontWeight: typography.fontWeight.semibold,
      color: colors.bg,
    },
    secondaryButton: {
      borderWidth: 2,
      borderColor: colors.glassBorder,
      borderRadius: borderRadius.full,
      paddingVertical: spacing.lg,
      paddingHorizontal: spacing.xxxl,
      alignItems: 'center',
      flexDirection: isRTL ? 'row-reverse' : 'row',
      justifyContent: 'center',
      gap: spacing.md,
    },
    secondaryButtonText: {
      fontSize: typography.fontSize.lg,
      fontWeight: typography.fontWeight.medium,
      color: colors.ink,
    },
    featuresContainer: {
      gap: spacing.md,
    },
    featureRow: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      gap: spacing.md,
      paddingHorizontal: spacing.lg,
    },
    featureText: {
      fontSize: typography.fontSize.base,
      color: colors.mutedInk,
      flex: 1,
      textAlign: isRTL ? 'right' : 'left',
    },
  });

  const features = [
    { 
      icon: <MessageCircle size={20} color={colors.lavender} />, 
      text: 'שיחה בטוחה ותומכת'
    },
    { 
      icon: <Heart size={20} color={colors.lavender} />, 
      text: 'תמיכה רגשית ומעשית'
    },
    { 
      icon: <BookOpen size={20} color={colors.lavender} />, 
      text: 'משאבים מהימנים ועזרה'
    },
  ];

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/nayara-07.png')}
        style={styles.logo}
        resizeMode="contain"
        accessibilityLabel="Nayara logo"
      />
      
      <Text style={styles.title}>שלום, אני ניארה</Text>
      
      <Text style={styles.subtitle}>אני כאן כדי לתמוך בך במסע שלך עם הסרטן. בואי נדבר על כל מה שמעסיק אותך</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.primaryButton} onPress={onStartChat}>
          <MessageCircle size={24} color={colors.bg} />
          <Text style={styles.primaryButtonText}>{t('askAnything')}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.secondaryButton}>
          <BookOpen size={24} color={colors.ink} />
          <Text style={styles.secondaryButtonText}>{t('learnMore')}</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.featuresContainer}>
        {features.map((feature, index) => (
          <View key={index} style={styles.featureRow}>
            {feature.icon}
            <Text style={styles.featureText}>{feature.text}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}