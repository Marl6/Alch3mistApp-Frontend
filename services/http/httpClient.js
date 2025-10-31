/**
 * HTTP Client
 * Centralized HTTP client with request/response interceptors
 */

import { API_BASE_URL, DEFAULT_HEADERS, REQUEST_TIMEOUT } from './apiConfig.js';

class HttpClient {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.timeout = REQUEST_TIMEOUT;
    this.defaultHeaders = DEFAULT_HEADERS;
  }

  /**
   * Get authentication token from secure storage
   */
  async getAuthToken() {
    try {
      const { storageService } = await import('../utils/storageService.js');
      return await storageService.getAuthToken();
    } catch (error) {
      console.error('Error getting auth token:', error);
      return null;
    }
  }

  /**
   * Create request headers with authentication
   */
  async createHeaders(customHeaders = {}) {
    const token = await this.getAuthToken();
    
    const headers = {
      ...this.defaultHeaders,
      ...customHeaders,
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  }

  /**
   * Handle API response
   */
  async handleResponse(response) {
    const contentType = response.headers.get('content-type');
    
    let data;
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      const error = new Error(data.message || data.error || 'API request failed');
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  }

  /**
   * Make HTTP request
   */
  async request(endpoint, options = {}) {
    try {
      const {
        method = 'GET',
        body,
        headers: customHeaders = {},
        ...otherOptions
      } = options;

      const headers = await this.createHeaders(customHeaders);
      const url = `${this.baseURL}${endpoint}`;

      const config = {
        method,
        headers,
        ...otherOptions,
      };

      // Add body for non-GET requests
      if (body && method !== 'GET') {
        if (typeof body === 'object' && !(body instanceof FormData)) {
          config.body = JSON.stringify(body);
        } else {
          config.body = body;
          // Remove Content-Type for FormData to let browser set it with boundary
          if (body instanceof FormData) {
            delete config.headers['Content-Type'];
          }
        }
      }

      // Set timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);
      config.signal = controller.signal;

      const response = await fetch(url, config);
      clearTimeout(timeoutId);

      return await this.handleResponse(response);
    } catch (error) {
      console.error('HTTP Request Error:', error);
      
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      
      // Handle network errors
      if (!navigator.onLine) {
        throw new Error('No internet connection');
      }
      
      throw error;
    }
  }

  /**
   * GET request
   */
  async get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  /**
   * POST request
   */
  async post(endpoint, body, options = {}) {
    return this.request(endpoint, { ...options, method: 'POST', body });
  }

  /**
   * PUT request
   */
  async put(endpoint, body, options = {}) {
    return this.request(endpoint, { ...options, method: 'PUT', body });
  }

  /**
   * PATCH request
   */
  async patch(endpoint, body, options = {}) {
    return this.request(endpoint, { ...options, method: 'PATCH', body });
  }

  /**
   * DELETE request
   */
  async delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }
}

// Create and export singleton instance
export const httpClient = new HttpClient();
