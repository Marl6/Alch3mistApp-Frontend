/**
 * POS Shifts API Service
 * Handles all POS shift-related API operations
 */

import { BaseApiService } from '../base/baseApiService.js';
import { API_ENDPOINTS } from '../config/apiConfig.js';

export class PosShiftsApiService extends BaseApiService {
  /**
   * Get all shifts with filtering and pagination
   */
  async getShifts({ 
    userId,
    page = 1, 
    limit = 50, 
    status = '',
    startDate = '', 
    endDate = '' 
  } = {}) {
    const params = { userId, page, limit };
    
    if (status) params.status = status;
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    
    return await this.get(API_ENDPOINTS.POS.SHIFTS.BASE, params);
  }

  /**
   * Get current active shift
   */
  async getCurrentShift({ userId }) {
    return await this.get(API_ENDPOINTS.POS.SHIFTS.CURRENT, { userId });
  }

  /**
   * Start a new shift
   */
  async startShift(shiftData) {
    const requiredFields = ['userId', 'openedBy'];
    this.validateRequired(shiftData, requiredFields);
    
    return await this.post(API_ENDPOINTS.POS.SHIFTS.START, shiftData);
  }

  /**
   * End current shift
   */
  async endShift(endData) {
    const requiredFields = ['userId'];
    this.validateRequired(endData, requiredFields);
    
    return await this.post(API_ENDPOINTS.POS.SHIFTS.END, endData);
  }

  /**
   * Get shifts for a specific user
   */
  async getUserShifts(userId, { page = 1, limit = 50 } = {}) {
    this.validateRequired({ userId }, ['userId']);
    
    return await this.get(API_ENDPOINTS.POS.SHIFTS.BY_USER(userId), {
      page,
      limit,
    });
  }

  /**
   * Get shift by ID
   */
  async getShiftById(id) {
    this.validateRequired({ id }, ['id']);
    
    return await this.get(`${API_ENDPOINTS.POS.SHIFTS.BASE}/${id}`);
  }

  /**
   * Update shift notes
   */
  async updateShiftNotes(shiftId, notes) {
    this.validateRequired({ shiftId, notes }, ['shiftId', 'notes']);
    
    return await this.patch(`${API_ENDPOINTS.POS.SHIFTS.BASE}/${shiftId}`, { notes });
  }

  /**
   * Add cash drawer transaction
   */
  async addCashTransaction(shiftId, transactionData) {
    this.validateRequired({ shiftId }, ['shiftId']);
    const requiredFields = ['type', 'amount', 'reason'];
    this.validateRequired(transactionData, requiredFields);
    
    return await this.post(`${API_ENDPOINTS.POS.SHIFTS.BASE}/${shiftId}/transactions`, transactionData);
  }

  /**
   * Get shift summary
   */
  async getShiftSummary(shiftId) {
    this.validateRequired({ shiftId }, ['shiftId']);
    
    return await this.get(`${API_ENDPOINTS.POS.SHIFTS.BASE}/${shiftId}/summary`);
  }

  /**
   * Get shift sales report
   */
  async getShiftSalesReport(shiftId) {
    this.validateRequired({ shiftId }, ['shiftId']);
    
    return await this.get(`${API_ENDPOINTS.POS.SHIFTS.BASE}/${shiftId}/sales-report`);
  }

  /**
   * Check if user has active shift
   */
  async hasActiveShift(userId) {
    this.validateRequired({ userId }, ['userId']);
    
    try {
      const response = await this.getCurrentShift({ userId });
      return response.success && response.data?.hasOpenShift;
    } catch (error) {
      console.error('Error checking active shift:', error);
      return false;
    }
  }

  /**
   * Get today's shifts
   */
  async getTodaysShifts(userId) {
    const today = new Date().toISOString().split('T')[0];
    
    return await this.getShifts({
      userId,
      startDate: today,
      endDate: today,
    });
  }

  /**
   * Get active shifts (all users)
   */
  async getActiveShifts(userId) {
    return await this.getShifts({ userId, status: 'open' });
  }

  /**
   * Force end shift (admin only)
   */
  async forceEndShift(shiftId, reason) {
    this.validateRequired({ shiftId, reason }, ['shiftId', 'reason']);
    
    return await this.post(`${API_ENDPOINTS.POS.SHIFTS.BASE}/${shiftId}/force-end`, { reason });
  }
}

// Export singleton instance
export const posShiftsApi = new PosShiftsApiService();
