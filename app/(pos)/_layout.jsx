import React from 'react';
import { Stack } from "expo-router";
import { useAuth } from '@clerk/clerk-expo';
import { Redirect } from "expo-router";

const PosLayout = () => {
  const { isSignedIn } = useAuth();

  // Redirect to sign-in if not signed in
  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="sales" />
      <Stack.Screen name="receipts" />
      <Stack.Screen name="shift" />
      <Stack.Screen name="items/index" options={{ headerShown: false }} />
      <Stack.Screen name="settings/index" options={{ headerShown: false }} />
      <Stack.Screen name="backoffice" />
      <Stack.Screen name="apps" />
      <Stack.Screen name="support" />
    </Stack>
  );
};

export default PosLayout;
