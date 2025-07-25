import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { posStyles } from '../../assets/styles/pos.styles';
import SideDrawer from '../../components/pos/SideDrawer';
import PosHeader from '../../components/pos/PosHeader';
import { COLORS } from '../../constants/colors';

const PosHomeScreen = () => {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  
  return (
    <View style={posStyles.container}>
      {/* Side Drawer */}
      <SideDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        activeRoute="index"
      />
      
      {/* Header */}
      <PosHeader 
        title="Ticket" 
        onMenuPress={toggleDrawer}
      />
      
      {/* Open Tickets and Charge Section */}
      <View style={posStyles.ticketActions}>
        <TouchableOpacity 
          style={posStyles.ticketActionButton} 
          onPress={() => console.log('Open Tickets')}
        >
          <Text style={posStyles.ticketActionButtonText}>OPEN TICKETS</Text>
        </TouchableOpacity>
        
        <View style={posStyles.chargeContainer}>
          <Text style={posStyles.chargeTitle}>CHARGE</Text>
          <Text style={posStyles.chargeAmount}>₱0.00</Text>
        </View>
      </View>
      
      {/* Items Filter Section */}
      <View style={posStyles.filterSection}>
        <TouchableOpacity style={posStyles.filterButton}>
          <Text style={posStyles.filterText}>All items</Text>
          <Ionicons name="chevron-down" size={20} color={COLORS.text} />
        </TouchableOpacity>
        
        <TouchableOpacity style={posStyles.searchButton}>
          <Ionicons name="search" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>
      
      {/* Empty State */}
      <View style={posStyles.emptyState}>
        <Text style={posStyles.emptyStateTitle}>You have no items yet</Text>
        <Text style={posStyles.emptyStateSubtitle}>Go to items menu to add an item</Text>
        
        <TouchableOpacity 
          style={posStyles.emptyStateButton}
          onPress={() => router.push('/(pos)/items')}
        >
          <Text style={posStyles.emptyStateButtonText}>GO TO ITEMS</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PosHomeScreen;
