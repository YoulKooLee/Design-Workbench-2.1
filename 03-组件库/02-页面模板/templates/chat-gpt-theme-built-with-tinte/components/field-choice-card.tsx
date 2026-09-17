import React from 'react';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from './ui/field'
import {
  RadioGroup,
  RadioGroupItem,
} from './ui/radio-group'

export function FieldChoiceCard() {
  return (
    <div className="w-full max-w-md">
      <FieldGroup>
        <FieldSet>
          <FieldLabel htmlFor="compute-environment-p8w">
            计算环境
          </FieldLabel>
          <FieldDescription>
            选择集群使用的计算环境。
          </FieldDescription>
          <RadioGroup defaultValue="kubernetes">
            <FieldLabel htmlFor="kubernetes-r2h">
              <Field orientation="horizontal">
                <RadioGroupItem value="kubernetes" id="kubernetes-r2h" />
                <FieldContent>
                  <FieldTitle>Kubernetes</FieldTitle>
                  <FieldDescription>
                    在已配置 K8s 的集群上运行 GPU 工作负载。
                  </FieldDescription>
                </FieldContent>
              </Field>
            </FieldLabel>
            <FieldLabel htmlFor="vm-z4k">
              <Field orientation="horizontal">
                <RadioGroupItem value="vm" id="vm-z4k" />
                <FieldContent>
                  <FieldTitle>虚拟机（VM）</FieldTitle>
                  <FieldDescription>
                    连接已配置 VM 的集群来运行工作负载。
                  </FieldDescription>
                </FieldContent>
              </Field>
            </FieldLabel>
          </RadioGroup>
        </FieldSet>
      </FieldGroup>
    </div>
  )
}
