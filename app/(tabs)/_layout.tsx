import React from 'react';
import { Tabs } from 'expo-router';
import { MessageCircle, BookOpen, User } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/src/theme/useTheme';
import { useAppSelector } from '@/src/store/hooks';
import { BlurView } from 'expo-blur';

export default function TabLayout() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const isRTL = useAppSelector(state => state.settings.isRTL);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.lavender,
        tabBarInactiveTintColor: colors.darkMutedInk,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'transparent',
          borderTopColor: colors.darkBorder,
          borderTopWidth: 1,
        },
        tabBarBackground: () => (
          <BlurView intensity={24} tint="dark" style={{ flex: 1, backgroundColor: 'rgba(15,23,42,0.35)' }} />
        ),
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tabs.Screen
        name="chat"
        options={{
          title: t('chat'),
          tabBarIcon: ({ size, color }) => (
            <MessageCircle size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="resources"
        options={{
          title: t('resources'),
          tabBarIcon: ({ size, color }) => (
            <BookOpen size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('profile'),
          tabBarIcon: ({ size, color }) => (
            <User size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}