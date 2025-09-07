import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { Message } from '../store/slices/chatSlice';
import { useTheme } from '../theme/useTheme';
import { spacing, typography, borderRadius, shadows } from '../theme/tokens';

interface MessageBubbleProps {
  message: Message;
  isRTL: boolean;
}

export function MessageBubble({ message, isRTL }: MessageBubbleProps) {
  const { colors } = useTheme();
  const isUser = message.sender === 'user';
  const isSystem = message.sender === 'system';

  const styles = StyleSheet.create({
    container: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
      // Invert alignment: assistant/system to right, user to left
      justifyContent: isUser ? (isRTL ? 'flex-end' : 'flex-start') : (isRTL ? 'flex-start' : 'flex-end'),
      marginVertical: spacing.xs,
      marginHorizontal: spacing.lg,
    },
    bubble: {
      maxWidth: '80%',
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      borderRadius: borderRadius.xl,
      backgroundColor: isUser 
        ? 'rgba(124,58,237,0.25)'
        : isSystem 
        ? 'rgba(245, 158, 11, 0.18)'
        : colors.glassBg,
      borderWidth: 1,
      borderColor: isUser ? 'rgba(124,58,237,0.45)' : colors.glassBorder,
      ...(isUser ? shadows.sm : {}),
    },
    text: {
      fontSize: typography.fontSize.base,
      lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
      color: colors.darkInk,
      textAlign: isRTL ? 'right' : 'left',
    },
    timestamp: {
      fontSize: typography.fontSize.xs,
      color: colors.darkMutedInk,
      marginTop: spacing.xs,
      textAlign: isRTL ? 'right' : 'left',
    },
  });

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('he-IL', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        <Text style={styles.text}>{message.text}</Text>
        <Text style={styles.timestamp}>{formatTime(message.timestamp)}</Text>
      </View>
    </View>
  );
}