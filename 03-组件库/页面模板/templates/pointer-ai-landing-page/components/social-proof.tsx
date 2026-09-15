import React from "react"
import logo01 from "../public/logos/logo01.svg"
import logo02 from "../public/logos/logo02.svg"
import logo03 from "../public/logos/logo03.svg"
import logo04 from "../public/logos/logo04.svg"
import logo05 from "../public/logos/logo05.svg"
import logo06 from "../public/logos/logo06.svg"
import logo07 from "../public/logos/logo07.svg"
import logo08 from "../public/logos/logo08.svg"

const logos = [logo01, logo02, logo03, logo04, logo05, logo06, logo07, logo08]

export function SocialProof() {
  return (
    <section className="self-stretch py-16 flex flex-col justify-center items-center gap-6 overflow-hidden">
      <div className="text-center text-gray-300 text-sm font-medium leading-tight">
        受到高速成长团队信赖
      </div>
      <div className="self-stretch grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
        {logos.map((logo, i) => (
          <img
            key={i}
            src={logo}
            alt={`合作团队 Logo ${i + 1}`}
            width={400}
            height={120}
            className="w-full max-w-[400px] h-auto object-contain grayscale opacity-70"
          />
        ))}
      </div>
    </section>
  )
}
