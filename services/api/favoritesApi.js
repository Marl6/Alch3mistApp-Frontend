/**
 * Favorites API Service
 * Handles all favorite-related API operations
 */

import { BaseApiService } from '../base/baseApiService.js';
import { API_ENDPOINTS } from '../config/apiConfig.js';

export class FavoritesApiService extends BaseApiService {
  /**
   * Add a recipe to user's favorites
   */
  async addFavorite({ userId, recipeId, title, image, cookTime, servings }) {
    this.validateRequired(
      { userId, recipeId, title },
      ['userId', 'recipeId', 'title']
    );

    return await this.post(API_ENDPOINTS.FAVORITES.BASE, {
      userId,
      recipeId,
      title,
      image,
      cookTime,
      servings,
    });
  }

  /**
   * Remove a recipe from user's favorites
   */
  async removeFavorite(userId, recipeId) {
    this.validateRequired({ userId, recipeId }, ['userId', 'recipeId']);
    
    return await this.delete(API_ENDPOINTS.FAVORITES.DELETE(userId, recipeId));
  }

  /**
   * Get all favorites for a user
   */
  async getUserFavorites(userId) {
    this.validateRequired({ userId }, ['userId']);
    
    return await this.get(API_ENDPOINTS.FAVORITES.BY_USER(userId));
  }

  /**
   * Check if a recipe is favorited by user
   */
  async isFavorite(userId, recipeId) {
    try {
      const response = await this.getUserFavorites(userId);
      
      if (response.success) {
        const favorites = response.data || [];
        return favorites.some(fav => fav.recipeId === parseInt(recipeId));
      }
      
      return false;
    } catch (error) {
      console.error('Error checking favorite status:', error);
      return false;
    }
  }

  /**
   * Get favorite count for a user
   */
  async getFavoriteCount(userId) {
    try {
      const response = await this.getUserFavorites(userId);
      
      if (response.success) {
        return response.data?.length || 0;
      }
      
      return 0;
    } catch (error) {
      console.error('Error getting favorite count:', error);
      return 0;
    }
  }
}

// Export singleton instance
export const favoritesApi = new FavoritesApiService();
