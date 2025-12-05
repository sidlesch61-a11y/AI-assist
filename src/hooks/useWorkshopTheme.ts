/** Hook for applying workshop primary color theme */

import { useEffect } from "react";
import type { Workshop } from "../types/workshop.types";

/**
 * Validates if a hex color has sufficient contrast for accessibility
 * Returns true if color is valid, false otherwise
 */
function isValidAccessibleColor(color: string): boolean {
  if (!color || !color.match(/^#[0-9A-Fa-f]{6}$/)) {
    return false;
  }

  // Remove # and convert to RGB
  const hex = color.slice(1);
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  // Calculate relative luminance (WCAG formula)
  const [rs, gs, bs] = [r, g, b].map((val) => {
    val = val / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  const luminance = 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;

  // Check contrast against dark background (industrial-950: #0F1419)
  // For dark backgrounds, we need lighter colors (luminance > 0.5)
  // This is a simplified check - in production, use a proper contrast checker
  return luminance > 0.3; // Minimum threshold for visibility
}

/**
 * Applies workshop primary color as CSS custom properties
 */
export function useWorkshopTheme(workshop: Workshop | null) {
  useEffect(() => {
    if (!workshop?.primary_color) {
      // Reset to default if no color set
      document.documentElement.style.setProperty("--workshop-primary", "");
      return;
    }

    // Validate color accessibility
    if (!isValidAccessibleColor(workshop.primary_color)) {
      console.warn(
        `Workshop primary color ${workshop.primary_color} may not meet accessibility standards. Using default.`,
      );
      document.documentElement.style.setProperty("--workshop-primary", "");
      return;
    }

    // Apply as CSS custom property
    document.documentElement.style.setProperty(
      "--workshop-primary",
      workshop.primary_color,
    );

    // Generate lighter and darker variants
    const hex = workshop.primary_color.slice(1);
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    // Lighter variant (for hover states)
    const lighterR = Math.min(255, r + 20);
    const lighterG = Math.min(255, g + 20);
    const lighterB = Math.min(255, b + 20);
    const lighterColor = `#${lighterR.toString(16).padStart(2, "0")}${lighterG.toString(16).padStart(2, "0")}${lighterB.toString(16).padStart(2, "0")}`;

    // Darker variant (for active states)
    const darkerR = Math.max(0, r - 20);
    const darkerG = Math.max(0, g - 20);
    const darkerB = Math.max(0, b - 20);
    const darkerColor = `#${darkerR.toString(16).padStart(2, "0")}${darkerG.toString(16).padStart(2, "0")}${darkerB.toString(16).padStart(2, "0")}`;

    document.documentElement.style.setProperty(
      "--workshop-primary-light",
      lighterColor,
    );
    document.documentElement.style.setProperty(
      "--workshop-primary-dark",
      darkerColor,
    );
  }, [workshop?.primary_color]);
}

