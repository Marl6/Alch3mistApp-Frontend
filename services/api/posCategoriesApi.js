/**
 * POS Categories API Service
 * Handles all POS category-related API operations
 */

import { BaseApiService } from '../base/baseApiService.js';
import { API_ENDPOINTS } from '../config/apiConfig.js';

export class PosCategoriesApiService extends BaseApiService {
  /**
   * Get all categories
   */
  async getCategories({ active = true } = {}) {
    return await this.get(API_ENDPOINTS.POS.CATEGORIES.BASE, { active });
  }

  /**
   * Get a specific category by ID
   */
  async getCategoryById(id) {
    this.validateRequired({ id }, ['id']);
    
    return await this.get(API_ENDPOINTS.POS.CATEGORIES.BY_ID(id));
  }

  /**
   * Create a new category
   */
  async createCategory(categoryData) {
    const requiredFields = ['name'];
    this.validateRequired(categoryData, requiredFields);
    
    return await this.post(API_ENDPOINTS.POS.CATEGORIES.BASE, categoryData);
  }

  /**
   * Update a category
   */
  async updateCategory(id, categoryData) {
    this.validateRequired({ id }, ['id']);
    
    return await this.put(API_ENDPOINTS.POS.CATEGORIES.BY_ID(id), categoryData);
  }

  /**
   * Delete a category
   */
  async deleteCategory(id) {
    this.validateRequired({ id }, ['id']);
    
    return await this.delete(API_ENDPOINTS.POS.CATEGORIES.BY_ID(id));
  }

  /**
   * Reorder categories
   */
  async reorderCategories(categoryOrders) {
    this.validateRequired({ categoryOrders }, ['categoryOrders']);
    
    return await this.put(`${API_ENDPOINTS.POS.CATEGORIES.BASE}/reorder`, {
      orders: categoryOrders,
    });
  }

  /**
   * Toggle category status
   */
  async toggleCategoryStatus(id, active) {
    this.validateRequired({ id, active }, ['id', 'active']);
    
    return await this.patch(API_ENDPOINTS.POS.CATEGORIES.BY_ID(id), { active });
  }
}

// Export singleton instance
export const posCategoriesApi = new PosCategoriesApiService();
