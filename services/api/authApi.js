/**
 * Authentication API Service
 * Handles all authentication-related API operations
 */

import { BaseApiService } from '../base/baseApiService.js';
import { API_ENDPOINTS } from '../config/apiConfig.js';

export class AuthApiService extends BaseApiService {
  /**
   * User login
   */
  async login(credentials) {
    const requiredFields = ['email', 'password'];
    this.validateRequired(credentials, requiredFields);
    
    return await this.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
  }

  /**
   * User logout
   */
  async logout() {
    return await this.post(API_ENDPOINTS.AUTH.LOGOUT);
  }

  /**
   * User registration
   */
  async register(userData) {
    const requiredFields = ['email', 'password', 'firstName', 'lastName'];
    this.validateRequired(userData, requiredFields);
    
    return await this.post(API_ENDPOINTS.AUTH.REGISTER, userData);
  }

  /**
   * Refresh authentication token
   */
  async refreshToken() {
    return await this.post(API_ENDPOINTS.AUTH.REFRESH);
  }

  /**
   * Verify email address
   */
  async verifyEmail(verificationData) {
    const requiredFields = ['email', 'token'];
    this.validateRequired(verificationData, requiredFields);
    
    return await this.post(API_ENDPOINTS.AUTH.VERIFY_EMAIL, verificationData);
  }

  /**
   * Request password reset
   */
  async forgotPassword(email) {
    this.validateRequired({ email }, ['email']);
    
    return await this.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
  }

  /**
   * Reset password with token
   */
  async resetPassword(resetData) {
    const requiredFields = ['token', 'newPassword'];
    this.validateRequired(resetData, requiredFields);
    
    return await this.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, resetData);
  }

  /**
   * Change password (authenticated user)
   */
  async changePassword(passwordData) {
    const requiredFields = ['currentPassword', 'newPassword'];
    this.validateRequired(passwordData, requiredFields);
    
    return await this.post('/auth/change-password', passwordData);
  }

  /**
   * Get current user profile
   */
  async getCurrentUser() {
    return await this.get(API_ENDPOINTS.USERS.PROFILE);
  }

  /**
   * Update user profile
   */
  async updateProfile(profileData) {
    return await this.put(API_ENDPOINTS.USERS.UPDATE_PROFILE, profileData);
  }

  /**
   * Resend verification email
   */
  async resendVerificationEmail(email) {
    this.validateRequired({ email }, ['email']);
    
    return await this.post('/auth/resend-verification', { email });
  }

  /**
   * Check if email exists
   */
  async checkEmailExists(email) {
    this.validateRequired({ email }, ['email']);
    
    try {
      const response = await this.post('/auth/check-email', { email });
      return response.success && response.data?.exists;
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    }
  }

  /**
   * Validate password strength
   */
  validatePasswordStrength(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const score = [
      password.length >= minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar,
    ].filter(Boolean).length;

    return {
      isValid: score >= 4,
      score,
      feedback: {
        minLength: password.length >= minLength,
        hasUpperCase,
        hasLowerCase,
        hasNumbers,
        hasSpecialChar,
      },
    };
  }

  /**
   * Validate email format
   */
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

// Export singleton instance
export const authApi = new AuthApiService();
