import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { posStyles } from '../../../assets/styles/pos.styles';
import PosHeader from '../../../components/pos/PosHeader';
import SideDrawer from '../../../components/pos/SideDrawer';
import { COLORS } from '../../../constants/colors';

const ItemsScreen = () => {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const menuItems = [
    { name: 'Items', icon: 'list', route: '/(pos)/items/items' },
    { name: 'Categories', icon: 'grid', route: '/(pos)/items/categories' },
    { name: 'Modifiers', icon: 'options', route: '/(pos)/items/modifiers' },
    { name: 'Discounts', icon: 'pricetag', route: '/(pos)/items/discounts' },
  ];
  
  return (
    <View style={posStyles.container}>
      {/* Side Drawer */}
      <SideDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        activeRoute="items"
      />
      
      {/* Header */}
      <PosHeader 
        title="Items"
        onMenuPress={() => setIsDrawerOpen(true)}
      />
      
      {/* Menu Items */}
      <ScrollView style={posStyles.menuContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.name}
            style={posStyles.menuItem}
            onPress={() => router.push(item.route)}
          >
            <Ionicons name={item.icon} size={24} color={COLORS.text} style={posStyles.menuItemIcon} />
            <Text style={posStyles.menuItemText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default ItemsScreen;
