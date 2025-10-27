-- Pitt Metro Realty Sample Data Insertion Script
-- Run this after creating the schema

-- Insert sample users (property owners and agents)
INSERT INTO users (id, email, password_hash, first_name, last_name, phone, user_type) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'sarah.johnson@pittmetro.com', '$2b$10$example_hash_1', 'Sarah', 'Johnson', '(412) 555-0101', 'agent'),
('550e8400-e29b-41d4-a716-446655440002', 'mike.chen@pittmetro.com', '$2b$10$example_hash_2', 'Mike', 'Chen', '(412) 555-0102', 'agent'),
('550e8400-e29b-41d4-a716-446655440003', 'lisa.thompson@pittmetro.com', '$2b$10$example_hash_3', 'Lisa', 'Thompson', '(412) 555-0103', 'agent'),
('550e8400-e29b-41d4-a716-446655440004', 'robert.wilson@pittmetro.com', '$2b$10$example_hash_4', 'Robert', 'Wilson', '(412) 555-0104', 'agent'),
('550e8400-e29b-41d4-a716-446655440005', 'owner@pittmetro.com', '$2b$10$example_hash_5', 'Property', 'Owner', '(412) 555-0105', 'owner');

-- Insert sample properties
INSERT INTO properties (id, title, description, address, city, state, zip_code, property_type, bedrooms, bathrooms, square_feet, year_built, lot_size, price, listing_type, status, available_date, owner_id, agent_id) VALUES
('660e8400-e29b-41d4-a716-446655440001', 'Stunning Modern Home in Shadyside', 'Beautiful modern home with premium finishes and excellent location in the heart of Shadyside. Features hardwood floors, updated kitchen, and private backyard.', '123 Oak Street', 'Pittsburgh', 'PA', '15232', 'Single Family Home', 4, 3.0, 2400, 2018, 0.25, 850000.00, 'sell', 'active', '2024-02-01', '550e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440001'),
('660e8400-e29b-41d4-a716-446655440002', 'Contemporary Townhouse in Lawrenceville', 'Contemporary townhouse with urban lifestyle amenities. Open floor plan, modern finishes, and rooftop access with city views.', '456 Maple Avenue', 'Pittsburgh', 'PA', '15201', 'Townhouse', 3, 2.5, 1800, 2020, 0.15, 650000.00, 'sell', 'active', '2024-02-15', '550e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440002'),
('660e8400-e29b-41d4-a716-446655440003', 'Luxury Condo with Mountain Views', 'Charming home with breathtaking mountain and city views. Recently renovated with high-end finishes and modern amenities.', '789 Pine Road', 'Pittsburgh', 'PA', '15206', 'Condominium', 2, 2.0, 1200, 2019, 0.10, 450000.00, 'sell', 'active', '2024-03-01', '550e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440003'),
('660e8400-e29b-41d4-a716-446655440004', 'Elegant Estate in Fox Chapel', 'Elegant estate in prestigious neighborhood with luxury amenities. Features gourmet kitchen, home office, and walk-in closets.', '987 Birch Boulevard', 'Pittsburgh', 'PA', '15238', 'Estate', 5, 4.0, 2800, 2016, 0.50, 950000.00, 'sell', 'active', '2024-03-15', '550e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440004'),
('660e8400-e29b-41d4-a716-446655440005', 'Modern Apartment Downtown', 'Modern apartment in downtown Pittsburgh with city views and premium amenities. Perfect for urban living.', '321 Steel Street', 'Pittsburgh', 'PA', '15222', 'Apartment', 1, 1.0, 800, 2021, 0.05, 2500.00, 'rent', 'active', '2024-02-01', '550e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440001'),
('660e8400-e29b-41d4-a716-446655440006', 'Family Home in Squirrel Hill', 'Spacious family home in quiet neighborhood. Great schools nearby and close to parks and shopping.', '654 Walnut Drive', 'Pittsburgh', 'PA', '15217', 'Single Family Home', 3, 2.0, 1600, 2015, 0.20, 1800.00, 'rent', 'active', '2024-02-15', '550e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440002'),
('660e8400-e29b-41d4-a716-446655440007', 'Luxury Penthouse with City Views', 'Stunning penthouse with panoramic city views. Features floor-to-ceiling windows, premium finishes, and private terrace.', '1000 Liberty Avenue', 'Pittsburgh', 'PA', '15222', 'Penthouse', 3, 3.5, 2200, 2022, 0.08, 12000.00, 'rent', 'active', '2024-03-01', '550e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440001'),
('660e8400-e29b-41d4-a716-446655440008', 'Historic Victorian in Mount Washington', 'Beautifully restored Victorian home with original character and modern updates. Offers stunning city views from Mount Washington.', '555 Grandview Avenue', 'Pittsburgh', 'PA', '15211', 'Victorian', 4, 3.5, 2600, 1895, 0.30, 750000.00, 'sell', 'active', '2024-03-20', '550e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440002');

