import V0Icon from "./icons/v0-icon";
import React from "react";

const links = [
    {
        title: 'Vercel',
        href: 'https://vercel.com/',
    },
    {
        title: 'v0',
        href: 'https://v0.dev/',
    },
    {
        title: 'Meetup SDK',
        href: 'https://meetup-sdk.vercel.com/',
    },
    {
        title: 'v0 IRL',
        href: 'https://v0.app/irl',
    },
]

export default function FooterSection() {
    return (
        <footer className="py-16 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <a
                    href="#top"
                    aria-label="返回首页"
                    className="mx-auto block size-fit">
                    <V0Icon size={30} className='text-foreground'/>
                </a>

                <div className="my-8 flex flex-wrap justify-center gap-6 text-sm">
                    {links.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            className="text-muted-foreground hover:text-primary block duration-150">
                            <span>{link.title}</span>
                        </a>
                    ))}
                </div>
                <span className="text-muted-foreground block text-center text-sm font-mono">使用 v0、<a
                    href="https://tailark.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-foreground underline">Tailark</a> 与 <a
                    href="https://reactbits.dev/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-foreground underline">React Bits</a> 构建 • 由 Vercel 提供支持。</span>
            </div>
        </footer>
    )
}
