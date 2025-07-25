import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { posStyles } from '../../../assets/styles/pos.styles';
import { COLORS } from '../../../constants/colors';

const CreateModifierScreen = () => {
  const router = useRouter();
  
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
        
        <Text style={posStyles.headerTitleText}>Create modifier</Text>
        
        <TouchableOpacity 
          style={posStyles.saveButton}
          onPress={() => router.back()}
        >
          <Text style={posStyles.saveButtonText}>SAVE</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={{flex: 1}}>
        {/* Modifier Name */}
        <View style={posStyles.formField}>
          <TextInput
            style={posStyles.formInput}
            placeholder="Modifier name"
            placeholderTextColor={COLORS.textLight}
          />
        </View>
        
        {/* Option */}
        <View style={posStyles.optionContainer}>
          <View style={posStyles.optionHeader}>
            <Ionicons name="reorder-three" size={24} color={COLORS.textLight} />
            <TextInput
              style={posStyles.optionNameInput}
              placeholder="Option name"
              placeholderTextColor={COLORS.textLight}
            />
            <TouchableOpacity>
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
            />
          </View>
        </View>
        
        {/* Add Option Button */}
        <TouchableOpacity style={posStyles.addOptionButton}>
          <Ionicons name="add-circle" size={24} color={COLORS.primary} />
          <Text style={posStyles.addOptionText}>ADD OPTION</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default CreateModifierScreen;
