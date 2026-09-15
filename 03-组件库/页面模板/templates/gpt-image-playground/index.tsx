/**
 * @name GPT Image Playground
 *
 * 参考资料：
 * - https://github.com/CookSleep/gpt_image_playground
 * - /rules/prototype-development-guide.md
 */

import React from 'react';
import './style.css';
import './source/src/index.css';
import App from './source/src/App';

export default function GptImagePlaygroundPrototype() {
  return (
    <div className="gpt-image-playground-prototype min-h-screen bg-white text-gray-950 antialiased dark:bg-[#09090b] dark:text-gray-50">
      <App />
    </div>
  );
}
