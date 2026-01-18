import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Ionicons } from '@expo/vector-icons';
import { posStyles } from '../../../assets/styles/pos.styles';
import PosHeader from '../../../components/pos/PosHeader';
import SideDrawer from '../../../components/pos/SideDrawer';
import { COLORS } from '../../../constants/colors';

const SettingsScreen = () => {
  const router = useRouter();
  const { signOut } = useAuth();
  const { user } = useUser();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const email = user?.primaryEmailAddress?.emailAddress || "No email found";
  
  const settingItems = [
    { name: 'Printers', icon: 'print-outline', route: '/settings/printers' },
    { name: 'Taxes', icon: 'cash-outline', route: '/settings/taxes' },
    { name: 'General', icon: 'settings-outline', route: '/settings/general' },
  ];
  
  return (
    <View style={posStyles.container}>
      {/* Side Drawer */}
      <SideDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        activeRoute="settings"
      />
      
      {/* Header */}
      <PosHeader 
        title="Settings" 
        onMenuPress={() => setIsDrawerOpen(true)}
      />
      
      {/* Menu Items */}
      <ScrollView style={posStyles.menuContainer}>
        {settingItems.map((item) => (
          <TouchableOpacity
            key={item.name}
            style={posStyles.menuItem}
            onPress={() => console.log(`Navigate to ${item.route}`)}
          >
            <Ionicons name={item.icon} size={24} color={COLORS.text} style={posStyles.menuItemIcon} />
            <Text style={posStyles.menuItemText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
        
        {/* Back Office Note */}
        <View style={posStyles.noteContainer}>
          <Text style={posStyles.noteText}>More settings are available in the Back Office</Text>
          <View style={posStyles.noteButtonsContainer}>
            <TouchableOpacity 
              style={posStyles.noteButton}
              onPress={() => router.push('/(pos)/backoffice')}
            >
              <Text style={posStyles.noteButtonText}>GO TO BACK OFFICE</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[posStyles.noteButton, posStyles.noteButtonSecondary]}
            >
              <Text style={posStyles.noteButtonTextSecondary}>GOT IT</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Account Info */}
        <View style={posStyles.accountContainer}>
          <Text style={posStyles.accountEmail}>{email}</Text>
          
          <TouchableOpacity 
            style={posStyles.signOutButton}
            onPress={() => {
              Alert.alert(
                "Sign Out",
                "Are you sure you want to sign out?",
                [
                  { 
                    text: "No", 
                    style: "cancel",
                    onPress: () => {
                      // User cancelled, do nothing
                      console.log("Sign out cancelled");
                    }
                  },
                  { 
                    text: "Yes", 
                    style: "destructive",
                    onPress: async () => {
                      try {
                        // Sign out from Clerk
                        await signOut();
                        // Small delay to ensure session is cleared
                        setTimeout(() => {
                          // Navigate to sign-in page
                          router.replace('/sign-in');
                        }, 100);
                      } catch (error) {
                        Alert.alert("Error", "Failed to sign out. Please try again.");
                        console.error("Sign out error:", error);
                      }
                    }
                  }
                ],
                { cancelable: false }
              );
            }}
          >
            <Text style={posStyles.signOutButtonText}>SIGN OUT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
