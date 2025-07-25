import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { posStyles } from '../../../assets/styles/pos.styles';
import { COLORS } from '../../../constants/colors';

const CreateItemScreen = () => {
  const router = useRouter();
  const [sellByEach, setSellByEach] = useState(true);
  const [selectedColor, setSelectedColor] = useState('gray');
  const [selectedShape, setSelectedShape] = useState('square');
  const [representationType, setRepresentationType] = useState('color');
  const [trackStock, setTrackStock] = useState(false);
  
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
    { id: 'hexagon', icon: 'hexagon-outline' },
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
        
        <Text style={posStyles.headerTitleText}>Create item</Text>
        
        <TouchableOpacity 
          style={posStyles.saveButton}
          onPress={() => router.back()}
        >
          <Text style={posStyles.saveButtonText}>SAVE</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={{flex: 1}}>
        {/* Item Name */}
        <View style={posStyles.formField}>
          <Text style={posStyles.formLabel}>Name</Text>
          <TextInput
            style={posStyles.formInput}
            placeholder="Item name"
            placeholderTextColor={COLORS.textLight}
          />
        </View>
        
        {/* Category */}
        <View style={posStyles.formField}>
          <Text style={posStyles.formLabel}>Category</Text>
          <TouchableOpacity style={posStyles.dropdownField}>
            <Text style={posStyles.dropdownText}>No category</Text>
            <Ionicons name="chevron-down" size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>
        
        {/* Sold by */}
        <View style={posStyles.formField}>
          <Text style={posStyles.formLabel}>Sold by</Text>
          <View style={posStyles.radioGroup}>
            <TouchableOpacity 
              style={posStyles.radioButton}
              onPress={() => setSellByEach(true)}
            >
              <View style={posStyles.radioButtonOuter}>
                {sellByEach && <View style={posStyles.radioButtonInner} />}
              </View>
              <Text style={posStyles.radioButtonText}>Each</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={posStyles.radioButton}
              onPress={() => setSellByEach(false)}
            >
              <View style={posStyles.radioButtonOuter}>
                {!sellByEach && <View style={posStyles.radioButtonInner} />}
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
          />
        </View>
        
        {/* SKU */}
        <View style={posStyles.formField}>
          <Text style={posStyles.formLabel}>SKU</Text>
          <TextInput
            style={posStyles.formInput}
            placeholder="10000"
            placeholderTextColor={COLORS.textLight}
          />
          <Text style={posStyles.formHint}>Unique identifier assigned to an item</Text>
        </View>
        
        {/* Barcode */}
        <View style={posStyles.formField}>
          <Text style={posStyles.formLabel}>Barcode</Text>
          <TextInput
            style={posStyles.formInput}
            placeholderTextColor={COLORS.textLight}
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
    </View>
  );
};

export default CreateItemScreen;
