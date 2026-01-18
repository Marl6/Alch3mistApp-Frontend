import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { posStyles } from '../../../assets/styles/pos.styles';
import { COLORS } from '../../../constants/colors';
import { useDiscounts } from '../../../hooks/usePosData';

const CreateDiscountScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const isEditMode = params.mode === 'edit';
  
  const [name, setName] = useState('');
  const [isPercentage, setIsPercentage] = useState(true);
  const [value, setValue] = useState('');
  const [applyTo, setApplyTo] = useState('all');
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  
  const { createDiscount, updateDiscount } = useDiscounts();
  
  // Pre-fill form if editing
  useEffect(() => {
    if (isEditMode) {
      setName(params.name || '');
      setIsPercentage(params.type === 'percentage');
      setValue(params.value || '');
      setApplyTo(params.applyTo || 'all');
    }
  }, [params]);
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!name.trim()) {
      newErrors.name = 'Discount name is required';
    }
    
    if (!value || parseFloat(value) <= 0) {
      newErrors.value = 'Please enter a valid discount value';
    }
    
    if (isPercentage && parseFloat(value) > 100) {
      newErrors.value = 'Percentage cannot exceed 100%';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSave = async () => {
    if (!validateForm()) return;
    
    setSaving(true);
    
    const discountData = {
      name: name.trim(),
      type: isPercentage ? 'percentage' : 'fixed',
      value: parseFloat(value),
      applyTo
    };
    
    try {
      let result;
      
      if (isEditMode) {
        result = await updateDiscount(parseInt(params.id), discountData);
      } else {
        result = await createDiscount(discountData);
      }
      
      if (result.success) {
        router.back();
      } else {
        Alert.alert('Error', result.error || 'Failed to save discount');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setSaving(false);
    }
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
          {isEditMode ? 'Edit discount' : 'Create discount'}
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
        {/* Discount Name */}
        <View style={posStyles.formField}>
          <TextInput
            style={[posStyles.formInput, errors.name && posStyles.inputError]}
            placeholder="Discount name"
            placeholderTextColor={COLORS.textLight}
            value={name}
            onChangeText={(text) => {
              setName(text);
              if (errors.name) setErrors({...errors, name: null});
            }}
          />
          {errors.name && <Text style={posStyles.errorText}>{errors.name}</Text>}
        </View>
        
        {/* Discount Type */}
        <View style={posStyles.formField}>
          <Text style={posStyles.formLabel}>Discount type</Text>
          <View style={posStyles.discountTypeContainer}>
            <TouchableOpacity 
              style={[
                posStyles.discountTypeButton, 
                isPercentage && posStyles.discountTypeSelected
              ]}
              onPress={() => setIsPercentage(true)}
            >
              <Text style={[
                posStyles.discountTypeText,
                isPercentage && posStyles.discountTypeTextSelected
              ]}>Percentage</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                posStyles.discountTypeButton, 
                !isPercentage && posStyles.discountTypeSelected
              ]}
              onPress={() => setIsPercentage(false)}
            >
              <Text style={[
                posStyles.discountTypeText,
                !isPercentage && posStyles.discountTypeTextSelected
              ]}>Fixed amount</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Discount Value */}
        <View style={posStyles.formField}>
          <Text style={posStyles.formLabel}>
            {isPercentage ? 'Percentage' : 'Amount'}
          </Text>
          <View style={posStyles.discountValueContainer}>
            <TextInput
              style={[posStyles.discountValueInput, errors.value && posStyles.inputError]}
              placeholder={isPercentage ? "0" : "0.00"}
              placeholderTextColor={COLORS.textLight}
              keyboardType="numeric"
              value={value}
              onChangeText={(text) => {
                setValue(text);
                if (errors.value) setErrors({...errors, value: null});
              }}
            />
            <Text style={{ fontSize: 18, color: COLORS.text, marginLeft: 8 }}>
              {isPercentage ? '%' : '₱'}
            </Text>
          </View>
          {errors.value && <Text style={posStyles.errorText}>{errors.value}</Text>}
        </View>
        
        {/* Apply to */}
        <View style={posStyles.formField}>
          <Text style={posStyles.formLabel}>Apply to</Text>
          <View style={posStyles.applyToContainer}>
            <TouchableOpacity 
              style={posStyles.radioButton}
              onPress={() => setApplyTo('all')}
            >
              <View style={posStyles.radioButtonOuter}>
                {applyTo === 'all' && <View style={posStyles.radioButtonInner} />}
              </View>
              <Text style={posStyles.radioButtonText}>Entire order</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={posStyles.radioButton}
              onPress={() => setApplyTo('specific')}
            >
              <View style={posStyles.radioButtonOuter}>
                {applyTo === 'specific' && <View style={posStyles.radioButtonInner} />}
              </View>
              <Text style={posStyles.radioButtonText}>Specific items</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateDiscountScreen;
