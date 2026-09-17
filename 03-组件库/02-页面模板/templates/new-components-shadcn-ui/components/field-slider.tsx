import React, { useState } from "react"

import {
  Field,
  FieldDescription,
  FieldTitle,
} from './ui/field'
import { Slider } from './ui/slider'

export function FieldSlider() {
  const [value, setValue] = useState([200, 800])
  return (
    <div className="w-full max-w-md">
      <Field>
        <FieldTitle>价格范围</FieldTitle>
        <FieldDescription>
          设置预算范围（$
          <span className="font-medium tabular-nums">{value[0]}</span> -{" "}
          <span className="font-medium tabular-nums">{value[1]}</span>）。
        </FieldDescription>
        <Slider
          value={value}
          onValueChange={setValue}
          max={1000}
          min={0}
          step={10}
          className="mt-2 w-full"
          aria-label="价格范围"
        />
      </Field>
    </div>
  )
}
