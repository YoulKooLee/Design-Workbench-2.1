import React from "react"
import { motion } from "motion/react"
import { TestimonialsColumn } from "./ui/testimonials-column"

const testimonials = [
  {
    text: "我平时只有晚上有空，教练会提前发训练重点。练车不再靠抢时间，科二一次就过了。",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "陈同学",
    role: "C2 晚间班学员",
  },
  {
    text: "收费项目报名时就说清楚了，后面没有乱加价。每次练完都会告诉我下次要练什么。",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "王先生",
    role: "C1 普通班学员",
  },
  {
    text: "我完全零基础，第一节课从调座椅开始讲。教练很耐心，紧张感少了很多。",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "李同学",
    role: "零基础学员",
  },
  {
    text: "考前三天安排了模拟路线，把容易扣分的地方过了一遍，正式考试心里有底。",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "赵先生",
    role: "科三强化班学员",
  },
  {
    text: "周末班适合学生假期集中练，排课很清楚，家里人也能看到我的进度。",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "周同学",
    role: "学生假期班学员",
  },
  {
    text: "以前挂在倒库，补训时教练只抓我的问题练，不浪费时间。",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "刘女士",
    role: "科二补训学员",
  },
  {
    text: "报名、体检、理论课和练车都有人提醒，对第一次学车的人很友好。",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "孙先生",
    role: "新手学员",
  },
  {
    text: "场地离家近，约课能配合我的轮班时间，这是我最后选择这里的原因。",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "何女士",
    role: "轮班工作者",
  },
  {
    text: "教练不会催着快考，而是先确认我真的练稳了。拿证过程比想象中踏实。",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "高先生",
    role: "C1 学员",
  },
]

const firstColumn = testimonials.slice(0, 3)
const secondColumn = testimonials.slice(3, 6)
const thirdColumn = testimonials.slice(6, 9)

export function TestimonialsSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="flex justify-center">
            <div className="border border-border py-1 px-4 rounded-lg text-sm text-muted-foreground">学员反馈</div>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-5 text-center">
            已拿证学员怎么说
          </h2>
          <p className="text-center mt-5 text-muted-foreground">真实练车体验，比广告更能说明问题。</p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  )
}