-- Insert property photos
INSERT INTO property_photos (property_id, photo_url, photo_name, photo_size, is_primary, display_order) VALUES
-- Property 1 photos
('660e8400-e29b-41d4-a716-446655440001', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop', 'property-1-exterior.jpg', 245760, true, 1),
('660e8400-e29b-41d4-a716-446655440001', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop', 'property-1-living-room.jpg', 198432, false, 2),
('660e8400-e29b-41d4-a716-446655440001', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop', 'property-1-kitchen.jpg', 187654, false, 3),
('660e8400-e29b-41d4-a716-446655440001', 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&h=600&fit=crop', 'property-1-bedroom.jpg', 203456, false, 4),
('660e8400-e29b-41d4-a716-446655440001', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop', 'property-1-bathroom.jpg', 195432, false, 5),

-- Property 2 photos
('660e8400-e29b-41d4-a716-446655440002', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop', 'property-2-exterior.jpg', 245760, true, 1),
('660e8400-e29b-41d4-a716-446655440002', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop', 'property-2-interior.jpg', 198432, false, 2),
('660e8400-e29b-41d4-a716-446655440002', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop', 'property-2-rooftop.jpg', 187654, false, 3),
('660e8400-e29b-41d4-a716-446655440002', 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&h=600&fit=crop', 'property-2-kitchen.jpg', 203456, false, 4),

-- Property 3 photos
('660e8400-e29b-41d4-a716-446655440003', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop', 'property-3-exterior.jpg', 245760, true, 1),
('660e8400-e29b-41d4-a716-446655440003', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop', 'property-3-view.jpg', 198432, false, 2),
('660e8400-e29b-41d4-a716-446655440003', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop', 'property-3-interior.jpg', 187654, false, 3),

-- Property 4 photos
('660e8400-e29b-41d4-a716-446655440004', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop', 'property-4-exterior.jpg', 245760, true, 1),
('660e8400-e29b-41d4-a716-446655440004', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop', 'property-4-kitchen.jpg', 198432, false, 2),
('660e8400-e29b-41d4-a716-446655440004', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop', 'property-4-pool.jpg', 187654, false, 3),
('660e8400-e29b-41d4-a716-446655440004', 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&h=600&fit=crop', 'property-4-tennis-court.jpg', 203456, false, 4),

-- Property 5 photos
('660e8400-e29b-41d4-a716-446655440005', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop', 'property-5-exterior.jpg', 245760, true, 1),
('660e8400-e29b-41d4-a716-446655440005', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop', 'property-5-interior.jpg', 198432, false, 2),
('660e8400-e29b-41d4-a716-446655440005', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop', 'property-5-city-view.jpg', 187654, false, 3),

-- Property 6 photos
('660e8400-e29b-41d4-a716-446655440006', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop', 'property-6-exterior.jpg', 245760, true, 1),
('660e8400-e29b-41d4-a716-446655440006', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop', 'property-6-interior.jpg', 198432, false, 2),
('660e8400-e29b-41d4-a716-446655440006', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop', 'property-6-yard.jpg', 187654, false, 3),

-- Property 7 photos
('660e8400-e29b-41d4-a716-446655440007', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop', 'property-7-exterior.jpg', 245760, true, 1),
('660e8400-e29b-41d4-a716-446655440007', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop', 'property-7-interior.jpg', 198432, false, 2),
('660e8400-e29b-41d4-a716-446655440007', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop', 'property-7-terrace.jpg', 187654, false, 3),

-- Property 8 photos
('660e8400-e29b-41d4-a716-446655440008', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop', 'property-8-exterior.jpg', 245760, true, 1),
('660e8400-e29b-41d4-a716-446655440008', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop', 'property-8-interior.jpg', 198432, false, 2),
('660e8400-e29b-41d4-a716-446655440008', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop', 'property-8-city-view.jpg', 187654, false, 3);

-- Insert property features
INSERT INTO property_features (property_id, feature_name) VALUES
-- Property 1 features
('660e8400-e29b-41d4-a716-446655440001', 'Modern Kitchen'),
('660e8400-e29b-41d4-a716-446655440001', 'Hardwood Floors'),
('660e8400-e29b-41d4-a716-446655440001', 'Garage'),
('660e8400-e29b-41d4-a716-446655440001', 'Air Conditioning'),
('660e8400-e29b-41d4-a716-446655440001', 'Fireplace'),
('660e8400-e29b-41d4-a716-446655440001', 'Walk-in Closet'),
('660e8400-e29b-41d4-a716-446655440001', 'Laundry Room'),

-- Property 2 features
('660e8400-e29b-41d4-a716-446655440002', 'Open Floor Plan'),
('660e8400-e29b-41d4-a716-446655440002', 'Balcony'),
('660e8400-e29b-41d4-a716-446655440002', 'Storage'),
('660e8400-e29b-41d4-a716-446655440002', 'Modern Appliances'),
('660e8400-e29b-41d4-a716-446655440002', 'High Ceilings'),
('660e8400-e29b-41d4-a716-446655440002', 'Hardwood Floors'),
('660e8400-e29b-41d4-a716-446655440002', 'Rooftop Access'),

-- Property 3 features
('660e8400-e29b-41d4-a716-446655440003', 'Mountain Views'),
('660e8400-e29b-41d4-a716-446655440003', 'Deck'),
('660e8400-e29b-41d4-a716-446655440003', 'Fireplace'),
('660e8400-e29b-41d4-a716-446655440003', 'Updated Bathrooms'),
('660e8400-e29b-41d4-a716-446655440003', 'Hardwood Floors'),
('660e8400-e29b-41d4-a716-446655440003', 'Modern Kitchen'),

-- Property 4 features
('660e8400-e29b-41d4-a716-446655440004', 'Gourmet Kitchen'),
('660e8400-e29b-41d4-a716-446655440004', 'Home Office'),
('660e8400-e29b-41d4-a716-446655440004', 'Walk-in Closets'),
('660e8400-e29b-41d4-a716-446655440004', 'Marble Countertops'),
('660e8400-e29b-41d4-a716-446655440004', 'Custom Cabinets'),
('660e8400-e29b-41d4-a716-446655440004', 'Pool'),
('660e8400-e29b-41d4-a716-446655440004', 'Tennis Court'),

-- Property 5 features
('660e8400-e29b-41d4-a716-446655440005', 'City Views'),
('660e8400-e29b-41d4-a716-446655440005', 'Modern Appliances'),
('660e8400-e29b-41d4-a716-446655440005', 'In-unit Laundry'),
('660e8400-e29b-41d4-a716-446655440005', 'Hardwood Floors'),
('660e8400-e29b-41d4-a716-446655440005', 'Balcony'),
('660e8400-e29b-41d4-a716-446655440005', 'Concierge Service'),

-- Property 6 features
('660e8400-e29b-41d4-a716-446655440006', 'Spacious Layout'),
('660e8400-e29b-41d4-a716-446655440006', 'Updated Kitchen'),
('660e8400-e29b-41d4-a716-446655440006', 'Hardwood Floors'),
('660e8400-e29b-41d4-a716-446655440006', 'Private Yard'),
('660e8400-e29b-41d4-a716-446655440006', 'Storage Space'),
('660e8400-e29b-41d4-a716-446655440006', 'Near Schools'),

-- Property 7 features
('660e8400-e29b-41d4-a716-446655440007', 'Panoramic City Views'),
('660e8400-e29b-41d4-a716-446655440007', 'Floor-to-Ceiling Windows'),
('660e8400-e29b-41d4-a716-446655440007', 'Private Terrace'),
('660e8400-e29b-41d4-a716-446655440007', 'Premium Finishes'),
('660e8400-e29b-41d4-a716-446655440007', 'High-End Appliances'),
('660e8400-e29b-41d4-a716-446655440007', 'Concierge Service'),

-- Property 8 features
('660e8400-e29b-41d4-a716-446655440008', 'Historic Character'),
('660e8400-e29b-41d4-a716-446655440008', 'City Views'),
('660e8400-e29b-41d4-a716-446655440008', 'Original Details'),
('660e8400-e29b-41d4-a716-446655440008', 'Modern Updates'),
('660e8400-e29b-41d4-a716-446655440008', 'Hardwood Floors'),
('660e8400-e29b-41d4-a716-446655440008', 'Updated Kitchen');

-- Insert property amenities
INSERT INTO property_amenities (property_id, amenity_name) VALUES
-- Property 1 amenities
('660e8400-e29b-41d4-a716-446655440001', 'Pool'),
('660e8400-e29b-41d4-a716-446655440001', 'Gym'),
('660e8400-e29b-41d4-a716-446655440001', 'Parking'),
('660e8400-e29b-41d4-a716-446655440001', 'Garden'),

-- Property 2 amenities
('660e8400-e29b-41d4-a716-446655440002', 'Rooftop'),
('660e8400-e29b-41d4-a716-446655440002', 'Concierge'),
('660e8400-e29b-41d4-a716-446655440002', 'Storage'),
('660e8400-e29b-41d4-a716-446655440002', 'Fitness Center'),

-- Property 3 amenities
('660e8400-e29b-41d4-a716-446655440003', 'Parking'),
('660e8400-e29b-41d4-a716-446655440003', 'Storage'),
('660e8400-e29b-41d4-a716-446655440003', 'Garden'),
('660e8400-e29b-41d4-a716-446655440003', 'Mountain Views'),

-- Property 4 amenities
('660e8400-e29b-41d4-a716-446655440004', 'Pool'),
('660e8400-e29b-41d4-a716-446655440004', 'Tennis Court'),
('660e8400-e29b-41d4-a716-446655440004', 'Guest House'),
('660e8400-e29b-41d4-a716-446655440004', 'Gated Community'),

-- Property 5 amenities
('660e8400-e29b-41d4-a716-446655440005', 'Fitness Center'),
('660e8400-e29b-41d4-a716-446655440005', 'Concierge'),
('660e8400-e29b-41d4-a716-446655440005', 'Rooftop Access'),
('660e8400-e29b-41d4-a716-446655440005', 'Valet Parking'),

-- Property 6 amenities
('660e8400-e29b-41d4-a716-446655440006', 'Parking'),
('660e8400-e29b-41d4-a716-446655440006', 'Storage'),
('660e8400-e29b-41d4-a716-446655440006', 'Garden'),
('660e8400-e29b-41d4-a716-446655440006', 'Near Parks'),

-- Property 7 amenities
('660e8400-e29b-41d4-a716-446655440007', 'Concierge Service'),
('660e8400-e29b-41d4-a716-446655440007', 'Valet Parking'),
('660e8400-e29b-41d4-a716-446655440007', 'Fitness Center'),
('660e8400-e29b-41d4-a716-446655440007', 'Rooftop Pool'),

-- Property 8 amenities
('660e8400-e29b-41d4-a716-446655440008', 'Parking'),
('660e8400-e29b-41d4-a716-446655440008', 'Garden'),
('660e8400-e29b-41d4-a716-446655440008', 'City Views'),
('660e8400-e29b-41d4-a716-446655440008', 'Historic District');

-- Insert sample reviews
INSERT INTO reviews (property_id, reviewer_name, reviewer_email, rating, review_text, is_verified) VALUES
('660e8400-e29b-41d4-a716-446655440001', 'John Smith', 'john.smith@email.com', 5, 'Absolutely beautiful home! The modern finishes and location are perfect. Sarah was an excellent agent.', true),
('660e8400-e29b-41d4-a716-446655440001', 'Emily Davis', 'emily.davis@email.com', 5, 'Great property in a fantastic location. Highly recommend Pitt Metro Realty!', true),
('660e8400-e29b-41d4-a716-446655440002', 'Michael Brown', 'michael.brown@email.com', 4, 'Love the contemporary design and rooftop access. Mike was very helpful throughout the process.', true),
('660e8400-e29b-41d4-a716-446655440003', 'Sarah Wilson', 'sarah.wilson@email.com', 5, 'The mountain views are incredible! Perfect condo for city living.', true),
('660e8400-e29b-41d4-a716-446655440004', 'David Johnson', 'david.johnson@email.com', 5, 'Elegant estate with all the amenities you could want. Robert was professional and knowledgeable.', true),
('660e8400-e29b-41d4-a716-446655440005', 'Lisa Anderson', 'lisa.anderson@email.com', 4, 'Great downtown location with amazing city views. Perfect for young professionals.', true),
('660e8400-e29b-41d4-a716-446655440006', 'Mark Thompson', 'mark.thompson@email.com', 5, 'Perfect family home in a great neighborhood. Close to schools and parks.', true),
('660e8400-e29b-41d4-a716-446655440007', 'Jennifer Lee', 'jennifer.lee@email.com', 5, 'Luxury living at its finest! The penthouse views are breathtaking.', true),
('660e8400-e29b-41d4-a716-446655440008', 'Robert Garcia', 'robert.garcia@email.com', 4, 'Beautiful historic home with modern conveniences. The city views from Mount Washington are amazing.', true);

-- Insert sample contact inquiries
INSERT INTO contact_inquiries (property_id, name, email, phone, message, inquiry_type, status) VALUES
('660e8400-e29b-41d4-a716-446655440001', 'Alice Johnson', 'alice.johnson@email.com', '(412) 555-0201', 'Interested in scheduling a viewing for this property.', 'viewing', 'new'),
('660e8400-e29b-41d4-a716-446655440002', 'Bob Smith', 'bob.smith@email.com', '(412) 555-0202', 'Would like more information about the rooftop amenities.', 'information', 'contacted'),
('660e8400-e29b-41d4-a716-446655440003', 'Carol Davis', 'carol.davis@email.com', '(412) 555-0203', 'Interested in this condo. What are the HOA fees?', 'information', 'new'),
('660e8400-e29b-41d4-a716-446655440005', 'David Wilson', 'david.wilson@email.com', '(412) 555-0204', 'Is this apartment pet-friendly?', 'information', 'responded'),
('660e8400-e29b-41d4-a716-446655440006', 'Eva Martinez', 'eva.martinez@email.com', '(412) 555-0205', 'Interested in renting this family home. When is it available?', 'rental', 'new'),
('660e8400-e29b-41d4-a716-446655440007', 'Frank Chen', 'frank.chen@email.com', '(412) 555-0206', 'Would like to schedule a viewing of the penthouse.', 'viewing', 'contacted'),
('660e8400-e29b-41d4-a716-446655440008', 'Grace Taylor', 'grace.taylor@email.com', '(412) 555-0207', 'Interested in this historic Victorian. What are the property taxes?', 'information', 'new');

COMMIT;

