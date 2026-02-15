/**
 * Admin API Routes
 * GET /api/admin/links - List all links
 * DELETE /api/admin/links/:code - Delete a link
 * PUT /api/admin/links/:code - Update a link URL
 */

import { getAllLinks, deleteLink, updateLinkUrl, getLinkByCode, getLinkClicks } from '../db.js';
import { invalidateLinkCache, getClickCount } from '../kv.js';
import { validateUrl, jsonResponse, errorResponse } from '../utils.js';

/**
 * GET /api/admin/links - List all links with stats
 */
export async function adminList(request, env) {
  try {
    // Get all links from database
    const links = await getAllLinks(env.DB);
    
    // Enhance with click counts from KV
    const enhancedLinks = await Promise.all(
      links.map(async (link) => {
        // Try KV first, fallback to DB
        let clicks = await getClickCount(env.LINKS, link.id);
        if (clicks === 0) {
          clicks = await getLinkClicks(env.DB, link.id);
        }
        
        return {
          ...link,
          clicks
        };
      })
    );

    // Calculate total clicks
    const totalClicks = enhancedLinks.reduce((sum, link) => sum + (link.clicks || 0), 0);

    return jsonResponse({
      success: true,
      links: enhancedLinks,
      total: enhancedLinks.length,
      totalClicks
    });

  } catch (error) {
    console.error('Error in adminList:', error);
    return errorResponse('Failed to fetch links', 500);
  }
}

/**
 * DELETE /api/admin/links/:code - Delete a link
 */
export async function adminDelete(request, env, code) {
  try {
    if (!code) {
      return errorResponse('Code is required', 400);
    }

    // Check if link exists
    const link = await getLinkByCode(env.DB, code);
    if (!link) {
      return errorResponse('Link not found', 404);
    }

    // Delete from database
    const deleted = await deleteLink(env.DB, code);
    
    if (!deleted) {
      return errorResponse('Failed to delete link', 500);
    }

    // Invalidate cache
    await invalidateLinkCache(env.LINKS, code);

    return jsonResponse({
      success: true,
      message: `Link '${code}' deleted successfully`,
      deleted_code: code
    });

  } catch (error) {
    console.error('Error in adminDelete:', error);
    return errorResponse('Failed to delete link', 500);
  }
}

/**
 * PUT /api/admin/links/:code - Update a link's URL
 */
export async function adminUpdate(request, env, code) {
  try {
    if (!code) {
      return errorResponse('Code is required', 400);
    }

    const body = await request.json();
    const { url } = body;

    if (!url) {
      return errorResponse('URL is required', 400);
    }

    // Validate URL
    const urlValidation = validateUrl(url);
    if (!urlValidation.valid) {
      return errorResponse(urlValidation.error);
    }

    const normalizedUrl = urlValidation.url;

    // Check if link exists
    const existingLink = await getLinkByCode(env.DB, code);
    if (!existingLink) {
      return errorResponse('Link not found', 404);
    }

    // Update in database
    const updated = await updateLinkUrl(env.DB, code, normalizedUrl);
    
    if (!updated) {
      return errorResponse('Failed to update link', 500);
    }

    // Update cache
    await invalidateLinkCache(env.LINKS, code);
    await cacheLink(env.LINKS, code, {
      id: existingLink.id,
      url: normalizedUrl,
      user_id: existingLink.user_id
    });

    return jsonResponse({
      success: true,
      message: `Link '${code}' updated successfully`,
      code,
      original_url: normalizedUrl,
      previous_url: existingLink.original_url
    });

  } catch (error) {
    console.error('Error in adminUpdate:', error);
    return errorResponse('Failed to update link', 500);
  }
}

// Import cacheLink for the update function
import { cacheLink } from '../kv.js';
