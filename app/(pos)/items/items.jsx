import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { posStyles } from '../../../assets/styles/pos.styles';
import SideDrawer from '../../../components/pos/SideDrawer';
import { PosList, ConfirmationModal } from '../../../components/pos/PosListComponents';
import { useItems } from '../../../hooks/usePosData';
import { COLORS } from '../../../constants/colors';

const ItemsList = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ visible: false, item: null });
  
  const { items, loading, error, refreshing, refresh, deleteItem } = useItems();
  
  // Filter items by category if categoryId is passed
  const filteredItems = useMemo(() => {
    let result = items;
    
    if (params.categoryId) {
      result = result.filter(item => item.categoryId === parseInt(params.categoryId));
    }
    
    if (searchQuery.trim()) {
      result = result.filter(item => 
        item.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return result;
  }, [items, searchQuery, params.categoryId]);
  
  const goToCreateItem = () => {
    router.push({
      pathname: '/(pos)/items/create-item',
      params: params.categoryId ? { categoryId: params.categoryId } : {}
    });
  };
  
  const handleEditItem = (item) => {
    router.push({
      pathname: '/(pos)/items/create-item',
      params: { 
        mode: 'edit', 
        id: item.id, 
        name: item.name,
        price: item.price?.toString(),
        categoryId: item.categoryId,
        soldByWeight: item.soldByWeight ? 'true' : 'false',
        sku: item.sku || '',
        barcode: item.barcode || '',
        color: item.color || ''
      }
    });
  };
  
  const handleDeleteItem = async () => {
    if (!deleteModal.item) return;
    
    const result = await deleteItem(deleteModal.item.id);
    setDeleteModal({ visible: false, item: null });
    
    if (!result.success) {
      alert(result.error || 'Failed to delete item');
    }
  };
  
  const formatPrice = (price) => {
    if (!price && price !== 0) return 'No price';
    return `₱${parseFloat(price).toFixed(2)}`;
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
            placeholder="Search items..."
            placeholderTextColor={COLORS.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
        ) : (
          <Text style={posStyles.headerTitleText}>Items</Text>
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
      
      {/* Items List */}
      <PosList
        data={filteredItems}
        loading={loading}
        error={error}
        refreshing={refreshing}
        onRefresh={refresh}
        emptyIcon="pricetag-outline"
        emptyTitle="You have no items yet"
        emptySubtitle="Here you can manage your items"
        renderItem={({ item }) => (
          <TouchableOpacity
            style={posStyles.listItem}
            onPress={() => handleEditItem(item)}
            onLongPress={() => setDeleteModal({ visible: true, item })}
          >
            <View style={[posStyles.listItemColorBar, { backgroundColor: item.color || COLORS.primary }]} />
            <View style={posStyles.listItemContent}>
              <Text style={posStyles.listItemTitle}>{item.name}</Text>
              <Text style={posStyles.listItemSubtitle}>{formatPrice(item.price)}</Text>
            </View>
            <View style={posStyles.listItemActions}>
              <TouchableOpacity onPress={() => handleEditItem(item)}>
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
        onPress={goToCreateItem}
      >
        <Ionicons name="add" size={24} color={COLORS.white} />
      </TouchableOpacity>
      
      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        visible={deleteModal.visible}
        title="Delete Item"
        message={`Are you sure you want to delete "${deleteModal.item?.name}"?`}
        confirmText="Delete"
        onConfirm={handleDeleteItem}
        onCancel={() => setDeleteModal({ visible: false, item: null })}
      />
    </View>
  );
};

export default ItemsList;
