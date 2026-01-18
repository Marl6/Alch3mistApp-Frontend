import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Switch, Alert, ActivityIndicator, Modal, FlatList } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { posStyles } from '../../../assets/styles/pos.styles';
import { COLORS } from '../../../constants/colors';
import { useItems, useCategories } from '../../../hooks/usePosData';

const CreateItemScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const isEditMode = params.mode === 'edit';
  
  // Form state
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState(null);
  const [price, setPrice] = useState('');
  const [cost, setCost] = useState('');
  const [sku, setSku] = useState('');
  const [barcode, setBarcode] = useState('');
  const [sellByWeight, setSellByWeight] = useState(false);
  const [selectedColor, setSelectedColor] = useState('gray');
  const [selectedShape, setSelectedShape] = useState('square');
  const [representationType, setRepresentationType] = useState('color');
  const [trackStock, setTrackStock] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  
  const { createItem, updateItem } = useItems();
  const { categories } = useCategories();
  
  const colors = [
    { id: 'gray', color: '#757575' },
    { id: 'red', color: '#D32F2F' },
    { id: 'pink', color: '#C2185B' },
    { id: 'orange', color: '#FF5722' },
    { id: 'yellow', color: '#AFB42B' },
    { id: 'green', color: '#388E3C' },
    { id: 'blue', color: '#1976D2' },
    { id: 'purple', color: '#7B1FA2' },
  ];
  
  const shapes = [
    { id: 'square', icon: 'square-outline' },
    { id: 'circle', icon: 'ellipse-outline' },
    { id: 'star', icon: 'star-outline' },
    { id: 'hexagon', icon: 'triangle-outline' },
  ];

  // Pre-fill form if editing or has categoryId
  useEffect(() => {
    if (params.categoryId) {
      setCategoryId(parseInt(params.categoryId));
    }
    
    if (isEditMode) {
      setName(params.name || '');
      setPrice(params.price || '');
      setSku(params.sku || '');
      setBarcode(params.barcode || '');
      setSellByWeight(params.soldByWeight === 'true');
      
      if (params.categoryId) {
        setCategoryId(parseInt(params.categoryId));
      }
      
      if (params.color) {
        const colorMatch = colors.find(c => c.color === params.color);
        if (colorMatch) setSelectedColor(colorMatch.id);
      }
    }
  }, [params]);

  const selectedCategory = useMemo(() => {
    return categories.find(c => c.id === categoryId);
  }, [categories, categoryId]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!name.trim()) {
      newErrors.name = 'Item name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    
    setSaving(true);
    
    const itemData = {
      name: name.trim(),
      categoryId: categoryId,
      price: price ? parseFloat(price) : null,
      cost: cost ? parseFloat(cost) : null,
      sku: sku.trim() || null,
      barcode: barcode.trim() || null,
      soldByWeight: sellByWeight,
      color: colors.find(c => c.id === selectedColor)?.color || '#757575',
      trackStock: trackStock
    };
    
    try {
      let result;
      
      if (isEditMode) {
        result = await updateItem(parseInt(params.id), itemData);
      } else {
        result = await createItem(itemData);
      }
      
      if (result.success) {
        router.back();
      } else {
        Alert.alert('Error', result.error || 'Failed to save item');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setSaving(false);
    }
  };

  const CategoryPickerModal = () => (
    <Modal
      visible={showCategoryModal}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setShowCategoryModal(false)}
    >
      <View style={posStyles.modalOverlay}>
        <View style={[posStyles.modalContent, { maxHeight: '60%' }]}>
          <View style={posStyles.modalHeader}>
            <Text style={posStyles.modalTitle}>Select Category</Text>
            <TouchableOpacity onPress={() => setShowCategoryModal(false)}>
              <Ionicons name="close" size={24} color={COLORS.text} />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity
            style={posStyles.modalListItem}
            onPress={() => {
              setCategoryId(null);
              setShowCategoryModal(false);
            }}
          >
            <Text style={posStyles.modalListItemText}>No category</Text>
            {categoryId === null && (
              <Ionicons name="checkmark" size={24} color={COLORS.primary} />
            )}
          </TouchableOpacity>
          
          <FlatList
            data={categories}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={posStyles.modalListItem}
                onPress={() => {
                  setCategoryId(item.id);
                  setShowCategoryModal(false);
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={[posStyles.categoryColorDot, { backgroundColor: item.color }]} />
                  <Text style={posStyles.modalListItemText}>{item.name}</Text>
                </View>
                {categoryId === item.id && (
                  <Ionicons name="checkmark" size={24} color={COLORS.primary} />
                )}
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );
  
  return (
    <View style={posStyles.container}>
      {/* Header */}
      <View style={posStyles.categoryHeader}>
        <TouchableOpacity 
          style={posStyles.backButton}
          onPress={() => router.back()}
          disabled={saving}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        
        <Text style={posStyles.headerTitleText}>
          {isEditMode ? 'Edit item' : 'Create item'}
        </Text>
        
        <TouchableOpacity 
          style={posStyles.saveButton}
          onPress={handleSave}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator size="small" color={COLORS.white} />
          ) : (
            <Text style={posStyles.saveButtonText}>SAVE</Text>
          )}
        </TouchableOpacity>
      </View>
      
      <ScrollView style={{flex: 1}}>
        {/* Item Name */}
        <View style={posStyles.formField}>
          <Text style={posStyles.formLabel}>Name</Text>
          <TextInput
            style={[posStyles.formInput, errors.name && posStyles.inputError]}
            placeholder="Item name"
            placeholderTextColor={COLORS.textLight}
            value={name}
            onChangeText={(text) => {
              setName(text);
              if (errors.name) setErrors({...errors, name: null});
            }}
          />
          {errors.name && <Text style={posStyles.errorText}>{errors.name}</Text>}
        </View>
        
        {/* Category */}
        <View style={posStyles.formField}>
          <Text style={posStyles.formLabel}>Category</Text>
          <TouchableOpacity 
            style={posStyles.dropdownField}
            onPress={() => setShowCategoryModal(true)}
          >
            {selectedCategory ? (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={[posStyles.categoryColorDot, { backgroundColor: selectedCategory.color }]} />
                <Text style={posStyles.dropdownText}>{selectedCategory.name}</Text>
              </View>
            ) : (
              <Text style={posStyles.dropdownText}>No category</Text>
            )}
            <Ionicons name="chevron-down" size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>
        
        {/* Sold by */}
        <View style={posStyles.formField}>
          <Text style={posStyles.formLabel}>Sold by</Text>
          <View style={posStyles.radioGroup}>
            <TouchableOpacity 
              style={posStyles.radioButton}
              onPress={() => setSellByWeight(false)}
            >
              <View style={posStyles.radioButtonOuter}>
                {!sellByWeight && <View style={posStyles.radioButtonInner} />}
              </View>
              <Text style={posStyles.radioButtonText}>Each</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={posStyles.radioButton}
              onPress={() => setSellByWeight(true)}
            >
              <View style={posStyles.radioButtonOuter}>
                {sellByWeight && <View style={posStyles.radioButtonInner} />}
              </View>
              <Text style={posStyles.radioButtonText}>Weight</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Price */}
        <View style={posStyles.formField}>
          <Text style={posStyles.formLabel}>Price</Text>
          <TextInput
            style={posStyles.formInput}
            placeholder="₱0.00"
            placeholderTextColor={COLORS.textLight}
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
          />
          <Text style={posStyles.formHint}>To indicate the price upon sale, leave the field blank</Text>
        </View>
        
        {/* Cost */}
        <View style={posStyles.formField}>
          <Text style={posStyles.formLabel}>Cost</Text>
          <TextInput
            style={posStyles.formInput}
            placeholder="₱0.00"
            placeholderTextColor={COLORS.textLight}
            keyboardType="numeric"
            value={cost}
            onChangeText={setCost}
          />
        </View>
        
        {/* SKU */}
        <View style={posStyles.formField}>
          <Text style={posStyles.formLabel}>SKU</Text>
          <TextInput
            style={posStyles.formInput}
            placeholder="10000"
            placeholderTextColor={COLORS.textLight}
            value={sku}
            onChangeText={setSku}
          />
          <Text style={posStyles.formHint}>Unique identifier assigned to an item</Text>
        </View>
        
        {/* Barcode */}
        <View style={posStyles.formField}>
          <Text style={posStyles.formLabel}>Barcode</Text>
          <TextInput
            style={posStyles.formInput}
            placeholderTextColor={COLORS.textLight}
            value={barcode}
            onChangeText={setBarcode}
          />
        </View>
        
        {/* Inventory Section */}
        <View style={posStyles.sectionHeader}>
          <Text style={posStyles.sectionHeaderText}>Inventory</Text>
        </View>
        
        <View style={posStyles.formField}>
          <View style={posStyles.switchRow}>
            <Text style={posStyles.switchLabel}>Track stock</Text>
            <Switch
              value={trackStock}
              onValueChange={setTrackStock}
              trackColor={{ false: COLORS.border, true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          </View>
        </View>
        
        {/* Representation on POS */}
        <View style={posStyles.sectionHeader}>
          <Text style={posStyles.sectionHeaderText}>Representation on POS</Text>
        </View>
        
        <View style={posStyles.formField}>
          <View style={posStyles.radioGroup}>
            <TouchableOpacity 
              style={posStyles.radioButton}
              onPress={() => setRepresentationType('color')}
            >
              <View style={posStyles.radioButtonOuter}>
                {representationType === 'color' && <View style={posStyles.radioButtonInner} />}
              </View>
              <Text style={posStyles.radioButtonText}>Color and shape</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={posStyles.radioButton}
              onPress={() => setRepresentationType('image')}
            >
              <View style={posStyles.radioButtonOuter}>
                {representationType === 'image' && <View style={posStyles.radioButtonInner} />}
              </View>
              <Text style={posStyles.radioButtonText}>Image</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {representationType === 'color' && (
          <>
            {/* Color Selection */}
            <View style={posStyles.colorGrid}>
              {colors.map((color) => (
                <TouchableOpacity
                  key={color.id}
                  style={[
                    posStyles.colorOption,
                    {backgroundColor: color.color},
                    selectedColor === color.id && posStyles.colorOptionSelected
                  ]}
                  onPress={() => setSelectedColor(color.id)}
                >
                  {selectedColor === color.id && (
                    <Ionicons name="checkmark" size={32} color={COLORS.white} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
            
            {/* Shape Selection */}
            <View style={posStyles.shapeGrid}>
              {shapes.map((shape) => (
                <TouchableOpacity
                  key={shape.id}
                  style={[
                    posStyles.shapeOption,
                    selectedShape === shape.id && posStyles.shapeOptionSelected
                  ]}
                  onPress={() => setSelectedShape(shape.id)}
                >
                  <Ionicons 
                    name={shape.icon} 
                    size={32} 
                    color={selectedShape === shape.id ? COLORS.primary : COLORS.text} 
                  />
                  {selectedShape === shape.id && (
                    <Ionicons 
                      name="checkmark" 
                      size={16} 
                      color={COLORS.white}
                      style={posStyles.shapeCheckmark}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
        
        {representationType === 'image' && (
          <View style={posStyles.formField}>
            <TouchableOpacity style={posStyles.uploadImageButton}>
              <Ionicons name="camera" size={24} color={COLORS.primary} />
              <Text style={posStyles.uploadImageText}>Upload Image</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
      
      {/* Category Picker Modal */}
      <CategoryPickerModal />
    </View>
  );
};

export default CreateItemScreen;
