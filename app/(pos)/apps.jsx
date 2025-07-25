import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { posStyles } from '../../assets/styles/pos.styles';
import PosHeader from '../../components/pos/PosHeader';
import SideDrawer from '../../components/pos/SideDrawer';

const AppsScreen = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  return (
    <View style={posStyles.container}>
      {/* Side Drawer */}
      <SideDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        activeRoute="apps"
      />
      
      {/* Header */}
      <PosHeader 
        title="Apps" 
        onMenuPress={() => setIsDrawerOpen(true)}
      />
      
      {/* Placeholder Content */}
      <View style={posStyles.emptyState}>
        <Text style={posStyles.emptyStateTitle}>Apps</Text>
        <Text style={posStyles.emptyStateSubtitle}>Integrated applications</Text>
      </View>
    </View>
  );
};

export default AppsScreen;
