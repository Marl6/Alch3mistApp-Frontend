import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { posStyles } from '../../../assets/styles/pos.styles';
import SideDrawer from '../../../components/pos/SideDrawer';
import { PosList, ConfirmationModal } from '../../../components/pos/PosListComponents';
import { useModifiers } from '../../../hooks/usePosData';
import { COLORS } from '../../../constants/colors';

const ModifiersScreen = () => {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ visible: false, modifier: null });
  
  const { modifiers, loading, error, refreshing, refresh, deleteModifier } = useModifiers();
  
  const filteredModifiers = useMemo(() => {
    if (!searchQuery.trim()) return modifiers;
    return modifiers.filter(mod => 
      mod.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [modifiers, searchQuery]);
  
  const goToCreateModifier = () => {
    router.push('/(pos)/items/create-modifier');
  };
  
  const handleEditModifier = (modifier) => {
    router.push({
      pathname: '/(pos)/items/create-modifier',
      params: { 
        mode: 'edit', 
        id: modifier.id, 
        name: modifier.name,
        required: modifier.required ? 'true' : 'false',
        multiSelect: modifier.multiSelect ? 'true' : 'false'
      }
    });
  };
  
  const handleDeleteModifier = async () => {
    if (!deleteModal.modifier) return;
    
    const result = await deleteModifier(deleteModal.modifier.id);
    setDeleteModal({ visible: false, modifier: null });
    
    if (!result.success) {
      alert(result.error || 'Failed to delete modifier');
    }
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
            placeholder="Search modifiers..."
            placeholderTextColor={COLORS.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
        ) : (
          <Text style={posStyles.headerTitleText}>Modifiers</Text>
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
      
      {/* Modifiers List */}
      <PosList
        data={filteredModifiers}
        loading={loading}
        error={error}
        refreshing={refreshing}
        onRefresh={refresh}
        emptyIcon="options-outline"
        emptyTitle="You have no item modifiers yet"
        emptySubtitle="Create sets of options that can be applied to items"
        renderItem={({ item }) => (
          <TouchableOpacity
            style={posStyles.listItem}
            onPress={() => handleEditModifier(item)}
            onLongPress={() => setDeleteModal({ visible: true, modifier: item })}
          >
            <View style={posStyles.listItemContent}>
              <Text style={posStyles.listItemTitle}>{item.name}</Text>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                {item.required && (
                  <View style={[posStyles.badge, { backgroundColor: COLORS.primary }]}>
                    <Text style={posStyles.badgeText}>Required</Text>
                  </View>
                )}
                {item.multiSelect && (
                  <View style={[posStyles.badge, { backgroundColor: '#757575' }]}>
                    <Text style={posStyles.badgeText}>Multi-select</Text>
                  </View>
                )}
              </View>
            </View>
            <View style={posStyles.listItemActions}>
              <TouchableOpacity onPress={() => handleEditModifier(item)}>
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
        onPress={goToCreateModifier}
      >
        <Ionicons name="add" size={24} color={COLORS.white} />
      </TouchableOpacity>
      
      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        visible={deleteModal.visible}
        title="Delete Modifier"
        message={`Are you sure you want to delete "${deleteModal.modifier?.name}"?`}
        confirmText="Delete"
        onConfirm={handleDeleteModifier}
        onCancel={() => setDeleteModal({ visible: false, modifier: null })}
      />
    </View>
  );
};

export default ModifiersScreen;
