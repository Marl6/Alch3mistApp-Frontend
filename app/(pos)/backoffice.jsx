import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { posStyles } from '../../assets/styles/pos.styles';
import PosHeader from '../../components/pos/PosHeader';
import SideDrawer from '../../components/pos/SideDrawer';

const BackOfficeScreen = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  return (
    <View style={posStyles.container}>
      {/* Side Drawer */}
      <SideDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        activeRoute="back office"
      />
      
      {/* Header */}
      <PosHeader 
        title="Back Office" 
        onMenuPress={() => setIsDrawerOpen(true)}
      />
      
      {/* Placeholder Content */}
      <View style={posStyles.emptyState}>
        <Text style={posStyles.emptyStateTitle}>Back Office</Text>
        <Text style={posStyles.emptyStateSubtitle}>Advanced settings and management</Text>
      </View>
    </View>
  );
};

export default BackOfficeScreen;
