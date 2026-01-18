/**
 * POS Receipts API Service
 * Handles all POS receipt-related API operations
 */

import { BaseApiService } from '../base/baseApiService.js';
import { API_ENDPOINTS } from '../config/apiConfig.js';

export class PosReceiptsApiService extends BaseApiService {
  /**
   * Get all receipts with filtering and pagination
   */
  async getReceipts({ 
    userId,
    page = 1, 
    limit = 50, 
    startDate = '', 
    endDate = '',
    orderId = '' 
  } = {}) {
    const params = { userId, page, limit };
    
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    if (orderId) params.orderId = orderId;
    
    return await this.get(API_ENDPOINTS.POS.RECEIPTS.BASE, params);
  }

  /**
   * Get a specific receipt by ID
   */
  async getReceiptById(id) {
    this.validateRequired({ id }, ['id']);
    
    return await this.get(API_ENDPOINTS.POS.RECEIPTS.BY_ID(id));
  }

  /**
   * Get receipt by order ID
   */
  async getReceiptByOrderId(orderId) {
    this.validateRequired({ orderId }, ['orderId']);
    
    return await this.get(API_ENDPOINTS.POS.RECEIPTS.BY_ORDER(orderId));
  }

  /**
   * Generate receipt for order
   */
  async generateReceipt(userId, orderId, receiptData = {}) {
    this.validateRequired({ userId, orderId }, ['userId', 'orderId']);
    
    return await this.post(API_ENDPOINTS.POS.RECEIPTS.BASE, {
      userId,
      orderId,
      ...receiptData,
    });
  }

  /**
   * Print receipt
   */
  async printReceipt(id, printerSettings = {}) {
    this.validateRequired({ id }, ['id']);
    
    return await this.post(API_ENDPOINTS.POS.RECEIPTS.PRINT(id), printerSettings);
  }

  /**
   * Email receipt
   */
  async emailReceipt(id, emailData) {
    this.validateRequired({ id }, ['id']);
    const requiredFields = ['email'];
    this.validateRequired(emailData, requiredFields);
    
    return await this.post(`${API_ENDPOINTS.POS.RECEIPTS.BY_ID(id)}/email`, emailData);
  }

  /**
   * Resend receipt
   */
  async resendReceipt(id, method = 'email', destination) {
    this.validateRequired({ id, destination }, ['id', 'destination']);
    
    return await this.post(`${API_ENDPOINTS.POS.RECEIPTS.BY_ID(id)}/resend`, {
      method,
      destination,
    });
  }

  /**
   * Get receipt template
   */
  async getReceiptTemplate() {
    return await this.get(`${API_ENDPOINTS.POS.RECEIPTS.BASE}/template`);
  }

  /**
   * Update receipt template (admin only)
   */
  async updateReceiptTemplate(templateData) {
    return await this.put(`${API_ENDPOINTS.POS.RECEIPTS.BASE}/template`, templateData);
  }

  /**
   * Get receipt statistics
   */
  async getReceiptStats(userId, { startDate = '', endDate = '' } = {}) {
    const params = { userId };
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    
    return await this.get(`${API_ENDPOINTS.POS.RECEIPTS.BASE}/stats`, params);
  }

  /**
   * Download receipt as PDF
   */
  async downloadReceiptPDF(id) {
    this.validateRequired({ id }, ['id']);
    
    return await this.get(`${API_ENDPOINTS.POS.RECEIPTS.BY_ID(id)}/pdf`);
  }

  /**
   * Get today's receipts
   */
  async getTodaysReceipts(userId) {
    const today = new Date().toISOString().split('T')[0];
    
    return await this.getReceipts({
      userId,
      startDate: today,
      endDate: today,
    });
  }

  /**
   * Search receipts
   */
  async searchReceipts(userId, query, { startDate = '', endDate = '' } = {}) {
    this.validateRequired({ userId, query }, ['userId', 'query']);
    
    const params = { userId, q: query };
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    
    return await this.get(`${API_ENDPOINTS.POS.RECEIPTS.BASE}/search`, params);
  }
}

// Export singleton instance
export const posReceiptsApi = new PosReceiptsApiService();
