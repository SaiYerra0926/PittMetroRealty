# Pitt Metro Realty - Estate Showcase Website

A professional real estate website built for Pitt Metro Realty, featuring property listings, owner portal, and comprehensive real estate services.

## About Pitt Metro Realty

Pitt Metro Realty is a premier real estate agency specializing in luxury properties and exceptional service in Pittsburgh and surrounding areas. With over 15 years of experience, we provide comprehensive real estate solutions including buying, selling, renting, and property management services.

## Features

- **Property Listings**: Browse featured properties with detailed information
- **Owner Portal**: Secure photo upload and property management system
- **Professional Design**: Modern, responsive website with beautiful UI/UX
- **Contact System**: Multiple ways to get in touch with our expert team
- **Services Overview**: Comprehensive real estate services and expertise

## Getting Started

### Prerequisites

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd amitagarwal-estate-showcase

# Step 3: Install the necessary dependencies
npm i

# Step 4: Start the development server
npm run dev
```

## Interactive Maps Integration

This project includes interactive maps for displaying Pittsburgh, Pennsylvania real estate properties using Leaflet and OpenStreetMap.

### Features

- **No API Key Required**: Uses OpenStreetMap tiles (completely free)
- **Interactive Pittsburgh Map**: Centered on Pittsburgh, PA with zoom controls
- **Property Markers**: Clickable markers for each property with popups
- **Real-time Property Information**: Detailed property cards with images and specs
- **Directions Integration**: "Get Directions" button opens Google Maps directions
- **Responsive Design**: Works perfectly on all device sizes

### Technology Stack

- **Leaflet**: Open-source JavaScript library for interactive maps
- **OpenStreetMap**: Free, open-source map data
- **React Integration**: Seamless integration with React components
- **TypeScript Support**: Full type safety and error handling

### Usage

The PropertyMap component (`src/components/PropertyMap.tsx`) displays:
- Interactive map centered on Pittsburgh, PA
- Property markers for Robinson Township and Moon Township
- Interactive property selection with popups
- Detailed property information panel
- Market overview statistics

**Note**: This implementation requires no API keys or external service setup. The map works immediately out of the box!

## Owner Portal Access

Property owners can access the secure portal to:
- Upload property photos
- Manage property listings
- Track listing status
- Access professional tools

**Access Codes**: `OWNER2024`, `PITT-METRO-OWNER`, `PROPERTY-ACCESS-2024`
**Demo Login**: `owner@pittmetro.com` / `owner123`

## Technology Stack

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Leaflet (Interactive Maps)
- OpenStreetMap

## Deployment

The website can be deployed to any static hosting service such as:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

## Contact

For more information about Pitt Metro Realty services, visit our website or contact us directly.

**Pitt Metro Realty**
- Phone: (412) 555-0123
- Email: info@pittmetrorealty.com
- Address: Pittsburgh, Pennsylvania