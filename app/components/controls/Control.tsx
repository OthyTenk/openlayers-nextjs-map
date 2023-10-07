'use client';
import  { FC, ReactNode } from 'react'

interface ControlProps {
    children: ReactNode
}

export const Control: FC<ControlProps> = ({ children }) => {
  return <div>{children}</div>;
};
