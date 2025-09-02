import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { ResourceCard } from '@/src/components/ResourceCard';
import { useAppSelector } from '@/src/store/hooks';
import { useTheme } from '@/src/theme/useTheme';
import { spacing, typography } from '@/src/theme/tokens';
import resourcesData from '@/src/data/resources.json';

export default function ResourcesScreen() {
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();
  const isRTL = useAppSelector(state => state.settings.isRTL);
  const isHebrew = i18n.language === 'he';

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
      backgroundColor: colors.bg,
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
    sectionTitle: {
      fontSize: typography.fontSize.lg,
      fontWeight: typography.fontWeight.semibold,
      color: colors.ink,
      textAlign: isRTL ? 'right' : 'left',
      marginHorizontal: spacing.lg,
      marginTop: spacing.xl,
      marginBottom: spacing.md,
    },
    content: {
      paddingBottom: spacing.xl,
    },
  });

  // Sort and filter resources
  const sortedResources = [...resourcesData].sort((a, b) => a.priority - b.priority);
  const emergencyResources = sortedResources.filter(r => r.type === 'emergency');
  const generalResources = sortedResources.filter(r => r.type === 'resource');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('resources')}</Text>
        <Text style={styles.subtitle}>
          {isHebrew 
            ? 'משאבים מהימנים ואנשי קשר לתמיכה ועזרה במסע שלך'
            : 'Trusted resources and contacts for support and help on your journey'
          }
        </Text>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>{t('emergencyContacts')}</Text>
        {emergencyResources.map((resource) => (
          <ResourceCard
            key={resource.id}
            title={isHebrew ? resource.title : resource.titleEn}
            description={isHebrew ? resource.description : resource.descriptionEn}
            url={resource.url}
            type={resource.type}
            isRTL={isRTL}
          />
        ))}
        
        <Text style={styles.sectionTitle}>{t('trustedResources')}</Text>
        {generalResources.map((resource) => (
          <ResourceCard
            key={resource.id}
            title={isHebrew ? resource.title : resource.titleEn}
            description={isHebrew ? resource.description : resource.descriptionEn}
            url={resource.url}
            type={resource.type}
            isRTL={isRTL}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}