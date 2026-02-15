/**
 * D1 Database Operations
 */

// Create a new link
export async function createLink(db, originalUrl, code, customCode = false, userId = null) {
  const result = await db.prepare(`
    INSERT INTO links (original_url, code, custom_code, user_id)
    VALUES (?, ?, ?, ?)
  `).bind(originalUrl, code, customCode ? 1 : 0, userId).run();

  return result.meta.last_row_id;
}

// Get link by code
export async function getLinkByCode(db, code) {
  const link = await db.prepare(`
    SELECT id, original_url, code, custom_code, user_id, created_at, expires_at
    FROM links
    WHERE code = ?
  `).bind(code).first();

  return link;
}

// Check if code exists
export async function codeExists(db, code) {
  const result = await db.prepare(`
    SELECT id FROM links WHERE code = ?
  `).bind(code).first();

  return result !== null;
}

// Get link clicks count from analytics
export async function getLinkClicks(db, linkId) {
  const result = await db.prepare(`
    SELECT COUNT(*) as count FROM analytics WHERE link_id = ?
  `).bind(linkId).first();

  return result ? result.count : 0;
}

// Insert analytics record
export async function insertAnalytics(db, linkId, metadata = {}) {
  const { country, city, referrer, user_agent, device_type } = metadata;

  await db.prepare(`
    INSERT INTO analytics (link_id, country, city, referrer, user_agent, device_type)
    VALUES (?, ?, ?, ?, ?, ?)
  `).bind(
    linkId,
    country || null,
    city || null,
    referrer || null,
    user_agent || null,
    device_type || null
  ).run();
}

// Get analytics for a link
export async function getLinkAnalytics(db, linkId) {
  const analytics = await db.prepare(`
    SELECT clicked_at, country, city, referrer, user_agent, device_type
    FROM analytics
    WHERE link_id = ?
    ORDER BY clicked_at DESC
    LIMIT 100
  `).bind(linkId).all();

  return analytics.results || [];
}

// Get link stats summary
export async function getLinkStats(db, code) {
  const link = await getLinkByCode(db, code);

  if (!link) {
    return null;
  }

  const clicks = await getLinkClicks(db, link.id);

  return {
    ...link,
    clicks,
    custom_code: link.custom_code === 1
  };
}

// Delete link
export async function deleteLink(db, code) {
  const result = await db.prepare(`
    DELETE FROM links WHERE code = ?
  `).bind(code).run();

  return result.meta.changes > 0;
}

// Get links by user
export async function getLinksByUser(db, userId) {
  const links = await db.prepare(`
    SELECT id, original_url, code, custom_code, created_at, expires_at
    FROM links
    WHERE user_id = ?
    ORDER BY created_at DESC
  `).bind(userId).all();

  return links.results || [];
}

// Get all links (for admin)
export async function getAllLinks(db) {
  const links = await db.prepare(`
    SELECT id, original_url, code, custom_code, user_id, created_at, expires_at
    FROM links
    ORDER BY created_at DESC
  `).all();

  return links.results || [];
}

// Update link URL
export async function updateLinkUrl(db, code, newUrl) {
  const result = await db.prepare(`
    UPDATE links 
    SET original_url = ?
    WHERE code = ?
  `).bind(newUrl, code).run();

  return result.meta.changes > 0;
}
