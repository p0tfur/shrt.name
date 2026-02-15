/**
 * Utility Functions
 */

// Generate random short code
export function generateShortCode(length = 6) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Generate unique short code with retry
export async function generateUniqueShortCode(db, length = 6, maxAttempts = 10) {
  let code;
  let attempts = 0;

  do {
    code = generateShortCode(length);
    const exists = await db.prepare('SELECT id FROM links WHERE code = ?').bind(code).first();
    if (!exists) return code;
    attempts++;
  } while (attempts < maxAttempts);

  throw new Error('Failed to generate unique code after ' + maxAttempts + ' attempts');
}

// Maximum URL length
const MAX_URL_LENGTH = 2048;

// Validate URL
export function validateUrl(url) {
  try {
    // Check URL length first
    if (url.length > MAX_URL_LENGTH) {
      return { valid: false, error: `URL too long (max ${MAX_URL_LENGTH} characters)` };
    }

    const parsed = new URL(url);

    // Check protocol
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return { valid: false, error: 'URL must use HTTP or HTTPS' };
    }

    // Check hostname
    if (!parsed.hostname) {
      return { valid: false, error: 'Invalid URL' };
    }

    // Block localhost and private IPs for security
    const hostname = parsed.hostname.toLowerCase();
    if (
      hostname === 'localhost' ||
      hostname.startsWith('127.') ||
      hostname.startsWith('192.168.') ||
      hostname.startsWith('10.') ||
      hostname.startsWith('172.16.') ||
      hostname.startsWith('172.17.') ||
      hostname.startsWith('172.18.') ||
      hostname.startsWith('172.19.') ||
      hostname.startsWith('172.2') ||
      hostname.startsWith('172.30.') ||
      hostname.startsWith('172.31.')
    ) {
      return { valid: false, error: 'Localhost and private IPs are not allowed' };
    }

    return { valid: true, url: parsed.toString() };
  } catch (error) {
    return { valid: false, error: 'Invalid URL format' };
  }
}

// Validate custom code
export function validateCustomCode(code) {
  if (!code) {
    return { valid: true }; // Empty code means auto-generate
  }

  if (code.length < 3 || code.length > 50) {
    return { valid: false, error: 'Code must be between 3 and 50 characters' };
  }

  // Only allow alphanumeric and hyphens
  const validChars = /^[a-zA-Z0-9-]+$/;
  if (!validChars.test(code)) {
    return { valid: false, error: 'Code can only contain letters, numbers, and hyphens' };
  }

  // Don't allow codes starting with hyphen
  if (code.startsWith('-') || code.endsWith('-')) {
    return { valid: false, error: 'Code cannot start or end with a hyphen' };
  }

  // Don't allow consecutive hyphens
  if (code.includes('--')) {
    return { valid: false, error: 'Code cannot contain consecutive hyphens' };
  }

  // Reserved codes for API routes and system
  const reservedCodes = [
    'api', 'admin', 'login', 'register', 'dashboard', 'stats',
    'www', 'ftp', 'mail', 'smtp', 'pop', 'imap', 'ns', 'dns',
    'static', 'assets', 'images', 'img', 'css', 'js', 'fonts',
    'robots', 'sitemap', 'favicon', 'apple-touch-icon',
    'api', 'graphql', 'rest', 'webhook', 'callback',
    'health', 'ping', 'status', 'ready', 'live',
    'auth', 'oauth', 'sso', 'logout', 'password', 'reset',
    'user', 'users', 'account', 'profile', 'settings',
    'link', 'links', 'url', 'urls', 'short', 'shorten',
    'go', 'to', 'redirect', 'r', 'u',
    'null', 'undefined', 'true', 'false', 'nan',
    'new', 'edit', 'delete', 'update', 'create', 'remove',
    'test', 'testing', 'dev', 'development', 'staging', 'prod', 'production',
    'abuse', 'report', 'spam', 'phishing', 'malware', 'virus',
    'localhost', 'ip', 'local', 'host', 'server',
    'index', 'home', 'main', 'default', 'root'
  ];
  if (reservedCodes.includes(code.toLowerCase())) {
    return { valid: false, error: 'This code is reserved' };
  }

  return { valid: true, code: code };
}

// Extract metadata from request
export function extractMetadata(request) {
  const url = new URL(request.url);
  const headers = request.headers;

  const cf = headers.get('cf-ray');
  const country = headers.get('cf-ipcountry');
  const city = headers.get('cf-iplatitude') && headers.get('cf-iplongitude')
    ? headers.get('cf-iplatitude') + ',' + headers.get('cf-iplongitude')
    : null;

  const userAgent = headers.get('user-agent');
  const referrer = headers.get('referer');

  // Detect device type
  let deviceType = 'desktop';
  if (userAgent) {
    const ua = userAgent.toLowerCase();
    if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) {
      deviceType = 'mobile';
    } else if (ua.includes('tablet') || ua.includes('ipad')) {
      deviceType = 'tablet';
    }
  }

  return {
    country,
    city,
    referrer,
    user_agent: userAgent,
    device_type: deviceType,
    ip: headers.get('cf-connecting-ip')
  };
}

// Send JSON response
export function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}

// Send error response
export function errorResponse(message, status = 400) {
  return jsonResponse({
    success: false,
    error: message
  }, status);
}

// Handle CORS preflight
export function corsResponse() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}
