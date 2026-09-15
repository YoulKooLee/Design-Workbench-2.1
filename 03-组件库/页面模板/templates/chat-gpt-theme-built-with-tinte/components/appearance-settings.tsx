import React from 'react';
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { CheckIcon } from "lucide-react";

import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "./ui/field";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Switch } from "./ui/switch";

const accents = [
  {
    name: "蓝色",
    value: "blue",
  },
  {
    name: "琥珀色",
    value: "amber",
  },
  {
    name: "绿色",
    value: "green",
  },
  {
    name: "玫瑰色",
    value: "rose",
  },
];

export function AppearanceSettings() {
  return (
    <FieldSet>
      <FieldGroup>
        <FieldSet>
          <FieldLegend>计算环境</FieldLegend>
          <FieldDescription>
            选择集群使用的计算环境。
          </FieldDescription>
          <RadioGroup defaultValue="kubernetes">
            <FieldLabel htmlFor="kubernetes-r2h">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Kubernetes</FieldTitle>
                  <FieldDescription>
                    在已配置 K8s 的集群上运行 GPU 工作负载，默认推荐。
                  </FieldDescription>
                </FieldContent>
                <RadioGroupItem value="kubernetes" id="kubernetes-r2h" />
              </Field>
            </FieldLabel>
            <FieldLabel htmlFor="vm-z4k">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>虚拟机（VM）</FieldTitle>
                  <FieldDescription>
                    连接已配置 VM 的集群来运行工作负载。（即将上线）
                  </FieldDescription>
                </FieldContent>
                <RadioGroupItem value="vm" id="vm-z4k" />
              </Field>
            </FieldLabel>
          </RadioGroup>
        </FieldSet>
        <FieldSeparator />
        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>强调色</FieldTitle>
            <FieldDescription>选择界面强调色。</FieldDescription>
          </FieldContent>
          <FieldSet aria-label="强调色">
            <RadioGroup className="flex flex-wrap gap-2" defaultValue="blue">
              {accents.map((accent) => (
                <Label
                  htmlFor={accent.value}
                  key={accent.value}
                  data-theme={accent.value}
                  className="flex size-6 items-center justify-center rounded-full data-[theme=amber]:bg-amber-600 data-[theme=blue]:bg-blue-700 data-[theme=green]:bg-green-600 data-[theme=rose]:bg-rose-600"
                >
                  <RadioGroupItem
                    id={accent.value}
                    value={accent.value}
                    aria-label={accent.name}
                    className="peer sr-only"
                  />
                  <CheckIcon className="hidden size-4 stroke-white peer-data-[state=checked]:block" />
                </Label>
              ))}
            </RadioGroup>
          </FieldSet>
        </Field>
        <FieldSeparator />
        <Field orientation="horizontal">
          <FieldContent>
            <FieldLabel htmlFor="number-of-gpus-f6l">GPU 数量</FieldLabel>
            <FieldDescription>之后仍可继续增加。</FieldDescription>
          </FieldContent>
          <ButtonGroup>
            <Input
              id="number-of-gpus-f6l"
              placeholder="8"
              size={3}
              className="h-8 !w-14 font-mono"
              maxLength={3}
            />
            <Button variant="outline" size="icon-sm" type="button">
              <IconMinus />
            </Button>
            <Button variant="outline" size="icon-sm" type="button">
              <IconPlus />
            </Button>
          </ButtonGroup>
        </Field>
        <FieldSeparator />
        <Field orientation="horizontal">
          <FieldContent>
            <FieldLabel htmlFor="tinting">壁纸染色</FieldLabel>
            <FieldDescription>
              允许根据壁纸自动染色。
            </FieldDescription>
          </FieldContent>
          <Switch id="tinting" defaultChecked />
        </Field>
      </FieldGroup>
    </FieldSet>
  );
}
