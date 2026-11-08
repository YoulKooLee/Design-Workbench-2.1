import React, { useMemo, useState } from 'react';
import { cn } from '../../_kit/cn';
import { Button } from '../../基础/Button';
import { Card } from '../../基础/Card';
import { Tag } from '../../基础/Tag';
import { Input } from '../../表单/Input';
import { Select } from '../../表单/Select';
import { FormField } from '../../表单/FormField';
import { Upload } from '../../表单/Upload';
import type { UploadFile } from '../../表单/Upload';
import { DataTable } from '../../数据展示/DataTable';
import type { Column } from '../../数据展示/DataTable';
import { Pagination } from '../../数据展示/Pagination';
import { Tree } from '../../数据展示/Tree';
import type { TreeNode } from '../../数据展示/Tree';
import { Modal, ConfirmModal } from '../../反馈/Modal';
import { message, MessageHost } from '../../反馈/Message';

/* 文案（逐字取自母版 locale.js → listMedia） */
const T = {
  title: '文件管理',
  folderTitle: '素材目录',
  folderAll: '全部素材',
  folderCampaign: '活动物料', folderBanner: 'Banner', folderPoster: '海报', folderLanding: '落地页', folderPopup: '弹窗物料',
  folderLive: '直播素材', folderCover: '封面', folderReplay: '回放片段', folderSticker: '贴纸挂件',
  folderProduct: '商品图', folderProductMain: '主图', folderProductDetail: '详情图', folderProductCompare: '规格对比图',
  folderShortVideo: '短视频', folderVideoUgc: '种草视频', folderVideoTalk: '口播视频',
  folderAudio: '音频', folderAudioBgm: 'BGM', folderAudioVoice: '口播音频',
  folderBrand: '品牌资产', folderBrandLogo: 'Logo', folderBrandFont: '字体规范',
  folderDoc: '文档资料', folderDocGuide: '使用规范', folderDocReport: '投放报告',
  upload: '上传素材',
  uploadOk: '素材上传成功',
  uploadTitle: '上传素材',
  uploadTip: '支持图片、视频、音频与常见文档，单次最多 10 个文件，单个不超过 200MB',
  uploadDrag: '点击或拖拽文件到此处',
  uploadDragHint: '支持图片、视频、音频与常见文档，单次最多 10 个文件，单个不超过 200MB',
  uploadFolder: '上传目录',
  uploadFolderPh: '请选择目录',
  uploadFileRequired: '请先选择要上传的文件',
  uploadFolderRequired: '请选择上传目录',
  uploadSubmit: '开始上传',
  addFolder: '新建目录',
  addFolderTitle: '新建目录',
  addFolderName: '目录名称',
  addFolderNamePh: '请输入目录名称',
  addFolderParent: '上级目录',
  addFolderOk: '目录已创建',
  addFolderEmpty: '请输入目录名称',
  deleteFolder: '删除目录',
  deleteFolderConfirm: '确认删除该目录及其下素材？删除后不可恢复。',
  deleteFolderOk: '目录已删除',
  deleteFolderRoot: '根目录不可删除',
  folderOpsAdd: '添加子目录',
  folderOpsDelete: '删除',
  viewGrid: '宫格',
  viewList: '列表',
  typeAll: '全部类型',
  typeImage: '图片',
  typeVideo: '视频',
  typeAudio: '音频',
  typeDoc: '文档',
  searchPh: '搜索文件名',
  empty: '当前目录暂无素材',
  preview: '预览',
  previewTip: '打开预览',
  download: '下载',
  downloadOk: '下载任务已开始',
  batchDelete: '批量删除',
  batchDeleteConfirm: '确认删除选中的素材？删除后不可恢复。',
  deleteOk: '已删除',
  selectRequired: '请先选择素材',
  selectAllPage: '全选本页',
  cancelSelect: '取消选择',
  selectedCount: '已选',
  star: '星标',
  unstar: '取消星标',
  starOk: '已添加星标',
  unstarOk: '已取消星标',
  starOnly: '仅看星标',
  cancel: '取消',
  remove: '删除',
  colStar: '星标',
  colName: '文件名',
  colType: '类型',
  colSize: '大小',
  colOwner: '上传人',
  colUpdated: '更新时间',
  colOperations: '操作',
};

