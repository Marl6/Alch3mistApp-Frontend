/**
 * Support API Service
 * Handles all support and help-related API operations
 */

import { BaseApiService } from '../base/baseApiService.js';
import { API_ENDPOINTS } from '../config/apiConfig.js';

export class SupportApiService extends BaseApiService {
  /**
   * Get all support tickets for user
   */
  async getSupportTickets({ 
    page = 1, 
    limit = 20, 
    status = '', 
    priority = '' 
  } = {}) {
    const params = { page, limit };
    
    if (status) params.status = status;
    if (priority) params.priority = priority;
    
    return await this.get(API_ENDPOINTS.SUPPORT.TICKETS, params);
  }

  /**
   * Get a specific support ticket
   */
  async getSupportTicket(ticketId) {
    this.validateRequired({ ticketId }, ['ticketId']);
    
    return await this.get(`${API_ENDPOINTS.SUPPORT.TICKETS}/${ticketId}`);
  }

  /**
   * Submit a new support ticket
   */
  async submitSupportTicket(ticketData) {
    const requiredFields = ['subject', 'description', 'category'];
    this.validateRequired(ticketData, requiredFields);
    
    return await this.post(API_ENDPOINTS.SUPPORT.SUBMIT, ticketData);
  }

  /**
   * Update support ticket
   */
  async updateSupportTicket(ticketId, updateData) {
    this.validateRequired({ ticketId }, ['ticketId']);
    
    return await this.put(`${API_ENDPOINTS.SUPPORT.TICKETS}/${ticketId}`, updateData);
  }

  /**
   * Add reply to support ticket
   */
  async addTicketReply(ticketId, replyData) {
    this.validateRequired({ ticketId }, ['ticketId']);
    const requiredFields = ['message'];
    this.validateRequired(replyData, requiredFields);
    
    return await this.post(`${API_ENDPOINTS.SUPPORT.TICKETS}/${ticketId}/replies`, replyData);
  }

  /**
   * Close support ticket
   */
  async closeSupportTicket(ticketId, reason = '') {
    this.validateRequired({ ticketId }, ['ticketId']);
    
    return await this.put(`${API_ENDPOINTS.SUPPORT.TICKETS}/${ticketId}/close`, { reason });
  }

  /**
   * Reopen support ticket
   */
  async reopenSupportTicket(ticketId, reason = '') {
    this.validateRequired({ ticketId }, ['ticketId']);
    
    return await this.put(`${API_ENDPOINTS.SUPPORT.TICKETS}/${ticketId}/reopen`, { reason });
  }

  /**
   * Rate support ticket resolution
   */
  async rateSupportTicket(ticketId, rating, feedback = '') {
    this.validateRequired({ ticketId, rating }, ['ticketId', 'rating']);
    
    return await this.post(`${API_ENDPOINTS.SUPPORT.TICKETS}/${ticketId}/rate`, {
      rating,
      feedback,
    });
  }

  /**
   * Upload attachment to support ticket
   */
  async uploadTicketAttachment(ticketId, fileData) {
    this.validateRequired({ ticketId, fileData }, ['ticketId', 'fileData']);
    
    return await this.post(`${API_ENDPOINTS.SUPPORT.TICKETS}/${ticketId}/attachments`, fileData);
  }

  /**
   * Get FAQ articles
   */
  async getFAQ({ category = '', search = '' } = {}) {
    const params = {};
    
    if (category) params.category = category;
    if (search) params.search = search;
    
    return await this.get(API_ENDPOINTS.SUPPORT.FAQ, params);
  }

  /**
   * Get FAQ categories
   */
  async getFAQCategories() {
    return await this.get(`${API_ENDPOINTS.SUPPORT.FAQ}/categories`);
  }

  /**
   * Search FAQ articles
   */
  async searchFAQ(query) {
    this.validateRequired({ query }, ['query']);
    
    return await this.get(`${API_ENDPOINTS.SUPPORT.FAQ}/search`, { q: query });
  }

  /**
   * Get support categories
   */
  async getSupportCategories() {
    return await this.get(`${API_ENDPOINTS.SUPPORT.TICKETS}/categories`);
  }

  /**
   * Get ticket priorities
   */
  async getTicketPriorities() {
    return await this.get(`${API_ENDPOINTS.SUPPORT.TICKETS}/priorities`);
  }

  /**
   * Submit feedback
   */
  async submitFeedback(feedbackData) {
    const requiredFields = ['type', 'message'];
    this.validateRequired(feedbackData, requiredFields);
    
    return await this.post('/support/feedback', feedbackData);
  }

  /**
   * Report a bug
   */
  async reportBug(bugData) {
    const requiredFields = ['title', 'description', 'stepsToReproduce'];
    this.validateRequired(bugData, requiredFields);
    
    return await this.post('/support/bug-report', bugData);
  }

  /**
   * Request feature
   */
  async requestFeature(featureData) {
    const requiredFields = ['title', 'description'];
    this.validateRequired(featureData, requiredFields);
    
    return await this.post('/support/feature-request', featureData);
  }

  /**
   * Get support statistics (admin only)
   */
  async getSupportStats({ startDate = '', endDate = '' } = {}) {
    const params = {};
    
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    
    return await this.get('/support/stats', params);
  }

  /**
   * Get contact information
   */
  async getContactInfo() {
    return await this.get('/support/contact');
  }
}

// Export singleton instance
export const supportApi = new SupportApiService();
