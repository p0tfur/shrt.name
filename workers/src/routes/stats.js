/**
 * GET /api/stats/:code - Get link statistics
 */

import { getLinkStats } from '../db.js';
import { getLinkByCode, getLinkClicks } from '../db.js';
import { getClickCount } from '../kv.js';
import { jsonResponse, errorResponse } from '../utils.js';

export async function stats(request, env, code) {
  try {
    // Get link from database
    const link = await getLinkByCode(env.DB, code);

    if (!link) {
      return errorResponse('Link not found', 404);
    }

    // Try to get clicks from KV first (faster)
    let clicks = await getClickCount(env.LINKS, link.id);

    // Fallback to database if KV has no data
    if (clicks === 0) {
      clicks = await getLinkClicks(env.DB, link.id);
    }

    // Return stats
    return jsonResponse({
      success: true,
      code: link.code,
      original_url: link.original_url,
      clicks: clicks,
      created_at: link.created_at,
      custom_code: link.custom_code === 1,
      expires_at: link.expires_at || null
    });

  } catch (error) {
    console.error('Error in stats:', error);
    return errorResponse('Internal server error', 500);
  }
}
