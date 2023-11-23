export interface ButtonProps {
  children: string;
  disabled?: boolean;
  type?: string;
  size?: "s" | "m";
  onClick?: () => void;
}
