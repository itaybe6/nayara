import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Menu, Heart } from 'lucide-react-native';
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
  const navigation = useNavigation<any>();

  const handleOpenDrawer = () => {
    // Open drawer if available; fallback: clear chat (previous behavior)
    if (typeof navigation?.openDrawer === 'function') {
      navigation.openDrawer();
    } else {
      dispatch(clearMessages());
    }
  };

  const styles = StyleSheet.create({
    header: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.lg,
      backgroundColor: 'transparent',
      borderBottomWidth: 0,
      borderBottomColor: 'transparent',
    },
    brandContainer: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      gap: spacing.md,
    },
    logo: {
      height: 24,
      width: 110,
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

  // Always show brand + menu even before chat starts

  return (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.menuButton} 
        onPress={handleOpenDrawer}
        accessibilityLabel={t('menu')}
      >
        <Menu size={20} color="#FFFFFF" />
      </TouchableOpacity>
      
      <View style={styles.brandContainer}>
        <Image
          source={require('../../assets/images/nayara loo-08.png')}
          style={styles.logo}
          resizeMode="contain"
          accessibilityLabel="Nayara logo"
        />
      </View>
    </View>
  );
}