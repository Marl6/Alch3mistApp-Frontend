/**
 * POS Items API Service
 * Handles all POS item-related API operations
 */

import { BaseApiService } from '../base/baseApiService.js';
import { API_ENDPOINTS } from '../config/apiConfig.js';

export class PosItemsApiService extends BaseApiService {
  /**
   * Get all POS items with filtering and pagination
   */
  async getItems({ page = 1, limit = 50, categoryId = '', search = '', active = true } = {}) {
    const params = { page, limit, active };
    
    if (categoryId) params.categoryId = categoryId;
    if (search) params.search = search;
    
    return await this.get(API_ENDPOINTS.POS.ITEMS.BASE, params);
  }

  /**
   * Get a specific item by ID
   */
  async getItemById(id) {
    this.validateRequired({ id }, ['id']);
    
    return await this.get(API_ENDPOINTS.POS.ITEMS.BY_ID(id));
  }

  /**
   * Create a new item
   */
  async createItem(itemData) {
    const requiredFields = ['name', 'price', 'categoryId'];
    this.validateRequired(itemData, requiredFields);
    
    return await this.post(API_ENDPOINTS.POS.ITEMS.BASE, itemData);
  }

  /**
   * Update an item
   */
  async updateItem(id, itemData) {
    this.validateRequired({ id }, ['id']);
    
    return await this.put(API_ENDPOINTS.POS.ITEMS.BY_ID(id), itemData);
  }

  /**
   * Delete an item
   */
  async deleteItem(id) {
    this.validateRequired({ id }, ['id']);
    
    return await this.delete(API_ENDPOINTS.POS.ITEMS.BY_ID(id));
  }

  /**
   * Search items
   */
  async searchItems(query, { categoryId = '', limit = 20 } = {}) {
    this.validateRequired({ query }, ['query']);
    
    const params = { q: query, limit };
    if (categoryId) params.categoryId = categoryId;
    
    return await this.get(API_ENDPOINTS.POS.ITEMS.SEARCH, params);
  }

  /**
   * Get items by category
   */
  async getItemsByCategory(categoryId, { page = 1, limit = 50 } = {}) {
    this.validateRequired({ categoryId }, ['categoryId']);
    
    return await this.get(API_ENDPOINTS.POS.ITEMS.BY_CATEGORY(categoryId), {
      page,
      limit,
    });
  }

  /**
   * Toggle item availability
   */
  async toggleItemAvailability(id, available) {
    this.validateRequired({ id, available }, ['id', 'available']);
    
    return await this.patch(API_ENDPOINTS.POS.ITEMS.BY_ID(id), { available });
  }

  /**
   * Update item stock
   */
  async updateStock(id, stock) {
    this.validateRequired({ id, stock }, ['id', 'stock']);
    
    return await this.patch(API_ENDPOINTS.POS.ITEMS.BY_ID(id), { stock });
  }

  /**
   * Get low stock items
   */
  async getLowStockItems(threshold = 10) {
    return await this.get(API_ENDPOINTS.POS.ITEMS.BASE, {
      lowStock: true,
      threshold,
    });
  }
}

// Export singleton instance
export const posItemsApi = new PosItemsApiService();
