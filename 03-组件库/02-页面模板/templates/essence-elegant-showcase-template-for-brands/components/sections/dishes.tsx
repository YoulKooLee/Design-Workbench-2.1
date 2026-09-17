import React, { useEffect, useRef, useState } from "react"
import { PrototypeImage } from "../prototype-image"
import { ImageReveal } from "../ui/image-reveal"

export function DishesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeDish, setActiveDish] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const dishes = [
    {
      id: "scallops",
      name: "潜水员扇贝",
      subtitle: "青豆泥、嫩叶、可食花",
      season: "春季",
      description: "来自北海道冷水域的手采扇贝，煎至晶莹半透。搭配甜青豆泥、幼嫩芽叶与细致花瓣，捕捉万物更新的气息。",
      technique: "精准煎制、蔬菜乳化",
      image: "/images/dish-2.jpg",
      awards: ["2024 最佳海鲜料理"]
    },
    {
      id: "oyster",
      name: "牡蛎与鱼子酱",
      subtitle: "香槟泡沫、柚子、海岸香草",
      season: "全年",
      description: "一场关于海洋奢华的研究。布列塔尼牡蛎覆以 Ossetra 鱼子酱，包裹在香槟泡沫与微弱柚子香气之中，将大海蒸馏为最优雅的表达。",
      technique: "分子料理、泡沫稳定",
      image: "/images/dish-1.jpg",
      awards: ["招牌料理奖"]
    },
    {
      id: "cod",
      name: "黑鳕鱼",
      subtitle: "味噌釉、时令蔬菜、香草油",
      season: "秋季",
      description: "野生阿拉斯加黑鳕鱼以白味噌与味醂腌渍 48 小时，呈现近乎丝绸般的质地。烤根茎蔬菜与香草精华带来温暖回声。",
      technique: "长时间腌渍、精准烘烤",
      image: "/images/dish-3.jpg",
      awards: []
    }
  ]

  return (
    <section 
      ref={sectionRef}
      id="dishes"
      className="relative py-32 md:py-48 overflow-hidden bg-secondary"
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header */}
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-20 mb-20 md:mb-32">
          <div className="lg:col-span-2">
            <div 
              className="flex items-center gap-4"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateX(0)" : "translateX(-20px)",
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">(04)</span>
              <div className="w-8 h-px bg-border" />
              <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">招牌料理</span>
            </div>
          </div>

          <div className="lg:col-span-10">
            <h2 
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-normal text-foreground max-w-4xl text-pretty"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(40px)",
                transitionProperty: "all",
                transitionDuration: "0.8s",
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                transitionDelay: "0.1s"
              }}
            >
              定义 ESSENCE 料理声音的创作
            </h2>
          </div>
        </div>

        {/* Dishes Showcase */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Image */}
          <div className="lg:col-span-8 relative">
            <div className="relative aspect-[4/3] overflow-hidden bg-background">
              {dishes.map((dish, index) => (
                <div
                  key={dish.id}
                  className="absolute inset-0 transition-opacity duration-700"
                  style={{ opacity: activeDish === index ? 1 : 0 }}
                >
                  {activeDish === index ? (
                    <ImageReveal
                      src={dish.image || "/placeholder.svg"}
                      alt={dish.name}
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 66vw"
                      priority={index === 0}
                      delay={300}
                    />
                  ) : (
                    <PrototypeImage
                      src={dish.image || "/placeholder.svg"}
                      alt={dish.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 66vw"
                      priority={index === 0}
                    />
                  )}
                </div>
              ))}
              
              {/* Season Badge */}
              <div className="absolute top-6 right-6 bg-background/90 backdrop-blur-sm px-4 py-2">
                <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
                  {dishes[activeDish].season}
                </span>
              </div>
            </div>
          </div>

          {/* Dish Info Cards */}
          <div className="lg:col-span-4 space-y-4">
            {dishes.map((dish, index) => (
              <button
                key={dish.id}
                type="button"
                onClick={() => setActiveDish(index)}
                className={`w-full text-left p-6 md:p-8 transition-all duration-500 ${
                  activeDish === index 
                    ? "bg-background" 
                    : "bg-background/50 hover:bg-background/70"
                }`}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(30px)",
                  transitionProperty: "all",
                  transitionDuration: "0.8s",
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  transitionDelay: `${0.2 + index * 0.1}s`
                }}
              >
                <div className="space-y-4">
                  {/* Dish Name */}
                  <div>
                    <h3 className="font-serif text-2xl md:text-3xl font-light text-foreground mb-1">
                      {dish.name}
                    </h3>
                    <p className="text-sm text-muted-foreground italic">
                      {dish.subtitle}
                    </p>
                  </div>

                  {/* Description - Only show for active dish */}
                  <div 
                    className="overflow-hidden transition-all duration-500"
                    style={{ 
                      maxHeight: activeDish === index ? "300px" : "0",
                      opacity: activeDish === index ? 1 : 0
                    }}
                  >
                    <div className="space-y-4 pt-2">
                      <p className="text-sm leading-relaxed text-foreground/70">
                        {dish.description}
                      </p>
                      
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-muted-foreground uppercase tracking-wider">技法：</span>
                        <span className="text-foreground/60">{dish.technique}</span>
                      </div>

                      {dish.awards.length > 0 && (
                        <div className="flex items-center gap-2 pt-2 border-t border-border">
                          <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-xs text-accent">{dish.awards[0]}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Indicator */}
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-px bg-border" />
                    <div 
                      className={`w-2 h-2 transition-all duration-500 ${
                        activeDish === index ? "bg-accent scale-125" : "bg-border"
                      }`} 
                    />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Note */}
        <div 
          className="mt-16 md:mt-24 text-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transitionProperty: "all",
            transitionDuration: "0.8s",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            transitionDelay: "0.6s"
          }}
        >
          <p className="text-sm text-muted-foreground italic max-w-2xl mx-auto leading-relaxed">
            菜单随季节更替。这些招牌料理代表我们的理念，而每一次到访都会带来当下的新表达。
          </p>
        </div>
      </div>
    </section>
  )
}
