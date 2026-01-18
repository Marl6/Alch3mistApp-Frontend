import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Switch } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { posStyles } from '../../../assets/styles/pos.styles';
import { COLORS } from '../../../constants/colors';
import { useModifiers } from '../../../hooks/usePosData';

const CreateModifierScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const isEditMode = params.mode === 'edit';
  
  const [name, setName] = useState('');
  const [required, setRequired] = useState(false);
  const [multiSelect, setMultiSelect] = useState(false);
  const [options, setOptions] = useState([{ id: Date.now(), name: '', price: '' }]);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  
  const { createModifier, updateModifier } = useModifiers();
  
  // Pre-fill form if editing
  useEffect(() => {
    if (isEditMode) {
      setName(params.name || '');
      setRequired(params.required === 'true');
      setMultiSelect(params.multiSelect === 'true');
      // Options would need to be fetched separately or passed as JSON
    }
  }, [params]);
  
  const addOption = () => {
    setOptions([...options, { id: Date.now(), name: '', price: '' }]);
  };
  
  const removeOption = (id) => {
    if (options.length <= 1) {
      Alert.alert('Error', 'At least one option is required');
      return;
    }
    setOptions(options.filter(opt => opt.id !== id));
  };
  
  const updateOption = (id, field, value) => {
    setOptions(options.map(opt => 
      opt.id === id ? { ...opt, [field]: value } : opt
    ));
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!name.trim()) {
      newErrors.name = 'Modifier name is required';
    }
    
    const validOptions = options.filter(opt => opt.name.trim());
    if (validOptions.length === 0) {
      newErrors.options = 'At least one option with a name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSave = async () => {
    if (!validateForm()) return;
    
    setSaving(true);
    
    const validOptions = options
      .filter(opt => opt.name.trim())
      .map(opt => ({
        name: opt.name.trim(),
        price: opt.price ? parseFloat(opt.price) : 0
      }));
    
    const modifierData = {
      name: name.trim(),
      required,
      multiSelect,
      options: validOptions
    };
    
    try {
      let result;
      
      if (isEditMode) {
        result = await updateModifier(parseInt(params.id), modifierData);
      } else {
        result = await createModifier(modifierData);
      }
      
      if (result.success) {
        router.back();
      } else {
        Alert.alert('Error', result.error || 'Failed to save modifier');
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
          {isEditMode ? 'Edit modifier' : 'Create modifier'}
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
        {/* Modifier Name */}
        <View style={posStyles.formField}>
          <TextInput
            style={[posStyles.formInput, errors.name && posStyles.inputError]}
            placeholder="Modifier name"
            placeholderTextColor={COLORS.textLight}
            value={name}
            onChangeText={(text) => {
              setName(text);
              if (errors.name) setErrors({...errors, name: null});
            }}
          />
          {errors.name && <Text style={posStyles.errorText}>{errors.name}</Text>}
        </View>
        
        {/* Modifier Settings */}
        <View style={posStyles.formField}>
          <View style={posStyles.switchRow}>
            <Text style={posStyles.switchLabel}>Required</Text>
            <Switch
              value={required}
              onValueChange={setRequired}
              trackColor={{ false: COLORS.border, true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          </View>
          <Text style={posStyles.formHint}>Customer must select an option</Text>
        </View>
        
        <View style={posStyles.formField}>
          <View style={posStyles.switchRow}>
            <Text style={posStyles.switchLabel}>Allow multiple selections</Text>
            <Switch
              value={multiSelect}
              onValueChange={setMultiSelect}
              trackColor={{ false: COLORS.border, true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          </View>
        </View>
        
        {/* Options */}
        <View style={posStyles.sectionHeader}>
          <Text style={posStyles.sectionHeaderText}>Options</Text>
        </View>
        
        {errors.options && (
          <Text style={[posStyles.errorText, { marginHorizontal: 15 }]}>{errors.options}</Text>
        )}
        
        {options.map((option, index) => (
          <View key={option.id} style={posStyles.optionContainer}>
            <View style={posStyles.optionHeader}>
              <Ionicons name="reorder-three" size={24} color={COLORS.textLight} />
              <TextInput
                style={posStyles.optionNameInput}
                placeholder={`Option ${index + 1}`}
                placeholderTextColor={COLORS.textLight}
                value={option.name}
                onChangeText={(text) => updateOption(option.id, 'name', text)}
              />
              <TouchableOpacity onPress={() => removeOption(option.id)}>
                <Ionicons name="trash-bin" size={24} color={COLORS.textLight} />
              </TouchableOpacity>
            </View>
            
            <View style={posStyles.formField}>
              <Text style={posStyles.formLabel}>Price</Text>
              <TextInput
                style={posStyles.formInput}
                placeholder="₱0.00"
                placeholderTextColor={COLORS.textLight}
                keyboardType="numeric"
                value={option.price}
                onChangeText={(text) => updateOption(option.id, 'price', text)}
              />
            </View>
          </View>
        ))}
        
        {/* Add Option Button */}
        <TouchableOpacity style={posStyles.addOptionButton} onPress={addOption}>
          <Ionicons name="add-circle" size={24} color={COLORS.primary} />
          <Text style={posStyles.addOptionText}>ADD OPTION</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default CreateModifierScreen;
