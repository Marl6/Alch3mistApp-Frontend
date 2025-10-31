/**
 * Storage Service
 * Handles secure storage operations using expo-secure-store
 */

import * as SecureStore from 'expo-secure-store';

class StorageService {
  /**
   * Store a value securely
   */
  async setItem(key, value) {
    try {
      const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
      await SecureStore.setItemAsync(key, stringValue);
      return true;
    } catch (error) {
      console.error('Error storing item:', error);
      return false;
    }
  }

  /**
   * Retrieve a value from secure storage
   */
  async getItem(key) {
    try {
      const value = await SecureStore.getItemAsync(key);
      if (value === null) return null;
      
      // Try to parse as JSON, return as string if parsing fails
      try {
        return JSON.parse(value);
      } catch {
        return value;
      }
    } catch (error) {
      console.error('Error retrieving item:', error);
      return null;
    }
  }

  /**
   * Remove a value from secure storage
   */
  async removeItem(key) {
    try {
      await SecureStore.deleteItemAsync(key);
      return true;
    } catch (error) {
      console.error('Error removing item:', error);
      return false;
    }
  }

  /**
   * Check if a key exists in storage
   */
  async hasItem(key) {
    try {
      const value = await SecureStore.getItemAsync(key);
      return value !== null;
    } catch (error) {
      console.error('Error checking item existence:', error);
      return false;
    }
  }

  /**
   * Clear all stored items (use with caution)
   */
  async clear() {
    try {
      // SecureStore doesn't have a clear all method, so we need to manually clear known keys
      const keysToRemove = [
        'auth_token',
        'refresh_token',
        'user_data',
        'app_settings',
      ];
      
      await Promise.all(keysToRemove.map(key => this.removeItem(key)));
      return true;
    } catch (error) {
      console.error('Error clearing storage:', error);
      return false;
    }
  }

  // Authentication specific methods
  async setAuthToken(token) {
    return await this.setItem('auth_token', token);
  }

  async getAuthToken() {
    return await this.getItem('auth_token');
  }

  async removeAuthToken() {
    return await this.removeItem('auth_token');
  }

  async setRefreshToken(token) {
    return await this.setItem('refresh_token', token);
  }

  async getRefreshToken() {
    return await this.getItem('refresh_token');
  }

  async removeRefreshToken() {
    return await this.removeItem('refresh_token');
  }

  // User data methods
  async setUserData(userData) {
    return await this.setItem('user_data', userData);
  }

  async getUserData() {
    return await this.getItem('user_data');
  }

  async removeUserData() {
    return await this.removeItem('user_data');
  }

  // App settings methods
  async setAppSettings(settings) {
    return await this.setItem('app_settings', settings);
  }

  async getAppSettings() {
    return await this.getItem('app_settings');
  }

  async removeAppSettings() {
    return await this.removeItem('app_settings');
  }
}

// Export singleton instance
export const storageService = new StorageService();
