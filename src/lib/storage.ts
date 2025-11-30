import { get, set, del } from 'idb-keyval';
import { AppState } from '@/types';

const STORAGE_KEY = 'questbits-state';

/**
 * Load app state from IndexedDB with localStorage fallback
 */
export async function loadState(): Promise<AppState | null> {
  try {
    // Try IndexedDB first
    const state = await get<AppState>(STORAGE_KEY);
    if (state) return state;
    
    // Fallback to localStorage
    const localData = localStorage.getItem(STORAGE_KEY);
    if (localData) {
      return JSON.parse(localData);
    }
    
    return null;
  } catch (error) {
    console.error('Error loading state:', error);
    return null;
  }
}

/**
 * Save app state to IndexedDB with localStorage fallback
 */
export async function saveState(state: AppState): Promise<void> {
  try {
    // Save to IndexedDB
    await set(STORAGE_KEY, state);
    
    // Also save to localStorage as backup
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Error saving state:', error);
    // Try localStorage only if IndexedDB fails
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }
}

/**
 * Clear all stored data
 */
export async function clearState(): Promise<void> {
  try {
    await del(STORAGE_KEY);
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing state:', error);
  }
}

/**
 * Optional: Encrypt data with Web Crypto API (AES-GCM)
 * For production use, you'd want to derive the key from a user password
 */
export async function encryptData(data: string, key: CryptoKey): Promise<string> {
  const encoder = new TextEncoder();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoder.encode(data)
  );
  
  // Combine IV and encrypted data
  const combined = new Uint8Array(iv.length + encrypted.byteLength);
  combined.set(iv);
  combined.set(new Uint8Array(encrypted), iv.length);
  
  return btoa(String.fromCharCode(...combined));
}

export async function decryptData(encryptedData: string, key: CryptoKey): Promise<string> {
  const combined = Uint8Array.from(atob(encryptedData), c => c.charCodeAt(0));
  const iv = combined.slice(0, 12);
  const data = combined.slice(12);
  
  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    data
  );
  
  const decoder = new TextDecoder();
  return decoder.decode(decrypted);
}

/**
 * Generate encryption key
 */
export async function generateKey(): Promise<CryptoKey> {
  return crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );
}
