import { TextStyle } from 'react-native';

/**
 * Scanzy Theme System
 * Modern, accessible color palette with Indigo Blue and Neon Mint accents
 */

export interface ScanzyTheme {
  colors: {
    primary: string;        // Indigo Blue (#3F51B5)
    accent: string;         // Neon Mint (#64FFDA)
    background: string;     // Rich Black (#121212) / Ice Gray (#F3F7FA)
    surface: string;        // Elevated surfaces
    text: string;           // White (#FFFFFF) / Jet Black (#1A1A1A)
    textSecondary: string;  // Secondary text colors
    border: string;         // Border colors
    success: string;        // Success states
    warning: string;        // Warning states
    error: string;          // Error states
    // Legacy support for existing components
    tint: string;
    icon: string;
    tabIconDefault: string;
    tabIconSelected: string;
  };
  spacing: {
    xs: number;    // 4
    sm: number;    // 8
    md: number;    // 16
    lg: number;    // 24
    xl: number;    // 32
    xxl: number;   // 48
  };
  borderRadius: {
    sm: number;    // 8
    md: number;    // 12
    lg: number;    // 16
    xl: number;    // 24
  };
  typography: {
    h1: TextStyle;
    h2: TextStyle;
    body: TextStyle;
    caption: TextStyle;
    button: TextStyle;
  };
}

// Light theme implementation
export const lightTheme: ScanzyTheme = {
  colors: {
    primary: '#3F51B5',      // Indigo Blue
    accent: '#00695C',       // Darker Cyan (meets 4.5:1 contrast on light background)
    background: '#F3F7FA',   // Ice Gray
    surface: '#FFFFFF',      // White surfaces
    text: '#1A1A1A',         // Jet Black
    textSecondary: '#666666', // Medium gray
    border: '#E0E0E0',       // Light gray borders
    success: '#4CAF50',      // Green
    warning: '#FF9800',      // Orange
    error: '#F44336',        // Red
    // Legacy support
    tint: '#3F51B5',
    icon: '#666666',
    tabIconDefault: '#666666',
    tabIconSelected: '#3F51B5',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: 'bold',
      lineHeight: 40,
    },
    h2: {
      fontSize: 24,
      fontWeight: '600',
      lineHeight: 32,
    },
    body: {
      fontSize: 16,
      fontWeight: 'normal',
      lineHeight: 24,
    },
    caption: {
      fontSize: 12,
      fontWeight: 'normal',
      lineHeight: 16,
    },
    button: {
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 20,
    },
  },
};

// Dark theme implementation
export const darkTheme: ScanzyTheme = {
  colors: {
    primary: '#7986CB',      // Even lighter Indigo Blue for better contrast on dark
    accent: '#64FFDA',       // Neon Mint
    background: '#121212',   // Rich Black
    surface: '#1E1E1E',      // Dark gray surfaces
    text: '#FFFFFF',         // White
    textSecondary: '#B0B0B0', // Light gray
    border: '#333333',       // Dark gray borders
    success: '#4CAF50',      // Green
    warning: '#FF9800',      // Orange
    error: '#F44336',        // Red
    // Legacy support
    tint: '#FFFFFF',
    icon: '#B0B0B0',
    tabIconDefault: '#B0B0B0',
    tabIconSelected: '#FFFFFF',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: 'bold',
      lineHeight: 40,
    },
    h2: {
      fontSize: 24,
      fontWeight: '600',
      lineHeight: 32,
    },
    body: {
      fontSize: 16,
      fontWeight: 'normal',
      lineHeight: 24,
    },
    caption: {
      fontSize: 12,
      fontWeight: 'normal',
      lineHeight: 16,
    },
    button: {
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 20,
    },
  },
};

// Theme utility functions for color calculations and accessibility
export const ThemeUtils = {
  /**
   * Calculate contrast ratio between two colors
   * @param color1 Hex color string
   * @param color2 Hex color string
   * @returns Contrast ratio (1-21)
   */
  getContrastRatio: (color1: string, color2: string): number => {
    const getLuminance = (hex: string): number => {
      const rgb = parseInt(hex.slice(1), 16);
      const r = (rgb >> 16) & 0xff;
      const g = (rgb >> 8) & 0xff;
      const b = (rgb >> 0) & 0xff;
      
      const [rs, gs, bs] = [r, g, b].map(c => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
    };

    const lum1 = getLuminance(color1);
    const lum2 = getLuminance(color2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    
    return (brightest + 0.05) / (darkest + 0.05);
  },

  /**
   * Check if color combination meets WCAG AA accessibility standards
   * @param foreground Foreground color hex
   * @param background Background color hex
   * @returns True if meets AA standards (4.5:1 ratio)
   */
  meetsAccessibilityStandards: (foreground: string, background: string): boolean => {
    return ThemeUtils.getContrastRatio(foreground, background) >= 4.5;
  },

  /**
   * Validate theme colors for accessibility compliance
   * @param theme ScanzyTheme object
   * @returns Object with validation results
   */
  validateThemeAccessibility: (theme: ScanzyTheme) => {
    const results = {
      textOnBackground: ThemeUtils.meetsAccessibilityStandards(theme.colors.text, theme.colors.background),
      textOnSurface: ThemeUtils.meetsAccessibilityStandards(theme.colors.text, theme.colors.surface),
      primaryOnBackground: ThemeUtils.meetsAccessibilityStandards(theme.colors.primary, theme.colors.background),
      accentOnBackground: ThemeUtils.meetsAccessibilityStandards(theme.colors.accent, theme.colors.background),
      textSecondaryOnBackground: ThemeUtils.meetsAccessibilityStandards(theme.colors.textSecondary, theme.colors.background),
    };

    return {
      ...results,
      allValid: Object.values(results).every(Boolean),
    };
  },

  /**
   * Add alpha transparency to a hex color
   * @param hex Hex color string
   * @param alpha Alpha value (0-1)
   * @returns Hex color with alpha
   */
  addAlpha: (hex: string, alpha: number): string => {
    const alphaHex = Math.round(alpha * 255).toString(16).padStart(2, '0').toUpperCase();
    return `${hex}${alphaHex}`;
  },

  /**
   * Lighten or darken a hex color
   * @param hex Hex color string
   * @param percent Percentage to lighten (positive) or darken (negative)
   * @returns Modified hex color
   */
  adjustBrightness: (hex: string, percent: number): string => {
    const num = parseInt(hex.slice(1), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255))
      .toString(16)
      .slice(1);
  },
};

// Legacy export for backward compatibility
export const Colors = {
  light: lightTheme.colors,
  dark: darkTheme.colors,
};
