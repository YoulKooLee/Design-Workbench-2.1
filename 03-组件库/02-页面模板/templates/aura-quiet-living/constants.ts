/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { Product, JournalArticle } from './types';

export const CATEGORY_LABELS: Record<Product['category'] | 'All', string> = {
  All: '全部',
  Audio: '音频',
  Wearable: '可穿戴',
  Mobile: '移动设备',
  Home: '家居',
};

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Aura Harmony',
    tagline: '自然地聆听。',
    description: '像置身开阔空气中的声音。以温润声学织物和再生砂岩复合材料制成。',
    longDescription: '让声音回到它本来的样子：不受束缚，自然流动。Aura Harmony 耳机采用我们的开放式驱动技术，外覆会随体温呼吸的声学织物。头梁由再生砂岩复合材料制成，触感清凉而独特，让你在当下重新安定。',
    price: 429,
    category: 'Audio',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000',
    gallery: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1524678606372-565ae0f98944?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['有机降噪', '50 小时续航', '自然声场']
  },
  {
    id: 'p2',
    name: 'Aura Epoch',
    tagline: '记录时刻，而非分钟。',
    description: '为身心节律而设计的腕上时计。陶瓷表壳搭配可持续素皮表带。',
    longDescription: '时间不是数字的排列，而是片刻的流动。Aura Epoch 重新思考智能手表界面，采用接近纸张质感的低干扰 E-Ink 混合显示。它通过皮肤温度与心率变异性追踪压力，以轻柔震动提醒你呼吸。陶瓷表壳亲肤顺滑，并经过 48 小时手工抛光。',
    price: 349,
    category: 'Wearable',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1000',
    gallery: [
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['压力监测', 'E-Ink 混合显示', '7 天续航']
  },
  {
    id: 'p3',
    name: 'Aura Canvas',
    tagline: '留住温度。',
    description: '一块接近纸张属性的屏幕。柔和护眼、色彩鲜明，触摸时也有细腻质感。',
    longDescription: '屏幕不该像直视一盏灯。Aura Canvas 使用哑光纳米蚀刻 OLED 面板，让环境光柔和散开，呈现接近高品质杂志纸的观感与触感。无论阅读、速写还是展示艺术，它都为数字生活带来可触摸的温度。',
    price: 1099,
    category: 'Mobile',
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1000',
    gallery: [
        'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['纸感 OLED', '人像镜头', '砂岩触感']
  },
  {
    id: 'p4',
    name: 'Aura Essence',
    tagline: '回到自然。',
    description: '一台也是雕塑的空气净化器。低至耳语般安静，在净化空间的同时散发淡淡自然香气。',
    longDescription: '清洁的空气，是清明心绪的基础。Aura Essence 以苔藓生物滤芯结合 HEPA 技术，清除居家污染物。它会根据一天中的时间，轻柔扩散雪松、佛手柑与雨后气息等天然精油。',
    price: 599,
    category: 'Home',
    imageUrl: 'https://images.pexels.com/photos/8092420/pexels-photo-8092420.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    gallery: [
        'https://images.pexels.com/photos/8092420/pexels-photo-8092420.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['Bio-HEPA 滤芯', '芳香疗愈', '静夜模式']
  },
  {
    id: 'p5',
    name: 'Aura Beam',
    tagline: '会呼吸的光。',
    description: '随太阳运行的智能昼夜节律照明。傍晚投下近似烛光的温暖光晕。',
    longDescription: '人造光常常打乱我们的自然节律。Aura Beam 会同步本地日出与日落，白天提供清爽提神的光线，夜晚则过渡为不含蓝光的温暖琥珀色。控制无需触碰，只需轻轻挥手即可调节亮度。',
    price: 249,
    category: 'Home',
    imageUrl: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&q=80&w=1000',
    gallery: [
        'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1540932296235-d84931b6370b?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['昼夜节律同步', '暖光调光', '无接触控制']
  },
  {
    id: 'p6',
    name: 'Aura Scribe',
    tagline: '让想法流动。',
    description: '一支带有石墨摩擦感的数字手写笔。磁吸在 Aura Canvas 上即可无线充电。',
    longDescription: '手与思考之间的连接值得被珍视。Aura Scribe 使用定制弹性笔尖，复现石墨在纸面上的细微摩擦。它的配重恰到好处，握在手中几乎会消失，只留下你的想法。',
    price: 129,
    category: 'Mobile',
    imageUrl: 'https://images.pexels.com/photos/2647376/pexels-photo-2647376.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    gallery: [
        'https://images.pexels.com/photos/2647376/pexels-photo-2647376.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.unsplash.com/photo-1517260487576-8977430081d3?auto=format&fit=crop&q=80&w=1000'
    ],
    features: ['零延迟', '纹理笔尖', '无线充电']
  }
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
    {
        id: 1,
        title: "触感心理学",
        date: "2025 年 4 月 12 日",
        excerpt: "在玻璃与塑料构成的世界里，为什么指尖依然渴望自然表面。",
        image: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?auto=format&fit=crop&q=80&w=1000",
        content: React.createElement(React.Fragment, null,
            React.createElement("p", { className: "mb-6 first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left text-[#5D5A53]" },
                "我们生活在一个几乎没有摩擦的世界里。手机是光滑玻璃，电脑是抛光铝材，台面是人造石英。没有阻力，没有颗粒，也没有纹理。但我们的身体依然渴望这些触感。"
            ),
            React.createElement("p", { className: "mb-8 text-[#5D5A53]" },
                "指尖是人体神经最密集的部位之一。它们天生会读取物体的故事：它的年代、来源和温度。当这些输入被剥夺时，我们会感到一种细微的感官空缺。"
            ),
            React.createElement("blockquote", { className: "border-l-2 border-[#2C2A26] pl-6 italic text-xl text-[#2C2A26] my-10 font-serif" },
                "触摸，是理解。感受，是安定。"
            ),
            React.createElement("p", { className: "mb-6 text-[#5D5A53]" },
                "在 Aura，我们既为眼睛设计，也为手掌设计。我们选择有声音的材料：会在掌心变暖的砂岩，可以被指尖追随的织物，以及记得森林的木材。"
            )
        )
    },
    {
        id: 2,
        title: "少即生活",
        date: "2025 年 3 月 28 日",
        excerpt: "与建筑师 Hiroshi Nakamura 谈空白空间的艺术。",
        image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=1000",
        content: React.createElement(React.Fragment, null,
            React.createElement("p", { className: "mb-6 text-[#5D5A53]" },
                "空并不等于无。在日本建筑中，",
                React.createElement("em", null, "Ma"),
                " 指的是事物之间的留白，是让整体成形的停顿。"
            ),
            React.createElement("p", { className: "mb-8 text-[#5D5A53]" },
                "Nakamura 在京都的工作室里啜饮着茶，窗外是雨后发亮的街道。他说：“我们总是把生活填满噪音。我们购买更多设备来节省时间，却比以往更缺少时间。真正的奢侈，是没有打扰。”"
            ),
            React.createElement("div", { className: "my-12 p-8 bg-[#EBE7DE] font-serif text-[#2C2A26] italic text-center" },
                React.createElement("p", null, "房间是空的"),
                React.createElement("p", null, "却盛满了光。"),
                React.createElement("p", null, "心是安静的"),
                React.createElement("p", null, "却仍有思绪。"),
                React.createElement("p", null, "这就是少即生活"),
                React.createElement("p", null, "所拥有的重量。")
            ),
            React.createElement("p", { className: "mb-6 text-[#5D5A53]" },
                "这种理念推动着新系列的每一道弧线。我们不断问自己：还能去掉什么？还能减去多少，才只留下真正必要的部分？"
            )
        )
    },
    {
        id: 3,
        title: "春日情绪板",
        date: "2025 年 3 月 15 日",
        excerpt: "来自设计工作室的笔记：晨雾、湿润石面与浅色亚麻。",
        image: "https://images.unsplash.com/photo-1516834474-48c0abc2a902?auto=format&fit=crop&q=80&w=1000",
        content: React.createElement(React.Fragment, null,
            React.createElement("p", { className: "mb-6 text-[#5D5A53]" },
                "工作室里的春天，是万物醒来的时刻。光线从冬日低斜而锋利的角度，转向更柔和、更弥散的明亮。我们开始被浅色吸引：雨后路面的灰、未漂白亚麻的米色，以及鼠尾草般带灰调的绿。"
            ),
            React.createElement("p", { className: "mb-8 text-[#5D5A53]" },
                "这个月的情绪板，是对柔软的研究。它属于一种过渡状态：既不冷也不热，既不暗也不亮。它是一年刚刚破晓的时刻。"
            ),
             React.createElement("div", { className: "my-12 p-8 bg-[#2C2A26] text-[#F5F2EB] font-serif italic text-center" },
                React.createElement("p", null, "新绿从土里探出"),
                React.createElement("p", null, "灰石贴着肌肤微凉"),
                React.createElement("p", null, "太阳把空气慢慢温热。")
            )
        )
    }
];

export const BRAND_NAME = 'Aura';
export const PRIMARY_COLOR = 'stone-900'; 
export const ACCENT_COLOR = 'stone-500';
