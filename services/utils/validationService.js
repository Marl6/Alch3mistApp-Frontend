/**
 * Validation Service
 * Common validation functions for forms and data
 */

class ValidationService {
  /**
   * Validate email format
   */
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return {
      isValid: emailRegex.test(email),
      message: emailRegex.test(email) ? '' : 'Please enter a valid email address',
    };
  }

  /**
   * Validate password strength
   */
  validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const checks = [
      { valid: password.length >= minLength, message: `At least ${minLength} characters` },
      { valid: hasUpperCase, message: 'One uppercase letter' },
      { valid: hasLowerCase, message: 'One lowercase letter' },
      { valid: hasNumbers, message: 'One number' },
      { valid: hasSpecialChar, message: 'One special character' },
    ];

    const failedChecks = checks.filter(check => !check.valid);
    const score = checks.length - failedChecks.length;

    return {
      isValid: score >= 4,
      score,
      strength: this.getPasswordStrength(score),
      messages: failedChecks.map(check => check.message),
    };
  }

  /**
   * Get password strength description
   */
  getPasswordStrength(score) {
    switch (score) {
      case 5: return 'Very Strong';
      case 4: return 'Strong';
      case 3: return 'Medium';
      case 2: return 'Weak';
      default: return 'Very Weak';
    }
  }

  /**
   * Validate phone number
   */
  validatePhone(phone) {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return {
      isValid: phoneRegex.test(phone),
      message: phoneRegex.test(phone) ? '' : 'Please enter a valid phone number',
    };
  }

  /**
   * Validate required field
   */
  validateRequired(value, fieldName = 'This field') {
    const isValid = value !== null && value !== undefined && value.toString().trim() !== '';
    return {
      isValid,
      message: isValid ? '' : `${fieldName} is required`,
    };
  }

  /**
   * Validate minimum length
   */
  validateMinLength(value, minLength, fieldName = 'This field') {
    const isValid = value && value.toString().length >= minLength;
    return {
      isValid,
      message: isValid ? '' : `${fieldName} must be at least ${minLength} characters`,
    };
  }

  /**
   * Validate maximum length
   */
  validateMaxLength(value, maxLength, fieldName = 'This field') {
    const isValid = !value || value.toString().length <= maxLength;
    return {
      isValid,
      message: isValid ? '' : `${fieldName} must not exceed ${maxLength} characters`,
    };
  }

  /**
   * Validate numeric value
   */
  validateNumeric(value, fieldName = 'This field') {
    const isValid = !isNaN(value) && !isNaN(parseFloat(value));
    return {
      isValid,
      message: isValid ? '' : `${fieldName} must be a valid number`,
    };
  }

  /**
   * Validate positive number
   */
  validatePositiveNumber(value, fieldName = 'This field') {
    const numericValidation = this.validateNumeric(value, fieldName);
    if (!numericValidation.isValid) return numericValidation;

    const isValid = parseFloat(value) > 0;
    return {
      isValid,
      message: isValid ? '' : `${fieldName} must be a positive number`,
    };
  }

  /**
   * Validate price format
   */
  validatePrice(value, fieldName = 'Price') {
    const numericValidation = this.validatePositiveNumber(value, fieldName);
    if (!numericValidation.isValid) return numericValidation;

    const price = parseFloat(value);
    const isValid = price <= 99999.99; // Reasonable maximum price
    return {
      isValid,
      message: isValid ? '' : `${fieldName} cannot exceed $99,999.99`,
    };
  }

  /**
   * Validate URL format
   */
  validateUrl(url) {
    try {
      new URL(url);
      return { isValid: true, message: '' };
    } catch {
      return { isValid: false, message: 'Please enter a valid URL' };
    }
  }

  /**
   * Validate date format and range
   */
  validateDate(date, fieldName = 'Date') {
    if (!date) {
      return { isValid: false, message: `${fieldName} is required` };
    }

    const dateObj = new Date(date);
    const isValid = !isNaN(dateObj.getTime());
    
    return {
      isValid,
      message: isValid ? '' : `Please enter a valid ${fieldName.toLowerCase()}`,
    };
  }

  /**
   * Validate date is in the future
   */
  validateFutureDate(date, fieldName = 'Date') {
    const dateValidation = this.validateDate(date, fieldName);
    if (!dateValidation.isValid) return dateValidation;

    const dateObj = new Date(date);
    const now = new Date();
    const isValid = dateObj > now;

    return {
      isValid,
      message: isValid ? '' : `${fieldName} must be in the future`,
    };
  }

  /**
   * Validate multiple fields
   */
  validateFields(fields, rules) {
    const errors = {};
    let isValid = true;

    Object.keys(rules).forEach(fieldName => {
      const fieldRules = rules[fieldName];
      const fieldValue = fields[fieldName];

      for (const rule of fieldRules) {
        const validation = rule(fieldValue, fieldName);
        if (!validation.isValid) {
          errors[fieldName] = validation.message;
          isValid = false;
          break; // Stop at first error for this field
        }
      }
    });

    return { isValid, errors };
  }

  /**
   * Common validation rules
   */
  rules = {
    required: (value, fieldName) => this.validateRequired(value, fieldName),
    email: (value) => this.validateEmail(value),
    password: (value) => this.validatePassword(value),
    phone: (value) => this.validatePhone(value),
    numeric: (value, fieldName) => this.validateNumeric(value, fieldName),
    positiveNumber: (value, fieldName) => this.validatePositiveNumber(value, fieldName),
    price: (value, fieldName) => this.validatePrice(value, fieldName),
    url: (value) => this.validateUrl(value),
    date: (value, fieldName) => this.validateDate(value, fieldName),
    futureDate: (value, fieldName) => this.validateFutureDate(value, fieldName),
    minLength: (min) => (value, fieldName) => this.validateMinLength(value, min, fieldName),
    maxLength: (max) => (value, fieldName) => this.validateMaxLength(value, max, fieldName),
  };
}

// Export singleton instance
export const validationService = new ValidationService();
