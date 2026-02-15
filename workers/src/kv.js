/**
 * KV Cache Operations
 */

const LINKS_PREFIX = 'links:';
const CLICKS_PREFIX = 'clicks:';
const RATELIMIT_PREFIX = 'ratelimit:';
const SESSION_PREFIX = 'session:';

// Cache link data in KV
export async function cacheLink(kv, code, linkData, ttl = 86400) {
  const key = LINKS_PREFIX + code;
  const value = JSON.stringify(linkData);
  await kv.put(key, value, { expirationTtl: ttl });
}

// Get link from cache
export async function getLinkFromCache(kv, code) {
  const key = LINKS_PREFIX + code;
  const value = await kv.get(key);

  if (!value) {
    return null;
  }

  return JSON.parse(value);
}

// Invalidate link cache
export async function invalidateLinkCache(kv, code) {
  const key = LINKS_PREFIX + code;
  await kv.delete(key);
}

// Increment click count
export async function incrementClickCount(kv, linkId) {
  const key = CLICKS_PREFIX + linkId;

  // Get current count
  const current = await kv.get(key);
  const count = current ? parseInt(current, 10) : 0;
  const newCount = count + 1;

  // Update count
  await kv.put(key, newCount.toString(), { expirationTtl: 86400 * 7 }); // 7 days

  return newCount;
}

// Get click count from KV
export async function getClickCount(kv, linkId) {
  const key = CLICKS_PREFIX + linkId;
  const value = await kv.get(key);

  if (!value) {
    return 0;
  }

  return parseInt(value, 10);
}

// Rate limiting
export async function checkRateLimit(kv, ip, limit = 60, window = 60) {
  const key = RATELIMIT_PREFIX + ip;
  const now = Date.now();
  const windowMs = window * 1000;

  // Get current rate limit data
  const data = await kv.get(key);
  let rateData = data ? JSON.parse(data) : { count: 0, resetAt: now + windowMs };

  // Reset if window expired
  if (now > rateData.resetAt) {
    rateData = { count: 0, resetAt: now + windowMs };
  }

  // Check limit
  if (rateData.count >= limit) {
    const resetIn = Math.ceil((rateData.resetAt - now) / 1000);
    return {
      allowed: false,
      resetIn,
      limit,
      remaining: 0
    };
  }

  // Increment count
  rateData.count++;
  await kv.put(key, JSON.stringify(rateData), { expirationTtl: window });

  return {
    allowed: true,
    resetIn: Math.ceil((rateData.resetAt - now) / 1000),
    limit,
    remaining: limit - rateData.count
  };
}

// Session management
export async function createSession(kv, userId, ttl = 86400) {
  const token = generateToken();
  const sessionData = {
    userId,
    createdAt: Date.now(),
    expiresAt: Date.now() + (ttl * 1000)
  };

  const key = SESSION_PREFIX + token;
  await kv.put(key, JSON.stringify(sessionData), { expirationTtl: ttl });

  return token;
}

export async function getSession(kv, token) {
  const key = SESSION_PREFIX + token;
  const data = await kv.get(key);

  if (!data) {
    return null;
  }

  return JSON.parse(data);
}

export async function deleteSession(kv, token) {
  const key = SESSION_PREFIX + token;
  await kv.delete(key);
}

// Helper: Generate random token
function generateToken() {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let token = '';
  for (let i = 0; i < 32; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}
