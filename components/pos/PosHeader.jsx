import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { posStyles } from '../../assets/styles/pos.styles';
import { COLORS } from '../../constants/colors';

const PosHeader = ({ title, onMenuPress }) => {
  const router = useRouter();

  return (
    <View style={posStyles.header}>
      <TouchableOpacity 
        style={posStyles.menuButton}
        onPress={onMenuPress}
      >
        <Ionicons name="menu" size={24} color={COLORS.white} />
      </TouchableOpacity>
      
      <View style={posStyles.headerTitle}>
        <Text style={posStyles.headerTitleText}>{title}</Text>
        <TouchableOpacity style={posStyles.headerIcon}>
          <Ionicons name="receipt-outline" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      
      <View style={posStyles.headerRight}>
        <TouchableOpacity style={posStyles.headerIconButton}>
          <Ionicons name="person-add-outline" size={24} color={COLORS.white} />
        </TouchableOpacity>
        
        <TouchableOpacity style={posStyles.headerIconButton}>
          <Ionicons name="ellipsis-vertical" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PosHeader;
