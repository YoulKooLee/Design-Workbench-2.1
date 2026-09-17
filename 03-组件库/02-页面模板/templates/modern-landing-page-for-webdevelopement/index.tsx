/**
 * @name MSwebdesign 官网落地页
 *
 * 参考资料：
 * - /rules/prototype-development-guide.md
 */

import './app/globals.css';
import React from 'react';
import Home from './app/page';
import { ThemeProvider } from './components/theme-provider';

export default function ImportedV0Prototype() {
  return (
    <ThemeProvider defaultTheme="dark">
      <Home />
    </ThemeProvider>
  );
}
