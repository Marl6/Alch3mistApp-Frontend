import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { posStyles } from '../../assets/styles/pos.styles';
import PosHeader from '../../components/pos/PosHeader';
import SideDrawer from '../../components/pos/SideDrawer';

const ShiftScreen = () => {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  // Example data from screenshot
  const shiftData = {
    shiftNumber: 1,
    openedBy: "Owner",
    openedAt: "10/05/2025, 14:33",
    startingCash: "₱0.00",
    cashPayments: "₱0.00",
    cashRefunds: "₱0.00",
    paidIn: "₱8.88",
    paidOut: "₱0.00",
    expectedCash: "₱8.88",
    grossSales: "₱0.00",
    refunds: "₱0.00"
  };
  
  return (
    <View style={posStyles.container}>
      {/* Side Drawer */}
      <SideDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        activeRoute="shift"
      />
      
      {/* Header */}
      <PosHeader 
        title="Shift" 
        onMenuPress={() => setIsDrawerOpen(true)}
      />
      
      <ScrollView>
        {/* Action Buttons */}
        <View style={posStyles.actionButtons}>
          <TouchableOpacity style={posStyles.actionButton}>
            <Text style={posStyles.actionButtonText}>CASH MANAGEMENT</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={posStyles.actionButton}>
            <Text style={posStyles.actionButtonText}>CLOSE SHIFT</Text>
          </TouchableOpacity>
        </View>
        
        {/* Shift Info */}
        <View style={posStyles.shiftInfo}>
          <View style={posStyles.shiftInfoRow}>
            <Text style={posStyles.shiftInfoLabel}>Shift number:</Text>
            <Text style={posStyles.shiftInfoValue}>{shiftData.shiftNumber}</Text>
          </View>
          
          <View style={posStyles.shiftInfoRow}>
            <Text style={posStyles.shiftInfoLabel}>Shift opened:</Text>
            <Text style={posStyles.shiftInfoValue}>{shiftData.openedBy}</Text>
            <Text style={posStyles.shiftInfoDate}>{shiftData.openedAt}</Text>
          </View>
        </View>
        
        {/* Cash Drawer Section */}
        <View style={posStyles.section}>
          <Text style={posStyles.sectionTitle}>Cash drawer</Text>
          
          <View style={posStyles.shiftInfoRow}>
            <Text style={posStyles.shiftInfoLabel}>Starting cash</Text>
            <Text style={posStyles.shiftInfoValue}>{shiftData.startingCash}</Text>
          </View>
          
          <View style={posStyles.shiftInfoRow}>
            <Text style={posStyles.shiftInfoLabel}>Cash payments</Text>
            <Text style={posStyles.shiftInfoValue}>{shiftData.cashPayments}</Text>
          </View>
          
          <View style={posStyles.shiftInfoRow}>
            <Text style={posStyles.shiftInfoLabel}>Cash refunds</Text>
            <Text style={posStyles.shiftInfoValue}>{shiftData.cashRefunds}</Text>
          </View>
          
          <View style={posStyles.shiftInfoRow}>
            <Text style={posStyles.shiftInfoLabel}>Paid in</Text>
            <Text style={posStyles.shiftInfoValue}>{shiftData.paidIn}</Text>
          </View>
          
          <View style={posStyles.shiftInfoRow}>
            <Text style={posStyles.shiftInfoLabel}>Paid out</Text>
            <Text style={posStyles.shiftInfoValue}>{shiftData.paidOut}</Text>
          </View>
          
          <View style={posStyles.shiftInfoRow}>
            <Text style={[posStyles.shiftInfoLabel, posStyles.boldText]}>Expected cash amount</Text>
            <Text style={[posStyles.shiftInfoValue, posStyles.boldText]}>{shiftData.expectedCash}</Text>
          </View>
        </View>
        
        {/* Sales Summary */}
        <View style={posStyles.section}>
          <Text style={posStyles.sectionTitle}>Sales summary</Text>
          
          <View style={posStyles.shiftInfoRow}>
            <Text style={posStyles.shiftInfoLabel}>Gross sales</Text>
            <Text style={posStyles.shiftInfoValue}>{shiftData.grossSales}</Text>
          </View>
          
          <View style={posStyles.shiftInfoRow}>
            <Text style={posStyles.shiftInfoLabel}>Refunds</Text>
            <Text style={posStyles.shiftInfoValue}>{shiftData.refunds}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ShiftScreen;
