import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator, TextInput, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { posStyles } from '../../assets/styles/pos.styles';
import PosHeader from '../../components/pos/PosHeader';
import SideDrawer from '../../components/pos/SideDrawer';
import { useShifts } from '../../hooks/usePosData';
import { COLORS } from '../../constants/colors';

const ShiftScreen = () => {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cashModal, setCashModal] = useState({ visible: false, type: null });
  const [cashAmount, setCashAmount] = useState('');
  const [closeShiftModal, setCloseShiftModal] = useState(false);
  const [closingCash, setClosingCash] = useState('');
  
  const { 
    shifts, 
    loading, 
    error, 
    refresh, 
    startShift, 
    endShift,
    createShift
  } = useShifts();
  
  // Get the current active shift (most recent that isn't closed)
  const activeShift = shifts.find(s => s.status === 'open') || null;
  
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const formatAmount = (amount) => {
    if (!amount && amount !== 0) return '₱0.00';
    return `₱${parseFloat(amount).toFixed(2)}`;
  };
  
  const handleStartShift = async () => {
    const result = await createShift({ startingCash: 0 });
    if (!result.success) {
      Alert.alert('Error', result.error || 'Failed to start shift');
    }
  };
  
  const handleCloseShift = async () => {
    if (!activeShift) return;
    
    const result = await endShift(activeShift.id, {
      closingCash: parseFloat(closingCash) || 0
    });
    
    setCloseShiftModal(false);
    setClosingCash('');
    
    if (!result.success) {
      Alert.alert('Error', result.error || 'Failed to close shift');
    }
  };
  
  const handleCashManagement = async () => {
    setCashModal({ visible: true, type: 'paidIn' });
  };
  
  // Display loading state
  if (loading && !activeShift) {
    return (
      <View style={[posStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }
  
  // No active shift state
  if (!activeShift) {
    return (
      <View style={posStyles.container}>
        <SideDrawer 
          isOpen={isDrawerOpen} 
          onClose={() => setIsDrawerOpen(false)} 
          activeRoute="shift"
        />
        
        <PosHeader 
          title="Shift" 
          onMenuPress={() => setIsDrawerOpen(true)}
        />
        
        <View style={posStyles.emptyState}>
          <Ionicons name="time-outline" size={100} color={COLORS.textLight} style={{opacity: 0.5}} />
          <Text style={posStyles.emptyStateTitle}>No active shift</Text>
          <Text style={posStyles.emptyStateSubtitle}>Start a shift to begin tracking sales</Text>
          
          <TouchableOpacity 
            style={[posStyles.actionButton, { backgroundColor: COLORS.primary, marginTop: 20 }]}
            onPress={handleStartShift}
          >
            <Text style={[posStyles.actionButtonText, { color: COLORS.white }]}>START SHIFT</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  
  // Calculate shift data
  const shiftData = {
    shiftNumber: activeShift.id,
    openedBy: "Owner",
    openedAt: formatDate(activeShift.startTime),
    startingCash: formatAmount(activeShift.startingCash || 0),
    cashPayments: formatAmount(activeShift.cashPayments || 0),
    cashRefunds: formatAmount(activeShift.cashRefunds || 0),
    paidIn: formatAmount(activeShift.paidIn || 0),
    paidOut: formatAmount(activeShift.paidOut || 0),
    expectedCash: formatAmount(
      (parseFloat(activeShift.startingCash) || 0) + 
      (parseFloat(activeShift.cashPayments) || 0) - 
      (parseFloat(activeShift.cashRefunds) || 0) + 
      (parseFloat(activeShift.paidIn) || 0) - 
      (parseFloat(activeShift.paidOut) || 0)
    ),
    grossSales: formatAmount(activeShift.grossSales || 0),
    refunds: formatAmount(activeShift.refunds || 0)
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
          <TouchableOpacity 
            style={posStyles.actionButton}
            onPress={handleCashManagement}
          >
            <Text style={posStyles.actionButtonText}>CASH MANAGEMENT</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={posStyles.actionButton}
            onPress={() => setCloseShiftModal(true)}
          >
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
      
      {/* Close Shift Modal */}
      <Modal
        visible={closeShiftModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setCloseShiftModal(false)}
      >
        <View style={posStyles.modalOverlay}>
          <View style={posStyles.modalContent}>
            <View style={posStyles.modalHeader}>
              <Text style={posStyles.modalTitle}>Close Shift</Text>
              <TouchableOpacity onPress={() => setCloseShiftModal(false)}>
                <Ionicons name="close" size={24} color={COLORS.text} />
              </TouchableOpacity>
            </View>
            
            <View style={posStyles.modalBody}>
              <Text style={{ marginBottom: 15, color: COLORS.text }}>
                Enter the actual cash amount in the drawer:
              </Text>
              <TextInput
                style={posStyles.formInput}
                placeholder="₱0.00"
                placeholderTextColor={COLORS.textLight}
                keyboardType="numeric"
                value={closingCash}
                onChangeText={setClosingCash}
              />
              <Text style={[posStyles.formHint, { marginTop: 10 }]}>
                Expected: {shiftData.expectedCash}
              </Text>
            </View>
            
            <View style={posStyles.modalFooter}>
              <TouchableOpacity 
                style={[posStyles.modalButton, posStyles.modalButtonCancel]}
                onPress={() => setCloseShiftModal(false)}
              >
                <Text style={posStyles.modalButtonCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={posStyles.modalButton}
                onPress={handleCloseShift}
              >
                <Text style={[posStyles.modalButtonConfirmText, { color: COLORS.primary }]}>Close Shift</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ShiftScreen;
