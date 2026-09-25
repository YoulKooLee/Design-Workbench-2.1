/*
 * Axhub 组件库 · React + Tailwind v4
 * 对齐 03-组件库/frame/admin 母版（Arco Design 视觉）的高频 UI 组件。
 * 用法：原型页面 import 即可（theme token 随本入口自动生效）。
 * @example
 * import { Button, Card, StatCard, Tag, DataTable, FormField, Input, Select, Modal, ResultPage } from '../../components/axhub';
 */
import './theme.css';

export { Button, type ButtonProps, type ButtonVariant, type ButtonSize } from './Button';
export { Card, type CardProps } from './Card';
export { StatCard, type StatCardProps, type StatTone } from './StatCard';
export { Tag, type TagProps, type TagColor } from './Tag';
export { DataTable, type Column, type DataTableProps } from './DataTable';
export { FormField, Input, Select, FormRow, type FormFieldProps, type InputProps, type SelectProps, type SelectOption } from './FormField';
export { Modal, type ModalProps } from './Modal';
export { ResultPage, type ResultPageProps, type ResultStatus } from './ResultPage';
