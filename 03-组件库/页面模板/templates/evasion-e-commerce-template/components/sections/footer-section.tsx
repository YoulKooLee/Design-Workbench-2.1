import React from "react";

const footerLinks = {
  explore: [
    { label: "产品", href: "#products" },
    { label: "技术", href: "#technology" },
    { label: "图集", href: "#gallery" },
    { label: "配件", href: "#accessories" },
  ],
  about: [
    { label: "品牌故事", href: "#" },
    { label: "团队", href: "#" },
    { label: "招聘", href: "#" },
    { label: "联系", href: "#" },
  ],
  service: [
    { label: "FAQ", href: "#" },
    { label: "配送", href: "#" },
    { label: "退换", href: "#" },
    { label: "保修", href: "#" },
  ],
};

export function FooterSection() {
  return (
    <footer className="bg-background">
      {/* Main Footer Content */}
      <div className="border-t border-border px-6 py-16 md:px-12 md:py-20 lg:px-20">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <a href="#" className="text-lg font-medium text-foreground">
              EVASION
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              为冒险而生的高端智能水瓶。配备 GPS 追踪、LED 手电与自加热技术。
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="mb-4 text-sm font-medium text-foreground">探索</h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="mb-4 text-sm font-medium text-foreground">关于</h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Service */}
          <div>
            <h4 className="mb-4 text-sm font-medium text-foreground">服务</h4>
            <ul className="space-y-3">
              {footerLinks.service.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border px-6 py-6 md:px-12 lg:px-20">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-muted-foreground">
            2026 EVASION. 保留所有权利。
          </p>

          

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Instagram
            </a>
            <a
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
