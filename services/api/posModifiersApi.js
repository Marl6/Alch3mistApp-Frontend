/**
 * POS Modifiers API Service
 * Handles all POS modifier-related API operations (add-ons, variations, etc.)
 */

import { BaseApiService } from '../base/baseApiService.js';
import { API_ENDPOINTS } from '../config/apiConfig.js';

export class PosModifiersApiService extends BaseApiService {
  /**
   * Get all modifiers
   */
  async getModifiers({ active = true, type = '' } = {}) {
    const params = { active };
    if (type) params.type = type;
    
    return await this.get(API_ENDPOINTS.POS.MODIFIERS.BASE, params);
  }

  /**
   * Get a specific modifier by ID
   */
  async getModifierById(id) {
    this.validateRequired({ id }, ['id']);
    
    return await this.get(API_ENDPOINTS.POS.MODIFIERS.BY_ID(id));
  }

  /**
   * Get modifiers for a specific item
   */
  async getModifiersByItem(itemId) {
    this.validateRequired({ itemId }, ['itemId']);
    
    return await this.get(API_ENDPOINTS.POS.MODIFIERS.BY_ITEM(itemId));
  }

  /**
   * Create a new modifier
   */
  async createModifier(modifierData) {
    const requiredFields = ['name', 'type'];
    this.validateRequired(modifierData, requiredFields);
    
    return await this.post(API_ENDPOINTS.POS.MODIFIERS.BASE, modifierData);
  }

  /**
   * Update a modifier
   */
  async updateModifier(id, modifierData) {
    this.validateRequired({ id }, ['id']);
    
    return await this.put(API_ENDPOINTS.POS.MODIFIERS.BY_ID(id), modifierData);
  }

  /**
   * Delete a modifier
   */
  async deleteModifier(id) {
    this.validateRequired({ id }, ['id']);
    
    return await this.delete(API_ENDPOINTS.POS.MODIFIERS.BY_ID(id));
  }

  /**
   * Add modifier options
   */
  async addModifierOption(modifierId, optionData) {
    this.validateRequired({ modifierId }, ['modifierId']);
    const requiredFields = ['name', 'price'];
    this.validateRequired(optionData, requiredFields);
    
    return await this.post(`${API_ENDPOINTS.POS.MODIFIERS.BY_ID(modifierId)}/options`, optionData);
  }

  /**
   * Update modifier option
   */
  async updateModifierOption(modifierId, optionId, optionData) {
    this.validateRequired({ modifierId, optionId }, ['modifierId', 'optionId']);
    
    return await this.put(`${API_ENDPOINTS.POS.MODIFIERS.BY_ID(modifierId)}/options/${optionId}`, optionData);
  }

  /**
   * Delete modifier option
   */
  async deleteModifierOption(modifierId, optionId) {
    this.validateRequired({ modifierId, optionId }, ['modifierId', 'optionId']);
    
    return await this.delete(`${API_ENDPOINTS.POS.MODIFIERS.BY_ID(modifierId)}/options/${optionId}`);
  }

  /**
   * Assign modifier to item
   */
  async assignModifierToItem(modifierId, itemId, settings = {}) {
    this.validateRequired({ modifierId, itemId }, ['modifierId', 'itemId']);
    
    return await this.post(`${API_ENDPOINTS.POS.MODIFIERS.BY_ID(modifierId)}/assign`, {
      itemId,
      ...settings,
    });
  }

  /**
   * Remove modifier from item
   */
  async removeModifierFromItem(modifierId, itemId) {
    this.validateRequired({ modifierId, itemId }, ['modifierId', 'itemId']);
    
    return await this.delete(`${API_ENDPOINTS.POS.MODIFIERS.BY_ID(modifierId)}/assign/${itemId}`);
  }
}

// Export singleton instance
export const posModifiersApi = new PosModifiersApiService();
