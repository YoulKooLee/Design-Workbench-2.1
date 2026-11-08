import React, { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../_kit/cn';
import { Button } from '../../基础/Button';
import { Card } from '../../基础/Card';
import { Tag } from '../../基础/Tag';
import { Steps } from '../../布局/Steps';
import { Upload } from '../../表单/Upload';
import type { UploadFile } from '../../表单/Upload';
import { CheckboxGroup } from '../../表单/Choice';
import { DataTable } from '../../数据展示/DataTable';
import type { Column } from '../../数据展示/DataTable';
import { ResultPage } from '../../反馈/ResultPage';
import { message, MessageHost } from '../../反馈/Message';

/* =========================================================================
 * 文案（逐字取自母版 locale.js → listImport）
 * ========================================================================= */

const T = {
  title: '导入向导',
  stepUpload: '上传文件',
  stepValidate: '数据校验',
  stepResult: '导入结果',
  uploadTip: '支持 .xlsx / .xls / .csv，单文件不超过 10MB，建议先下载模板',
  importDrag: '点击或拖拽文件到此处',
  importDragHint: '仅支持 Excel / CSV 文件，单文件不超过 10MB',
  downloadTemplate: '下载导入模板',
  templateOk: '模板下载已开始',
  formatInvalid: '仅支持 Excel / CSV 文件',
  fileRequired: '请先上传导入文件',
  nextValidate: '开始校验',
  validateOk: '校验完成',
  prev: '上一步',
  nextImport: '确认导入',
  onlyIssues: '仅看问题行',
  issueCount: '当前显示 {n} 条',
  emptyValue: '—',
  summaryTotal: '校验行数',
  summaryOk: '通过',
  summaryWarn: '警告',
  summaryError: '错误',
  levelOk: '通过',
  levelWarn: '警告',
  levelError: '错误',
  colRow: '行号',
  colField: '字段',
  colValue: '值',
  colLevel: '结果',
  colMessage: '说明',
  colId: '工单编号',
  colTitle: '工单标题',
  colAssignee: '处理人',
  colPriority: '优先级',
  colCustomer: '客户',
  colStatus: '状态',
  msgOk: '校验通过',
  msgEmptyTitle: '标题不能为空',
  msgUnknownAssignee: '处理人不在组织内，将标记为未分配',
  msgInvalidPriority: '优先级取值不合法',
  msgDuplicateId: '工单编号重复',
  msgEmptyCustomer: '客户为空，将使用默认客户',
  msgEmptyAssignee: '处理人为空，导入后需手工分派',
  msgInvalidStatus: '状态取值不在枚举范围内',
  msgTitleTooLong: '标题超过 50 字，将被截断保存',
  msgCustomerNotFound: '客户名称未匹配主数据，将新建临时客户',
  msgEmptyId: '工单编号不能为空',
  msgLowPriority: '优先级为空，将默认设为「中」',
  resultTitle: '导入完成',
  resultDesc: '成功写入 {ok} 条，警告保留 {warn} 条，已跳过错误 {error} 条。可返回列表查看结果。',
  goList: '返回数据列表',
  importAgain: '再导一次',
  viewValidate: '查看校验明细',
};

export type ImportLevel = 'ok' | 'warn' | 'error';

export interface ImportValidateRow {
  row: number;
  field: string;
  value: string;
  level: ImportLevel;
  message: string;
}

/** 母版内置校验明细（逐字对齐 list-import.js → buildValidateRows） */
export const MOCK_IMPORT_VALIDATE_ROWS: ImportValidateRow[] = [
  { row: 2, field: T.colId, value: 'WO2026080001', level: 'ok', message: T.msgOk },
  { row: 3, field: T.colTitle, value: '', level: 'error', message: T.msgEmptyTitle },
  { row: 4, field: T.colAssignee, value: '未知人员', level: 'warn', message: T.msgUnknownAssignee },
  { row: 5, field: T.colPriority, value: '特急', level: 'error', message: T.msgInvalidPriority },
  { row: 6, field: T.colCustomer, value: '星河科技', level: 'ok', message: T.msgOk },
  { row: 7, field: T.colStatus, value: '处理中', level: 'ok', message: T.msgOk },
  { row: 8, field: T.colTitle, value: '物流延迟投诉', level: 'ok', message: T.msgOk },
  { row: 9, field: T.colId, value: 'WO2026080001', level: 'error', message: T.msgDuplicateId },
  { row: 10, field: T.colCustomer, value: '', level: 'warn', message: T.msgEmptyCustomer },
  { row: 11, field: T.colAssignee, value: '', level: 'warn', message: T.msgEmptyAssignee },
  { row: 12, field: T.colStatus, value: '挂起中', level: 'error', message: T.msgInvalidStatus },
  {
    row: 13,
    field: T.colTitle,
    value: '关于跨境物流清关延误导致客户投诉的紧急跟进事项说明',
    level: 'warn',
    message: T.msgTitleTooLong,
  },
  { row: 14, field: T.colCustomer, value: '新桥供应链（未建档）', level: 'warn', message: T.msgCustomerNotFound },
  { row: 15, field: T.colId, value: '', level: 'error', message: T.msgEmptyId },
  { row: 16, field: T.colPriority, value: '', level: 'warn', message: T.msgLowPriority },
  { row: 17, field: T.colAssignee, value: '外包-李明辉', level: 'warn', message: T.msgUnknownAssignee },
  { row: 18, field: T.colTitle, value: '发票抬头与合同主体不一致', level: 'ok', message: T.msgOk },
];

const LEVEL_META: Record<ImportLevel, { color: 'green' | 'orange' | 'red'; text: string }> = {
  ok: { color: 'green', text: T.levelOk },
  warn: { color: 'orange', text: T.levelWarn },
  error: { color: 'red', text: T.levelError },
};

export interface PageListImportProps {
  /** 校验明细（不传用母版内置数据；step 2/3 才会生成） */
  validateRows?: ImportValidateRow[];
  /** 初始步骤 1-3 */
  defaultStep?: 1 | 2 | 3;
  onDownloadTemplate?: () => void;
  onImported?: (summary: { ok: number; warn: number; error: number }) => void;
  onBackToList?: () => void;
  className?: string;
}

/**
 * PageListImport 导入向导（页面模式）
 *
 * 来源：Vibe Design Pro/admin `list-import`（Vue + Arco HTML 母版）全交互精转，
 * 文案逐字取自母版 `locale.js → listImport`，校验明细逐字对齐 `list-import.js`。
 * 覆盖：3 步步骤条（上传文件 / 数据校验 / 导入结果）、拖拽上传 + 格式校验（仅 xlsx/xls/csv）、
 * 下载模板、校验汇总（行数/通过/警告/错误）+ 仅看问题行过滤 + 明细表（5 列）、
 * 确认导入 loading、结果页（含写入/警告/跳过统计）与三个去向。
 *
 * @example
 * <PageListImport onBackToList={() => history.back()} />
 */
export function PageListImport({
  validateRows,
  defaultStep = 1,
  onDownloadTemplate,
  onImported,
  onBackToList,
  className,
}: PageListImportProps) {
  const [step, setStep] = useState<1 | 2 | 3>(defaultStep);
  const [files, setFiles] = useState<UploadFile[]>(
    defaultStep >= 2 ? [{ uid: '-1', name: 'import-demo.xlsx', status: 'done' }] : [],
  );
  const [rows, setRows] = useState<ImportValidateRow[]>(
    validateRows ?? (defaultStep >= 2 ? MOCK_IMPORT_VALIDATE_ROWS : []),
  );
  const [onlyIssues, setOnlyIssues] = useState(true);
  const [validating, setValidating] = useState(false);
  const [importing, setImporting] = useState(false);

  const hasFile = files.length > 0;

  const summary = useMemo(() => {
    const s = { total: rows.length, ok: 0, warn: 0, error: 0 };
    rows.forEach((r) => {
      if (r.level === 'ok') s.ok += 1;
      else if (r.level === 'warn') s.warn += 1;
      else s.error += 1;
    });
    return s;
  }, [rows]);

  const displayRows = onlyIssues ? rows.filter((r) => r.level !== 'ok') : rows;

  const resultDesc = T.resultDesc
    .replace('{ok}', String(summary.ok))
    .replace('{warn}', String(summary.warn))
    .replace('{error}', String(summary.error));

  const columns: Column<ImportValidateRow>[] = [
    { title: T.colRow, key: 'row', width: 64 },
    { title: T.colField, key: 'field', width: 96 },
    {
      title: T.colValue,
      key: 'value',
      ellipsis: true,
      render: (r) => (
        <span className={cn(r.value ? 'text-neutral-10' : 'text-neutral-4')}>{r.value || T.emptyValue}</span>
      ),
    },
    {
      title: T.colLevel,
      key: 'level',
      width: 80,
      render: (r) => {
        const meta = LEVEL_META[r.level];
        return <Tag color={meta.color}>{meta.text}</Tag>;
      },
    },
    { title: T.colMessage, key: 'message', ellipsis: true },
  ];

  const goValidate = () => {
    if (!hasFile) {
      message.warning(T.fileRequired);
      return;
    }
    setValidating(true);
    window.setTimeout(() => {
      setRows(validateRows ?? MOCK_IMPORT_VALIDATE_ROWS);
      setValidating(false);
      setStep(2);
      message.success(T.validateOk);
    }, 600);
  };

  const goImport = () => {
    if (!rows.length) {
      message.warning(T.fileRequired);
      return;
    }
    setImporting(true);
    window.setTimeout(() => {
      setImporting(false);
      setStep(3);
      onImported?.({ ok: summary.ok, warn: summary.warn, error: summary.error });
    }, 700);
  };

  const resetAll = () => {
    setStep(1);
    setFiles([]);
    setRows([]);
    setOnlyIssues(true);
  };

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <MessageHost />

      <Card bordered={false}>
        {step < 3 && (
          <div className="mb-6">
            <Steps
              current={step}
              items={[{ title: T.stepUpload }, { title: T.stepValidate }, { title: T.stepResult }]}
            />
          </div>
        )}

        {/* 步骤 1：上传文件 */}
        {step === 1 && (
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-2 rounded-md border border-blue-2 bg-blue-1 px-3 py-2 text-sm text-neutral-8">
              <span className="mt-0.5 text-primary">ⓘ</span>
              <span>{T.uploadTip}</span>
            </div>

            <Upload
              mode="drag"
              accept=".xlsx,.xls,.csv"
              maxCount={1}
              files={files}
              buttonText={T.importDrag}
              hint={T.importDragHint}
              onChange={(next) => {
                const last = next.slice(-1);
                const name = last[0]?.name ?? '';
                if (name && !/\.(xlsx|xls|csv)$/i.test(name)) {
                  message.warning(T.formatInvalid);
                  return;
                }
                setFiles(last);
              }}
            />

            <div>
              <Button
                variant="text"
                onClick={() => {
                  onDownloadTemplate?.();
                  message.success(T.templateOk);
                }}
              >
                ↓ {T.downloadTemplate}
              </Button>
            </div>
          </div>
        )}

        {/* 步骤 2：数据校验 */}
        {step === 2 && (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { label: T.summaryTotal, value: summary.total, tone: 'text-neutral-10' },
                { label: T.summaryOk, value: summary.ok, tone: 'text-success' },
                { label: T.summaryWarn, value: summary.warn, tone: 'text-warning' },
                { label: T.summaryError, value: summary.error, tone: 'text-danger' },
              ].map((it) => (
                <div key={it.label} className="rounded-md border border-neutral-3 bg-white px-4 py-3">
                  <div className="text-xs text-neutral-6">{it.label}</div>
                  <div className={cn('mt-1 text-xl font-semibold', it.tone)}>{it.value}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <CheckboxGroup
                options={[{ label: T.onlyIssues, value: 'only' }]}
                value={onlyIssues ? ['only'] : []}
                onChange={(v) => setOnlyIssues(v.includes('only'))}
              />
              <span className="text-sm text-neutral-6">
                {T.issueCount.replace('{n}', String(displayRows.length))}
              </span>
            </div>

            <DataTable columns={columns} data={displayRows} rowKey="row" plain />
          </div>
        )}

        {/* 步骤 3：导入结果 */}
        {step === 3 && (
          <ResultPage
            status="success"
            title={T.resultTitle}
            desc={resultDesc}
            extra={
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button variant="primary" onClick={onBackToList}>
                  {T.goList}
                </Button>
                <Button variant="outline" onClick={resetAll}>
                  {T.importAgain}
                </Button>
                <Button variant="outline" onClick={() => setStep(2)}>
                  {T.viewValidate}
                </Button>
              </div>
            }
          />
        )}

        {/* 底部操作 */}
        {step < 3 && (
          <div
            className={cn(
              'mt-6 flex items-center gap-3 border-t border-neutral-3 pt-4',
              step === 2 && 'justify-between',
            )}
          >
            {step === 1 ? (
              <Button variant="primary" loading={validating} onClick={goValidate}>
                {T.nextValidate}
              </Button>
            ) : (
              <>
                <Button variant="outline" onClick={() => setStep(1)}>
                  {T.prev}
                </Button>
                <Button variant="primary" loading={importing} onClick={goImport}>
                  {T.nextImport}
                </Button>
              </>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}

export default PageListImport;
