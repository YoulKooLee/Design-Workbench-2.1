import {TextEffect} from "./motion-primitives/text-effect";
import React from "react";
import {transitionVariants} from "../lib/utils";
import {AnimatedGroup} from "./motion-primitives/animated-group";

export default function Agenda() {
    return (
        <section className="scroll-py-16 py-16 md:scroll-py-32 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <div className="grid gap-y-12 px-2 lg:grid-cols-[1fr_auto]">
                    <div className="text-center lg:text-left">
                        <TextEffect
                            triggerOnView
                            preset="fade-in-blur"
                            speedSegment={0.3}
                            as="h2"
                            className="mb-4 text-3xl font-semibold md:text-4xl">
                            活动议程
                        </TextEffect>
                    </div>

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
                        className="divide-y divide-dashed sm:mx-auto sm:max-w-lg lg:mx-0"
                    >
                        <div className="pb-6">
                            <div className="font-medium space-x-2">
                                <span className='text-muted-foreground font-mono '>11:00</span>
                                <span>欢迎视频</span>
                            </div>
                            <p className="text-muted-foreground mt-4">来自 v0 Team 的特别欢迎</p>
                        </div>
                        <div className="py-6">
                            <div className="font-medium space-x-2">
                                <span className='text-muted-foreground font-mono '>11:30</span>
                                <span>动手搭建！</span>
                            </div>
                            <p className="text-muted-foreground mt-4">现场使用 v0 搭建你的项目。</p>
                        </div>
                        <div className="py-6">
                            <div className="font-medium space-x-2">
                                <span className='text-muted-foreground font-mono '>13:00</span>
                                <span>作品展示冲刺</span>
                            </div>
                            <p className="text-muted-foreground mt-4">快速展示你现场完成的作品。</p>
                        </div>
                        <div className="py-6">
                            <div className="font-medium space-x-2">
                                <span className='text-muted-foreground font-mono '>13:30</span>
                                <span>自由交流与活动收尾</span>
                            </div>
                            <p className="text-muted-foreground mt-4">留出时间认识其他创作者，交换想法。</p>
                        </div>
                    </AnimatedGroup>
                </div>
            </div>
        </section>
    )
}
