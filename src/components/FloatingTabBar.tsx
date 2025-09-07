import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { usePathname, useRouter } from 'expo-router';
import { Home, MessageCircle, BookOpen, User } from 'lucide-react-native';
import { useTheme } from '@/src/theme/useTheme';

type TabKey = 'index' | 'chat' | 'resources' | 'profile';

interface FloatingTabBarProps {
  hidden?: boolean;
}

export function FloatingTabBar({ hidden }: FloatingTabBarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { colors } = useTheme();

  if (hidden) return null;

  const navigate = (key: TabKey) => {
    switch (key) {
      case 'index':
        router.push('/(tabs)');
        break;
      case 'chat':
        router.push('/(tabs)/index');
        router.push('/(tabs)/chat');
        break;
      case 'resources':
        router.push('/(tabs)/resources');
        break;
      case 'profile':
        router.push('/(tabs)/profile');
        break;
    }
  };

  const isActive = (segment: string) => pathname?.includes(`/(tabs)/${segment}`);

  return (
    <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
      <View style={styles.container}>
        <BlurView
          intensity={30}
          tint="dark"
          style={[
            styles.bar,
            {
              borderColor: colors.glassBorder ?? colors.darkBorder,
              backgroundColor: colors.glassBg,
            },
          ]}
        >
          <TouchableOpacity
            accessibilityRole="button"
            style={[styles.sideButton, isActive('index') && styles.activePill]}
            onPress={() => navigate('index')}
          >
            <Home size={22} color={isActive('index') ? colors.lavender : colors.darkMutedInk} />
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityRole="button"
            style={[styles.sideButton, isActive('resources') && styles.activePill]}
            onPress={() => navigate('resources')}
          >
            <BookOpen size={22} color={isActive('resources') ? colors.lavender : colors.darkMutedInk} />
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityRole="button"
            style={[styles.sideButton, isActive('profile') && styles.activePill]}
            onPress={() => navigate('profile')}
          >
            <User size={22} color={isActive('profile') ? colors.lavender : colors.darkMutedInk} />
          </TouchableOpacity>
        </BlurView>

        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => navigate('chat')}
          style={[styles.fab, { backgroundColor: colors.lavender }]}
        >
          <View style={styles.fabGlow} />
          <MessageCircle size={26} color={colors.bg} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: Platform.select({ ios: 28, android: 22, default: 22 }),
    alignItems: 'center',
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 32,
    borderWidth: 1,
    paddingHorizontal: 14,
    height: 60,
    width: 320,
  },
  sideButton: {
    height: 46,
    width: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 28,
  },
  activePill: {
    backgroundColor: 'rgba(203,184,255,0.12)',
  },
  fab: {
    position: 'absolute',
    bottom: 12,
    height: 66,
    width: 66,
    borderRadius: 33,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  fabGlow: {
    position: 'absolute',
    height: 66,
    width: 66,
    borderRadius: 33,
    backgroundColor: 'rgba(203,184,255,0.35)',
    opacity: 0.6,
    shadowColor: '#CBB8FF',
    shadowOpacity: 0.6,
    shadowRadius: 16,
  },
});

export default FloatingTabBar;



