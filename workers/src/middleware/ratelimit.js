/**
 * Rate Limit Middleware
 */

import { checkRateLimit } from '../kv.js';
import { errorResponse } from '../utils.js';

export async function rateLimit(request, kv, limit = 60, window = 60) {
  const ip = request.headers.get('cf-connecting-ip');

  if (!ip) {
    return null; // Skip rate limiting if no IP
  }

  const result = await checkRateLimit(kv, ip, limit, window);

  if (!result.allowed) {
    return errorResponse(
      `Rate limit exceeded. Try again in ${result.resetIn} seconds.`,
      429
    );
  }

  return null; // Continue to next handler
}
