/**
 * CORS Middleware
 */

import { corsResponse } from '../utils.js';

export function cors(request) {
  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return corsResponse();
  }

  return null; // Continue to next handler
}
