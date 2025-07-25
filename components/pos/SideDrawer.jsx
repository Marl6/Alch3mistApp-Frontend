import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Animated, Dimensions, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { posStyles } from '../../assets/styles/pos.styles';

const SideDrawer = ({ isOpen, onClose, activeRoute }) => {
  const router = useRouter();
  const slideAnim = useRef(new Animated.Value(-280)).current;
  const screenWidth = Dimensions.get('window').width;
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  
  React.useEffect(() => {
    if (isOpen) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0.5,
          duration: 250,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -280,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [isOpen, slideAnim, overlayOpacity]);

  const navigateTo = (route) => {
    router.push(route);
    onClose();
  };
  
  const navItems = [
    { name: 'index', icon: 'basket-outline', route: '/(pos)/', label: 'Sales' },
    { name: 'receipts', icon: 'receipt-outline', route: '/(pos)/receipts', label: 'Receipts' },
    { name: 'shift', icon: 'time-outline', route: '/(pos)/shift', label: 'Shift' },
    { name: 'items', icon: 'list-outline', route: '/(pos)/items', label: 'Items' },
    { name: 'settings', icon: 'settings-outline', route: '/(pos)/settings', label: 'Settings' },
    { name: 'backoffice', icon: 'bar-chart-outline', route: '/(pos)/backoffice', label: 'Back Office' },
    { name: 'apps', icon: 'apps-outline', route: '/(pos)/apps', label: 'Apps' },
    { name: 'support', icon: 'information-circle-outline', route: '/(pos)/support', label: 'Support' },
  ];

  if (!isOpen) {
    return null;
  }

  return (
    <View style={{ 
      position: 'absolute', 
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0, 
      zIndex: 1000 
    }}>
      {/* Overlay */}
      <TouchableOpacity 
        activeOpacity={1}
        onPress={onClose} 
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'black',
          opacity: 0.5
        }}
      />
      
      {/* Drawer */}
      <Animated.View 
        style={[
          posStyles.drawer,
          { transform: [{ translateX: slideAnim }] }
        ]}
      >
        <View style={posStyles.drawerHeader}>
          <Text style={posStyles.drawerHeaderTitle}>Alch3mist 2.0</Text>
          <Text style={posStyles.drawerHeaderSubtitle}>POS 1</Text>
        </View>
        
        <ScrollView>
          {navItems.map((item) => (
            <TouchableOpacity
              key={item.name}
              style={[
                posStyles.navigationItem,
                activeRoute === item.name && { backgroundColor: 'rgba(139, 89, 62, 0.1)' }
              ]}
              onPress={() => navigateTo(item.route)}
            >
              <Ionicons
                name={item.icon}
                size={24}
                color={activeRoute === item.name ? '#8B593E' : '#4A3428'}
              />
              <Text 
                style={[
                  posStyles.navigationText, 
                  activeRoute === item.name && posStyles.navigationTextActive
                ]}
              >
                {item.label || (item.name.charAt(0).toUpperCase() + item.name.slice(1))}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default SideDrawer;
