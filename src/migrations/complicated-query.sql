-- Query joining all three tables
-- Assumes auth_id in ocpi_tokens relates to user.id somehow

SELECT 
    u.id as userId,
    u.name as user_name,
    u.email as user_email,
    
    ot.id as token_id,
    ot.auth_id,
    ot.auth_member,
    ot.type as token_type,
    ot.ocpp_uid,
    ot.uid,
    ot.valid as token_valid,
    ot.issuer,
    ot.visual_number,
    ot.language,
    ot.whitelist,
    ot.last_updated as token_last_updated,
    
    p.id as payout_id,
    p.currency,
    p.amount,
    p.transactionId,
    p.createdAt as payout_createdAt,
    
    -- Some useful calculations
    COUNT(p.id) OVER (PARTITION BY u.id) as total_payouts_per_user,
    SUM(p.amount) OVER (PARTITION BY u.id) as total_payout_amount_per_user,
    COUNT(ot.id) OVER (PARTITION BY u.id) as total_tokens_per_user

FROM users u

-- Join tokens - assuming auth_id might relate to user somehow
-- This is a loose join since we don't have explicit foreign keys
LEFT JOIN ocpi_tokens ot ON (
    ot.auth_id = u.id 
    OR ot.auth_member = u.id
    OR ot.uid = u.id
)

-- Join payouts (this has a proper foreign key)
LEFT JOIN payouts p ON p.userId = u.id

-- Optional: Add some filtering
WHERE 
    u.createdAt >= datetime('now', '-1 year')  -- Users created in last year
    AND (ot.valid IS NULL OR ot.valid = 1)     -- Only valid tokens
    AND (p.amount IS NULL OR p.amount > 0)     -- Only positive payouts

ORDER BY 
    u.name,
    ot.last_updated DESC,
    p.createdAt DESC;

-- Alternative: If you want to see relationship patterns
-- This query shows potential connections between tables

SELECT 
    'Direct Match' as relationship_type,
    COUNT(*) as count
FROM users u
JOIN ocpi_tokens ot ON ot.auth_id = u.id

UNION ALL

SELECT 
    'Auth Member Match' as relationship_type,
    COUNT(*) as count
FROM users u
JOIN ocpi_tokens ot ON ot.auth_member = u.id

UNION ALL

SELECT 
    'UID Match' as relationship_type,
    COUNT(*) as count
FROM users u
JOIN ocpi_tokens ot ON ot.uid = u.id

UNION ALL

SELECT 
    'Users with Payouts' as relationship_type,
    COUNT(DISTINCT u.id) as count
FROM users u
JOIN payouts p ON p.userId = u.id

UNION ALL

SELECT 
    'Users with Tokens' as relationship_type,
    COUNT(DISTINCT u.id) as count
FROM users u
JOIN ocpi_tokens ot ON (ot.auth_id = u.id OR ot.auth_member = u.id OR ot.uid = u.id);

-- Summary query for business insights
SELECT 
    u.id,
    u.name,
    u.email,
    COUNT(DISTINCT ot.id) as token_count,
    COUNT(DISTINCT p.id) as payout_count,
    COALESCE(SUM(p.amount), 0) as total_payout_amount,
    MAX(ot.last_updated) as last_token_activity,
    MAX(p.createdAt) as last_payout_date
FROM users u
LEFT JOIN ocpi_tokens ot ON (ot.auth_id = u.id OR ot.auth_member = u.id OR ot.uid = u.id)
LEFT JOIN payouts p ON p.userId = u.id
GROUP BY u.id, u.name, u.email
ORDER BY total_payout_amount DESC;