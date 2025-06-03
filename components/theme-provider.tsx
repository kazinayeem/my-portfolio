// src/components/ThemeProvider.tsx
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import type { ThemeProviderProps } from "next-themes";

interface Props extends Omit<ThemeProviderProps, "themes"> {
  children: React.ReactNode;
}

export function ThemeProvider({ children, ...props }: Props) {
  return <NextThemesProvider defaultTheme="dark" {...props}>{children}</NextThemesProvider>;
}
