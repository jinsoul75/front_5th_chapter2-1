import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick: () => void;
}

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button className={`bg-blue-500 text-white px-4 py-2 rounded ${className}`} {...props}>
      {children}
    </button>
  );
}
