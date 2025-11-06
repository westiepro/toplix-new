-- Update all properties to transaction_type = 'buy' (For Sale)

UPDATE properties
SET transaction_type = 'buy'
WHERE transaction_type IS NULL OR transaction_type != 'buy';

-- Verify the update
SELECT 
  transaction_type,
  COUNT(*) as count
FROM properties
GROUP BY transaction_type;

