import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { posStyles } from '../../assets/styles/pos.styles';
import PosHeader from '../../components/pos/PosHeader';
import SideDrawer from '../../components/pos/SideDrawer';
import { PosList } from '../../components/pos/PosListComponents';
import { useReceipts } from '../../hooks/usePosData';
import { COLORS } from '../../constants/colors';

const ReceiptsScreen = () => {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  
  const { receipts, loading, error, refreshing, refresh } = useReceipts();
  
  const filteredReceipts = useMemo(() => {
    if (!searchQuery.trim()) return receipts;
    return receipts.filter(receipt => 
      receipt.receiptNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      receipt.id?.toString().includes(searchQuery)
    );
  }, [receipts, searchQuery]);
  
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const formatAmount = (amount) => {
    if (!amount && amount !== 0) return '₱0.00';
    return `₱${parseFloat(amount).toFixed(2)}`;
  };
  
  const handleViewReceipt = (receipt) => {
    // Navigate to receipt details if needed
    console.log('View receipt:', receipt.id);
  };
  
  return (
    <View style={posStyles.container}>
      {/* Side Drawer */}
      <SideDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        activeRoute="receipts"
      />
      
      {/* Header */}
      <View style={posStyles.categoryHeader}>
        <TouchableOpacity 
          style={posStyles.backButton}
          onPress={() => setIsDrawerOpen(true)}
        >
          <Ionicons name="menu" size={24} color={COLORS.white} />
        </TouchableOpacity>
        
        {showSearch ? (
          <TextInput
            style={posStyles.headerSearchInput}
            placeholder="Search receipts..."
            placeholderTextColor={COLORS.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
        ) : (
          <Text style={posStyles.headerTitleText}>Receipts</Text>
        )}
        
        <TouchableOpacity 
          style={posStyles.searchIconButton}
          onPress={() => {
            setShowSearch(!showSearch);
            if (showSearch) setSearchQuery('');
          }}
        >
          <Ionicons name={showSearch ? "close" : "search"} size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      
      {/* Receipts List */}
      <PosList
        data={filteredReceipts}
        loading={loading}
        error={error}
        refreshing={refreshing}
        onRefresh={refresh}
        emptyIcon="receipt-outline"
        emptyTitle="No receipts yet"
        emptySubtitle="Complete a sale to create a receipt"
        renderItem={({ item }) => (
          <TouchableOpacity
            style={posStyles.listItem}
            onPress={() => handleViewReceipt(item)}
          >
            <View style={posStyles.listItemContent}>
              <Text style={posStyles.listItemTitle}>
                {item.receiptNumber || `Receipt #${item.id}`}
              </Text>
              <Text style={posStyles.listItemSubtitle}>{formatDate(item.createdAt)}</Text>
            </View>
            <View style={posStyles.listItemActions}>
              <Text style={[posStyles.listItemTitle, { marginRight: 10 }]}>
                {formatAmount(item.total)}
              </Text>
              <Ionicons name="chevron-forward" size={24} color={COLORS.textLight} />
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default ReceiptsScreen;
