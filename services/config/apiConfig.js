/**
 * API Configuration
 * Centralized configuration for API endpoints and settings
 */

// Base API URL - update this when your backend is deployed
export const API_BASE_URL = __DEV__ 
  ? 'http://localhost:5001/api' 
  : 'https://your-production-api.com/api';

// API Endpoints
export const API_ENDPOINTS = {
  // Health check
  HEALTH: '/health',
  
  // Authentication endpoints
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    VERIFY_EMAIL: '/auth/verify-email',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },

  // User management
  USERS: {
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile',
    SETTINGS: '/users/settings',
  },

  // Favorites (existing)
  FAVORITES: {
    BASE: '/favorites',
    BY_USER: (userId) => `/favorites/${userId}`,
    DELETE: (userId, recipeId) => `/favorites/${userId}/${recipeId}`,
  },

  // Meals/Recipes
  MEALS: {
    BASE: '/meals',
    SEARCH: '/meals/search',
    BY_ID: (id) => `/meals/${id}`,
    CATEGORIES: '/meals/categories',
    BY_CATEGORY: (category) => `/meals/category/${category}`,
    POPULAR: '/meals/popular',
    RECENT: '/meals/recent',
  },

  // POS System endpoints
  POS: {
    // Items management
    ITEMS: {
      BASE: '/pos/items',
      BY_ID: (id) => `/pos/items/${id}`,
      CATEGORIES: '/pos/items/categories',
      BY_CATEGORY: (categoryId) => `/pos/items/category/${categoryId}`,
      SEARCH: '/pos/items/search',
    },
    
    // Categories management
    CATEGORIES: {
      BASE: '/pos/categories',
      BY_ID: (id) => `/pos/categories/${id}`,
    },
    
    // Modifiers (add-ons, variations)
    MODIFIERS: {
      BASE: '/pos/modifiers',
      BY_ID: (id) => `/pos/modifiers/${id}`,
      BY_ITEM: (itemId) => `/pos/modifiers/item/${itemId}`,
    },
    
    // Discounts
    DISCOUNTS: {
      BASE: '/pos/discounts',
      BY_ID: (id) => `/pos/discounts/${id}`,
      ACTIVE: '/pos/discounts/active',
    },
    
    // Orders/Transactions
    ORDERS: {
      BASE: '/pos/orders',
      BY_ID: (id) => `/pos/orders/${id}`,
      CREATE: '/pos/orders',
      UPDATE_STATUS: (id) => `/pos/orders/${id}/status`,
      CANCEL: (id) => `/pos/orders/${id}/cancel`,
    },
    
    // Receipts
    RECEIPTS: {
      BASE: '/pos/receipts',
      BY_ID: (id) => `/pos/receipts/${id}`,
      BY_ORDER: (orderId) => `/pos/receipts/order/${orderId}`,
      PRINT: (id) => `/pos/receipts/${id}/print`,
    },
    
    // Shifts (employee shifts)
    SHIFTS: {
      BASE: '/pos/shifts',
      CURRENT: '/pos/shifts/current',
      START: '/pos/shifts/start',
      END: '/pos/shifts/end',
      BY_USER: (userId) => `/pos/shifts/user/${userId}`,
    },
    
    // Reports and Analytics
    REPORTS: {
      SALES: '/pos/reports/sales',
      DAILY: '/pos/reports/daily',
      MONTHLY: '/pos/reports/monthly',
      TOP_ITEMS: '/pos/reports/top-items',
      REVENUE: '/pos/reports/revenue',
    },
    
    // Settings
    SETTINGS: {
      BASE: '/pos/settings',
      TAX: '/pos/settings/tax',
      PAYMENT: '/pos/settings/payment',
      PRINTER: '/pos/settings/printer',
    },
  },

  // Support/Help
  SUPPORT: {
    TICKETS: '/support/tickets',
    SUBMIT: '/support/submit',
    FAQ: '/support/faq',
  },
};

// HTTP Methods
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

// Request timeout (in milliseconds)
export const REQUEST_TIMEOUT = 30000;

// Headers
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};
