/**
 * API Services Index
 * Central export point for all API services
 */

// Configuration
export { API_BASE_URL, API_ENDPOINTS, HTTP_METHODS } from './config/apiConfig';

// HTTP Client
export { httpClient } from './http/httpClient';

// Base Service
export { BaseApiService } from './base/baseApiService';

// Import API Services
import { authApi } from './api/authApi';
import { favoritesApi } from './api/favoritesApi';
import { mealsApi } from './api/mealsApi';
import { posItemsApi } from './api/posItemsApi';
import { posCategoriesApi } from './api/posCategoriesApi';
import { posModifiersApi } from './api/posModifiersApi';
import { posDiscountsApi } from './api/posDiscountsApi';
import { posOrdersApi } from './api/posOrdersApi';
import { posReceiptsApi } from './api/posReceiptsApi';
import { posShiftsApi } from './api/posShiftsApi';
import { reportsApi } from './api/reportsApi';
import { supportApi } from './api/supportApi';

// Export API Services
export { 
  authApi,
  favoritesApi,
  mealsApi,
  posItemsApi,
  posCategoriesApi,
  posModifiersApi,
  posDiscountsApi,
  posOrdersApi,
  posReceiptsApi,
  posShiftsApi,
  reportsApi,
  supportApi
};

/**
 * API Services Collection
 * Grouped object containing all API services for easy access
 */
export const apiServices = {
  auth: authApi,
  favorites: favoritesApi,
  meals: mealsApi,
  pos: {
    items: posItemsApi,
    categories: posCategoriesApi,
    modifiers: posModifiersApi,
    discounts: posDiscountsApi,
    orders: posOrdersApi,
    receipts: posReceiptsApi,
    shifts: posShiftsApi,
  },
  reports: reportsApi,
  support: supportApi,
};

/**
 * Legacy exports for backward compatibility
 */
export { default as mealAPI } from './mealAPI.js';
