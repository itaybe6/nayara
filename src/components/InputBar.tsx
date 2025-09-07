import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { useTranslation } from 'react-i18next';
import { Send, Mic } from 'lucide-react-native';
import { useTheme } from '../theme/useTheme';
import { spacing, typography, borderRadius, shadows } from '../theme/tokens';

interface InputBarProps {
  onSend: (message: string) => void;
  isRTL: boolean;
  disabled?: boolean;
}

export function InputBar({ onSend, isRTL, disabled = false }: InputBarProps) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
    }
  };

  const styles = StyleSheet.create({
    keyboardView: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: spacing.lg,
      backgroundColor: 'transparent',
    },
    container: {
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      backgroundColor: 'transparent',
    },
    inputContainer: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      backgroundColor: 'rgba(124,58,237,0.18)',
      borderRadius: borderRadius.full,
      borderWidth: 1,
      borderColor: 'rgba(124,58,237,0.35)',
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      gap: spacing.md,
      ...shadows.lg,
    },
    input: {
      flex: 1,
      fontSize: typography.fontSize.base,
      color: colors.darkInk,
      textAlign: isRTL ? 'right' : 'left',
      minHeight: 20,
    },
    sendButton: {
      backgroundColor: colors.lavender,
      borderRadius: borderRadius.full,
      padding: spacing.md,
      ...shadows.sm,
    },
    sendButtonDisabled: {
      backgroundColor: colors.lightInk,
    },
    micButton: {
      backgroundColor: colors.glassBg,
      borderRadius: borderRadius.full,
      padding: spacing.md,
      borderWidth: 1,
      borderColor: colors.glassBorder,
    },
  });

  return (
    <KeyboardAvoidingView 
      style={styles.keyboardView}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder={t('chatPlaceholder')}
            placeholderTextColor={colors.darkMutedInk}
            multiline
            maxLength={1000}
            editable={!disabled}
            accessibilityLabel={t('messageInputLabel')}
            accessibilityHint={t('messageInputHint')}
          />
          <TouchableOpacity
            style={styles.micButton}
            onPress={() => {}}
            accessibilityLabel={t('recordVoice')}
            accessibilityRole="button"
          >
            <Mic size={20} color={colors.bg} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sendButton, disabled || !message.trim() ? styles.sendButtonDisabled : undefined]}
            onPress={handleSend}
            disabled={disabled || !message.trim()}
            accessibilityLabel={t('send')}
            accessibilityRole="button"
          >
            <Send size={20} color={colors.bg} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}