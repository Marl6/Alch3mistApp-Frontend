/**
 * Custom hooks for POS data management
 * Provides state management and API integration for POS features
 */

import { useState, useEffect, useCallback } from 'react';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { 
  posCategoriesApi, 
  posItemsApi, 
  posModifiersApi, 
  posDiscountsApi,
  posShiftsApi,
  posReceiptsApi,
  posOrdersApi
} from '../services/index.js';

/**
 * Hook for managing categories
 */
export const useCategories = () => {
  const { user } = useUser();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const userId = user?.id;

  const fetchCategories = useCallback(async () => {
    if (!userId) return;
    
    try {
      setError(null);
      const response = await posCategoriesApi.getCategories({ userId });
      if (response.success) {
        setCategories(response.data || []);
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [userId]);

  const createCategory = async (categoryData) => {
    try {
      const response = await posCategoriesApi.createCategory({ 
        ...categoryData, 
        userId 
      });
      if (response.success) {
        setCategories(prev => [...prev, response.data]);
        return { success: true, data: response.data };
      }
      return { success: false, error: response.error };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const updateCategory = async (id, categoryData) => {
    try {
      const response = await posCategoriesApi.updateCategory(id, categoryData);
      if (response.success) {
        setCategories(prev => prev.map(cat => 
          cat.id === id ? response.data : cat
        ));
        return { success: true, data: response.data };
      }
      return { success: false, error: response.error };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const deleteCategory = async (id) => {
    try {
      const response = await posCategoriesApi.deleteCategory(id);
      if (response.success) {
        setCategories(prev => prev.filter(cat => cat.id !== id));
        return { success: true };
      }
      return { success: false, error: response.error };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const refresh = useCallback(() => {
    setRefreshing(true);
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    error,
    refreshing,
    refresh,
    createCategory,
    updateCategory,
    deleteCategory,
    fetchCategories
  };
};

/**
 * Hook for managing items
 */
export const useItems = (categoryId = null) => {
  const { user } = useUser();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const userId = user?.id;

  const fetchItems = useCallback(async (params = {}) => {
    if (!userId) return;
    
    try {
      setError(null);
      const response = await posItemsApi.getItems({ 
        userId, 
        categoryId,
        ...params 
      });
      if (response.success) {
        setItems(response.data || []);
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [userId, categoryId]);

  const createItem = async (itemData) => {
    try {
      const response = await posItemsApi.createItem({ 
        ...itemData, 
        userId 
      });
      if (response.success) {
        setItems(prev => [...prev, response.data]);
        return { success: true, data: response.data };
      }
      return { success: false, error: response.error };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const updateItem = async (id, itemData) => {
    try {
      const response = await posItemsApi.updateItem(id, itemData);
      if (response.success) {
        setItems(prev => prev.map(item => 
          item.id === id ? response.data : item
        ));
        return { success: true, data: response.data };
      }
      return { success: false, error: response.error };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const deleteItem = async (id) => {
    try {
      const response = await posItemsApi.deleteItem(id);
      if (response.success) {
        setItems(prev => prev.filter(item => item.id !== id));
        return { success: true };
      }
      return { success: false, error: response.error };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const refresh = useCallback(() => {
    setRefreshing(true);
    fetchItems();
  }, [fetchItems]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return {
    items,
    loading,
    error,
    refreshing,
    refresh,
    createItem,
    updateItem,
    deleteItem,
    fetchItems
  };
};

/**
 * Hook for managing modifiers
 */
export const useModifiers = () => {
  const { user } = useUser();
  const [modifiers, setModifiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const userId = user?.id;

  const fetchModifiers = useCallback(async () => {
    if (!userId) return;
    
    try {
      setError(null);
      const response = await posModifiersApi.getModifiers({ userId });
      if (response.success) {
        setModifiers(response.data || []);
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [userId]);

  const createModifier = async (modifierData) => {
    try {
      const response = await posModifiersApi.createModifier({ 
        ...modifierData, 
        userId 
      });
      if (response.success) {
        setModifiers(prev => [...prev, response.data]);
        return { success: true, data: response.data };
      }
      return { success: false, error: response.error };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const updateModifier = async (id, modifierData) => {
    try {
      const response = await posModifiersApi.updateModifier(id, modifierData);
      if (response.success) {
        setModifiers(prev => prev.map(mod => 
          mod.id === id ? response.data : mod
        ));
        return { success: true, data: response.data };
      }
      return { success: false, error: response.error };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const deleteModifier = async (id) => {
    try {
      const response = await posModifiersApi.deleteModifier(id);
      if (response.success) {
        setModifiers(prev => prev.filter(mod => mod.id !== id));
        return { success: true };
      }
      return { success: false, error: response.error };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const refresh = useCallback(() => {
    setRefreshing(true);
    fetchModifiers();
  }, [fetchModifiers]);

  useEffect(() => {
    fetchModifiers();
  }, [fetchModifiers]);

  return {
    modifiers,
    loading,
    error,
    refreshing,
    refresh,
    createModifier,
    updateModifier,
    deleteModifier,
    fetchModifiers
  };
};

/**
 * Hook for managing discounts
 */
export const useDiscounts = () => {
  const { user } = useUser();
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const userId = user?.id;

  const fetchDiscounts = useCallback(async () => {
    if (!userId) return;
    
    try {
      setError(null);
      const response = await posDiscountsApi.getDiscounts({ userId });
      if (response.success) {
        setDiscounts(response.data || []);
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [userId]);

  const createDiscount = async (discountData) => {
    try {
      const response = await posDiscountsApi.createDiscount({ 
        ...discountData, 
        userId 
      });
      if (response.success) {
        setDiscounts(prev => [...prev, response.data]);
        return { success: true, data: response.data };
      }
      return { success: false, error: response.error };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const updateDiscount = async (id, discountData) => {
    try {
      const response = await posDiscountsApi.updateDiscount(id, discountData);
      if (response.success) {
        setDiscounts(prev => prev.map(disc => 
          disc.id === id ? response.data : disc
        ));
        return { success: true, data: response.data };
      }
      return { success: false, error: response.error };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const deleteDiscount = async (id) => {
    try {
      const response = await posDiscountsApi.deleteDiscount(id);
      if (response.success) {
        setDiscounts(prev => prev.filter(disc => disc.id !== id));
        return { success: true };
      }
      return { success: false, error: response.error };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const refresh = useCallback(() => {
    setRefreshing(true);
    fetchDiscounts();
  }, [fetchDiscounts]);

  useEffect(() => {
    fetchDiscounts();
  }, [fetchDiscounts]);

  return {
    discounts,
    loading,
    error,
    refreshing,
    refresh,
    createDiscount,
    updateDiscount,
    deleteDiscount,
    fetchDiscounts
  };
};

/**
 * Hook for managing shifts
 */
export const useShifts = () => {
  const { user } = useUser();
  const [currentShift, setCurrentShift] = useState(null);
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = user?.id;

  const fetchCurrentShift = useCallback(async () => {
    if (!userId) return;
    
    try {
      setError(null);
      const response = await posShiftsApi.getCurrentShift({ userId });
      if (response.success) {
        setCurrentShift(response.data);
      } else {
        setCurrentShift(null);
      }
    } catch (err) {
      setCurrentShift(null);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const fetchShifts = useCallback(async () => {
    if (!userId) return;
    
    try {
      const response = await posShiftsApi.getShifts({ userId });
      if (response.success) {
        setShifts(response.data || []);
      }
    } catch (err) {
      setError(err.message);
    }
  }, [userId]);

  const startShift = async (openedBy, startingCash = 0) => {
    try {
      const response = await posShiftsApi.startShift({ 
        userId, 
        openedBy, 
        startingCash 
      });
      if (response.success) {
        setCurrentShift(response.data);
        return { success: true, data: response.data };
      }
      return { success: false, error: response.error };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const endShift = async (closingCash) => {
    try {
      const response = await posShiftsApi.endShift({ userId, closingCash });
      if (response.success) {
        setCurrentShift(null);
        return { success: true, data: response.data };
      }
      return { success: false, error: response.error };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchCurrentShift();
    fetchShifts();
  }, [fetchCurrentShift, fetchShifts]);

  return {
    currentShift,
    shifts,
    loading,
    error,
    startShift,
    endShift,
    fetchCurrentShift,
    fetchShifts,
    hasOpenShift: !!currentShift
  };
};

/**
 * Hook for managing receipts
 */
export const useReceipts = () => {
  const { user } = useUser();
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const userId = user?.id;

  const fetchReceipts = useCallback(async () => {
    if (!userId) return;
    
    try {
      setError(null);
      const response = await posReceiptsApi.getReceipts({ userId });
      if (response.success) {
        setReceipts(response.data || []);
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [userId]);

  const refresh = useCallback(() => {
    setRefreshing(true);
    fetchReceipts();
  }, [fetchReceipts]);

  useEffect(() => {
    fetchReceipts();
  }, [fetchReceipts]);

  return {
    receipts,
    loading,
    error,
    refreshing,
    refresh,
    fetchReceipts
  };
};

/**
 * Hook for managing orders
 */
export const useOrders = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = user?.id;

  const fetchOrders = useCallback(async (params = {}) => {
    if (!userId) return;
    
    try {
      setError(null);
      const response = await posOrdersApi.getOrders({ userId, ...params });
      if (response.success) {
        setOrders(response.data || []);
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const createOrder = async (orderData) => {
    try {
      const response = await posOrdersApi.createOrder({ ...orderData, userId });
      if (response.success) {
        setOrders(prev => [response.data, ...prev]);
        return { success: true, data: response.data };
      }
      return { success: false, error: response.error };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return {
    orders,
    loading,
    error,
    createOrder,
    fetchOrders
  };
};
