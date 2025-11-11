-- Migration: Add 'buy' to listing_type constraint
-- This allows properties to have listing_type of 'rent', 'sell', or 'buy'

-- First, drop the existing constraint
ALTER TABLE properties DROP CONSTRAINT IF EXISTS properties_listing_type_check;

-- Add the new constraint that includes 'buy'
ALTER TABLE properties ADD CONSTRAINT properties_listing_type_check 
  CHECK (listing_type IN ('rent', 'sell', 'buy'));

-- Verify the constraint
SELECT conname, pg_get_constraintdef(oid) 
FROM pg_constraint 
WHERE conname = 'properties_listing_type_check';

