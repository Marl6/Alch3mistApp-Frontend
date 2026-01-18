# API Services Documentation

This directory contains a comprehensive API integration layer for the Alchemist POS application. The services are designed to be clean, maintainable, and easy to use.

## 📁 Structure

```
services/
├── api/                    # Individual API service modules
│   ├── authApi.js         # Authentication operations
│   ├── favoritesApi.js    # Favorites management
│   ├── mealsApi.js        # Meals/recipes operations
│   ├── posItemsApi.js     # POS items management
│   ├── posCategoriesApi.js # POS categories management
│   ├── posModifiersApi.js # POS modifiers management
│   ├── posDiscountsApi.js # POS discounts management
│   ├── posOrdersApi.js    # POS orders management
│   ├── posReceiptsApi.js  # POS receipts management
│   ├── posShiftsApi.js    # POS shifts management
│   ├── reportsApi.js      # Reports and analytics
│   └── supportApi.js      # Support and help
├── base/                  # Base classes and utilities
│   └── baseApiService.js  # Abstract base class for all APIs
├── config/                # Configuration files
│   └── apiConfig.js       # API endpoints and configuration
├── http/                  # HTTP client and utilities
│   └── httpClient.js      # Centralized HTTP client
├── utils/                 # Utility services
│   ├── storageService.js  # Secure storage operations
│   ├── errorHandler.js    # Error handling service
│   └── validationService.js # Form validation service
├── index.js              # Main export file
└── mealAPI.js            # Legacy compatibility (deprecated)
```

## 🚀 Quick Start

### Import Services

```javascript
// Import specific services
import { authApi, posItemsApi, favoritesApi } from "../services";

// Or import all services
import { apiServices } from "../services";
```

### Basic Usage

```javascript
// Authentication
const loginResult = await authApi.login({
  email: "user@example.com",
  password: "password123",
});

if (loginResult.success) {
  console.log("Login successful:", loginResult.data);
} else {
  console.error("Login failed:", loginResult.error);
}

// POS Items
const itemsResult = await posItemsApi.getItems({
  page: 1,
  limit: 20,
  categoryId: "123",
});

// Favorites
const favoriteResult = await favoritesApi.addFavorite({
  userId: "user123",
  recipeId: 456,
  title: "Delicious Recipe",
  image: "recipe-image.jpg",
});
```

## 📋 API Services Overview

### Authentication API (`authApi`)

- User login/logout
- Registration
- Password reset
- Token refresh
- Profile management

### Favorites API (`favoritesApi`)

- Add/remove favorites
- Get user favorites
- Check favorite status

### Meals API (`mealsApi`)

- Browse meals
- Search recipes
- Get categories
- Meal ratings

### POS APIs

- **Items** (`posItemsApi`): Product management
- **Categories** (`posCategoriesApi`): Category management
- **Modifiers** (`posModifiersApi`): Add-ons and variations
- **Discounts** (`posDiscountsApi`): Discount management
- **Orders** (`posOrdersApi`): Order processing
- **Receipts** (`posReceiptsApi`): Receipt generation
- **Shifts** (`posShiftsApi`): Employee shift management

### Reports API (`reportsApi`)

- Sales reports
- Analytics
- Revenue tracking
- Performance metrics

### Support API (`supportApi`)

- Help tickets
- FAQ
- Bug reports
- Feature requests

## 🔧 Configuration

### Environment Setup

Add your API base URL to `.env`:

```env
EXPO_PUBLIC_API_BASE_URL=http://localhost:5001/api
```

### Update API Configuration

Edit `services/config/apiConfig.js`:

```javascript
export const API_BASE_URL = __DEV__
  ? "http://localhost:5001/api"
  : "https://your-production-api.com/api";
```

## 📝 Response Format

All API services return a standardized response format:

```javascript
// Success Response
{
  success: true,
  data: { /* response data */ },
  message: "Optional success message"
}

// Error Response
{
  success: false,
  error: "User-friendly error message",
  status: 400 // HTTP status code
}
```

## 🔐 Authentication

The HTTP client automatically handles authentication tokens:

```javascript
// Tokens are automatically included in requests
// No need to manually add Authorization headers

// The storage service handles token persistence
import { storageService } from "../services/utils/storageService";

await storageService.setAuthToken("your-jwt-token");
```

## ✅ Error Handling

