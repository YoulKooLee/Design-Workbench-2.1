/** 基础表单提交字段 */
export interface BasicFormPayload {
  title: string;
  dateRange: string[];
  goal: string;
  standard: string;
  client?: string;
  reviewers: string[];
  weight?: number;
  visibility: string;
}
