export interface ButtonProps {
  children: string | React.ReactNode;
  disabled?: boolean;
  type?: string;
  size?: "s" | "m";
  onClick?: (e?: any) => void;
}
