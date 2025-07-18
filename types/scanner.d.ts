// Type declarations for scanner functionality
import { BarCodeScanningResult } from 'expo-camera';

export interface ScanResult {
  data: string;
  type: 'url' | 'email' | 'phone' | 'text' | 'wifi' | 'sms';
  timestamp: Date;
  format?: string;
}

export interface CameraPermission {
  granted: boolean;
  canAskAgain: boolean;
  status: 'undetermined' | 'denied' | 'granted';
}

export interface ThemePreference {
  isDark: boolean;
  lastUpdated: Date;
}

export type ScanResultType = 'url' | 'email' | 'phone' | 'text' | 'wifi' | 'sms';

export type ResultAction = 'open' | 'copy' | 'call' | 'email';

// Re-export commonly used types from expo-camera
export type { BarCodeScanningResult } from 'expo-camera';