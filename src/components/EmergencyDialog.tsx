import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Linking } from 'react-native';
import { BlurView } from 'expo-blur';
import { useTranslation } from 'react-i18next';
import { Phone, X, TriangleAlert as AlertTriangle } from 'lucide-react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setEmergencyDialog } from '../store/slices/uiSlice';
import { useTheme } from '../theme/useTheme';
import { spacing, typography, borderRadius, shadows } from '../theme/tokens';

export function EmergencyDialog() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { showEmergencyDialog } = useAppSelector(state => state.ui);
  const { isRTL } = useAppSelector(state => state.settings);
  const { colors } = useTheme();

  const handleEmergencyCall = () => {
    Linking.openURL('tel:101'); // Israeli emergency number
  };

  const handleMentalHealthCall = () => {
    Linking.openURL('tel:1201'); // Mental health hotline
  };

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: spacing.xl,
    },
    dialog: {
      backgroundColor: colors.glassBg,
      borderRadius: borderRadius.xxl,
      padding: spacing.xl,
      width: '100%',
      maxWidth: 400,
      borderWidth: 1,
      borderColor: colors.glassBorder,
      ...shadows.lg,
    },
    header: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      marginBottom: spacing.lg,
      gap: spacing.md,
    },
    alertIcon: {
      width: 40,
      height: 40,
      borderRadius: borderRadius.full,
      backgroundColor: colors.dangerLight,
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleContainer: {
      flex: 1,
    },
    title: {
      fontSize: typography.fontSize.xl,
      fontWeight: typography.fontWeight.bold,
      color: colors.danger,
      textAlign: isRTL ? 'right' : 'left',
    },
    subtitle: {
      fontSize: typography.fontSize.sm,
      color: colors.darkMutedInk,
      textAlign: isRTL ? 'right' : 'left',
      marginTop: 2,
    },
    content: {
      fontSize: typography.fontSize.base,
      color: colors.darkInk,
      lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
      marginBottom: spacing.xl,
      textAlign: isRTL ? 'right' : 'left',
    },
    buttonContainer: {
      gap: spacing.md,
    },
    emergencyButton: {
      backgroundColor: colors.danger,
      borderRadius: borderRadius.full,
      paddingVertical: spacing.lg,
      paddingHorizontal: spacing.xl,
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.sm,
    },
    emergencyButtonText: {
      color: colors.bg,
      fontSize: typography.fontSize.base,
      fontWeight: typography.fontWeight.semibold,
    },
    mentalHealthButton: {
      backgroundColor: colors.lavender,
      borderRadius: borderRadius.full,
      paddingVertical: spacing.lg,
      paddingHorizontal: spacing.xl,
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.sm,
    },
    mentalHealthButtonText: {
      color: colors.bg,
      fontSize: typography.fontSize.base,
      fontWeight: typography.fontWeight.semibold,
    },
    closeButton: {
      borderWidth: 2,
      borderColor: colors.glassBorder,
      borderRadius: borderRadius.full,
      paddingVertical: spacing.lg,
      paddingHorizontal: spacing.xl,
      alignItems: 'center',
      justifyContent: 'center',
    },
    closeButtonText: {
      color: colors.ink,
      fontSize: typography.fontSize.base,
      fontWeight: typography.fontWeight.medium,
    },
    closeIconButton: {
      position: 'absolute',
      top: spacing.lg,
      right: isRTL ? undefined : spacing.lg,
      left: isRTL ? spacing.lg : undefined,
      padding: spacing.sm,
    },
  });

  return (
    <Modal
      visible={showEmergencyDialog}
      transparent
      animationType="fade"
      onRequestClose={() => dispatch(setEmergencyDialog(false))}
    >
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          <TouchableOpacity 
            style={styles.closeIconButton}
            onPress={() => dispatch(setEmergencyDialog(false))}
          >
            <X size={24} color={colors.mutedInk} />
          </TouchableOpacity>

          <View style={styles.header}>
            <View style={styles.alertIcon}>
              <AlertTriangle size={24} color={colors.danger} />
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{t('emergencyTitle')}</Text>
              <Text style={styles.subtitle}>{t('emergencySubtitle')}</Text>
            </View>
          </View>
          
          <Text style={styles.content}>{t('emergencyContent')}</Text>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.emergencyButton} onPress={handleEmergencyCall}>
              <Phone size={20} color={colors.bg} />
              <Text style={styles.emergencyButtonText}>{t('emergencyCallButton')}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.mentalHealthButton} onPress={handleMentalHealthCall}>
              <Phone size={20} color={colors.bg} />
              <Text style={styles.mentalHealthButtonText}>{t('mentalHealthLine')}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => dispatch(setEmergencyDialog(false))}
            >
              <Text style={styles.closeButtonText}>{t('okForNow')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}