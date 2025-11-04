/**
 * Professional Design System - Consistent Styling Utilities
 * 
 * This file provides consistent styling classes and utilities
 * to ensure all components follow professional design standards.
 */

export const professionalStyles = {
  // Button Sizes - Touch-friendly (min 44px)
  button: {
    sm: "h-9 px-4 py-2 text-sm font-medium min-h-[44px] min-w-[44px]",
    default: "h-11 px-6 py-2.5 text-sm font-semibold min-h-[44px]",
    lg: "h-12 px-8 py-3 text-base font-semibold min-h-[48px]",
    xl: "h-14 px-10 py-3.5 text-base font-semibold min-h-[56px]",
    icon: "h-11 w-11 min-h-[44px] min-w-[44px]",
  },

  // Input Sizes
  input: {
    sm: "h-10 px-4 py-2.5 text-sm",
    default: "h-11 px-4 py-3 text-sm",
    lg: "h-12 px-5 py-3.5 text-base",
    xl: "h-14 px-6 py-4 text-base",
  },

  // Spacing
  spacing: {
    section: "py-12 sm:py-16 md:py-20",
    sectionLg: "py-16 sm:py-20 md:py-24",
    container: "px-4 sm:px-6 lg:px-8",
    card: "p-6 sm:p-8",
    gap: {
      xs: "gap-2",
      sm: "gap-3",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
    },
  },

  // Typography
  typography: {
    h1: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold",
    h2: "text-2xl sm:text-3xl md:text-4xl font-bold",
    h3: "text-xl sm:text-2xl md:text-3xl font-bold",
    h4: "text-lg sm:text-xl md:text-2xl font-semibold",
    body: "text-sm sm:text-base",
    bodyLg: "text-base sm:text-lg",
    small: "text-xs sm:text-sm",
    caption: "text-xs",
  },

  // Cards
  card: {
    base: "bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300",
    padding: "p-6 sm:p-8",
    spacing: "space-y-4 sm:space-y-6",
  },

  // Forms
  form: {
    label: "text-sm font-semibold text-slate-700 mb-2 block",
    input: "h-11 px-4 py-3 border-2 border-gray-200 focus:border-primary rounded-lg transition-all duration-300",
    textarea: "min-h-[120px] px-4 py-3 border-2 border-gray-200 focus:border-primary rounded-lg transition-all duration-300",
    error: "text-red-500 text-sm mt-1",
  },

  // Buttons
  buttonBase: "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed",
  
  // Touch Targets
  touchTarget: "min-h-[44px] min-w-[44px] touch-target",
};

export default professionalStyles;

