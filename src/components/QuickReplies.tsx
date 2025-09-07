import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../theme/useTheme';
import { spacing, typography, borderRadius } from '../theme/tokens';

interface QuickRepliesProps {
  onSelect: (reply: string) => void;
  isRTL: boolean;
  isFixedAboveInput?: boolean;
  bottomOffset?: number;
}

export function QuickReplies({ onSelect, isRTL, isFixedAboveInput = false, bottomOffset = 88 }: QuickRepliesProps) {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const quickReplies = [
    { key: 'sideEffects', label: t('sideEffects') },
    { key: 'emotions', label: t('emotions') },
    { key: 'logistics', label: t('logistics') },
    { key: 'doctorQuestions', label: t('doctorQuestions') },
  ];

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
      position: isFixedAboveInput ? 'absolute' : 'relative',
      left: 0,
      right: 0,
      bottom: isFixedAboveInput ? bottomOffset : undefined,
      zIndex: 5,
    },
    scrollContainer: {
      paddingRight: isRTL ? 0 : spacing.lg,
      paddingLeft: isRTL ? spacing.lg : 0,
    },
    chip: {
      backgroundColor: 'rgba(124,58,237,0.15)',
      borderRadius: borderRadius.full,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
      marginRight: isRTL ? 0 : spacing.sm,
      marginLeft: isRTL ? spacing.sm : 0,
      borderWidth: 1,
      borderColor: 'rgba(124,58,237,0.35)',
    },
    chipText: {
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.medium,
      color: colors.darkInk,
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {quickReplies.map((reply) => (
          <TouchableOpacity
            key={reply.key}
            style={styles.chip}
            onPress={() => onSelect(reply.label)}
          >
            <Text style={styles.chipText}>{reply.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}