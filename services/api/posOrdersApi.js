/**
 * POS Orders API Service
 * Handles all POS order-related API operations
 */

import { BaseApiService } from '../base/baseApiService.js';
import { API_ENDPOINTS } from '../config/apiConfig.js';

export class PosOrdersApiService extends BaseApiService {
  /**
   * Get all orders with filtering and pagination
   */
  async getOrders({ 
    page = 1, 
    limit = 50, 
    status = '', 
    startDate = '', 
    endDate = '',
    userId = '' 
  } = {}) {
    const params = { page, limit };
    
    if (status) params.status = status;
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    if (userId) params.userId = userId;
    
    return await this.get(API_ENDPOINTS.POS.ORDERS.BASE, params);
  }

  /**
   * Get a specific order by ID
   */
  async getOrderById(id) {
    this.validateRequired({ id }, ['id']);
    
    return await this.get(API_ENDPOINTS.POS.ORDERS.BY_ID(id));
  }

  /**
   * Create a new order
   */
  async createOrder(orderData) {
    const requiredFields = ['items', 'total'];
    this.validateRequired(orderData, requiredFields);
    
    return await this.post(API_ENDPOINTS.POS.ORDERS.CREATE, orderData);
  }

  /**
   * Update order status
   */
  async updateOrderStatus(id, status, notes = '') {
    this.validateRequired({ id, status }, ['id', 'status']);
    
    return await this.put(API_ENDPOINTS.POS.ORDERS.UPDATE_STATUS(id), {
      status,
      notes,
    });
  }

  /**
   * Cancel an order
   */
  async cancelOrder(id, reason = '') {
    this.validateRequired({ id }, ['id']);
    
    return await this.put(API_ENDPOINTS.POS.ORDERS.CANCEL(id), { reason });
  }

  /**
   * Add item to order
   */
  async addItemToOrder(orderId, itemData) {
    this.validateRequired({ orderId }, ['orderId']);
    const requiredFields = ['itemId', 'quantity'];
    this.validateRequired(itemData, requiredFields);
    
    return await this.post(`${API_ENDPOINTS.POS.ORDERS.BY_ID(orderId)}/items`, itemData);
  }

  /**
   * Update item in order
   */
  async updateOrderItem(orderId, itemId, updateData) {
    this.validateRequired({ orderId, itemId }, ['orderId', 'itemId']);
    
    return await this.put(`${API_ENDPOINTS.POS.ORDERS.BY_ID(orderId)}/items/${itemId}`, updateData);
  }

  /**
   * Remove item from order
   */
  async removeItemFromOrder(orderId, itemId) {
    this.validateRequired({ orderId, itemId }, ['orderId', 'itemId']);
    
    return await this.delete(`${API_ENDPOINTS.POS.ORDERS.BY_ID(orderId)}/items/${itemId}`);
  }

  /**
   * Apply discount to order
   */
  async applyDiscountToOrder(orderId, discountId) {
    this.validateRequired({ orderId, discountId }, ['orderId', 'discountId']);
    
    return await this.post(`${API_ENDPOINTS.POS.ORDERS.BY_ID(orderId)}/discount`, {
      discountId,
    });
  }

  /**
   * Remove discount from order
   */
  async removeDiscountFromOrder(orderId) {
    this.validateRequired({ orderId }, ['orderId']);
    
    return await this.delete(`${API_ENDPOINTS.POS.ORDERS.BY_ID(orderId)}/discount`);
  }

  /**
   * Process payment for order
   */
  async processPayment(orderId, paymentData) {
    this.validateRequired({ orderId }, ['orderId']);
    const requiredFields = ['amount', 'paymentMethod'];
    this.validateRequired(paymentData, requiredFields);
    
    return await this.post(`${API_ENDPOINTS.POS.ORDERS.BY_ID(orderId)}/payment`, paymentData);
  }

  /**
   * Get order summary/totals
   */
  async getOrderSummary(orderId) {
    this.validateRequired({ orderId }, ['orderId']);
    
    return await this.get(`${API_ENDPOINTS.POS.ORDERS.BY_ID(orderId)}/summary`);
  }

  /**
   * Get today's orders
   */
  async getTodaysOrders({ status = '' } = {}) {
    const today = new Date().toISOString().split('T')[0];
    
    return await this.getOrders({
      startDate: today,
      endDate: today,
      status,
    });
  }

  /**
   * Get pending orders
   */
  async getPendingOrders() {
    return await this.getOrders({ status: 'pending' });
  }

  /**
   * Get completed orders
   */
  async getCompletedOrders({ page = 1, limit = 50 } = {}) {
    return await this.getOrders({ 
      status: 'completed',
      page,
      limit 
    });
  }
}

// Export singleton instance
export const posOrdersApi = new PosOrdersApiService();
