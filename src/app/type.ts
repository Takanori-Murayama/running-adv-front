export type SNS = 'X' | 'email';

export interface MenuItem {
  label: string;
  href: string;
  actionButton?: {
    label: string;
    href: string;
    sns: SNS;
  };
}