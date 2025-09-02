import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setSafetyBanner } from '../store/slices/uiSlice';
import { useTheme } from '../theme/useTheme';
import { spacing, typography, borderRadius } from '../theme/tokens';

export function SafetyBanner() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { showSafetyBanner } = useAppSelector(state => state.ui);
  const { colors } = useTheme();

  if (!showSafetyBanner) return null;

  const styles = StyleSheet.create({
    banner: {
      backgroundColor: colors.glassBg,
      borderColor: colors.glassBorder,
      borderWidth: 1,
      borderRadius: borderRadius.lg,
      padding: spacing.lg,
      margin: spacing.md,
      flexDirection: 'row',
      alignItems: 'center',
    },
    text: {
      flex: 1,
      fontSize: typography.fontSize.sm,
      color: colors.darkInk,
      lineHeight: typography.lineHeight.normal * typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium,
    },
    closeButton: {
      marginLeft: spacing.sm,
      padding: spacing.xs,
    },
  });

  return (
    <View style={styles.banner}>
      <Text style={styles.text}>{t('safetyBanner')}</Text>
      <TouchableOpacity 
        style={styles.closeButton}
        onPress={() => dispatch(setSafetyBanner(false))}
        accessibilityLabel={t('close')}
        accessibilityRole="button"
      >
        <X size={16} color={colors.mutedInk} />
      </TouchableOpacity>
    </View>
  );
}