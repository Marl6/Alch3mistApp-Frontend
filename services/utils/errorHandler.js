/**
 * Error Handler Service
 * Centralized error handling for API responses and app errors
 */

import { Alert } from 'react-native';

class ErrorHandlerService {
  /**
   * Handle API errors with user-friendly messages
   */
  handleApiError(error, context = '') {
    console.error(`API Error ${context}:`, error);

    let userMessage = 'An unexpected error occurred. Please try again.';
    let shouldShowAlert = true;

    // Handle different types of errors
    switch (error.status) {
      case 400:
        userMessage = error.message || 'Invalid request. Please check your input.';
        break;
      case 401:
        userMessage = 'Authentication required. Please log in again.';
        this.handleAuthError();
        shouldShowAlert = false; // Auth handler will show appropriate message
        break;
      case 403:
        userMessage = 'You do not have permission to perform this action.';
        break;
      case 404:
        userMessage = 'The requested resource was not found.';
        break;
      case 409:
        userMessage = error.message || 'A conflict occurred. Please try again.';
        break;
      case 422:
        userMessage = error.message || 'Invalid data provided.';
        break;
      case 429:
        userMessage = 'Too many requests. Please wait a moment before trying again.';
        break;
      case 500:
        userMessage = 'Server error. Our team has been notified.';
        break;
      case 503:
        userMessage = 'Service temporarily unavailable. Please try again later.';
        break;
      default:
        if (error.message === 'Network request failed') {
          userMessage = 'Network error. Please check your internet connection.';
        } else if (error.message === 'Request timeout') {
          userMessage = 'Request timed out. Please try again.';
        } else if (error.message?.includes('fetch')) {
          userMessage = 'Connection error. Please check your internet connection.';
        }
    }

    // Show alert if needed
    if (shouldShowAlert) {
      this.showErrorAlert(userMessage, context);
    }

    // Return standardized error object
    return {
      success: false,
      error: userMessage,
      originalError: error,
      status: error.status || 500,
    };
  }

  /**
   * Handle authentication errors
   */
  handleAuthError() {
    // TODO: Implement navigation to login screen
    // Example: NavigationService.navigate('Login');
    
    Alert.alert(
      'Authentication Required',
      'Your session has expired. Please log in again.',
      [
        {
          text: 'OK',
          onPress: () => {
            // TODO: Clear auth data and navigate to login
            console.log('Navigate to login screen');
          },
        },
      ]
    );
  }

  /**
   * Show error alert to user
   */
  showErrorAlert(message, context = '') {
    const title = context ? `Error ${context}` : 'Error';
    
    Alert.alert(
      title,
      message,
      [{ text: 'OK' }],
      { cancelable: true }
    );
  }

  /**
   * Show success alert to user
   */
  showSuccessAlert(message, title = 'Success') {
    Alert.alert(
      title,
      message,
      [{ text: 'OK' }],
      { cancelable: true }
    );
  }

  /**
   * Show confirmation dialog
   */
  showConfirmationDialog(message, onConfirm, onCancel = null, title = 'Confirm') {
    Alert.alert(
      title,
      message,
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: onCancel,
        },
        {
          text: 'OK',
          onPress: onConfirm,
        },
      ],
      { cancelable: true }
    );
  }

  /**
   * Handle form validation errors
   */
  handleValidationErrors(errors) {
    if (Array.isArray(errors)) {
      return errors.join('\n');
    }
    
    if (typeof errors === 'object') {
      return Object.values(errors).flat().join('\n');
    }
    
    return errors || 'Validation failed';
  }

  /**
   * Log error for debugging (development only)
   */
  logError(error, context = '') {
    if (__DEV__) {
      console.group(`🚨 Error ${context}`);
      console.error('Message:', error.message);
      console.error('Status:', error.status);
      console.error('Full Error:', error);
      console.groupEnd();
    }
    
    // TODO: In production, send to error tracking service (e.g., Sentry)
    // Sentry.captureException(error, { extra: { context } });
  }

  /**
   * Handle offline errors
   */
  handleOfflineError() {
    Alert.alert(
      'No Internet Connection',
      'Please check your internet connection and try again.',
      [{ text: 'OK' }]
    );
  }

  /**
   * Handle permission errors
   */
  handlePermissionError(permission) {
    Alert.alert(
      'Permission Required',
      `This app needs ${permission} permission to function properly. Please enable it in your device settings.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Settings', onPress: () => {
          // TODO: Open device settings
          console.log('Open device settings');
        }},
      ]
    );
  }
}

// Export singleton instance
export const errorHandler = new ErrorHandlerService();
