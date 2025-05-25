"use client";

export interface Translation {
  message: string;
  translations: string[];
  timestamp: string;
}

const STORAGE_KEY = "girlfriend-translations";
const MAX_HISTORY_ITEMS = 20;

// Save a translation to localStorage
export function saveTranslation(translation: Translation): void {
  if (typeof window === "undefined") return;

  try {
    // Get existing translations
    const existing = getRecentTranslations();
    
    // Add new translation at the beginning
    const updated = [translation, ...existing];
    
    // Limit to MAX_HISTORY_ITEMS
    const limited = updated.slice(0, MAX_HISTORY_ITEMS);
    
    // Save back to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(limited));
  } catch (error) {
    console.error("Error saving translation to localStorage:", error);
  }
}

// Get recent translations from localStorage
export function getRecentTranslations(): Translation[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    return JSON.parse(stored) as Translation[];
  } catch (error) {
    console.error("Error retrieving translations from localStorage:", error);
    return [];
  }
}

// Clear all translations from localStorage
export function clearTranslations(): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing translations from localStorage:", error);
  }
}