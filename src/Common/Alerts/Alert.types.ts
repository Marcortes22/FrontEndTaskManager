export type AlertSeverityType = 'error' | 'info' | 'success' | 'warning';

export type AlertFontSizeType = 'small' | 'medium' | 'large';

export type AlertVariantType = 'filled' | 'outlined' | 'standard';

export type AlertColorType = 'error' | 'warning' | 'info' | 'success';

export interface AlertProps {
  severity?: AlertSeverityType;
  fontSize?: AlertFontSizeType;
  variant?: AlertVariantType;
  color?: AlertColorType;
  title?: string;
  icon?: React.ReactNode;
  message?: string;
  duration?: number;
}
