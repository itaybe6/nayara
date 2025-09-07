import React from 'react';
import { Dimensions, View, Text, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Drawer } from 'expo-router/drawer';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { MessageCircle, BookOpen, User, Clock } from 'lucide-react-native';
import { useTheme } from '@/src/theme/useTheme';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { switchToConversation } from '@/src/store/slices/sessionsSlice';
import { setMessages } from '@/src/store/slices/chatSlice';

function CustomDrawerContent({ navigation, state, colors, isRTL }: any) {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const sessions = useAppSelector((s: any) => s.sessions.conversations) as any[];
  const items = [
    { key: 'index', label: 'ניארה', Icon: MessageCircle },
    { key: 'resources', label: t('resources'), Icon: BookOpen },
    { key: 'profile', label: t('profile'), Icon: User },
  ];

  const topItems = items.filter((i) => i.key !== 'profile');
  const profileItem = items.find((i) => i.key === 'profile');

  return (
    <ScrollView
      contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 16, paddingTop: insets.top + 16, flexGrow: 1, alignItems: 'stretch' }}
    >
      {topItems.map(({ key, label, Icon }) => {
        const isActive = state?.routeNames[state?.index] === key;
        return (
          <Pressable
            key={key}
            onPress={() => navigation.navigate(key)}
            style={{
              flexDirection: isRTL ? 'row-reverse' : 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: 8,
              paddingVertical: 12,
              paddingStart: 16,
              paddingEnd: 12,
              marginVertical: 4,
              borderRadius: isActive ? 12 : 0,
              backgroundColor: isActive ? 'rgba(124,58,237,0.18)' : 'transparent',
              width: '100%',
            }}
          >
            <Icon size={18} color={isActive ? colors.lavender : '#D0D4E0'} />
            <Text style={{
              color: isActive ? colors.lavender : '#D0D4E0',
              fontWeight: '600',
              textAlign: isRTL ? 'right' : 'left',
              writingDirection: isRTL ? 'rtl' : 'ltr',
              flexShrink: 1,
            }}>
              {label}
            </Text>
          </Pressable>
        );
      })}
      {/* My conversations header and list */}
      <View style={{ marginTop: 16, width: '100%', flexDirection: isRTL ? 'row-reverse' : 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 8, paddingStart: 16, paddingEnd: 12 }}>
        <Clock size={16} color={'#D0D4E0'} />
        <Text style={{ color: '#D0D4E0', fontWeight: '700', textAlign: isRTL ? 'right' : 'left', writingDirection: isRTL ? 'rtl' : 'ltr' }}>
          השיחות שלי
        </Text>
      </View>
      <View style={{ height: 1, width: '100%', backgroundColor: 'rgba(208,212,224,0.4)', marginTop: 6, marginBottom: 6 }} />
      {(!sessions || sessions.length === 0) && (
        <View style={{ width: '100%', paddingStart: 16, paddingEnd: 12, marginTop: 4 }}>
          <Text style={{ color: '#A7AEC0', textAlign: isRTL ? 'right' : 'left', writingDirection: isRTL ? 'rtl' : 'ltr' }}>
            כרגע אין שיחות קודמות להציג
          </Text>
        </View>
      )}
      {sessions?.length > 0 && (
        <View style={{ marginTop: 4, width: '100%' }}>
          {sessions.map((c) => (
            <Pressable
              key={c.id}
              onPress={() => {
                dispatch(switchToConversation(c.id));
                dispatch(setMessages(c.messages || []));
                navigation.navigate('index');
              }}
              style={{
                flexDirection: isRTL ? 'row-reverse' : 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: 8,
                paddingVertical: 10,
                paddingStart: 16,
                paddingEnd: 12,
                marginVertical: 2,
                borderRadius: 8,
                backgroundColor: 'transparent',
                width: '100%',
              }}
            >
              <MessageCircle size={18} color={'#D0D4E0'} />
              <Text style={{ color: '#D0D4E0', fontWeight: '500', textAlign: isRTL ? 'right' : 'left', writingDirection: isRTL ? 'rtl' : 'ltr' }}>
                {c.title}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
      {!!profileItem && (
        <View style={{ marginTop: 'auto' }}>
          {(() => {
            const { key, label, Icon } = profileItem;
            const isActive = state?.routeNames[state?.index] === key;
            return (
              <Pressable
                key={key}
                onPress={() => navigation.navigate(key)}
                style={{
                  flexDirection: isRTL ? 'row-reverse' : 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  gap: 8,
                  paddingVertical: 12,
                  paddingStart: 16,
                  paddingEnd: 12,
                  marginVertical: 4,
                  borderRadius: isActive ? 12 : 0,
                  backgroundColor: isActive ? 'rgba(124,58,237,0.18)' : 'transparent',
                  width: '100%',
                }}
              >
                <Icon size={18} color={isActive ? colors.lavender : '#D0D4E0'} />
                <Text style={{
                  color: isActive ? colors.lavender : '#D0D4E0',
                  fontWeight: '600',
                  textAlign: isRTL ? 'right' : 'left',
                  writingDirection: isRTL ? 'rtl' : 'ltr',
                }}>
                  {label}
                </Text>
              </Pressable>
            );
          })()}
        </View>
      )}
    </ScrollView>
  );
}

export default function TabLayout() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const isRTL = useAppSelector(state => state.settings.isRTL);
  const { width } = Dimensions.get('window');

  return (
    <Drawer
      drawerContent={(props) => (
        <CustomDrawerContent {...props} colors={colors} isRTL={isRTL} />
      )}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        drawerPosition: isRTL ? 'right' : 'left',
        defaultStatus: 'closed',
        drawerStyle: {
          width: width * 0.6,
          backgroundColor: '#1b1238',
          borderLeftWidth: isRTL ? 0 : 1,
          borderRightWidth: isRTL ? 1 : 0,
          borderColor: 'rgba(148,163,184,0.15)',
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        },
        drawerActiveTintColor: colors.lavender,
        drawerInactiveTintColor: '#D0D4E0',
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: '600',
          textAlign: isRTL ? 'right' : 'left',
          writingDirection: isRTL ? 'rtl' : 'ltr',
        },
        drawerActiveBackgroundColor: 'rgba(124,58,237,0.18)',
        drawerItemStyle: {
          borderRadius: 0,
          marginHorizontal: 8,
          marginVertical: 4,
        },
        sceneStyle: {
          backgroundColor: 'transparent',
        },
      }}
    >
      {/* Show index with custom title */}
      <Drawer.Screen name="index" options={{ title: 'ניארה' }} />
      <Drawer.Screen name="chat" options={{ title: t('chat'), drawerItemStyle: { display: 'none' } }} />
      <Drawer.Screen name="resources" options={{ title: t('resources') }} />
      <Drawer.Screen name="profile" options={{ title: t('profile') }} />
    </Drawer>
  );
}