import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { useTheme } from '../theme/useTheme';
import { spacing, typography, borderRadius } from '../theme/tokens';

interface SettingsRowProps {
  title: string;
  subtitle?: string;
  onPress: () => void;
  isRTL: boolean;
  leftIcon?: React.ReactNode;
  rightComponent?: React.ReactNode;
}

export function SettingsRow({ 
  title, 
  subtitle, 
  onPress, 
  isRTL, 
  leftIcon, 
  rightComponent 
}: SettingsRowProps) {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'rgba(124,58,237,0.18)',
      borderWidth: 1,
      borderColor: 'rgba(124,58,237,0.35)',
      borderRadius: borderRadius.lg,
      marginHorizontal: spacing.lg,
      marginVertical: spacing.xs,
    },
    row: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      padding: spacing.lg,
      gap: spacing.md,
    },
    iconContainer: {
      width: 24,
      height: 24,
      alignItems: 'center',
      justifyContent: 'center',
    },
    textContainer: {
      flex: 1,
    },
    title: {
      fontSize: typography.fontSize.base,
      fontWeight: typography.fontWeight.medium,
      color: '#FFFFFF',
      textAlign: isRTL ? 'right' : 'left',
    },
    subtitle: {
      fontSize: typography.fontSize.sm,
      color: '#E5E7EB',
      marginTop: 2,
      textAlign: isRTL ? 'right' : 'left',
    },
    rightContainer: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      gap: spacing.sm,
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.row} onPress={onPress}>
        {leftIcon && (
          <View style={styles.iconContainer}>
            {leftIcon}
          </View>
        )}
        
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
        
        <View style={styles.rightContainer}>
          {rightComponent}
          <ChevronRight 
            size={16} 
            color={colors.lightInk}
            style={{ transform: [{ scaleX: isRTL ? -1 : 1 }] }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}