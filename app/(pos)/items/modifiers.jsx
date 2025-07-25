import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { posStyles } from '../../../assets/styles/pos.styles';
import PosHeader from '../../../components/pos/PosHeader';
import SideDrawer from '../../../components/pos/SideDrawer';
import { COLORS } from '../../../constants/colors';

const ModifiersScreen = () => {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const goToCreateModifier = () => {
    router.push('/(pos)/items/create-modifier');
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
              
              <Text style={posStyles.headerTitleText}>Modifiers</Text>
              
                     <TouchableOpacity style={posStyles.searchIconButton}>
                        <Ionicons name="search" size={24} color={COLORS.white} />
                      </TouchableOpacity>
            </View>
      
      {/* Empty State */}
      <View style={posStyles.emptyState}>
        <View style={posStyles.emptyStateIcon}>
          <Ionicons name="document-outline" size={80} color={COLORS.textLight} />
          <Ionicons name="checkmark-circle-outline" size={40} color={COLORS.textLight} style={posStyles.emptyStateOverlayIcon} />
        </View>
        <Text style={posStyles.emptyStateTitle}>You have no item modifiers yet</Text>
        <Text style={posStyles.emptyStateSubtitle}>Create sets of options that can be applied to items.</Text>
        
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
        onPress={goToCreateModifier}
      >
        <Ionicons name="add" size={24} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
};

export default ModifiersScreen;
