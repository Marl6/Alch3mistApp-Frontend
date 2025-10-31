/**
 * Base API Service
 * Abstract base class for all API services
 */

import { httpClient } from '../http/httpClient.js';

export class BaseApiService {
  constructor() {
    this.httpClient = httpClient;
  }

  /**
   * Handle API errors consistently
   */
  handleError(error, context = '') {
    console.error(`API Error ${context}:`, error);
    
    // You can add error tracking/logging here
    // Example: Analytics.track('api_error', { context, error: error.message });
    
    return {
      success: false,
      error: error.message || 'An unexpected error occurred',
      status: error.status || 500,
    };
  }

  /**
   * Format success response
   */
  formatResponse(data, message = '') {
    return {
      success: true,
      data,
      message,
    };
  }

  /**
   * Validate required fields
   */
  validateRequired(data, requiredFields) {
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }
  }

  /**
   * Build query string from parameters
   */
  buildQueryString(params) {
    if (!params || Object.keys(params).length === 0) {
      return '';
    }

    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, value.toString());
      }
    });

    const queryString = searchParams.toString();
    return queryString ? `?${queryString}` : '';
  }

  /**
   * GET request with error handling
   */
  async get(endpoint, params = {}) {
    try {
      const queryString = this.buildQueryString(params);
      const data = await this.httpClient.get(`${endpoint}${queryString}`);
      return this.formatResponse(data);
    } catch (error) {
      return this.handleError(error, `GET ${endpoint}`);
    }
  }

  /**
   * POST request with error handling
   */
  async post(endpoint, body = {}) {
    try {
      const data = await this.httpClient.post(endpoint, body);
      return this.formatResponse(data);
    } catch (error) {
      return this.handleError(error, `POST ${endpoint}`);
    }
  }

  /**
   * PUT request with error handling
   */
  async put(endpoint, body = {}) {
    try {
      const data = await this.httpClient.put(endpoint, body);
      return this.formatResponse(data);
    } catch (error) {
      return this.handleError(error, `PUT ${endpoint}`);
    }
  }

  /**
   * PATCH request with error handling
   */
  async patch(endpoint, body = {}) {
    try {
      const data = await this.httpClient.patch(endpoint, body);
      return this.formatResponse(data);
    } catch (error) {
      return this.handleError(error, `PATCH ${endpoint}`);
    }
  }

  /**
   * DELETE request with error handling
   */
  async delete(endpoint) {
    try {
      const data = await this.httpClient.delete(endpoint);
      return this.formatResponse(data);
    } catch (error) {
      return this.handleError(error, `DELETE ${endpoint}`);
    }
  }
}
