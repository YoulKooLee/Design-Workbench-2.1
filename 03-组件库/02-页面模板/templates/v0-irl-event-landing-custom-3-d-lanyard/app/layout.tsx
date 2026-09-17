import React from "react"
import './globals.css'
import Dither from "../components/Dither";
import FooterSection from "../components/footer";
import {HeroHeader} from "../components/header";

export const metadata = {
    title: 'v0 IRL — Prompt to Production | 纽约 2026年2月5日',
    description: 'v0 即将发布迄今最大的产品更新。加入全球 v0 IRL 活动，一周时间，全球黑客松，真实应用，真实协作。',
    generator: 'v0.app',
    icons: {
        icon: [
            {
                url: '/icon-light-32x32.png',
                media: '(prefers-color-scheme: light)',
            },
            {
                url: '/icon-dark-32x32.png',
                media: '(prefers-color-scheme: dark)',
            },
            {
                url: '/icon.svg',
                type: 'image/svg+xml',
            },
        ],
        apple: '/apple-icon.png',
    },
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" className="dark">
        <body className="font-sans antialiased">
        <div className='absolute w-full h-dvh max-h-155 sm:max-h-115 md:max-h-125 lg:max-h-190 xl:max-h-195'>
            <Dither
                waveColor={[0.30980392156862746, 0.30980392156862746, 0.30980392156862746]}
                disableAnimation={false}
                enableMouseInteraction
                mouseRadius={0.3}
                colorNum={4}
                pixelSize={2}
                waveAmplitude={0.3}
                waveFrequency={3}
                waveSpeed={0.05}
            />
        </div>
        <HeroHeader/>
        {children}
        <FooterSection/>
        </body>
        </html>
    )
}
