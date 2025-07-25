import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { posStyles } from '../../../assets/styles/pos.styles';
import { COLORS } from '../../../constants/colors';

const CreateDiscountScreen = () => {
  const router = useRouter();
  const [isPercentage, setIsPercentage] = useState(true);
  
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
        
        <Text style={posStyles.headerTitleText}>Create discount</Text>
        
        <TouchableOpacity 
          style={posStyles.saveButton}
          onPress={() => router.back()}
        >
          <Text style={posStyles.saveButtonText}>SAVE</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={{flex: 1}}>
        {/* Discount Name */}
        <View style={posStyles.formField}>
          <TextInput
            style={posStyles.formInput}
            placeholder="Discount name"
            placeholderTextColor={COLORS.textLight}
          />
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
              style={posStyles.discountValueInput}
              placeholder={isPercentage ? "0%" : "₱0.00"}
              placeholderTextColor={COLORS.textLight}
              keyboardType="numeric"
            />
          </View>
        </View>
        
        {/* Apply to */}
        <View style={posStyles.formField}>
          <Text style={posStyles.formLabel}>Apply to</Text>
          <View style={posStyles.applyToContainer}>
            <TouchableOpacity style={posStyles.radioButton}>
              <View style={posStyles.radioButtonOuter}>
                <View style={posStyles.radioButtonInner} />
              </View>
              <Text style={posStyles.radioButtonText}>Entire order</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={posStyles.radioButton}>
              <View style={posStyles.radioButtonOuter}>
                <View style={[posStyles.radioButtonInner, {backgroundColor: 'transparent'}]} />
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
