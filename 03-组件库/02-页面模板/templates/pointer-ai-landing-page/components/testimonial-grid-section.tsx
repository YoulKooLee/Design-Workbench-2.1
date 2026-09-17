import React from "react"
import albertFloresAvatar from "../public/images/avatars/albert-flores.png"
import annetteBlackAvatar from "../public/images/avatars/annette-black.png"
import cameronWilliamsonAvatar from "../public/images/avatars/cameron-williamson.png"
import codyFisherAvatar from "../public/images/avatars/cody-fisher.png"
import darleneRobertsonAvatar from "../public/images/avatars/darlene-robertson.png"
import dianneRussellAvatar from "../public/images/avatars/dianne-russell.png"
import robertFoxAvatar from "../public/images/avatars/robert-fox.png"
import largeCardBackground from "../public/images/large-card-background.svg"

type TestimonialType = "large-teal" | "large-light" | "small-dark"

interface Testimonial {
  quote: string
  name: string
  company: string
  avatar: string
  type: TestimonialType
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Pointer 的实时代码建议就像有一位资深工程师在你写代码时逐行审查。它的建议很准确，明显提升了整体代码质量，也缩短了审查时间。",
    name: "Annette Black",
    company: "Sony",
    avatar: annetteBlackAvatar,
    type: "large-teal",
  },
  {
    quote:
      "把 Pointer 接入我们的技术栈非常顺畅，MCP server 连接为我们省下了好几天配置时间。",
    name: "Dianne Russell",
    company: "McDonald's",
    avatar: dianneRussellAvatar,
    type: "small-dark",
  },
  {
    quote:
      "Pointer 的多 Agent 编码能力改变了我们的工作方式。过去要用整个 sprint 处理的复杂 bug，现在几小时就能修好。",
    name: "Cameron Williamson",
    company: "IBM",
    avatar: cameronWilliamsonAvatar,
    type: "small-dark",
  },
  {
    quote:
      "我们不再需要在多个工具之间来回切换。Pointer 把所有集成都放到同一个地方，整个工作流简单了很多。",
    name: "Robert Fox",
    company: "MasterCard",
    avatar: robertFoxAvatar,
    type: "small-dark",
  },
  {
    quote:
      "我们一开始只是用免费方案试试，一周内就升级到了 Pro。现在已经很难想象没有 Pointer 怎么写代码。",
    name: "Darlene Robertson",
    company: "Ferrari",
    avatar: darleneRobertsonAvatar,
    type: "small-dark",
  },
  {
    quote:
      "协作编码现在轻松多了。有了 Pointer 的实时预览，结对编程变得更快，也更有产出。",
    name: "Cody Fisher",
    company: "Apple",
    avatar: codyFisherAvatar,
    type: "small-dark",
  },
  {
    quote:
      "用 Pointer 部署到 Vercel 不只是简单，而是真的顺滑。我们几分钟内就能从编码到上线，不必再担心构建流水线或配置问题。",
    name: "Albert Flores",
    company: "Louis Vuitton",
    avatar: albertFloresAvatar,
    type: "large-light",
  },
]

