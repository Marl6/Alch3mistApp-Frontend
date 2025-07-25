import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { posStyles } from '../../../assets/styles/pos.styles';
import { COLORS } from '../../../constants/colors';

const CreateCategoryScreen = () => {
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState('gray');
  
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
  
  return (
    <View style={posStyles.container}>
      {/* Header */}
      <View style={posStyles.categoryHeader}>
        <TouchableOpacity 
          style={posStyles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        
        <Text style={posStyles.headerTitleText}>Create category</Text>
        
        <TouchableOpacity 
          style={posStyles.saveButton}
          onPress={() => router.back()}
        >
          <Text style={posStyles.saveButtonText}>SAVE</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={{flex: 1}}>
        {/* Category Name */}
        <View style={posStyles.formField}>
          <TextInput
            style={posStyles.formInput}
            placeholder="Category name"
            placeholderTextColor={COLORS.textLight}
          />
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
        
        {/* Action Buttons */}
        <View style={{padding: 15}}>
          <TouchableOpacity 
            style={[posStyles.actionButton, {backgroundColor: COLORS.primary}]}
            onPress={() => console.log('Assign items')}
          >
            <Text style={[posStyles.actionButtonText, {color: COLORS.white}]}>ASSIGN ITEMS</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[posStyles.actionButton, {backgroundColor: COLORS.primary}]}
            onPress={() => console.log('Create item')}
          >
            <Text style={[posStyles.actionButtonText, {color: COLORS.white}]}>CREATE ITEM</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateCategoryScreen;
