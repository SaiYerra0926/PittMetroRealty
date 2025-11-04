# Design Standards & Professional Guidelines

## Button Standards

### Minimum Sizes
- **Touch Targets**: Minimum 44px x 44px (mobile accessibility)
- **Small Buttons**: h-9 (36px) with px-4 py-2
- **Default Buttons**: h-10 (40px) with px-6 py-2.5
- **Large Buttons**: h-12 (48px) with px-8 py-3
- **Extra Large**: h-14 (56px) with px-10 py-3.5

### Button Spacing
- **Gap between buttons**: 12px (gap-3) minimum
- **Button groups**: gap-3 or gap-4
- **Icon spacing**: gap-2 (8px) between icon and text

## Typography Standards

### Headings
- **H1**: text-3xl sm:text-4xl md:text-5xl lg:text-6xl (section headers)
- **H2**: text-2xl sm:text-3xl md:text-4xl (subsection headers)
- **H3**: text-xl sm:text-2xl md:text-3xl (card titles)
- **H4**: text-lg sm:text-xl md:text-2xl (sub-titles)

### Body Text
- **Large**: text-base sm:text-lg (descriptions)
- **Default**: text-sm sm:text-base (body text)
- **Small**: text-xs sm:text-sm (captions, labels)

### Line Height
- **Headings**: leading-tight
- **Body**: leading-relaxed
- **Dense**: leading-normal

## Spacing Standards

### Section Padding
- **Mobile**: py-12 (48px)
- **Tablet**: py-16 (64px)
- **Desktop**: py-20 (80px)
- **Extra Large**: py-24 (96px)

### Container Padding
- **Mobile**: px-4 (16px)
- **Tablet**: px-6 (24px)
- **Desktop**: px-8 (32px)

### Card Padding
- **Mobile**: p-4 (16px)
- **Tablet**: p-6 (24px)
- **Desktop**: p-8 (32px)

### Element Spacing
- **Tight**: gap-2 (8px)
- **Normal**: gap-4 (16px)
- **Comfortable**: gap-6 (24px)
- **Spacious**: gap-8 (32px)

## Alignment Standards

### Text Alignment
- **Headings**: text-center (section headers)
- **Body**: text-left (default)
- **Cards**: text-left (content cards)

### Content Alignment
- **Centered Content**: max-w-4xl mx-auto
- **Full Width**: max-w-7xl mx-auto
- **Grid Alignment**: items-center justify-center

### Button Alignment
- **Single Button**: mx-auto (centered)
- **Button Groups**: flex justify-center or justify-between
- **Mobile**: flex-col (stacked)
- **Desktop**: flex-row (horizontal)

## Color Standards

### Primary Actions
- **Primary Button**: bg-primary text-white
- **Hover**: hover:bg-primary/90
- **Focus**: focus:ring-2 focus:ring-primary/50

### Secondary Actions
- **Outline Button**: border-2 border-primary text-primary
- **Hover**: hover:bg-primary hover:text-white

### Text Colors
- **Primary Text**: text-slate-800
- **Secondary Text**: text-slate-600
- **Muted Text**: text-slate-500
- **Placeholder**: text-gray-400

## Border & Shadow Standards

### Borders
- **Default**: border border-gray-200
- **Hover**: border-primary/30
- **Focus**: border-2 border-primary
- **Rounded**: rounded-lg (8px) or rounded-xl (12px)

### Shadows
- **Card**: shadow-sm
- **Hover**: shadow-md
- **Elevated**: shadow-lg
- **Floating**: shadow-xl

## Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (sm to lg)
- **Desktop**: > 1024px (lg+)

## Accessibility Standards

### Touch Targets
- **Minimum**: 44px x 44px
- **Recommended**: 48px x 48px
- **Large**: 56px x 56px

### Focus States
- **Visible**: focus:outline-none focus:ring-2 focus:ring-primary/50
- **Keyboard Navigation**: All interactive elements accessible

### Color Contrast
- **Text**: WCAG AA compliant (4.5:1 minimum)
- **Buttons**: High contrast for readability

## Component Standards

### Cards
- **Padding**: p-6 (24px) default
- **Border**: border border-gray-200
- **Shadow**: shadow-sm hover:shadow-md
- **Rounded**: rounded-xl (12px)

### Forms
- **Input Height**: h-11 (44px) minimum
- **Input Padding**: px-4 py-3
- **Label**: text-sm font-medium mb-2
- **Error**: text-red-500 text-sm mt-1

### Modals/Dialogs
- **Max Width**: max-w-7xl (1280px)
- **Padding**: p-6 (24px)
- **Backdrop**: bg-black/50 backdrop-blur-sm

## Animation Standards

### Transitions
- **Default**: transition-all duration-300
- **Fast**: duration-200
- **Smooth**: duration-500

### Hover Effects
- **Scale**: hover:scale-105
- **Shadow**: hover:shadow-lg
- **Color**: hover:bg-primary/90

## Grid Standards

### Property Grids
- **Mobile**: grid-cols-1
- **Tablet**: sm:grid-cols-2
- **Desktop**: lg:grid-cols-3
- **Gap**: gap-4 sm:gap-6 md:gap-8

### Content Grids
- **Two Column**: lg:grid-cols-2
- **Three Column**: lg:grid-cols-3
- **Four Column**: lg:grid-cols-4

