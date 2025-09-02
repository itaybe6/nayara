import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { 
  Globe, 
  Palette, 
  Type, 
  Trash2, 
  Shield, 
  Info,
  Moon,
  Sun
} from 'lucide-react-native';
import { SettingsRow } from '@/src/components/SettingsRow';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { setLanguage, setTheme, setFontSize } from '@/src/store/slices/settingsSlice';
import { clearMessages } from '@/src/store/slices/chatSlice';
import { useTheme } from '@/src/theme/useTheme';
import { spacing, typography } from '@/src/theme/tokens';

export default function ProfileScreen() {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const { language, theme, fontSize, isRTL } = useAppSelector(state => state.settings);

  const handleLanguageChange = () => {
    const newLanguage = language === 'he' ? 'en' : 'he';
    dispatch(setLanguage(newLanguage));
    i18n.changeLanguage(newLanguage);
  };

  const handleThemeChange = () => {
    const themes = ['light', 'dark', 'system'] as const;
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    dispatch(setTheme(nextTheme));
  };

  const handleClearHistory = () => {
    Alert.alert(
      'נקה היסטוריה',
      'האם את בטוחה שברצונך למחוק את כל השיחות?',
      [
        { text: 'ביטול', style: 'cancel' },
        { 
          text: 'מחק', 
          style: 'destructive',
          onPress: () => dispatch(clearMessages())
        },
      ]
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bg,
    },
    header: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.xl,
      borderBottomWidth: 1,
      borderBottomColor: colors.borderLight,
    },
    title: {
      fontSize: typography.fontSize.xxxl,
      fontWeight: typography.fontWeight.bold,
      color: colors.ink,
      textAlign: isRTL ? 'right' : 'left',
      marginBottom: spacing.sm,
    },
    subtitle: {
      fontSize: typography.fontSize.base,
      color: colors.mutedInk,
      textAlign: isRTL ? 'right' : 'left',
      lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
    },
    section: {
      marginTop: spacing.xl,
    },
    sectionTitle: {
      fontSize: typography.fontSize.lg,
      fontWeight: typography.fontWeight.semibold,
      color: colors.ink,
      textAlign: isRTL ? 'right' : 'left',
      marginHorizontal: spacing.lg,
      marginBottom: spacing.md,
    },
    privacyNotice: {
      backgroundColor: colors.successLight,
      borderRadius: 12,
      padding: spacing.lg,
      margin: spacing.lg,
      marginTop: spacing.xl,
    },
    privacyText: {
      fontSize: typography.fontSize.sm,
      color: colors.ink,
      textAlign: isRTL ? 'right' : 'left',
      lineHeight: typography.lineHeight.relaxed * typography.fontSize.sm,
    },
  });

  const getThemeIcon = () => {
    switch (theme) {
      case 'light': return <Sun size={20} color={colors.mutedInk} />;
      case 'dark': return <Moon size={20} color={colors.mutedInk} />;
      default: return <Palette size={20} color={colors.mutedInk} />;
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case 'light': return 'בהיר';
      case 'dark': return 'כהה';
      default: return 'אוטומטי';
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('profile')}</Text>
        <Text style={styles.subtitle}>
          {isRTL 
            ? 'נהלי את ההעדפות והפרטיות שלך'
            : 'Manage your preferences and privacy'
          }
        </Text>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('settings')}</Text>
          
          <SettingsRow
            title={t('language')}
            subtitle={language === 'he' ? 'עברית' : 'English'}
            onPress={handleLanguageChange}
            isRTL={isRTL}
            leftIcon={<Globe size={20} color={colors.mutedInk} />}
          />
          
          <SettingsRow
            title={t('theme')}
            subtitle={getThemeLabel()}
            onPress={handleThemeChange}
            isRTL={isRTL}
            leftIcon={getThemeIcon()}
          />
          
          <SettingsRow
            title="גודל גופן"
            subtitle={fontSize === 'small' ? 'קטן' : fontSize === 'large' ? 'גדול' : 'בינוני'}
            onPress={() => {}}
            isRTL={isRTL}
            leftIcon={<Type size={20} color={colors.mutedInk} />}
          />
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>נתונים</Text>
          
          <SettingsRow
            title={t('clearHistory')}
            subtitle="מחק את כל השיחות"
            onPress={handleClearHistory}
            isRTL={isRTL}
            leftIcon={<Trash2 size={20} color={colors.danger} />}
          />
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>מידע</Text>
          
          <SettingsRow
            title={t('privacy')}
            subtitle="מדיניות פרטיות ואבטחה"
            onPress={() => {}}
            isRTL={isRTL}
            leftIcon={<Shield size={20} color={colors.mutedInk} />}
          />
          
          <SettingsRow
            title={t('about')}
            subtitle="גרסה 1.0.0"
            onPress={() => {}}
            isRTL={isRTL}
            leftIcon={<Info size={20} color={colors.mutedInk} />}
          />
        </View>
        
        <View style={styles.privacyNotice}>
          <Text style={styles.privacyText}>
            {t('privacyNotice')} {t('dataLocal')}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}