/**
 * @name Perplexity AI 克隆聊天界面
 *
 * 参考资料：
 * - /rules/v0-project-converter.md
 * - /rules/prototype-development-guide.md
 */

import React from 'react';
import { Search } from './app/components/search-interface';
import './style.css';

export default function PerplexityAiCloneChatUiDesign() {
  return (
    <div className="perplexity-ai-clone flex h-screen w-full overflow-hidden bg-background text-foreground">
      <Search />
    </div>
  );
}
