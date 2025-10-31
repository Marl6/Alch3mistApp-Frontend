/**
 * Reports API Service
 * Handles all POS reporting and analytics API operations
 */

import { BaseApiService } from '../base/baseApiService.js';
import { API_ENDPOINTS } from '../config/apiConfig.js';

export class ReportsApiService extends BaseApiService {
  /**
   * Get sales report
   */
  async getSalesReport({ 
    startDate = '', 
    endDate = '', 
    groupBy = 'day',
    userId = '' 
  } = {}) {
    const params = { groupBy };
    
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    if (userId) params.userId = userId;
    
    return await this.get(API_ENDPOINTS.POS.REPORTS.SALES, params);
  }

  /**
   * Get daily report
   */
  async getDailyReport(date = '') {
    const params = {};
    if (date) params.date = date;
    
    return await this.get(API_ENDPOINTS.POS.REPORTS.DAILY, params);
  }

  /**
   * Get monthly report
   */
  async getMonthlyReport(year, month) {
    this.validateRequired({ year, month }, ['year', 'month']);
    
    return await this.get(API_ENDPOINTS.POS.REPORTS.MONTHLY, {
      year,
      month,
    });
  }

  /**
   * Get top selling items
   */
  async getTopItems({ 
    startDate = '', 
    endDate = '', 
    limit = 10,
    categoryId = '' 
  } = {}) {
    const params = { limit };
    
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    if (categoryId) params.categoryId = categoryId;
    
    return await this.get(API_ENDPOINTS.POS.REPORTS.TOP_ITEMS, params);
  }

  /**
   * Get revenue report
   */
  async getRevenueReport({ 
    startDate = '', 
    endDate = '', 
    groupBy = 'day' 
  } = {}) {
    const params = { groupBy };
    
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    
    return await this.get(API_ENDPOINTS.POS.REPORTS.REVENUE, params);
  }

  /**
   * Get inventory report
   */
  async getInventoryReport({ lowStockOnly = false, categoryId = '' } = {}) {
    const params = {};
    
    if (lowStockOnly) params.lowStockOnly = lowStockOnly;
    if (categoryId) params.categoryId = categoryId;
    
    return await this.get('/pos/reports/inventory', params);
  }

  /**
   * Get employee performance report
   */
  async getEmployeeReport({ 
    startDate = '', 
    endDate = '', 
    userId = '' 
  } = {}) {
    const params = {};
    
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    if (userId) params.userId = userId;
    
    return await this.get('/pos/reports/employees', params);
  }

  /**
   * Get payment methods report
   */
  async getPaymentMethodsReport({ startDate = '', endDate = '' } = {}) {
    const params = {};
    
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    
    return await this.get('/pos/reports/payment-methods', params);
  }

  /**
   * Get discount usage report
   */
  async getDiscountReport({ startDate = '', endDate = '' } = {}) {
    const params = {};
    
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    
    return await this.get('/pos/reports/discounts', params);
  }

  /**
   * Get hourly sales report
   */
  async getHourlySalesReport(date = '') {
    const params = {};
    if (date) params.date = date;
    
    return await this.get('/pos/reports/hourly-sales', params);
  }

  /**
   * Get customer analytics
   */
  async getCustomerAnalytics({ startDate = '', endDate = '' } = {}) {
    const params = {};
    
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    
    return await this.get('/pos/reports/customers', params);
  }

  /**
   * Export report to CSV
   */
  async exportReport(reportType, params = {}) {
    this.validateRequired({ reportType }, ['reportType']);
    
    return await this.get(`/pos/reports/${reportType}/export`, {
      format: 'csv',
      ...params,
    });
  }

  /**
   * Export report to PDF
   */
  async exportReportPDF(reportType, params = {}) {
    this.validateRequired({ reportType }, ['reportType']);
    
    return await this.get(`/pos/reports/${reportType}/export`, {
      format: 'pdf',
      ...params,
    });
  }

  /**
   * Get dashboard summary
   */
  async getDashboardSummary() {
    return await this.get('/pos/reports/dashboard');
  }

  /**
   * Get real-time analytics
   */
  async getRealTimeAnalytics() {
    return await this.get('/pos/reports/realtime');
  }

  /**
   * Get tax report
   */
  async getTaxReport({ startDate = '', endDate = '' } = {}) {
    const params = {};
    
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    
    return await this.get('/pos/reports/tax', params);
  }
}

// Export singleton instance
export const reportsApi = new ReportsApiService();
