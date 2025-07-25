import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { posStyles } from '../../../assets/styles/pos.styles';
import PosHeader from '../../../components/pos/PosHeader';
import SideDrawer from '../../../components/pos/SideDrawer';
import { COLORS } from '../../../constants/colors';

const ItemsList = () => {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const goToCreateItem = () => {
    router.push('/(pos)/items/create-item');
  };
  
  return (
    <View style={posStyles.container}>
      {/* Side Drawer */}
      <SideDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        activeRoute="items"
      />
      
   {/* Header */}
      <View style={posStyles.categoryHeader}>
              <TouchableOpacity 
                style={posStyles.backButton}
                onPress={() => router.back()}
              >
                <Ionicons name="arrow-back" size={24} color={COLORS.white} />
              </TouchableOpacity>
              
              <Text style={posStyles.headerTitleText}>Items</Text>
              
                     <TouchableOpacity style={posStyles.searchIconButton}>
                        <Ionicons name="search" size={24} color={COLORS.white} />
                      </TouchableOpacity>
            </View>
      
      {/* Empty State */}
      <View style={posStyles.emptyState}>
        <Ionicons name="list-outline" size={100} color={COLORS.textLight} style={{opacity: 0.5}} />
        <Text style={posStyles.emptyStateTitle}>You have no items yet</Text>
        <Text style={posStyles.emptyStateSubtitle}>Here you can manage your items</Text>
        
        <TouchableOpacity 
          style={posStyles.linkText}
          onPress={() => console.log('Learn more')}
        >
          <Text style={posStyles.linkTextContent}>Learn more</Text>
        </TouchableOpacity>
      </View>
      
      {/* Floating Action Button */}
      <TouchableOpacity 
        style={[posStyles.floatingActionButton, {zIndex: 10}]}
        onPress={goToCreateItem}
      >
        <Ionicons name="add" size={24} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
};

export default ItemsList;
