import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { MoveVertical as MoreVertical, Heart } from 'lucide-react-native';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { clearMessages } from '../store/slices/chatSlice';
import { useTheme } from '../theme/useTheme';
import { spacing, typography, borderRadius } from '../theme/tokens';

export function ChatHeader() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { isRTL } = useAppSelector(state => state.settings);
  const { hasStartedChat } = useAppSelector(state => state.chat);
  const dispatch = useAppDispatch();

  const handleClearChat = () => {
    dispatch(clearMessages());
  };

  const styles = StyleSheet.create({
    header: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.lg,
      backgroundColor: 'transparent',
      borderBottomWidth: 1,
      borderBottomColor: colors.darkBorder,
    },
    brandContainer: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      gap: spacing.md,
    },
    iconContainer: {
      width: 36,
      height: 36,
      borderRadius: borderRadius.full,
      backgroundColor: colors.lavender,
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleContainer: {
      alignItems: isRTL ? 'flex-end' : 'flex-start',
    },
    title: {
      fontSize: typography.fontSize.lg,
      fontWeight: typography.fontWeight.bold,
      color: colors.darkInk,
    },
    statusContainer: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      gap: spacing.xs,
      marginTop: 2,
    },
    statusDot: {
      width: 8,
      height: 8,
      borderRadius: borderRadius.full,
      backgroundColor: colors.success,
    },
    statusText: {
      fontSize: typography.fontSize.xs,
      color: colors.darkMutedInk,
      fontWeight: typography.fontWeight.medium,
    },
    menuButton: {
      padding: spacing.sm,
      borderRadius: borderRadius.md,
    },
  });

  if (!hasStartedChat) return null;

  return (
    <View style={styles.header}>
      <View style={styles.brandContainer}>
        <View style={styles.iconContainer}>
          <Heart size={20} color={colors.bg} fill={colors.bg} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{t('appName')}</Text>
          <View style={styles.statusContainer}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>{t('online')}</Text>
          </View>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.menuButton} 
        onPress={handleClearChat}
        accessibilityLabel={t('clearChat')}
      >
        <MoreVertical size={20} color={colors.mutedInk} />
      </TouchableOpacity>
    </View>
  );
}