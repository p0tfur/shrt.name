/**
 * GET /:code - Redirect to original URL with analytics
 */

import { getLinkByCode, insertAnalytics } from '../db.js';
import { getLinkFromCache, incrementClickCount } from '../kv.js';
import { extractMetadata, errorResponse } from '../utils.js';

export async function redirect(request, env, code) {
  try {
    // Try to get from cache first
    let link = await getLinkFromCache(env.LINKS, code);

    // Fallback to database
    if (!link) {
      link = await getLinkByCode(env.DB, code);
    }

    if (!link) {
      return errorResponse('Link not found', 404);
    }

    // Check if link has expired
    if (link.expires_at) {
      const expiresAt = new Date(link.expires_at);
      if (new Date() > expiresAt) {
        return errorResponse('Link has expired', 410);
      }
    }

    // Increment click count in KV
    try {
      await incrementClickCount(env.LINKS, link.id);
    } catch (error) {
      console.error('Failed to increment click count in KV:', error);
    }

    // Extract metadata and insert analytics
    try {
      const metadata = extractMetadata(request);
      await insertAnalytics(env.DB, link.id, metadata);
    } catch (error) {
      console.error('Failed to insert analytics:', error, 'link.id:', link.id);
    }

    // Return 301 redirect
    return Response.redirect(link.original_url, 301);

  } catch (error) {
    console.error('Error in redirect:', error);
    return errorResponse('Internal server error', 500);
  }
}
