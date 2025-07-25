import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { posStyles } from '../../assets/styles/pos.styles';
import PosHeader from '../../components/pos/PosHeader';
import SideDrawer from '../../components/pos/SideDrawer';

const SupportScreen = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  return (
    <View style={posStyles.container}>
      {/* Side Drawer */}
      <SideDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        activeRoute="support"
      />
      
      {/* Header */}
      <PosHeader 
        title="Support" 
        onMenuPress={() => setIsDrawerOpen(true)}
      />
      
      {/* Placeholder Content */}
      <View style={posStyles.emptyState}>
        <Text style={posStyles.emptyStateTitle}>Support</Text>
        <Text style={posStyles.emptyStateSubtitle}>Get help and access documentation</Text>
      </View>
    </View>
  );
};

export default SupportScreen;
