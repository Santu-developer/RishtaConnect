// ============================================
// SECURITY UTILITIES
// ============================================

/**
 * Check if we're in development mode
 */
export const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Secure console.log - only logs in development
 * In production, this does nothing
 */
export const secureLog = (...args) => {
  if (isDevelopment) {
    console.log(...args);
  }
};

/**
 * Secure console.error - always logs errors but sanitizes sensitive data
 */
export const secureError = (error, context = '') => {
  if (isDevelopment) {
    console.error(context, error);
  } else {
    // In production, log only error type without sensitive details
    console.error('An error occurred:', error.message || 'Unknown error');
  }
};

/**
 * Remove sensitive data from objects before logging
 */
export const sanitizeForLog = (data) => {
  if (!data) return data;
  
  const sensitiveKeys = ['password', 'token', 'confirmPassword', 'authorization'];
  const sanitized = { ...data };
  
  Object.keys(sanitized).forEach(key => {
    if (sensitiveKeys.includes(key.toLowerCase())) {
      sanitized[key] = '***REDACTED***';
    }
  });
  
  return sanitized;
};

/**
 * Secure data storage - prevents direct console access
 */
class SecureStorage {
  static set(key, value) {
    try {
      const encrypted = btoa(JSON.stringify(value)); // Basic encoding
      sessionStorage.setItem(key, encrypted);
    } catch (error) {
      secureError(error, 'SecureStorage.set');
    }
  }
  
  static get(key) {
    try {
      const encrypted = sessionStorage.getItem(key);
      return encrypted ? JSON.parse(atob(encrypted)) : null;
    } catch (error) {
      secureError(error, 'SecureStorage.get');
      return null;
    }
  }
  
  static remove(key) {
    sessionStorage.removeItem(key);
  }
  
  static clear() {
    sessionStorage.clear();
  }
}

export default SecureStorage;
