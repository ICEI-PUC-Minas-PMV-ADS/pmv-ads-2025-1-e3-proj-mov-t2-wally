import { Tabs } from 'expo-router';
import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { PortalProvider } from '@gorhom/portal';
import * as Animatable from "react-native-animatable";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const customEffects = {
    fadeInUp30px: {
      0: {
        opacity: 0,
        translateY: 30, // Start from below
      },
      1: {
        opacity: 1,
        translateY: 0, // End at its normal position
      },
    }
  }
  Animatable.initializeRegistryWithDefinitions(customEffects);
  return (
      <Tabs
        screenOptions={{
          tabBarInactiveTintColor: "#FFFFFF",
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarBackground: TabBarBackground,
          tabBarStyle: {
            backgroundColor: Colors[colorScheme ?? 'light'].tabBarBackground
          },
        }}
      >
        <Tabs.Screen
          name="perfil"
          options={{
            title: 'Perfil',
            tabBarIcon: ({ color, focused }) => <MaterialIcons name="person" size={24} color={focused ? "#9acbd0" : "#ffff"} />,
          }} />
        <Tabs.Screen
          name="index"
          options={{
            title: 'Wallet',
            tabBarIcon: ({ color, focused }) => <MaterialIcons name="account-balance-wallet" size={26} color={focused ? "#9acbd0" : "#ffff"} />,
          }} />
        <Tabs.Screen
          name="grupos"
          options={{
            title: 'Grupos',
            tabBarIcon: ({ color, focused }) => <MaterialIcons name="groups" size={32} color={focused ? "#9acbd0" : "#ffff"} />,
          }} />
      </Tabs>
  );
}
