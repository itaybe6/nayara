import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useNavigation } from 'expo-router';
import { ResourceCard } from '@/src/components/ResourceCard';
import { useAppSelector } from '@/src/store/hooks';
import { useTheme } from '@/src/theme/useTheme';
import { spacing, typography } from '@/src/theme/tokens';
import resourcesData from '@/src/data/resources.json';
import { Menu } from 'lucide-react-native';
import Svg, { Defs, RadialGradient as SvgRadialGradient, Rect, Stop } from 'react-native-svg';
import { ChatHeader } from '@/src/components/ChatHeader';

export default function ResourcesScreen() {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation<any>();
  const { colors } = useTheme();
  const isRTL = useAppSelector(state => state.settings.isRTL);
  const isHebrew = i18n.language === 'he';

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
    },
    gradient: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    title: {
      fontSize: typography.fontSize.xxxl,
      fontWeight: typography.fontWeight.bold,
      color: '#FFFFFF',
      textAlign: isRTL ? 'right' : 'left',
      marginHorizontal: spacing.lg,
      marginTop: spacing.lg,
    },
    subtitle: {
      fontSize: typography.fontSize.base,
      color: '#E5E7EB',
      textAlign: isRTL ? 'right' : 'left',
      lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
      marginHorizontal: spacing.lg,
      marginBottom: spacing.md,
    },
    sectionTitle: {
      fontSize: typography.fontSize.lg,
      fontWeight: typography.fontWeight.semibold,
      color: '#FFFFFF',
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
      <View style={styles.gradient} pointerEvents="none">
        <Svg width="100%" height="100%">
          <Defs>
            <SvgRadialGradient id="bgGlow" cx="0%" cy="100%" rx="140%" ry="110%" fx="0%" fy="100%">
              <Stop offset="0%" stopColor="#b277f1" stopOpacity="0.45" />
              <Stop offset="18%" stopColor="#b277f1" stopOpacity="0.36" />
              <Stop offset="38%" stopColor="#7c3aed" stopOpacity="0.22" />
              <Stop offset="68%" stopColor="#3b1a6d" stopOpacity="0.12" />
              <Stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </SvgRadialGradient>
          </Defs>
          <Rect x="0" y="0" width="100%" height="100%" fill="url(#bgGlow)" />
        </Svg>
      </View>
      <ChatHeader />
      <Text style={styles.title}>{t('resources')}</Text>
      <Text style={styles.subtitle}>
        {isHebrew 
          ? 'משאבים מהימנים ואנשי קשר לתמיכה ועזרה במסע שלך'
          : 'Trusted resources and contacts for support and help on your journey'
        }
      </Text>
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