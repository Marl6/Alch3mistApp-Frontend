/**
 * Meals/Recipes API Service
 * Handles all meal and recipe-related API operations
 */

import { BaseApiService } from '../base/baseApiService.js';
import { API_ENDPOINTS } from '../config/apiConfig.js';

export class MealsApiService extends BaseApiService {
  /**
   * Get all meals with pagination
   */
  async getMeals({ page = 1, limit = 20, search = '', category = '' } = {}) {
    const params = { page, limit };
    
    if (search) params.search = search;
    if (category) params.category = category;
    
    return await this.get(API_ENDPOINTS.MEALS.BASE, params);
  }

  /**
   * Get a specific meal by ID
   */
  async getMealById(id) {
    this.validateRequired({ id }, ['id']);
    
    return await this.get(API_ENDPOINTS.MEALS.BY_ID(id));
  }

  /**
   * Search meals by query
   */
  async searchMeals(query, { page = 1, limit = 20 } = {}) {
    this.validateRequired({ query }, ['query']);
    
    return await this.get(API_ENDPOINTS.MEALS.SEARCH, {
      q: query,
      page,
      limit,
    });
  }

  /**
   * Get all meal categories
   */
  async getCategories() {
    return await this.get(API_ENDPOINTS.MEALS.CATEGORIES);
  }

  /**
   * Get meals by category
   */
  async getMealsByCategory(category, { page = 1, limit = 20 } = {}) {
    this.validateRequired({ category }, ['category']);
    
    return await this.get(API_ENDPOINTS.MEALS.BY_CATEGORY(category), {
      page,
      limit,
    });
  }

  /**
   * Get popular meals
   */
  async getPopularMeals({ limit = 10 } = {}) {
    return await this.get(API_ENDPOINTS.MEALS.POPULAR, { limit });
  }

  /**
   * Get recent meals
   */
  async getRecentMeals({ limit = 10 } = {}) {
    return await this.get(API_ENDPOINTS.MEALS.RECENT, { limit });
  }

  /**
   * Create a new meal (admin only)
   */
  async createMeal(mealData) {
    const requiredFields = ['title', 'description', 'ingredients', 'instructions'];
    this.validateRequired(mealData, requiredFields);
    
    return await this.post(API_ENDPOINTS.MEALS.BASE, mealData);
  }

  /**
   * Update a meal (admin only)
   */
  async updateMeal(id, mealData) {
    this.validateRequired({ id }, ['id']);
    
    return await this.put(API_ENDPOINTS.MEALS.BY_ID(id), mealData);
  }

  /**
   * Delete a meal (admin only)
   */
  async deleteMeal(id) {
    this.validateRequired({ id }, ['id']);
    
    return await this.delete(API_ENDPOINTS.MEALS.BY_ID(id));
  }

  /**
   * Rate a meal
   */
  async rateMeal(id, rating, userId) {
    this.validateRequired({ id, rating, userId }, ['id', 'rating', 'userId']);
    
    return await this.post(`${API_ENDPOINTS.MEALS.BY_ID(id)}/rate`, {
      rating,
      userId,
    });
  }

  /**
   * Get meal ratings
   */
  async getMealRatings(id) {
    this.validateRequired({ id }, ['id']);
    
    return await this.get(`${API_ENDPOINTS.MEALS.BY_ID(id)}/ratings`);
  }
}

// Export singleton instance
export const mealsApi = new MealsApiService();
