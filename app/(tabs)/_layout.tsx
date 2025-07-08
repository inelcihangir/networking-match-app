import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { BlurView } from 'expo-blur';

function CustomTabBarBackground() {
  if (Platform.OS === 'ios') {
    return (
      <BlurView
        tint="systemChromeMaterial"
        intensity={100}
        style={StyleSheet.absoluteFill}
      />
    );
  }
  return <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: '#fff', opacity: 0.98 }} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0a7ea4',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: CustomTabBarBackground,
        tabBarStyle: [
          {
            height: Platform.OS === 'web' ? 70 : 64,
            paddingBottom: Platform.OS === 'ios' ? 10 : 4,
            paddingTop: 6,
            backgroundColor: 'transparent',
            shadowColor: '#232946',
            shadowOpacity: 0.08,
            shadowRadius: 12,
            elevation: 8,
            borderTopWidth: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
            zIndex: 100,
            position: 'absolute',
            width: '100%',
          },
        ],
        tabBarLabelStyle: {
          fontSize: 17,
          fontWeight: '700',
          letterSpacing: 0.2,
          marginTop: 0,
          marginBottom: 2,
        },
        tabBarIconStyle: {
          marginBottom: -2,
        },
        tabBarItemStyle: {
          borderRadius: 0,
          margin: 0,
          paddingHorizontal: 0,
          height: '100%',
        },
        tabBarActiveBackgroundColor: '#e3f0fa', // Seçili tab'ın arka planı ana arka plandan farklı ve belirgin
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.crop.circle" color={color} />,
        }}
      />
      <Tabs.Screen
        name="match"
        options={{
          title: 'Match',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.2.square.stack" color={color} />,
        }}
      />
      <Tabs.Screen
        name="tablemap"
        options={{
          title: 'Tables',
          tabBarLabel: 'Tables',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="table" color={color} />,
        }}
      />
    </Tabs>
  );
}
