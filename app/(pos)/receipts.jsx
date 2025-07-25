import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { posStyles } from '../../assets/styles/pos.styles';
import PosHeader from '../../components/pos/PosHeader';
import SideDrawer from '../../components/pos/SideDrawer';

const ReceiptsScreen = () => {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  return (
    <View style={posStyles.container}>
      {/* Side Drawer */}
      <SideDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        activeRoute="receipts"
      />
      
      {/* Header */}
      <PosHeader 
        title="Receipts" 
        onMenuPress={() => setIsDrawerOpen(true)}
      />
      
      {/* Empty State or Content */}
      <View style={posStyles.emptyState}>
        <Text style={posStyles.emptyStateTitle}>No receipts yet</Text>
        <Text style={posStyles.emptyStateSubtitle}>Complete a sale to create a receipt</Text>
      </View>
    </View>
  );
};

export default ReceiptsScreen;
