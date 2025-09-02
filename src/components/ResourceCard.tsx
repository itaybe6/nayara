import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { useTranslation } from 'react-i18next';
import { ExternalLink, Phone, Heart } from 'lucide-react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { useTheme } from '../theme/useTheme';
import { spacing, typography, borderRadius, shadows } from '../theme/tokens';

interface ResourceCardProps {
  title: string;
  description: string;
  url: string;
  type: 'emergency' | 'resource';
  isRTL: boolean;
}

export function ResourceCard({ title, description, url, type, isRTL }: ResourceCardProps) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const isPhoneNumber = url.startsWith('tel:');

  const handlePress = async () => {
    try {
      if (isPhoneNumber) {
        await Linking.openURL(url);
      } else {
        await WebBrowser.openBrowserAsync(url, {
          presentationStyle: WebBrowser.WebBrowserPresentationStyle.FORM_SHEET,
        });
      }
    } catch (error) {
      console.error('Failed to open URL:', error);
    }
  };

  const getIcon = () => {
    if (isPhoneNumber) {
      return <Phone size={20} color={type === 'emergency' ? colors.bg : colors.primaryRose} />;
    }
    if (type === 'emergency') {
      return <Heart size={20} color={colors.bg} />;
    }
    return <ExternalLink size={16} color={colors.primaryRose} />;
  };

  const styles = StyleSheet.create({
    card: {
      backgroundColor: colors.glassBg,
      borderRadius: borderRadius.xl,
      padding: spacing.lg,
      marginHorizontal: spacing.lg,
      marginVertical: spacing.sm,
      borderWidth: type === 'emergency' ? 2 : 1,
      borderColor: type === 'emergency' ? colors.danger : colors.glassBorder,
      ...shadows.sm,
    },
    emergencyCard: {
      backgroundColor: type === 'emergency' ? colors.danger : colors.bgCard,
    },
    header: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: spacing.sm,
    },
    title: {
      fontSize: typography.fontSize.lg,
      fontWeight: typography.fontWeight.semibold,
      color: type === 'emergency' ? (type === 'emergency' ? colors.bg : colors.danger) : colors.darkInk,
      flex: 1,
      textAlign: isRTL ? 'right' : 'left',
    },
    emergencyTitle: {
      color: colors.bg,
    },
    description: {
      fontSize: typography.fontSize.base,
      color: type === 'emergency' ? colors.bg : colors.darkMutedInk,
      lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
      marginBottom: spacing.md,
      textAlign: isRTL ? 'right' : 'left',
    },
    linkButton: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      gap: spacing.xs,
      backgroundColor: type === 'emergency' ? 'rgba(255,255,255,0.2)' : 'transparent',
      paddingVertical: type === 'emergency' ? spacing.sm : 0,
      paddingHorizontal: type === 'emergency' ? spacing.md : 0,
      borderRadius: type === 'emergency' ? borderRadius.md : 0,
    },
    linkText: {
      fontSize: typography.fontSize.sm,
      color: type === 'emergency' ? colors.bg : colors.primaryRose,
      fontWeight: typography.fontWeight.medium,
    },
    iconContainer: {
      width: 32,
      height: 32,
      borderRadius: borderRadius.full,
      backgroundColor: type === 'emergency' ? 'rgba(255,255,255,0.2)' : 'rgba(124,58,237,0.15)',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  const cardStyle = [
    styles.card,
    type === 'emergency' && { backgroundColor: colors.danger }
  ];

  const titleStyle = [
    styles.title,
    type === 'emergency' && styles.emergencyTitle
  ];

  return (
    <TouchableOpacity style={cardStyle} onPress={handlePress}>
      <View style={styles.header}>
        <Text style={titleStyle}>{title}</Text>
        <View style={styles.iconContainer}>
          {getIcon()}
        </View>
      </View>
      
      <Text style={styles.description}>{description}</Text>
      
      <View style={styles.linkButton}>
        <Text style={styles.linkText}>
          {isPhoneNumber ? t('callNow') : t('openExternal')}
        </Text>
      </View>
    </TouchableOpacity>
  );
}