export type MediaType = 'image' | 'video' | 'audio' | 'doc';

const TYPE_LABELS: Record<MediaType, string> = {
  image: T.typeImage, video: T.typeVideo, audio: T.typeAudio, doc: T.typeDoc,
};
const TYPE_COLORS: Record<MediaType, 'blue' | 'green' | 'orange' | 'gray'> = {
  image: 'blue', video: 'green', audio: 'orange', doc: 'gray',
};
const TYPE_ICONS: Record<MediaType, string> = { image: '🖼', video: '🎬', audio: '🎵', doc: '📄' };

export interface MediaAsset {
  id: string;
  name: string;
  folder: string;
  type: MediaType;
  size: string;
  updatedAt: string;
  owner: string;
  starred: boolean;
}

/** 目录树（对齐母版 list-media.js → FOLDERS） */
export const MOCK_MEDIA_FOLDERS: TreeNode[] = [
  {
    key: 'all',
    title: T.folderAll,
    children: [
      { key: 'campaign', title: T.folderCampaign, children: [{ key: 'campaign-banner', title: T.folderBanner }, { key: 'campaign-poster', title: T.folderPoster }, { key: 'campaign-landing', title: T.folderLanding }, { key: 'campaign-popup', title: T.folderPopup }] },
      { key: 'live', title: T.folderLive, children: [{ key: 'live-cover', title: T.folderCover }, { key: 'live-replay', title: T.folderReplay }, { key: 'live-sticker', title: T.folderSticker }] },
      { key: 'product', title: T.folderProduct, children: [{ key: 'product-main', title: T.folderProductMain }, { key: 'product-detail', title: T.folderProductDetail }, { key: 'product-compare', title: T.folderProductCompare }] },
      { key: 'short-video', title: T.folderShortVideo, children: [{ key: 'video-ugc', title: T.folderVideoUgc }, { key: 'video-talk', title: T.folderVideoTalk }] },
      { key: 'audio', title: T.folderAudio, children: [{ key: 'audio-bgm', title: T.folderAudioBgm }, { key: 'audio-voice', title: T.folderAudioVoice }] },
      { key: 'brand', title: T.folderBrand, children: [{ key: 'brand-logo', title: T.folderBrandLogo }, { key: 'brand-font', title: T.folderBrandFont }] },
      { key: 'doc', title: T.folderDoc, children: [{ key: 'doc-guide', title: T.folderDocGuide }, { key: 'doc-report', title: T.folderDocReport }] },
    ],
  },
];

