import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { posStyles } from '../../../assets/styles/pos.styles';
import SideDrawer from '../../../components/pos/SideDrawer';
import { PosList, PosListItem, ConfirmationModal } from '../../../components/pos/PosListComponents';
import { useCategories } from '../../../hooks/usePosData';
import { COLORS } from '../../../constants/colors';

const CategoriesScreen = () => {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ visible: false, category: null });
  
  const { 
    categories, 
    loading, 
    error, 
    refreshing, 
    refresh, 
    deleteCategory 
  } = useCategories();
  
  const goToCreateCategory = () => {
    router.push('/(pos)/items/create-category');
  };

  const handleEditCategory = (category) => {
    router.push({
      pathname: '/(pos)/items/create-category',
      params: { 
        id: category.id, 
        name: category.name, 
        color: category.color,
        mode: 'edit'
      }
    });
  };

  const handleDeleteCategory = async () => {
    if (!deleteModal.category) return;
    
    const result = await deleteCategory(deleteModal.category.id);
    setDeleteModal({ visible: false, category: null });
    
    if (!result.success) {
      Alert.alert('Error', result.error || 'Failed to delete category');
    }
  };

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCategory = ({ item }) => (
    <PosListItem
      item={item}
      leftColor={item.color || '#757575'}
      title={item.name}
      onPress={() => handleEditCategory(item)}
      onLongPress={() => setDeleteModal({ visible: true, category: item })}
    />
  );
  
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
        
        <Text style={posStyles.headerTitleText}>Categories</Text>
        
        <TouchableOpacity 
          style={posStyles.searchIconButton}
          onPress={() => setShowSearch(!showSearch)}
        >
          <Ionicons name={showSearch ? "close" : "search"} size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      
      {/* Search Bar */}
      {showSearch && (
        <View style={posStyles.formField}>
          <TextInput
            style={posStyles.formInput}
            placeholder="Search categories..."
            placeholderTextColor={COLORS.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
        </View>
      )}
      
      {/* Categories List */}
      <PosList
        data={filteredCategories}
        loading={loading}
        error={error}
        refreshing={refreshing}
        onRefresh={refresh}
        renderItem={renderCategory}
        emptyIcon="grid-outline"
        emptyTitle="You have no categories yet"
        emptySubtitle="Create categories to organize your items"
      />
      
      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        visible={deleteModal.visible}
        title="Delete Category"
        message={`Are you sure you want to delete "${deleteModal.category?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={handleDeleteCategory}
        onCancel={() => setDeleteModal({ visible: false, category: null })}
        isDestructive
      />
      
      {/* Floating Action Button */}
      <TouchableOpacity 
        style={[posStyles.floatingActionButton, {zIndex: 10}]}
        onPress={goToCreateCategory}
      >
        <Ionicons name="add" size={24} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
};

export default CategoriesScreen;
