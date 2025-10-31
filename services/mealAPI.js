/**
 * Legacy Meals API
 * This file maintains backward compatibility while using the new API structure
 * @deprecated Use mealsApi from './api/mealsApi.js' instead
 */

import { mealsApi } from './api/mealsApi.js';

// Re-export the new API for backward compatibility
export const {
  getMeals,
  getMealById,
  searchMeals,
  getCategories,
  getMealsByCategory,
  getPopularMeals,
  getRecentMeals,
  createMeal,
  updateMeal,
  deleteMeal,
  rateMeal,
  getMealRatings,
} = mealsApi;

// Legacy wrapper functions (if needed for compatibility)
export const fetchMeals = mealsApi.getMeals.bind(mealsApi);
export const fetchMealById = mealsApi.getMealById.bind(mealsApi);
export const fetchMealsByCategory = mealsApi.getMealsByCategory.bind(mealsApi);

// Default export for backward compatibility
export default mealsApi;