/** 素材种子（逐字对齐母版 ASSET_SEED 前 16 条） */
export const MOCK_MEDIA_ASSETS: MediaAsset[] = [
  { id: 'a1', name: '开学季主视觉.png', folder: 'campaign-banner', type: 'image', size: '2.4 MB', updatedAt: '2026-08-05', owner: '林芳', starred: true },
  { id: 'a2', name: '会员日横幅-A.jpg', folder: 'campaign-banner', type: 'image', size: '1.1 MB', updatedAt: '2026-08-04', owner: '孙婷', starred: false },
  { id: 'a3', name: '直播间背景-夏日.mp4', folder: 'live-cover', type: 'video', size: '86 MB', updatedAt: '2026-08-03', owner: '赵雪', starred: true },
  { id: 'a4', name: '新品讲解片段.mp4', folder: 'live-replay', type: 'video', size: '128 MB', updatedAt: '2026-08-02', owner: '陈思远', starred: false },
  { id: 'a5', name: '商品主图-运动鞋.png', folder: 'product-main', type: 'image', size: '680 KB', updatedAt: '2026-08-01', owner: '周凯', starred: false },
  { id: 'a6', name: '活动规则海报.pdf', folder: 'campaign-poster', type: 'doc', size: '3.2 MB', updatedAt: '2026-07-30', owner: '韩梅', starred: false },
  { id: 'a7', name: 'BGM-轻快节奏.mp3', folder: 'audio-bgm', type: 'audio', size: '4.8 MB', updatedAt: '2026-07-28', owner: '李晓雯', starred: true },
  { id: 'a8', name: '开场口播.wav', folder: 'audio-voice', type: 'audio', size: '12 MB', updatedAt: '2026-07-27', owner: '王立群', starred: false },
  { id: 'a9', name: '专题页头图.webp', folder: 'campaign-landing', type: 'image', size: '420 KB', updatedAt: '2026-07-26', owner: '林芳', starred: false },
  { id: 'a10', name: '达人试穿合集.mp4', folder: 'live-replay', type: 'video', size: '246 MB', updatedAt: '2026-07-25', owner: '赵雪', starred: true },
  { id: 'a11', name: '详情图-规格对比.png', folder: 'product-compare', type: 'image', size: '980 KB', updatedAt: '2026-07-24', owner: '周凯', starred: false },
  { id: 'a12', name: '种草短视频-01.mp4', folder: 'video-ugc', type: 'video', size: '64 MB', updatedAt: '2026-07-22', owner: '孙婷', starred: false },
  { id: 'a13', name: '品牌 Logo-深色.svg', folder: 'brand-logo', type: 'image', size: '48 KB', updatedAt: '2026-07-20', owner: '韩梅', starred: true },
  { id: 'a14', name: '素材使用规范.pdf', folder: 'doc-guide', type: 'doc', size: '1.6 MB', updatedAt: '2026-07-18', owner: '陈思远', starred: false },
  { id: 'a15', name: '8 月投放报告.xlsx', folder: 'doc-report', type: 'doc', size: '2.8 MB', updatedAt: '2026-07-16', owner: '李晓雯', starred: false },
  { id: 'a16', name: '弹窗素材-优惠券.png', folder: 'campaign-popup', type: 'image', size: '320 KB', updatedAt: '2026-07-15', owner: '王立群', starred: false },
];

/** 收集节点及其子节点 key */
function collect(node: TreeNode): string[] {
  const out = [node.key];
  (node.children ?? []).forEach((c) => out.push(...collect(c)));
  return out;
}

function findNode(nodes: TreeNode[], key: string): TreeNode | null {
  for (const n of nodes) {
    if (n.key === key) return n;
    const hit = n.children ? findNode(n.children, key) : null;
    if (hit) return hit;
  }
  return null;
}

/** 扁平化目录用于下拉（去掉根 all） */
function flatten(nodes: TreeNode[], depth = 0, out: Array<{ label: string; value: string }> = []) {
  nodes.forEach((n) => {
    if (n.key !== 'all') out.push({ label: `${'　'.repeat(depth)}${String(n.title)}`, value: n.key });
    if (n.children) flatten(n.children, depth + 1, out);
  });
  return out;
}

export interface PageListMediaProps {
  assets?: MediaAsset[];
  folders?: TreeNode[];
  pageSize?: number;
  /** 当前用户（上传人） */
  currentUser?: string;
  className?: string;
}

/**
 * PageListMedia 文件管理（媒体库，页面模式）
 *
 * 来源：Vibe Design Pro/admin `list-media`（Vue + Arco HTML 母版）全交互精转。
 * 覆盖：左侧**素材目录树**（全部素材 / 活动物料 / 直播素材 / 商品图 / 短视频 / 音频 / 品牌资产 / 文档资料，
 * 含添加子目录与删除目录）、工具栏（上传素材 / **宫格-列表视图切换** / 仅看星标 / 类型筛选 / 搜索文件名）、
 * 宫格视图（缩略占位 + 名称 + 星标 + 类型 + 大小）与列表视图（7 列含星标与操作）、
 * 星标切换、单条下载/删除、批量删除（全选本页 / 取消选择 / 已选计数）、上传素材弹窗、新建目录弹窗、分页 18/页。
 */
