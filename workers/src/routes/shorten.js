/**
 * POST /api/shorten - Create short URL
 * POST /api/shorten/bulk - Create multiple short URLs
 */

import { createLink, codeExists } from '../db.js';
import { cacheLink } from '../kv.js';
import { validateUrl, validateCustomCode, generateUniqueShortCode, jsonResponse, errorResponse } from '../utils.js';

export async function shorten(request, env) {
  try {
    const body = await request.json();
    const { url, code } = body;

    // Validate URL
    const urlValidation = validateUrl(url);
    if (!urlValidation.valid) {
      return errorResponse(urlValidation.error);
    }

    const normalizedUrl = urlValidation.url;

    // Determine code
    let shortCode;
    const isCustom = !!code;

    if (code) {
      // Validate custom code
      const codeValidation = validateCustomCode(code);
      if (!codeValidation.valid) {
        return errorResponse(codeValidation.error);
      }

      shortCode = codeValidation.code;

      // Check if code already exists
      const exists = await codeExists(env.DB, shortCode);
      if (exists) {
        return errorResponse('This short code is already taken', 409);
      }
    } else {
      // Generate unique code
      shortCode = await generateUniqueShortCode(env.DB);
    }

    // Create link in database
    const linkId = await createLink(
      env.DB,
      normalizedUrl,
      shortCode,
      isCustom,
      null // user_id (null for MVP without auth)
    );

    // Cache in KV
    await cacheLink(env.LINKS, shortCode, {
      id: linkId,
      original_url: normalizedUrl,
      user_id: null
    });

    // Return response
    const shortUrl = `https://${env.DOMAIN}/${shortCode}`;

    return jsonResponse({
      success: true,
      short_url: shortUrl,
      code: shortCode,
      original_url: normalizedUrl,
      custom_code: isCustom
    });

  } catch (error) {
    console.error('Error in shorten:', error);
    return errorResponse('Internal server error', 500);
  }
}

/**
 * POST /api/shorten/bulk - Create multiple short URLs at once
 * Request body: { urls: [{ url: string, code?: string }] }
 * Max 10 URLs per request
 */
export async function bulkShorten(request, env) {
  try {
    const body = await request.json();
    const { urls } = body;

    // Validate input
    if (!Array.isArray(urls)) {
      return errorResponse('urls must be an array');
    }

    if (urls.length === 0) {
      return errorResponse('urls array cannot be empty');
    }

    if (urls.length > 10) {
      return errorResponse('Maximum 10 URLs per bulk request');
    }

    const results = [];
    const errors = [];

    // Process each URL
    for (let i = 0; i < urls.length; i++) {
      const item = urls[i];
      
      if (!item || typeof item !== 'object') {
        errors.push({ index: i, error: 'Invalid item format' });
        continue;
      }

      const { url, code } = item;

      // Validate URL
      const urlValidation = validateUrl(url);
      if (!urlValidation.valid) {
        errors.push({ index: i, url, error: urlValidation.error });
        continue;
      }

      const normalizedUrl = urlValidation.url;

      // Determine code
      let shortCode;
      const isCustom = !!code;

      try {
        if (code) {
          // Validate custom code
          const codeValidation = validateCustomCode(code);
          if (!codeValidation.valid) {
            errors.push({ index: i, url, error: codeValidation.error });
            continue;
          }

          shortCode = codeValidation.code;

          // Check if code already exists
          const exists = await codeExists(env.DB, shortCode);
          if (exists) {
            errors.push({ index: i, url, code, error: 'Code already taken' });
            continue;
          }
        } else {
          // Generate unique code
          shortCode = await generateUniqueShortCode(env.DB);
        }

        // Create link in database
        const linkId = await createLink(
          env.DB,
          normalizedUrl,
          shortCode,
          isCustom,
          null
        );

        // Cache in KV
        await cacheLink(env.LINKS, shortCode, {
          id: linkId,
          original_url: normalizedUrl,
          user_id: null
        });

        // Add to successful results
        results.push({
          index: i,
          success: true,
          short_url: `https://${env.DOMAIN}/${shortCode}`,
          code: shortCode,
          original_url: normalizedUrl,
          custom_code: isCustom
        });

      } catch (err) {
        errors.push({ index: i, url, error: 'Failed to create link' });
      }
    }

    return jsonResponse({
      success: true,
      processed: urls.length,
      successful: results.length,
      failed: errors.length,
      results,
      errors
    });

  } catch (error) {
    console.error('Error in bulkShorten:', error);
    return errorResponse('Internal server error', 500);
  }
}
