/**
 * POS Discounts API Service
 * Handles all POS discount-related API operations
 */

import { BaseApiService } from '../base/baseApiService.js';
import { API_ENDPOINTS } from '../config/apiConfig.js';

export class PosDiscountsApiService extends BaseApiService {
  /**
   * Get all discounts
   */
  async getDiscounts({ active = null, type = '' } = {}) {
    const params = {};
    if (active !== null) params.active = active;
    if (type) params.type = type;
    
    return await this.get(API_ENDPOINTS.POS.DISCOUNTS.BASE, params);
  }

  /**
   * Get active discounts only
   */
  async getActiveDiscounts() {
    return await this.get(API_ENDPOINTS.POS.DISCOUNTS.ACTIVE);
  }

  /**
   * Get a specific discount by ID
   */
  async getDiscountById(id) {
    this.validateRequired({ id }, ['id']);
    
    return await this.get(API_ENDPOINTS.POS.DISCOUNTS.BY_ID(id));
  }

  /**
   * Create a new discount
   */
  async createDiscount(discountData) {
    const requiredFields = ['name', 'type', 'value'];
    this.validateRequired(discountData, requiredFields);
    
    return await this.post(API_ENDPOINTS.POS.DISCOUNTS.BASE, discountData);
  }

  /**
   * Update a discount
   */
  async updateDiscount(id, discountData) {
    this.validateRequired({ id }, ['id']);
    
    return await this.put(API_ENDPOINTS.POS.DISCOUNTS.BY_ID(id), discountData);
  }

  /**
   * Delete a discount
   */
  async deleteDiscount(id) {
    this.validateRequired({ id }, ['id']);
    
    return await this.delete(API_ENDPOINTS.POS.DISCOUNTS.BY_ID(id));
  }

  /**
   * Apply discount to order
   */
  async applyDiscount(discountId, orderId) {
    this.validateRequired({ discountId, orderId }, ['discountId', 'orderId']);
    
    return await this.post(`${API_ENDPOINTS.POS.DISCOUNTS.BY_ID(discountId)}/apply`, {
      orderId,
    });
  }

  /**
   * Remove discount from order
   */
  async removeDiscount(discountId, orderId) {
    this.validateRequired({ discountId, orderId }, ['discountId', 'orderId']);
    
    return await this.delete(`${API_ENDPOINTS.POS.DISCOUNTS.BY_ID(discountId)}/apply/${orderId}`);
  }

  /**
   * Validate discount code
   */
  async validateDiscountCode(code, orderTotal = 0) {
    this.validateRequired({ code }, ['code']);
    
    return await this.post(`${API_ENDPOINTS.POS.DISCOUNTS.BASE}/validate`, {
      code,
      orderTotal,
    });
  }

  /**
   * Get discount usage statistics
   */
  async getDiscountStats(id, { startDate = '', endDate = '' } = {}) {
    this.validateRequired({ id }, ['id']);
    
    const params = {};
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    
    return await this.get(`${API_ENDPOINTS.POS.DISCOUNTS.BY_ID(id)}/stats`, params);
  }

  /**
   * Toggle discount status
   */
  async toggleDiscountStatus(id, active) {
    this.validateRequired({ id, active }, ['id', 'active']);
    
    return await this.patch(API_ENDPOINTS.POS.DISCOUNTS.BY_ID(id), { active });
  }
}

// Export singleton instance
export const posDiscountsApi = new PosDiscountsApiService();
