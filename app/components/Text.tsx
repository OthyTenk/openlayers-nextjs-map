export interface InnerTextProps {
  color?: string;
  size?: number;
  outline?: boolean;
  children: string;
  isPopup?: boolean;
}

export function InnerText({
  color,
  size,
  outline,
  children,
  isPopup = false,
}: InnerTextProps) {
  return <></>;
}