const TestimonialCard = ({ quote, name, company, avatar, type }: Testimonial) => {
  const isLargeCard = type.startsWith("large")
  const avatarSize = isLargeCard ? 48 : 36
  const avatarBorderRadius = isLargeCard ? "rounded-[41px]" : "rounded-[30.75px]"
  const padding = isLargeCard ? "p-6" : "p-[30px]"

  let cardClasses = `flex flex-col justify-between items-start overflow-hidden rounded-[10px] shadow-[0px_2px_4px_rgba(0,0,0,0.08)] relative ${padding}`
  let quoteClasses = ""
  let nameClasses = ""
  let companyClasses = ""
  let backgroundElements = null
  let cardHeight = ""
  const cardWidth = "w-full md:w-[384px]"

  if (type === "large-teal") {
    cardClasses += " bg-primary"
    quoteClasses += " text-primary-foreground text-2xl font-medium leading-8"
    nameClasses += " text-primary-foreground text-base font-normal leading-6"
    companyClasses += " text-primary-foreground/60 text-base font-normal leading-6"
    cardHeight = "h-[502px]"
    backgroundElements = (
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${largeCardBackground})`, zIndex: 0 }}
      />
    )
  } else if (type === "large-light") {
    cardClasses += " bg-[rgba(231,236,235,0.12)]"
    quoteClasses += " text-foreground text-2xl font-medium leading-8"
    nameClasses += " text-foreground text-base font-normal leading-6"
    companyClasses += " text-muted-foreground text-base font-normal leading-6"
    cardHeight = "h-[502px]"
    backgroundElements = (
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${largeCardBackground})`, zIndex: 0 }}
      />
    )
  } else {
    cardClasses += " bg-card outline outline-1 outline-border outline-offset-[-1px]"
    quoteClasses += " text-foreground/80 text-[17px] font-normal leading-6"
    nameClasses += " text-foreground text-sm font-normal leading-[22px]"
    companyClasses += " text-muted-foreground text-sm font-normal leading-[22px]"
    cardHeight = "h-[244px]"
  }

  return (
    <div className={`${cardClasses} ${cardWidth} ${cardHeight}`}>
      {backgroundElements}
      <div className={`relative z-10 font-normal break-words ${quoteClasses}`}>{quote}</div>
      <div className="relative z-10 flex justify-start items-center gap-3">
        <img
          src={avatar}
          alt={`${name} avatar`}
          width={avatarSize}
          height={avatarSize}
          className={avatarBorderRadius}
          style={{ width: avatarSize, height: avatarSize, border: "1px solid rgba(255, 255, 255, 0.08)" }}
        />
        <div className="flex flex-col justify-start items-start gap-0.5">
          <div className={nameClasses}>{name}</div>
          <div className={companyClasses}>{company}</div>
        </div>
      </div>
    </div>
  )
}

export function TestimonialGridSection() {
  return (
    <section className="w-full px-5 overflow-hidden flex flex-col justify-start py-6 md:py-8 lg:py-14">
      <div className="self-stretch py-6 md:py-8 lg:py-14 flex flex-col justify-center items-center gap-2">
        <div className="flex flex-col justify-start items-center gap-4">
          <h2 className="text-center text-foreground text-3xl md:text-4xl lg:text-[40px] font-semibold leading-tight md:leading-tight lg:leading-[40px]">
            让编码轻松起来
          </h2>
          <p className="self-stretch text-center text-muted-foreground text-sm md:text-sm lg:text-base font-medium leading-[18.20px] md:leading-relaxed lg:leading-relaxed">
            {"看看开发者如何借助 Pointer 的强大 AI 工具更快发布产品、顺畅协作，"} <br />{" "}
            {"并更有信心地构建。"}
          </p>
        </div>
      </div>
      <div className="w-full pt-0.5 pb-4 md:pb-6 lg:pb-10 flex flex-col md:flex-row justify-center items-start gap-4 md:gap-4 lg:gap-6 max-w-[1100px] mx-auto">
        <div className="flex-1 flex flex-col justify-start items-start gap-4 md:gap-4 lg:gap-6">
          <TestimonialCard {...testimonials[0]} />
          <TestimonialCard {...testimonials[1]} />
        </div>
        <div className="flex-1 flex flex-col justify-start items-start gap-4 md:gap-4 lg:gap-6">
          <TestimonialCard {...testimonials[2]} />
          <TestimonialCard {...testimonials[3]} />
          <TestimonialCard {...testimonials[4]} />
        </div>
        <div className="flex-1 flex flex-col justify-start items-start gap-4 md:gap-4 lg:gap-6">
          <TestimonialCard {...testimonials[5]} />
          <TestimonialCard {...testimonials[6]} />
        </div>
      </div>
    </section>
  )
}
