/**
 * @name Shadcn 新组件展示
 *
 * 参考资料：
 * - /rules/v0-project-converter.md
 * - /rules/prototype-development-guide.md
 */

import React from "react"
import "./style.css"

import { AppearanceSettings } from "./components/appearance-settings"
import { ButtonGroupDemo } from "./components/button-group-demo"
import { ButtonGroupInputGroup } from "./components/button-group-input-group"
import { ButtonGroupNested } from "./components/button-group-nested"
import { ButtonGroupPopover } from "./components/button-group-popover"
import { EmptyAvatarGroup } from "./components/empty-avatar-group"
import { FieldDemo } from "./components/field-demo"
import { FieldSlider } from "./components/field-slider"
import { InputGroupButtonExample } from "./components/input-group-button"
import { InputGroupDemo } from "./components/input-group-demo"
import { ItemDemo } from "./components/item-demo"
import { NotionPromptForm } from "./components/notion-prompt-form"
import { SpinnerBadge } from "./components/spinner-badge"
import { SpinnerEmpty } from "./components/spinner-empty"
import { Checkbox } from "./components/ui/checkbox"
import { Field, FieldLabel, FieldSeparator } from "./components/ui/field"

export default function NewComponentsShadcnUiPrototype() {
  return (
    <div className="new-components-shadcn-ui min-h-screen bg-background text-foreground antialiased">
      <div className="flex flex-col justify-center">
        <div className="theme-container mx-auto grid max-w-[2200px] gap-8 p-6 md:grid-cols-2 md:p-8 lg:grid-cols-3 xl:grid-cols-4">
          <div className="flex flex-col gap-6 *:[div]:w-full *:[div]:max-w-full">
            <FieldDemo />
          </div>
          <div className="flex flex-col gap-6 *:[div]:w-full *:[div]:max-w-full">
            <div className="*:[div]:border">
              <EmptyAvatarGroup />
            </div>
            <ButtonGroupInputGroup />
            <FieldSlider />
            <InputGroupDemo />
          </div>
          <div className="flex flex-col gap-6 *:[div]:w-full *:[div]:max-w-full">
            <ItemDemo />
            <FieldSeparator>外观设置</FieldSeparator>
            <AppearanceSettings />
          </div>
          <div className="order-first flex flex-col gap-6 min-[1400px]:order-last *:[div]:w-full *:[div]:max-w-full">
            <div className="flex gap-2">
              <SpinnerBadge />
            </div>
            <InputGroupButtonExample />
            <NotionPromptForm />
            <ButtonGroupDemo />
            <div className="flex gap-6">
              <FieldLabel htmlFor="checkbox-demo">
                <Field orientation="horizontal">
                  <Checkbox id="checkbox-demo" defaultChecked />
                  <FieldLabel htmlFor="checkbox-demo" className="line-clamp-1">
                    我同意条款和条件
                  </FieldLabel>
                </Field>
              </FieldLabel>
            </div>
            <div className="flex gap-4">
              <ButtonGroupNested />
              <ButtonGroupPopover />
            </div>
            <div className="*:[div]:border">
              <SpinnerEmpty />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
