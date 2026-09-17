import React from 'react'
import {Button} from './ui/button'
import {TextEffect} from "./motion-primitives/text-effect"
import {AnimatedGroup} from "./motion-primitives/animated-group";
import {transitionVariants} from "../lib/utils";

export default function CallToAction() {
    return (
        <section id="registration" className="py-16 mx-2">
            <div className="mx-auto max-w-5xl rounded-3xl border px-6 py-12 md:py-20 lg:py-32">
                <div className="text-center">
                    <TextEffect
                        triggerOnView
                        preset="fade-in-blur"
                        speedSegment={0.3}
                        as="h2"
                        className="text-balance text-4xl font-semibold lg:text-5xl">
                        别错过席位！
                    </TextEffect>
                    <TextEffect
                        triggerOnView
                        preset="fade-in-blur"
                        speedSegment={0.3}
                        delay={0.3}
                        as="p"
                        className="mt-4 text-muted-foreground">
                        名额有限，请通过下方链接立即报名。
                    </TextEffect>
                    <AnimatedGroup
                        triggerOnView
                        variants={{
                            container: {
                                visible: {
                                    transition: {
                                        staggerChildren: 0.05,
                                        delayChildren: 0.75,
                                    },
                                },
                            },
                            ...transitionVariants,
                        }}
                        className="mt-12 flex flex-wrap justify-center gap-4"
                    >
                        <Button
                            asChild
                            size="lg">
                            <a href="https://meetup-sdk.vercel.com/" target="_blank" rel="noreferrer">
                                <span>报名</span>
                            </a>
                        </Button>

                        <Button
                            asChild
                            size="lg"
                            variant="outline">
                            <a href="mailto:events@v0.dev">
                                <span>联系主办方</span>
                            </a>
                        </Button>
                    </AnimatedGroup>
                </div>
            </div>
        </section>
    )
}