export function PageListMedia({ assets, folders, pageSize = 18, currentUser = '当前用户', className }: PageListMediaProps) {
  const [tree, setTree] = useState<TreeNode[]>(() => (folders ?? MOCK_MEDIA_FOLDERS).map((n) => ({ ...n })));
  const [list, setList] = useState<MediaAsset[]>(() => (assets ?? MOCK_MEDIA_ASSETS).map((a) => ({ ...a })));
  const [folderKey, setFolderKey] = useState('all');
  const [keyword, setKeyword] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [starOnly, setStarOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);
  const [uploadFolder, setUploadFolder] = useState('campaign-banner');
  const [uploading, setUploading] = useState(false);

  const [folderOpen, setFolderOpen] = useState(false);
  const [folderParent, setFolderParent] = useState('all');
  const [folderName, setFolderName] = useState('');
  const [folderError, setFolderError] = useState('');
  const [folderSaving, setFolderSaving] = useState(false);

  const [deleteFolderNode, setDeleteFolderNode] = useState<TreeNode | null>(null);
  const [batchOpen, setBatchOpen] = useState(false);
  const [confirmAsset, setConfirmAsset] = useState<MediaAsset | null>(null);

  const folderOptions = useMemo(() => flatten(tree), [tree]);

  const filtered = useMemo(() => {
    const node = findNode(tree, folderKey);
    const keys = folderKey === 'all' ? null : node ? collect(node) : [folderKey];
    const kw = keyword.trim().toLowerCase();
    return list.filter((a) => {
      if (keys && !keys.includes(a.folder)) return false;
      if (typeFilter && a.type !== typeFilter) return false;
      if (starOnly && !a.starred) return false;
      if (kw && !a.name.toLowerCase().includes(kw)) return false;
      return true;
    });
  }, [list, tree, folderKey, typeFilter, starOnly, keyword]);

  const total = filtered.length;
  const pageData = useMemo(() => filtered.slice((page - 1) * pageSize, page * pageSize), [filtered, page, pageSize]);
  const pageAllSelected = pageData.length > 0 && pageData.every((a) => selectedIds.includes(a.id));

  const toggleStar = (asset: MediaAsset) => {
    setList((prev) => prev.map((a) => (a.id === asset.id ? { ...a, starred: !a.starred } : a)));
    message.success(asset.starred ? T.unstarOk : T.starOk);
  };

  const removeAsset = (asset: MediaAsset) => {
    setList((prev) => prev.filter((a) => a.id !== asset.id));
    setSelectedIds((prev) => prev.filter((id) => id !== asset.id));
    setConfirmAsset(null);
    message.success(T.deleteOk);
  };

  const batchDelete = () => {
    if (!selectedIds.length) {
      message.warning(T.selectRequired);
      return;
    }
    const ids = new Set(selectedIds);
    setList((prev) => prev.filter((a) => !ids.has(a.id)));
    message.success(`${T.deleteOk}（${ids.size} 个）`);
    setSelectedIds([]);
    setBatchOpen(false);
  };

  const submitUpload = () => {
    if (!uploadFiles.length) {
      message.warning(T.uploadFileRequired);
      return;
    }
    if (!uploadFolder) {
      message.warning(T.uploadFolderRequired);
      return;
    }
    setUploading(true);
    window.setTimeout(() => {
      const now = new Date();
      const stamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      setList((prev) => [
        ...uploadFiles.map((f, i) => ({
          id: `up-${Date.now()}-${i}`,
          name: f.name,
          folder: uploadFolder,
          type: (f.name.match(/\.(mp4|mov|avi)$/i) ? 'video' : f.name.match(/\.(mp3|wav|m4a)$/i) ? 'audio' : f.name.match(/\.(pdf|docx|xlsx|pptx)$/i) ? 'doc' : 'image') as MediaType,
          size: f.size ? `${Math.max(1, Math.round(f.size / 1024))} KB` : '—',
          updatedAt: stamp,
          owner: currentUser,
          starred: false,
        })),
        ...prev,
      ]);
      setUploading(false);
      setUploadOpen(false);
      setUploadFiles([]);
      message.success(T.uploadOk);
    }, 600);
  };

  const submitFolder = () => {
    if (!folderName.trim()) {
      setFolderError(T.addFolderEmpty);
      return;
    }
    setFolderSaving(true);
    window.setTimeout(() => {
      const key = `new-${Date.now()}`;
      const newNode: TreeNode = { key, title: folderName.trim() };
      setTree((prev) =>
        prev.map(function walk(n): TreeNode {
          if (n.key === folderParent) return { ...n, children: [...(n.children ?? []), newNode] };
          return n.children ? { ...n, children: n.children.map(walk) } : n;
        }),
      );
      setFolderSaving(false);
      setFolderOpen(false);
      setFolderName('');
      setFolderError('');
      message.success(T.addFolderOk);
    }, 240);
  };

  const removeFolder = (node: TreeNode) => {
    setTree((prev) =>
      prev.map(function walk(n): TreeNode {
        if (n.children) {
          const kids = n.children.filter((c) => c.key !== node.key).map(walk);
          return { ...n, children: kids };
        }
        return n;
      }),
    );
    if (folderKey === node.key) setFolderKey('all');
    setDeleteFolderNode(null);
    message.success(T.deleteFolderOk);
  };

  const assetColumns: Column<MediaAsset>[] = [
    {
      title: T.colStar, key: 'starred', width: 70,
      render: (a) => (
        <button type="button" onClick={() => toggleStar(a)} className={a.starred ? 'text-warning' : 'text-neutral-5'}>
          {a.starred ? '★' : '☆'}
        </button>
      ),
    },
    {
      title: T.colName, key: 'name', width: 260, ellipsis: true,
      render: (a) => (
        <span className="inline-flex items-center gap-2">
          <span>{TYPE_ICONS[a.type]}</span>
          <span className="truncate">{a.name}</span>
        </span>
      ),
    },
    { title: T.colType, key: 'type', width: 90, render: (a) => <Tag color={TYPE_COLORS[a.type]}>{TYPE_LABELS[a.type]}</Tag> },
    { title: T.colSize, key: 'size', width: 100 },
    { title: T.colOwner, key: 'owner', width: 100 },
    { title: T.colUpdated, key: 'updatedAt', width: 120 },
    {
      title: T.colOperations, key: 'operations', width: 170,
      render: (a) => (
        <div className="flex items-center gap-1">
          <Button variant="text" size="sm" onClick={() => message.info(`${T.previewTip}：${a.name}`)}>{T.preview}</Button>
          <Button variant="text" size="sm" onClick={() => message.success(T.downloadOk)}>{T.download}</Button>
          <Button variant="text" size="sm" className="text-danger" onClick={() => setConfirmAsset(a)}>{T.remove}</Button>
        </div>
      ),
    },
  ];

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <MessageHost />
      <div className="flex flex-col gap-4 lg:flex-row">
        {/* 左：素材目录 */}
        <div className="w-full shrink-0 lg:w-[260px]">
          <Card bordered={false}>
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-neutral-10">{T.folderTitle}</span>
              <Button
                variant="text"
                size="sm"
                onClick={() => {
                  setFolderParent('all');
                  setFolderName('');
                  setFolderError('');
                  setFolderOpen(true);
                }}
              >
                + {T.addFolder}
              </Button>
            </div>
            <Tree data={tree} selectedKey={folderKey} onSelect={(k) => { setFolderKey(k); setPage(1); setSelectedIds([]); }} defaultExpandAll bordered />
          </Card>
        </div>

        {/* 右：工具条 + 内容 */}
        <div className="min-w-0 flex-1">
          <Card bordered={false}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <Button variant="primary" onClick={() => { setUploadFiles([]); setUploadFolder(folderOptions[0]?.value ?? 'campaign-banner'); setUploadOpen(true); }}>
                  ↑ {T.upload}
                </Button>
                <div className="flex items-center rounded-md border border-neutral-3 p-0.5">
                  {([['grid', T.viewGrid], ['list', T.viewList]] as const).map(([mode, label]) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setViewMode(mode)}
                      className={cn(
                        'rounded px-3 py-1 text-sm transition-colors',
                        viewMode === mode ? 'bg-primary text-white' : 'text-neutral-8 hover:text-primary',
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button variant={starOnly ? 'outline' : 'secondary'} onClick={() => setStarOnly((v) => !v)}>
                  {starOnly ? '★' : '☆'} {T.starOnly}
                </Button>
                <div className="w-[130px]">
                  <Select
                    options={[
                      { label: T.typeAll, value: '' },
                      { label: T.typeImage, value: 'image' },
                      { label: T.typeVideo, value: 'video' },
                      { label: T.typeAudio, value: 'audio' },
                      { label: T.typeDoc, value: 'doc' },
                    ]}
                    value={typeFilter}
                    onChange={(v) => { setTypeFilter(String(v ?? '')); setPage(1); }}
                  />
                </div>
                <div className="w-[220px]">
                  <Input allowClear placeholder={T.searchPh} value={keyword} onChange={(e) => { setKeyword(e.target.value); setPage(1); }} />
                </div>
              </div>
            </div>

            {/* 内容区 */}
            <div className="mt-4">
              {!filtered.length ? (
                <div className="py-16 text-center text-sm text-neutral-6">{T.empty}</div>
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                  {pageData.map((a) => (
                    <div
                      key={a.id}
                      className={cn(
                        'group relative rounded-lg border bg-white p-2 transition-all hover:border-primary hover:shadow',
                        selectedIds.includes(a.id) ? 'border-primary ring-1 ring-primary' : 'border-neutral-3',
                      )}
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedIds((prev) => (prev.includes(a.id) ? prev.filter((x) => x !== a.id) : [...prev, a.id]))}
                        className="absolute left-2 top-2 z-10 hidden h-5 w-5 items-center justify-center rounded border border-neutral-4 bg-white text-xs group-hover:flex"
                        style={{ display: selectedIds.includes(a.id) ? 'flex' : undefined }}
                      >
                        {selectedIds.includes(a.id) ? '✓' : ''}
                      </button>
                      <button type="button" onClick={() => toggleStar(a)} className="absolute right-2 top-2 z-10 text-sm">
                        <span className={a.starred ? 'text-warning' : 'text-neutral-4'}>{a.starred ? '★' : '☆'}</span>
                      </button>
                      <div className="flex h-[92px] items-center justify-center rounded bg-neutral-1 text-3xl">
                        {TYPE_ICONS[a.type]}
                      </div>
                      <div className="mt-2 truncate text-sm text-neutral-10" title={a.name}>{a.name}</div>
                      <div className="mt-1 flex items-center justify-between text-xs text-neutral-6">
                        <Tag color={TYPE_COLORS[a.type]}>{TYPE_LABELS[a.type]}</Tag>
                        <span>{a.size}</span>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs text-neutral-6">{a.owner}</span>
                        <span className="flex items-center gap-1">
                          <Button variant="text" size="sm" onClick={() => message.info(`${T.previewTip}：${a.name}`)}>{T.preview}</Button>
                          <Button variant="text" size="sm" className="text-danger" onClick={() => setConfirmAsset(a)}>{T.remove}</Button>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <DataTable columns={assetColumns} data={pageData} rowKey="id" plain />
              )}
            </div>

            {/* 底部 */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-3 pt-4">
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setSelectedIds(pageAllSelected ? [] : Array.from(new Set([...selectedIds, ...pageData.map((a) => a.id)])))}
                >
                  {pageAllSelected ? T.cancelSelect : T.selectAllPage}
                </Button>
                <Button variant="outline" disabled={!selectedIds.length} onClick={() => setBatchOpen(true)}>{T.batchDelete}</Button>
                {selectedIds.length > 0 && (
                  <span className="text-sm text-neutral-6">{T.selectedCount} {selectedIds.length} 个</span>
                )}
              </div>
              <Pagination current={page} pageSize={pageSize} total={total} showTotal onChange={(p) => setPage(p)} />
            </div>
          </Card>
        </div>
      </div>

      {/* 上传素材 */}
      <Modal
        open={uploadOpen} width={560} title={T.uploadTitle} onClose={() => setUploadOpen(false)}
        footer={<div className="flex justify-end gap-2"><Button variant="outline" onClick={() => setUploadOpen(false)}>{T.cancel}</Button>
          <Button variant="primary" loading={uploading} onClick={submitUpload}>{T.uploadSubmit}</Button></div>}
      >
        <div className="flex flex-col gap-4">
          <p className="text-sm text-neutral-6">{T.uploadTip}</p>
          <Upload mode="drag" multiple maxCount={10} files={uploadFiles} buttonText={T.uploadDrag} hint={T.uploadDragHint} onChange={setUploadFiles} />
          <FormField label={T.uploadFolder} required>
            <Select options={folderOptions} value={uploadFolder} placeholder={T.uploadFolderPh} onChange={(v) => setUploadFolder(String(v))} />
          </FormField>
        </div>
      </Modal>

      {/* 新建目录 */}
      <Modal
        open={folderOpen} width={420} title={T.addFolderTitle} onClose={() => setFolderOpen(false)}
        footer={<div className="flex justify-end gap-2"><Button variant="outline" onClick={() => setFolderOpen(false)}>{T.cancel}</Button>
          <Button variant="primary" loading={folderSaving} onClick={submitFolder}>{T.addFolder}</Button></div>}
      >
        <div className="flex flex-col gap-4">
          <FormField label={T.addFolderParent}><Select options={[{ label: T.folderAll, value: 'all' }, ...folderOptions]} value={folderParent} onChange={(v) => setFolderParent(String(v))} /></FormField>
          <FormField label={T.addFolderName} required error={folderError || undefined}>
            <Input allowClear placeholder={T.addFolderNamePh} value={folderName} error={Boolean(folderError)} onChange={(e) => { setFolderName(e.target.value); setFolderError(''); }} />
          </FormField>
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-neutral-6">{T.folderOpsDelete}：</span>
            {folderOptions.slice(0, 4).map((f) => (
              <button key={f.value} type="button" className="text-xs text-danger hover:underline" onClick={() => setDeleteFolderNode(findNode(tree, f.value))}>
                {f.label.trim()} ✕
              </button>
            ))}
          </div>
        </div>
      </Modal>

      <ConfirmModal
        open={Boolean(deleteFolderNode)} title={T.deleteFolder} content={T.deleteFolderConfirm}
        okText={T.remove} cancelText={T.cancel} danger
        onClose={() => setDeleteFolderNode(null)}
        onOk={() => deleteFolderNode && removeFolder(deleteFolderNode)}
      />
      <ConfirmModal
        open={Boolean(confirmAsset)} title={T.remove} content={T.batchDeleteConfirm}
        okText={T.remove} cancelText={T.cancel} danger
        onClose={() => setConfirmAsset(null)}
        onOk={() => confirmAsset && removeAsset(confirmAsset)}
      />
      <ConfirmModal
        open={batchOpen} title={T.batchDelete} content={T.batchDeleteConfirm}
        okText={T.remove} cancelText={T.cancel} danger
        onClose={() => setBatchOpen(false)} onOk={batchDelete}
      />
    </div>
  );
}

export default PageListMedia;
