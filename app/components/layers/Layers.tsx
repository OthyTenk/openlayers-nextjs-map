"use client";
import React, { FC, ReactNode } from "react";

interface LayersProps {
  children: ReactNode;
}

export const Layers: FC<LayersProps> = ({ children }) => {
  return <div>{children}</div>;
};
