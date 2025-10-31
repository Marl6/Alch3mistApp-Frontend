/**
 * Example Usage of API Services
 * This file demonstrates how to use the new API services in your components
 */

import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, FlatList } from 'react-native';
import { 
  posItemsApi, 
  posCategoriesApi, 
  favoritesApi,
  authApi,
  posOrdersApi 
} from '../services';

export default function ApiUsageExample() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Example: Load items and categories on component mount
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setLoading(true);
    
    try {
      // Load categories and items in parallel
      const [categoriesResult, itemsResult] = await Promise.all([
        posCategoriesApi.getCategories(),
        posItemsApi.getItems({ limit: 20 })
      ]);

      if (categoriesResult.success) {
        setCategories(categoriesResult.data);
      }

      if (itemsResult.success) {
        setItems(itemsResult.data);
      }

    } catch (error) {
      console.error('Error loading initial data:', error);
      Alert.alert('Error', 'Failed to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Example: Create a new item
  const createNewItem = async () => {
    const newItemData = {
      name: 'Sample Item',
      price: 9.99,
      categoryId: categories[0]?.id || '1',
      description: 'A sample item created through the API',
      active: true
    };

    const result = await posItemsApi.createItem(newItemData);
    
    if (result.success) {
      Alert.alert('Success', 'Item created successfully!');
      // Refresh the items list
      loadInitialData();
    }
    // Error handling is automatic through the base service
  };

  // Example: Add item to favorites
  const addToFavorites = async (item) => {
    // In a real app, you'd get the user ID from authentication context
    const userId = 'current-user-id';
    
    const result = await favoritesApi.addFavorite({
      userId,
      recipeId: item.id,
      title: item.name,
      image: item.image,
      cookTime: '30 mins',
      servings: '4'
    });

    if (result.success) {
      Alert.alert('Success', `${item.name} added to favorites!`);
    }
  };

  // Example: Process a simple order
  const processOrder = async () => {
    if (items.length === 0) {
      Alert.alert('Error', 'No items available to order');
      return;
    }

    const orderData = {
      items: [
        {
          itemId: items[0].id,
          quantity: 2,
          price: items[0].price
        }
      ],
      total: items[0].price * 2,
      paymentMethod: 'cash'
    };

    const result = await posOrdersApi.createOrder(orderData);
    
    if (result.success) {
      Alert.alert('Success', `Order #${result.data.id} created successfully!`);
    }
  };

  // Example: Login user
  const loginUser = async () => {
    const loginData = {
      email: 'test@example.com',
      password: 'password123'
    };

    const result = await authApi.login(loginData);
    
    if (result.success) {
      Alert.alert('Success', 'Login successful!');
      // In a real app, you'd navigate to the main app or update auth state
    }
  };

  const renderItem = ({ item }) => (
    <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
      <Text style={{ color: '#666' }}>${item.price}</Text>
      <Button 
        title="Add to Favorites" 
        onPress={() => addToFavorites(item)}
      />
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
        API Services Example
      </Text>

      <View style={{ marginBottom: 16 }}>
        <Button title="Login User" onPress={loginUser} />
      </View>

      <View style={{ marginBottom: 16 }}>
        <Button title="Create New Item" onPress={createNewItem} />
      </View>

      <View style={{ marginBottom: 16 }}>
        <Button title="Process Order" onPress={processOrder} />
      </View>

      <View style={{ marginBottom: 16 }}>
        <Button title="Refresh Data" onPress={loadInitialData} />
      </View>

      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
        Items ({items.length})
      </Text>

      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
          style={{ flex: 1 }}
        />
      )}
    </View>
  );
}

// Additional examples for different scenarios:

// Example: Search functionality
export const useItemSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchItems = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    const result = await posItemsApi.searchItems(query);
    
    if (result.success) {
      setSearchResults(result.data);
    } else {
      setSearchResults([]);
    }
    
    setLoading(false);
  };

  return { searchResults, loading, searchItems };
};

// Example: Form validation hook
export const useFormValidation = () => {
  const [errors, setErrors] = useState({});

  const validateField = async (fieldName, value, rules) => {
    const { validationService } = await import('../services/utils/validationService');
    
    for (const rule of rules) {
      const validation = rule(value, fieldName);
      if (!validation.isValid) {
        setErrors(prev => ({ ...prev, [fieldName]: validation.message }));
        return false;
      }
    }
    
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
    
    return true;
  };

  return { errors, validateField };
};

// Example: Authentication hook
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCurrentUser();
  }, []);

  const loadCurrentUser = async () => {
    const result = await authApi.getCurrentUser();
    if (result.success) {
      setUser(result.data);
    }
    setLoading(false);
  };

  const login = async (credentials) => {
    const result = await authApi.login(credentials);
    if (result.success) {
      setUser(result.data.user);
      return true;
    }
    return false;
  };

  const logout = async () => {
    await authApi.logout();
    setUser(null);
  };

  return { user, loading, login, logout };
};
