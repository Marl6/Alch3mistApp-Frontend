/**
 * API Services Index
 * Central export point for all API services
 */

// Configuration
export { API_BASE_URL, API_ENDPOINTS, HTTP_METHODS } from './config/apiConfig.js';

// HTTP Client
export { httpClient } from './http/httpClient.js';

// Base Service
export { BaseApiService } from './base/baseApiService.js';

// API Services
export { authApi } from './api/authApi.js';
export { favoritesApi } from './api/favoritesApi.js';
export { mealsApi } from './api/mealsApi.js';
export { posItemsApi } from './api/posItemsApi.js';
export { posCategoriesApi } from './api/posCategoriesApi.js';
export { posModifiersApi } from './api/posModifiersApi.js';
export { posDiscountsApi } from './api/posDiscountsApi.js';
export { posOrdersApi } from './api/posOrdersApi.js';
export { posReceiptsApi } from './api/posReceiptsApi.js';
export { posShiftsApi } from './api/posShiftsApi.js';
export { reportsApi } from './api/reportsApi.js';
export { supportApi } from './api/supportApi.js';

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
