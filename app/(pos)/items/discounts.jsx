import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { posStyles } from '../../../assets/styles/pos.styles';
import SideDrawer from '../../../components/pos/SideDrawer';
import { PosList, ConfirmationModal } from '../../../components/pos/PosListComponents';
import { useDiscounts } from '../../../hooks/usePosData';
import { COLORS } from '../../../constants/colors';

const DiscountsScreen = () => {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ visible: false, discount: null });
  
  const { discounts, loading, error, refreshing, refresh, deleteDiscount } = useDiscounts();
  
  const filteredDiscounts = useMemo(() => {
    if (!searchQuery.trim()) return discounts;
    return discounts.filter(disc => 
      disc.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [discounts, searchQuery]);
  
  const goToCreateDiscount = () => {
    router.push('/(pos)/items/create-discount');
  };
  
  const handleEditDiscount = (discount) => {
    router.push({
      pathname: '/(pos)/items/create-discount',
      params: { 
        mode: 'edit', 
        id: discount.id, 
        name: discount.name,
        type: discount.type,
        value: discount.value?.toString(),
        applyTo: discount.applyTo || 'all'
      }
    });
  };
  
  const handleDeleteDiscount = async () => {
    if (!deleteModal.discount) return;
    
    const result = await deleteDiscount(deleteModal.discount.id);
    setDeleteModal({ visible: false, discount: null });
    
    if (!result.success) {
      alert(result.error || 'Failed to delete discount');
    }
  };
  
  const formatDiscount = (discount) => {
    if (discount.type === 'percentage') {
      return `${discount.value}%`;
    }
    return `₱${parseFloat(discount.value).toFixed(2)}`;
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
        
        {showSearch ? (
          <TextInput
            style={posStyles.headerSearchInput}
            placeholder="Search discounts..."
            placeholderTextColor={COLORS.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
        ) : (
          <Text style={posStyles.headerTitleText}>Discounts</Text>
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
      
      {/* Discounts List */}
      <PosList
        data={filteredDiscounts}
        loading={loading}
        error={error}
        refreshing={refreshing}
        onRefresh={refresh}
        emptyIcon="pricetag-outline"
        emptyTitle="You have no discounts yet"
        emptySubtitle="Create discounts to apply to your items or orders"
        renderItem={({ item }) => (
          <TouchableOpacity
            style={posStyles.listItem}
            onPress={() => handleEditDiscount(item)}
            onLongPress={() => setDeleteModal({ visible: true, discount: item })}
          >
            <View style={posStyles.listItemContent}>
              <Text style={posStyles.listItemTitle}>{item.name}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <View style={[posStyles.badge, { backgroundColor: item.type === 'percentage' ? '#1976D2' : '#388E3C' }]}>
                  <Text style={posStyles.badgeText}>{formatDiscount(item)}</Text>
                </View>
                {item.applyTo && (
                  <Text style={posStyles.listItemSubtitle}>
                    {item.applyTo === 'all' ? 'All items' : item.applyTo === 'specific' ? 'Specific items' : item.applyTo}
                  </Text>
                )}
              </View>
            </View>
            <View style={posStyles.listItemActions}>
              <TouchableOpacity onPress={() => handleEditDiscount(item)}>
                <Ionicons name="chevron-forward" size={24} color={COLORS.textLight} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      
      {/* Floating Action Button */}
      <TouchableOpacity 
        style={[posStyles.floatingActionButton, {zIndex: 10}]}
        onPress={goToCreateDiscount}
      >
        <Ionicons name="add" size={24} color={COLORS.white} />
      </TouchableOpacity>
      
      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        visible={deleteModal.visible}
        title="Delete Discount"
        message={`Are you sure you want to delete "${deleteModal.discount?.name}"?`}
        confirmText="Delete"
        onConfirm={handleDeleteDiscount}
        onCancel={() => setDeleteModal({ visible: false, discount: null })}
      />
    </View>
  );
};

export default DiscountsScreen;
