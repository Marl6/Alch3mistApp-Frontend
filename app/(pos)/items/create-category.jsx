import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { posStyles } from '../../../assets/styles/pos.styles';
import { useCategories } from '../../../hooks/usePosData';
import { COLORS } from '../../../constants/colors';

const CreateCategoryScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const isEditMode = params.mode === 'edit';
  
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState('gray');
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  
  const { createCategory, updateCategory } = useCategories();
  
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

  // Pre-fill form if editing
  useEffect(() => {
    if (isEditMode && params.name) {
      setName(params.name);
      // Find color by hex value
      const colorMatch = colors.find(c => c.color === params.color);
      if (colorMatch) {
        setSelectedColor(colorMatch.id);
      }
    }
  }, [params]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!name.trim()) {
      newErrors.name = 'Category name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    
    setSaving(true);
    
    const categoryData = {
      name: name.trim(),
      color: colors.find(c => c.id === selectedColor)?.color || '#757575'
    };
    
    try {
      let result;
      
      if (isEditMode) {
        result = await updateCategory(parseInt(params.id), categoryData);
      } else {
        result = await createCategory(categoryData);
      }
      
      if (result.success) {
        router.back();
      } else {
        Alert.alert('Error', result.error || 'Failed to save category');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setSaving(false);
    }
  };

  const handleAssignItems = () => {
    if (!params.id) {
      Alert.alert('Save First', 'Please save the category first before assigning items.');
      return;
    }
    router.push({
      pathname: '/(pos)/items/items',
      params: { categoryId: params.id }
    });
  };

  const handleCreateItem = () => {
    if (!params.id) {
      Alert.alert('Save First', 'Please save the category first before creating items.');
      return;
    }
    router.push({
      pathname: '/(pos)/items/create-item',
      params: { categoryId: params.id }
    });
  };
  
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
          {isEditMode ? 'Edit category' : 'Create category'}
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
        {/* Category Name */}
        <View style={posStyles.formField}>
          <TextInput
            style={[
              posStyles.formInput, 
              errors.name && posStyles.inputError
            ]}
            placeholder="Category name"
            placeholderTextColor={COLORS.textLight}
            value={name}
            onChangeText={(text) => {
              setName(text);
              if (errors.name) setErrors({...errors, name: null});
            }}
          />
          {errors.name && (
            <Text style={posStyles.errorText}>{errors.name}</Text>
          )}
        </View>
        
        {/* Category Color */}
        <View style={posStyles.formField}>
          <Text style={posStyles.formLabel}>Category color</Text>
          
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
        </View>
        
        {/* Action Buttons - Only show in edit mode */}
        {isEditMode && (
          <View style={{padding: 15}}>
            <TouchableOpacity 
              style={[posStyles.actionButton, {backgroundColor: COLORS.primary}]}
              onPress={handleAssignItems}
            >
              <Text style={[posStyles.actionButtonText, {color: COLORS.white}]}>ASSIGN ITEMS</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[posStyles.actionButton, {backgroundColor: COLORS.primary}]}
              onPress={handleCreateItem}
            >
              <Text style={[posStyles.actionButtonText, {color: COLORS.white}]}>CREATE ITEM</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default CreateCategoryScreen;