Built-in error handling with user-friendly messages:

```javascript
import { errorHandler } from "../services/utils/errorHandler";

try {
  const result = await posItemsApi.createItem(itemData);
  if (!result.success) {
    // Error is already handled by the base service
    console.log("Error:", result.error);
  }
} catch (error) {
  // Additional error handling if needed
  errorHandler.handleApiError(error, "Creating Item");
}
```

## 🔍 Validation

Use the validation service for form validation:

```javascript
import { validationService } from "../services/utils/validationService";

// Single field validation
const emailValidation = validationService.validateEmail("user@example.com");
if (!emailValidation.isValid) {
  console.log(emailValidation.message);
}

// Multiple fields validation
const validation = validationService.validateFields(
  { email: "user@example.com", password: "pass123" },
  {
    email: [validationService.rules.required, validationService.rules.email],
    password: [
      validationService.rules.required,
      validationService.rules.password,
    ],
  }
);
```

## 📱 Usage Examples

### Creating a New Item

```javascript
const createItem = async (itemData) => {
  try {
    const result = await posItemsApi.createItem({
      name: itemData.name,
      price: itemData.price,
      categoryId: itemData.categoryId,
      description: itemData.description,
      active: true,
    });

    if (result.success) {
      // Show success message
      Alert.alert("Success", "Item created successfully");
      return result.data;
    } else {
      // Error handling is automatic
      return null;
    }
  } catch (error) {
    console.error("Error creating item:", error);
    return null;
  }
};
```

### Processing an Order

```javascript
const processOrder = async (orderData) => {
  try {
    // Create order
    const orderResult = await posOrdersApi.createOrder(orderData);
    if (!orderResult.success) return null;

    // Process payment
    const paymentResult = await posOrdersApi.processPayment(
      orderResult.data.id,
      {
        amount: orderData.total,
        paymentMethod: "card",
      }
    );

    if (paymentResult.success) {
      // Generate receipt
      await posReceiptsApi.generateReceipt(orderResult.data.id);
      return orderResult.data;
    }

    return null;
  } catch (error) {
    console.error("Error processing order:", error);
    return null;
  }
};
```

### Getting Sales Report

```javascript
const getSalesReport = async (startDate, endDate) => {
  const result = await reportsApi.getSalesReport({
    startDate,
    endDate,
    groupBy: "day",
  });

  if (result.success) {
    return result.data;
  }

  return [];
};
```

## 🔄 Migration from Legacy API

If you have existing code using the old `mealAPI.js`, the new structure maintains backward compatibility:

```javascript
// Old way (still works)
import mealAPI from "../services/mealAPI";

// New way (recommended)
import { mealsApi } from "../services";
```

## 🛠️ Extending the Services

### Adding a New API Service

1. Create a new service file in `services/api/`
2. Extend the `BaseApiService` class
3. Add endpoints to `apiConfig.js`
4. Export from `index.js`

```javascript
// services/api/newApi.js
import { BaseApiService } from "../base/baseApiService.js";
import { API_ENDPOINTS } from "../config/apiConfig.js";

export class NewApiService extends BaseApiService {
  async getData() {
    return await this.get("/new-endpoint");
  }
}

export const newApi = new NewApiService();
```

## 🧪 Testing

The services are designed to be easily testable:

```javascript
// Mock the HTTP client for testing
jest.mock("../services/http/httpClient", () => ({
  httpClient: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));
```

## 📊 Performance

- All services use singleton pattern for efficiency
- HTTP client includes request timeout and retry logic
- Responses are automatically parsed and formatted
- Error handling prevents unnecessary re-throws

## 🔒 Security

- All sensitive data is stored using `expo-secure-store`
- Authentication tokens are automatically included
- Input validation prevents malicious data
- Error messages don't expose sensitive information

## 🤝 Contributing

When adding new endpoints or modifying existing ones:

1. Update the appropriate API service
2. Add endpoints to `apiConfig.js`
3. Include proper error handling
4. Add validation where needed
5. Update this documentation

## 📚 Additional Resources

- [Expo Router Documentation](https://docs.expo.dev/router/introduction/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Secure Store](https://docs.expo.dev/versions/latest/sdk/securestore/)

---

This API service layer provides a solid foundation for your POS application, ensuring clean code, proper error handling, and easy maintenance as your application grows.
