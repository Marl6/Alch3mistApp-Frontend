import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { posStyles } from '../../assets/styles/pos.styles';

const PosNavigation = ({ activeRoute }) => {
  const router = useRouter();

  const navItems = [
    { name: 'sales', icon: 'basket-outline', route: '/(pos)/' },
    { name: 'receipts', icon: 'receipt-outline', route: '/(pos)/receipts' },
    { name: 'shift', icon: 'time-outline', route: '/(pos)/shift' },
    { name: 'items', icon: 'list-outline', route: '/(pos)/items' },
    { name: 'settings', icon: 'settings-outline', route: '/(pos)/settings' },
    { name: 'back office', icon: 'bar-chart-outline', route: '/(pos)/backoffice' },
    { name: 'apps', icon: 'apps-outline', route: '/(pos)/apps' },
    { name: 'support', icon: 'information-circle-outline', route: '/(pos)/support' },
  ];

  return (
    <View style={posStyles.navigationContainer}>
      {navItems.map((item) => (
        <TouchableOpacity
          key={item.name}
          style={posStyles.navigationItem}
          onPress={() => router.push(item.route)}
        >
          <Ionicons
            name={item.icon}
            size={24}
            color={activeRoute === item.name ? '#4CAF50' : '#fff'}
          />
          <Text 
            style={[
              posStyles.navigationText, 
              activeRoute === item.name && posStyles.navigationTextActive
            ]}
          >
            {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default PosNavigation;
