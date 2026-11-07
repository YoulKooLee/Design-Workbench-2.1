<template>
  <div ref="pageRootRef" class="message-list-page list-search-table-page">
    <a-card class="general-card pro-page-card">
      <a-row class="pro-search-panel">
        <a-col :flex="isMobile ? '100%' : 1">
          <a-form
            class="pro-search-form"
            :model="form"
            :layout="isMobile ? 'vertical' : 'horizontal'"
            :label-col-props="isMobile ? undefined : { flex: '6em' }"
            :wrapper-col-props="isMobile ? undefined : { flex: 1 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <a-col :xs="24" :sm="isMobile ? 24 : 12" :md="8">
                <a-form-item field="title" :label="t.colTitle">
                  <a-input
                    v-model="form.title"
                    :placeholder="t.phTitle"
                    allow-clear
                    @press-enter="onSearch"
                  />
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="isMobile ? 24 : 12" :md="8">
                <a-form-item field="msgType" :label="t.colMsgType">
                  <a-select
                    v-model="form.msgType"
                    :options="msgTypeOptions"
                    :placeholder="t.selectDefault"
                    allow-clear
                  />
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="isMobile ? 24 : 12" :md="8">
                <a-form-item field="readStatus" :label="t.colReadStatus">
                  <a-select
                    v-model="form.readStatus"
                    :options="readStatusOptions"
                    :placeholder="t.selectDefault"
                    allow-clear
                  />
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="isMobile ? 24 : 12" :md="8">
                <a-form-item field="sender" :label="t.colSender">
                  <a-select
                    v-model="form.sender"
                    :options="senderOptions"
                    :placeholder="t.selectDefault"
                    allow-clear
                    allow-search
                  />
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="isMobile ? 24 : 12" :md="8">
                <a-form-item field="createdTime" :label="t.colCreatedTime">
                  <a-range-picker
                    v-model="form.createdTime"
                    class="pro-field-block"
                  />
                </a-form-item>
              </a-col>
              <a-col :xs="24" :sm="isMobile ? 24 : 12" :md="8">
                <a-form-item field="keyword" :label="t.colKeyword">
                  <a-input
                    v-model="form.keyword"
                    :placeholder="t.phKeyword"
                    allow-clear
                    @press-enter="onSearch"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider
          v-if="!isMobile"
          class="pro-search-divider"
          direction="vertical"
        />
        <a-col
          :flex="isMobile ? '100%' : '86px'"
          class="pro-search-actions"
          :class="{ 'is-mobile': isMobile }"
        >
          <a-button type="primary" @click="onSearch">
            <template #icon><icon-search /></template>{{ t.search }}
          </a-button>
          <a-button @click="onReset">
            <template #icon><icon-refresh /></template>{{ t.reset }}
          </a-button>
        </a-col>
      </a-row>
    </a-card>

    <a-card class="general-card">
      <div class="pro-toolbar">
        <a-space>
          <a-button
            type="primary"
            :disabled="!selectedKeys.length"
            @click="onBatchMarkRead"
            >{{ t.batchMarkRead }}</a-button
          >
        </a-space>
        <div class="pro-toolbar-right">
          <div class="pro-toolbar-icons">
            <a-tooltip :content="t.refresh">
              <a-button class="pro-toolbar-icon-btn" @click="onRefreshTable">
                <template #icon><icon-refresh /></template>
              </a-button>
            </a-tooltip>
            <a-dropdown trigger="click" @select="onDensityChange">
              <a-tooltip :content="t.density">
                <a-button class="pro-toolbar-icon-btn">
                  <template #icon><icon-line-height /></template>
                </a-button>
              </a-tooltip>
              <template #content>
                <a-doption
                  v-for="opt in localDensityOptions"
                  :key="opt.value"
                  :value="opt.value"
                  :class="{
                    'arco-dropdown-option-active': density === opt.value,
                  }"
                  >{{ opt.label }}</a-doption
                >
              </template>
            </a-dropdown>
            <a-popover
              trigger="click"
              position="br"
              content-class="pro-column-popover"
            >
              <a-tooltip :content="t.columnSetting">
                <a-button class="pro-toolbar-icon-btn">
                  <template #icon><icon-settings /></template>
                </a-button>
              </a-tooltip>
              <template #content>
                <div class="pro-column-setting">
                  <div class="pro-column-setting-list">
                    <div
                      v-for="(opt, index) in columnSettingOptions"
                      :key="opt.value"
                      class="pro-column-setting-item"
                      :class="{
                        'is-dragging': dragColIndex === index,
                        'is-drag-over':
                          dragOverColIndex === index && dragColIndex !== index,
                      }"
                      @dragover="onColDragOver(index, $event)"
                      @dragleave="onColDragLeave(index)"
                      @drop.prevent="onColDrop(index)"
                    >
                      <span
                        class="pro-column-drag"
                        draggable="true"
                        @dragstart="onColDragStart(index, $event)"
                        @dragend="onColDragEnd"
                      >
                        <icon-drag-dot-vertical />
                      </span>
                      <a-checkbox
                        :model-value="showColumnKeys.includes(opt.value)"
                        :disabled="opt.disabled"
                        @change="
                          (checked) => onColumnCheckChange(opt.value, checked)
                        "
                        >{{ opt.label }}</a-checkbox
                      >
                    </div>
                  </div>
                  <div class="pro-column-setting-footer">
                    <a-button
                      type="text"
                      size="small"
                      @click="resetColumnSetting"
                      >{{ t.columnReset }}</a-button
                    >
                  </div>
                </div>
              </template>
            </a-popover>
          </div>
        </div>
      </div>
      <a-table
        :columns="columns"
        :data="data"
        :loading="loading"
        :size="density"
        row-key="id"
        :pagination="false"
        :bordered="false"
        :scroll="tableScroll"
        :row-selection="{ type: 'checkbox', showCheckedAll: true, width: 48 }"
        :selected-keys="selectedKeys"
        @selection-change="onSelectionChange"
      >
        <template #msgType="{ record }">
          <a-tag :color="msgTypeColor(record.msgType)" size="small">
            {{ msgTypeLabel(record.msgType) }}
          </a-tag>
        </template>
        <template #readStatus="{ record }">
          <a-badge
            :status="record.readStatus === 'unread' ? undefined : 'success'"
            :color="record.readStatus === 'unread' ? 'red' : undefined"
            :text="readStatusLabel(record.readStatus)"
          />
        </template>
        <template #createdAt="{ record }">{{
          formatTime(record.createdAt)
        }}</template>
        <template #operations="{ record }">
          <a-space class="pro-table-ops" :size="4">
            <a-button type="text" :size="opsBtnSize" @click="openDetail(record)">{{
              t.view
            }}</a-button>
            <a-button
              type="text"
              :size="opsBtnSize"
              :disabled="record.readStatus === 'read'"
              @click="onMarkRead(record)"
              >{{ t.markRead }}</a-button
            >
            <a-button
              type="text"
              status="danger"
              :size="opsBtnSize"
              @click="onDelete(record)"
              >{{ t.remove }}</a-button
            >
          </a-space>
        </template>
      </a-table>
      <div class="pro-table-footer">
        <a-space>
          <a-button :disabled="!selectedKeys.length" @click="onBatchDelete">{{
            t.batchDelete
          }}</a-button>
        </a-space>
        <a-pagination
          v-model:current="pagination.current"
          :total="pagination.total"
          :page-size="pagination.pageSize"
          show-total
          show-page-size
          @change="onPageChange"
          @page-size-change="onPageSizeChange"
        />
      </div>
    </a-card>

    <a-drawer
      v-if="drawerVisible"
      :visible="true"
      :title="detailDrawerTitle"
      :width="drawerWidth"
      unmount-on-close
      @cancel="closeDrawer"
    >
      <div v-if="detail" class="pro-detail">
        <section class="pro-detail-section">
          <h3 class="pro-detail-section-title">{{ t.detailOverview }}</h3>
          <div class="pro-detail-grid">
            <div class="pro-detail-field pro-detail-field--full">
              <div class="pro-detail-label">{{ t.colTitle }}</div>
              <div class="pro-detail-value">{{ detail.title }}</div>
            </div>
            <div class="pro-detail-field">
              <div class="pro-detail-label">{{ t.colMsgType }}</div>
              <div class="pro-detail-value">
                <a-tag :color="msgTypeColor(detail.msgType)" size="small">
                  {{ msgTypeLabel(detail.msgType) }}
                </a-tag>
              </div>
            </div>
            <div class="pro-detail-field">
              <div class="pro-detail-label">{{ t.colSender }}</div>
              <div class="pro-detail-value">{{ detail.sender }}</div>
            </div>
            <div class="pro-detail-field">
              <div class="pro-detail-label">{{ t.colReadStatus }}</div>
              <div class="pro-detail-value">
                <a-badge
                  :status="detail.readStatus === 'unread' ? undefined : 'success'"
                  :color="detail.readStatus === 'unread' ? 'red' : undefined"
                  :text="readStatusLabel(detail.readStatus)"
                />
              </div>
            </div>
            <div class="pro-detail-field">
              <div class="pro-detail-label">{{ t.colCreatedTime }}</div>
              <div class="pro-detail-value">{{
                formatTime(detail.createdAt)
              }}</div>
            </div>
          </div>
        </section>

        <section class="pro-detail-section">
          <h3 class="pro-detail-section-title">{{ t.detailContent }}</h3>
          <div class="pro-detail-grid">
            <div class="pro-detail-field pro-detail-field--full">
              <div class="pro-detail-label">{{ t.colContent }}</div>
              <div class="pro-detail-value pro-detail-value--multiline">{{
                detail.content || '—'
              }}</div>
            </div>
          </div>
        </section>
      </div>
      <template #footer>
        <a-button type="primary" @click="closeDrawer">{{ t.cancel }}</a-button>
      </template>
    </a-drawer>
  </div>
</template>

<script lang="ts" setup>
  import '@/styles/pages/message-list.css';
  import {
    computed,
    nextTick,
    onBeforeUnmount,
    onMounted,
    reactive,
    ref,
  } from 'vue';
  import { Message, Modal } from '@arco-design/web-vue';
  import type { TableColumnData } from '@arco-design/web-vue';
  import useTableDensity, {
    type TableDensity,
  } from '@/hooks/use-table-density';

  defineOptions({ name: 'UserMessageListPage' });

  const t = {
    title: '消息管理',
    add: '新建消息',
    download: '导出',
    search: '查询',
    reset: '重置',
    expand: '展开',
    collapse: '收起',
    selectDefault: '全部',
    phId: '请输入消息编号',
    phTitle: '请输入消息标题',
    phKeyword: '请输入正文关键词',
    phContent: '请输入消息正文',
    colId: '消息编号',
    colTitle: '消息标题',
    colMsgType: '消息类型',
    colSender: '发送方',
    colReadStatus: '阅读状态',
    colKeyword: '关键词',
    colCreatedTime: '接收时间',
    colOperations: '操作',
    colContent: '消息正文',
    typeMessage: '消息',
    typeNotice: '通知',
    typeTodo: '待办',
    statusUnread: '未读',
    statusRead: '已读',
    view: '查看',
    edit: '编辑',
    remove: '删除',
    markRead: '标为已读',
    batchDelete: '批量删除',
    batchMarkRead: '标为已读',
    save: '保存',
    cancel: '取消',
    createTitle: '新建消息',
    editTitle: '编辑消息',
    detailTitle: '消息详情',
    detailOverview: '消息概览',
    detailContent: '消息内容',
    deleteConfirm: '确认删除该消息？删除后不可恢复。',
    batchDeleteConfirm: '确认删除选中的消息？删除后不可恢复。',
    selectRequired: '请先勾选消息',
    deleteOk: '删除成功',
    markReadOk: '已标为已读',
    batchMarkReadOk: '已标为已读',
    alreadyRead: '该消息已是已读状态',
    createOk: '创建成功',
    updateOk: '保存成功',
    exportOk: '导出任务已开始',
    exportTitle: '导出消息',
    exportScope: '导出范围',
    exportScopeSelected: '仅勾选数据',
    exportScopePage: '当前页',
    exportScopeAll: '全部筛选结果',
    exportFormat: '导出格式',
    exportFormatXlsx: 'Excel（.xlsx）',
    exportFormatCsv: 'CSV（.csv）',
    exportSubmit: '开始导出',
    exportCountHint: '预计导出',
    emptyTitle: '请输入消息标题',
    emptyMsgType: '请选择消息类型',
    emptySender: '请输入发送方',
    emptyReadStatus: '请选择阅读状态',
    emptyContent: '请输入消息正文',
    validateFail: '请完善必填项后再提交',
    refresh: '刷新',
    density: '密度',
    densityDefault: '默认',
    densityMedium: '紧凑',
    densitySmall: '迷你',
    columnSetting: '列设置',
    columnReset: '恢复默认',
    refreshOk: '已刷新',
    keepOneColumn: '至少保留一列',
  };

  type MsgType = 'message' | 'notice' | 'todo';
  type ReadStatus = 'unread' | 'read';

  type MessageRecord = {
    id: string;
    title: string;
    content: string;
    msgType: MsgType;
    sender: string;
    readStatus: ReadStatus;
    createdAt: number;
  };

  type SearchForm = {
    title: string;
    msgType: MsgType | '';
    readStatus: ReadStatus | '';
    sender: string;
    createdTime: (string | Date | number)[];
    keyword: string;
  };

  const typeLabels: Record<MsgType, string> = {
    message: t.typeMessage,
    notice: t.typeNotice,
    todo: t.typeTodo,
  };
  const typeColors: Record<MsgType, string> = {
    message: 'arcoblue',
    notice: 'green',
    todo: 'orangered',
  };
  const readLabels: Record<ReadStatus, string> = {
    unread: t.statusUnread,
    read: t.statusRead,
  };

  /** Fixed seed epoch for deterministic relative timestamps (no Date.now / Math.random). */
  const SEED_NOW = Date.UTC(2026, 7, 17, 6, 0, 0);

  function emptyForm(): SearchForm {
    return {
      title: '',
      msgType: '',
      readStatus: '',
      sender: '',
      createdTime: [],
      keyword: '',
    };
  }

  function pad(n: number) {
    return String(n).padStart(2, '0');
  }

  function formatDateTime(d: Date | number | string) {
    const date = d instanceof Date ? d : new Date(d);
    return (
      date.getFullYear() +
      '-' +
      pad(date.getMonth() + 1) +
      '-' +
      pad(date.getDate()) +
      ' ' +
      pad(date.getHours()) +
      ':' +
      pad(date.getMinutes()) +
      ':' +
      pad(date.getSeconds())
    );
  }

  function createSeedMessages(): MessageRecord[] {
    const day = 24 * 60 * 60 * 1000;
    const seeds: Omit<MessageRecord, 'id'>[] = [
      {
        title: '协作评论回复提醒',
        content: '关于本周内容排期的回复已更新，请尽快确认。',
        msgType: 'message',
        sender: '协作中心',
        readStatus: 'unread',
        createdAt: SEED_NOW - 2 * 60 * 60 * 1000,
      },
      {
        title: '内容动态订阅提醒',
        content: '有新的内容动态订阅已生效，可在消息中心查看。',
        msgType: 'message',
        sender: '消息中心',
        readStatus: 'unread',
        createdAt: SEED_NOW - 5 * 60 * 60 * 1000,
      },
      {
        title: '内容中心催更提醒',
        content: '你的内容还未更新，请及时更新。',
        msgType: 'message',
        sender: '内容中心',
        readStatus: 'unread',
        createdAt: SEED_NOW - day,
      },
      {
        title: '内容发布审核通过',
        content: '你提交的《每日推荐视频集》已通过审核。',
        msgType: 'notice',
        sender: '审核中心',
        readStatus: 'unread',
        createdAt: SEED_NOW - 3 * 60 * 60 * 1000,
      },
      {
        title: '系统维护通知',
        content: '本周六 02:00–04:00 将进行系统维护，期间部分功能不可用。',
        msgType: 'notice',
        sender: '系统通知',
        readStatus: 'read',
        createdAt: SEED_NOW - 2 * day,
      },
      {
        title: '版本更新说明',
        content: 'Vibe Design Pro 原型库已更新至 1.1.0，请查阅发版说明。',
        msgType: 'notice',
        sender: '产品团队',
        readStatus: 'read',
        createdAt: SEED_NOW - 3 * day,
      },
      {
        title: '完成「用户反馈」工单跟进',
        content: '请在今日 18:00 前完成用户反馈工单的跟进回复。',
        msgType: 'todo',
        sender: '项目管理',
        readStatus: 'unread',
        createdAt: SEED_NOW - 4 * 60 * 60 * 1000,
      },
      {
        title: '确认本周投放计划',
        content: '请确认本周内容投放计划并提交审核。',
        msgType: 'todo',
        sender: '运营中心',
        readStatus: 'unread',
        createdAt: SEED_NOW - day - 2 * 60 * 60 * 1000,
      },
      {
        title: '填写季度复盘报告',
        content: '季度复盘报告模板已下发，请于周五前提交。',
        msgType: 'todo',
        sender: '人力行政',
        readStatus: 'read',
        createdAt: SEED_NOW - 4 * day,
      },
      {
        title: '会议纪要提及提醒',
        content: '在《内容运营周会》纪要中提到了你，请查看。',
        msgType: 'message',
        sender: '会议助手',
        readStatus: 'read',
        createdAt: SEED_NOW - 5 * day,
      },
      {
        title: '权限变更通知',
        content: '你已被授予「内容审核」角色，相关菜单已开放。',
        msgType: 'notice',
        sender: '权限中心',
        readStatus: 'unread',
        createdAt: SEED_NOW - 6 * 60 * 60 * 1000,
      },
      {
        title: '完善个人资料',
        content: '请补充手机号与所属部门，以便接收重要通知。',
        msgType: 'todo',
        sender: '账号安全',
        readStatus: 'read',
        createdAt: SEED_NOW - 6 * day,
      },
    ];
    return seeds.map((item, i) => ({
      id: 'MSG' + String(2026080001 + i),
      ...item,
    }));
  }

  const messageStore = {
    list: createSeedMessages() as MessageRecord[],
    filter(params?: Partial<SearchForm> | null) {
      const p = params || {};
      return this.list.filter((row) => {
        if (p.title && !String(row.title).includes(String(p.title).trim())) {
          return false;
        }
        if (p.msgType && row.msgType !== p.msgType) return false;
        if (p.readStatus && row.readStatus !== p.readStatus) return false;
        if (p.sender && row.sender !== p.sender) return false;
        if (p.keyword) {
          const kw = String(p.keyword).trim();
          if (!row.content.includes(kw) && !row.title.includes(kw)) return false;
        }
        if (p.createdTime && p.createdTime.length === 2) {
          const start = new Date(p.createdTime[0]).getTime();
          const end =
            new Date(p.createdTime[1]).getTime() + 24 * 60 * 60 * 1000 - 1;
          if (row.createdAt < start || row.createdAt > end) return false;
        }
        return true;
      });
    },
    paginate(rows: MessageRecord[], page: number, pageSize: number) {
      const total = rows.length;
      const start = (page - 1) * pageSize;
      return { list: rows.slice(start, start + pageSize), total };
    },
    getById(id: string) {
      return this.list.find((r) => r.id === id) || null;
    },
    remove(id: string) {
      const i = this.list.findIndex((r) => r.id === id);
      if (i < 0) return false;
      this.list.splice(i, 1);
      return true;
    },
    removeMany(ids: string[]) {
      const set = new Set(ids);
      const before = this.list.length;
      this.list = this.list.filter((r) => !set.has(r.id));
      return before - this.list.length;
    },
    markRead(ids: string[]) {
      const set = new Set(ids);
      let n = 0;
      this.list.forEach((r) => {
        if (set.has(r.id) && r.readStatus === 'unread') {
          r.readStatus = 'read';
          n += 1;
        }
      });
      return n;
    },
  };

  function createDefaultColumns(): TableColumnData[] {
    return [
      {
        title: t.colTitle,
        dataIndex: 'title',
        minWidth: 200,
        ellipsis: true,
        tooltip: true,
      },
      {
        title: t.colMsgType,
        dataIndex: 'msgType',
        width: 100,
        slotName: 'msgType',
      },
      { title: t.colSender, dataIndex: 'sender', width: 110 },
      {
        title: t.colReadStatus,
        dataIndex: 'readStatus',
        width: 100,
        slotName: 'readStatus',
      },
      {
        title: t.colCreatedTime,
        dataIndex: 'createdAt',
        width: 180,
        slotName: 'createdAt',
      },
      {
        title: t.colOperations,
        dataIndex: 'operations',
        width: 200,
        fixed: 'right',
        slotName: 'operations',
      },
    ];
  }

  function layoutTableColumns(
    visibleColumns: TableColumnData[],
    options?: {
      selectionWidth?: number;
      containerWidth?: number;
      preferredWidths?: Record<string, number>;
      operationsKey?: string;
    }
  ) {
    const opsKey = options?.operationsKey || 'operations';
    const selectionWidth = options?.selectionWidth ?? 48;
    const containerWidth = options?.containerWidth ?? 0;
    const preferredWidths = options?.preferredWidths || {};
    const sel =
      Number.isFinite(selectionWidth) && selectionWidth > 0
        ? selectionWidth
        : 48;

    const list = (visibleColumns || [])
      .map((col) => (col ? { ...col } : col))
      .filter(Boolean) as TableColumnData[];

    let opsWidth = 0;
    const opsIdx = list.findIndex((col) => col.dataIndex === opsKey);
    if (opsIdx >= 0) {
      const raw = preferredWidths[opsKey];
      const fromCol =
        list[opsIdx].width != null ? list[opsIdx].width : list[opsIdx].minWidth;
      opsWidth = Number(raw != null ? raw : fromCol);
      if (!Number.isFinite(opsWidth) || opsWidth <= 0) opsWidth = 160;
      const ops = { ...list[opsIdx] } as TableColumnData & {
        className?: string;
      };
      delete ops.minWidth;
      ops.width = opsWidth;
      if (!ops.fixed) ops.fixed = 'right';
      ops.className = [ops.className, 'pro-table-ops-col']
        .filter(Boolean)
        .join(' ');
      list[opsIdx] = ops;
    }

    const dataCols = list.filter((col) => col.dataIndex !== opsKey);
    if (!dataCols.length) {
      return { columns: list, scroll: { x: sel + opsWidth } };
    }

    const weights = dataCols.map((col) => {
      const pref = Number(preferredWidths[col.dataIndex as string]);
      if (Number.isFinite(pref) && pref > 0) return pref;
      const fallback = Number(col.width != null ? col.width : col.minWidth);
      return Number.isFinite(fallback) && fallback > 0 ? fallback : 120;
    });
    const weightSum = weights.reduce((a, b) => a + b, 0) || 1;
    const preferredTotal = sel + weightSum + opsWidth;
    const fill =
      Number.isFinite(containerWidth) && containerWidth > preferredTotal;
    const targetDataWidth = fill ? containerWidth - sel - opsWidth : weightSum;

    let used = 0;
    dataCols.forEach((col, i) => {
      const idx = list.findIndex((c) => c.dataIndex === col.dataIndex);
      if (idx < 0) return;
      const isLast = i === dataCols.length - 1;
      const w = isLast
        ? Math.max(40, Math.round(targetDataWidth - used))
        : Math.max(40, Math.floor((targetDataWidth * weights[i]) / weightSum));
      if (!isLast) used += w;
      const next = { ...list[idx] };
      delete next.minWidth;
      next.width = w;
      list[idx] = next;
    });

    const dataWidth = list
      .filter((col) => col.dataIndex !== opsKey)
      .reduce((sum, col) => sum + (Number(col.width) || 0), 0);
    return {
      columns: list,
      scroll: { x: Math.max(sel + dataWidth + opsWidth, 1) },
    };
  }

  function openConfirm(
    options: Parameters<typeof Modal.confirm>[0] & Record<string, unknown>
  ) {
    return Modal.confirm({
      simple: true,
      titleAlign: 'start',
      modalClass: 'pro-confirm-modal',
      width: 360,
      ...options,
    } as Parameters<typeof Modal.confirm>[0]);
  }

  const { density, setDensity } = useTableDensity();

  const pageRootRef = ref<HTMLElement | null>(null);
  const form = reactive(emptyForm());
  const isMobile = ref(
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );
  const data = ref<MessageRecord[]>([]);
  const loading = ref(false);
  const selectedKeys = ref<string[]>([]);
  const pagination = reactive({
    current: 1,
    pageSize: 20,
    total: 0,
  });
  const defaultColumns = createDefaultColumns();
  const allColumns = ref<TableColumnData[]>(
    defaultColumns.map((col) => ({ ...col }))
  );
  const showColumnKeys = ref(
    defaultColumns.map((col) => col.dataIndex as string)
  );
  const dragColIndex = ref(-1);
  const dragOverColIndex = ref(-1);
  const tableHostWidth = ref(0);
  const drawerVisible = ref(false);
  const detail = ref<MessageRecord | null>(null);

  let tableHostRO: ResizeObserver | null = null;
  let measureRetryTimer: ReturnType<typeof setTimeout> | null = null;

  const msgTypeOptions = (Object.keys(typeLabels) as MsgType[]).map(
    (value) => ({
      label: typeLabels[value],
      value,
    })
  );
  const readStatusOptions = (Object.keys(readLabels) as ReadStatus[]).map(
    (value) => ({
      label: readLabels[value],
      value,
    })
  );
  const senderOptions = computed(() => {
    const set = new Set(messageStore.list.map((r) => r.sender));
    return Array.from(set).map((label) => ({ label, value: label }));
  });

  const localDensityOptions = [
    { label: t.densityDefault, value: 'medium' as TableDensity },
    { label: t.densityMedium, value: 'small' as TableDensity },
    { label: t.densitySmall, value: 'mini' as TableDensity },
  ];

  const drawerWidth = computed(() => (isMobile.value ? '100%' : 560));
  const detailDrawerTitle = computed(() => {
    if (!detail.value) return t.detailTitle;
    return `${t.detailTitle}（${detail.value.id}）`;
  });
  const opsBtnSize = computed(() =>
    density.value === 'mini' ? 'mini' : 'small'
  );

  const preferredWidths = (() => {
    const map: Record<string, number> = {};
    createDefaultColumns().forEach((col) => {
      const key = col.dataIndex as string;
      const w = Number(col.width != null ? col.width : col.minWidth);
      map[key] = Number.isFinite(w) && w > 0 ? w : 120;
    });
    return map;
  })();

  const tableLayout = computed(() => {
    const visible = allColumns.value.filter((col) =>
      showColumnKeys.value.includes(col.dataIndex as string)
    );
    return layoutTableColumns(visible, {
      selectionWidth: 48,
      containerWidth: tableHostWidth.value,
      preferredWidths,
    });
  });
  const columns = computed(() => tableLayout.value.columns);
  const tableScroll = computed(() => tableLayout.value.scroll);

  const columnSettingOptions = computed(() => {
    const dataKeys = showColumnKeys.value.filter((k) => k !== 'operations');
    const onlyOne = dataKeys.length <= 1;
    return allColumns.value.map((col) => ({
      label: col.title as string,
      value: col.dataIndex as string,
      disabled:
        col.dataIndex === 'operations' ||
        (onlyOne && dataKeys.includes(col.dataIndex as string)),
    }));
  });

  function measureTableHost() {
    try {
      const root = pageRootRef.value;
      if (!root) return;
      const el = root.querySelector(
        '.arco-table-container'
      ) as HTMLElement | null;
      if (!el) {
        if (measureRetryTimer) clearTimeout(measureRetryTimer);
        measureRetryTimer = setTimeout(measureTableHost, 80);
        return;
      }
      const w = Math.floor(el.clientWidth);
      const prev = tableHostWidth.value || 0;
      if (w > 0 && Math.abs(prev - w) >= 2) tableHostWidth.value = w;
      if (typeof ResizeObserver !== 'undefined' && !tableHostRO) {
        tableHostRO = new ResizeObserver(() => measureTableHost());
        tableHostRO.observe(el);
      }
    } catch {
      /* ignore */
    }
  }

  function onResize() {
    isMobile.value = window.innerWidth <= 768;
    measureTableHost();
  }

  function fetchData(
    page: number,
    pageSize: number,
    params?: SearchForm | Record<string, never>
  ) {
    loading.value = true;
    setTimeout(() => {
      const filtered = messageStore.filter(params || form);
      const res = messageStore.paginate(filtered, page, pageSize);
      data.value = res.list;
      pagination.current = page;
      pagination.pageSize = pageSize;
      pagination.total = res.total;
      selectedKeys.value = [];
      loading.value = false;
      nextTick(() => measureTableHost());
    }, 280);
  }

  function onSearch() {
    fetchData(1, pagination.pageSize, form);
  }

  function onReset() {
    Object.assign(form, emptyForm());
    fetchData(1, pagination.pageSize, {});
  }

  function onPageChange(page: number) {
    fetchData(page, pagination.pageSize, form);
  }

  function onPageSizeChange(pageSize: number) {
    fetchData(1, pageSize, form);
  }

  function onSelectionChange(keys: (string | number)[]) {
    selectedKeys.value = keys.map(String);
  }

  function formatTime(v: number) {
    return formatDateTime(v);
  }

  function msgTypeLabel(type: MsgType | string) {
    return typeLabels[type as MsgType] || String(type);
  }

  function msgTypeColor(type: MsgType | string) {
    return typeColors[type as MsgType] || 'gray';
  }

  function readStatusLabel(status: ReadStatus | string) {
    return readLabels[status as ReadStatus] || String(status);
  }

  function openDetail(record: MessageRecord) {
    if (record.readStatus === 'unread') {
      messageStore.markRead([record.id]);
      record.readStatus = 'read';
    }
    const found = messageStore.getById(record.id);
    detail.value = found ? { ...found } : null;
    drawerVisible.value = true;
    fetchData(pagination.current, pagination.pageSize, form);
  }

  function closeDrawer() {
    drawerVisible.value = false;
  }

  function onDelete(record: MessageRecord) {
    openConfirm({
      title: t.remove,
      content: t.deleteConfirm,
      okText: t.remove,
      cancelText: t.cancel,
      okButtonProps: { status: 'danger' },
      onOk: () => {
        messageStore.remove(record.id);
        Message.success(t.deleteOk);
        if (detail.value && detail.value.id === record.id) {
          drawerVisible.value = false;
        }
        const page =
          data.value.length <= 1 && pagination.current > 1
            ? pagination.current - 1
            : pagination.current;
        fetchData(page, pagination.pageSize, form);
      },
    });
  }

  function onMarkRead(record: MessageRecord) {
    if (record.readStatus === 'read') {
      Message.info(t.alreadyRead);
      return;
    }
    messageStore.markRead([record.id]);
    Message.success(t.markReadOk);
    if (detail.value && detail.value.id === record.id) {
      const found = messageStore.getById(record.id);
      detail.value = found ? { ...found } : null;
    }
    fetchData(pagination.current, pagination.pageSize, form);
  }

  function onRefreshTable() {
    fetchData(pagination.current, pagination.pageSize, form);
    Message.success(t.refreshOk);
  }

  function onDensityChange(
    size: string | number | Record<string, unknown> | undefined
  ) {
    if (size === 'medium' || size === 'small' || size === 'mini') {
      setDensity(size as TableDensity);
    }
  }

  function onColumnCheckChange(
    key: string,
    checked: boolean | (string | number | boolean)[]
  ) {
    const isChecked = Array.isArray(checked) ? checked.length > 0 : !!checked;
    if (key === 'operations') return;
    if (isChecked) {
      if (!showColumnKeys.value.includes(key)) {
        showColumnKeys.value = [...showColumnKeys.value, key];
      }
    } else {
      const remaining = showColumnKeys.value.filter(
        (k) => k !== key && k !== 'operations'
      );
      if (!remaining.length) {
        Message.warning(t.keepOneColumn);
        return;
      }
      showColumnKeys.value = showColumnKeys.value.filter((k) => k !== key);
    }
  }

  function onColDragStart(index: number, e: DragEvent) {
    dragColIndex.value = index;
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = 'move';
      try {
        e.dataTransfer.setData('text/plain', String(index));
      } catch {
        /* ignore */
      }
    }
  }

  function onColDragOver(index: number, e: DragEvent) {
    e.preventDefault();
    if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';
    if (dragOverColIndex.value !== index) dragOverColIndex.value = index;
  }

  function onColDragLeave(index: number) {
    if (dragOverColIndex.value === index) dragOverColIndex.value = -1;
  }

  function onColDrop(index: number) {
    const from = dragColIndex.value;
    dragColIndex.value = -1;
    dragOverColIndex.value = -1;
    if (from < 0 || from === index) return;
    const next = allColumns.value.slice();
    const [item] = next.splice(from, 1);
    next.splice(index, 0, item);
    allColumns.value = next;
  }

  function onColDragEnd() {
    dragColIndex.value = -1;
    dragOverColIndex.value = -1;
  }

  function resetColumnSetting() {
    const defaults = createDefaultColumns();
    allColumns.value = defaults.map((col) => ({ ...col }));
    showColumnKeys.value = defaults.map((col) => col.dataIndex as string);
  }

  function ensureSelection() {
    if (!selectedKeys.value.length) {
      Message.warning(t.selectRequired);
      return false;
    }
    return true;
  }

  function onBatchDelete() {
    if (!ensureSelection()) return;
    openConfirm({
      title: t.batchDelete,
      content: t.batchDeleteConfirm,
      okText: t.remove,
      cancelText: t.cancel,
      okButtonProps: { status: 'danger' },
      onOk: () => {
        const n = messageStore.removeMany(selectedKeys.value);
        Message.success(`${t.deleteOk}（${n} 条）`);
        if (detail.value && selectedKeys.value.includes(detail.value.id)) {
          drawerVisible.value = false;
        }
        const page =
          data.value.length <= selectedKeys.value.length &&
          pagination.current > 1
            ? pagination.current - 1
            : pagination.current;
        fetchData(page, pagination.pageSize, form);
      },
    });
  }

  function onBatchMarkRead() {
    if (!ensureSelection()) return;
    const n = messageStore.markRead(selectedKeys.value);
    Message.success(`${t.batchMarkReadOk}（${n} 条）`);
    fetchData(pagination.current, pagination.pageSize, form);
  }

  onMounted(() => {
    window.addEventListener('resize', onResize);
    nextTick(() => measureTableHost());
    fetchData(1, pagination.pageSize, form);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize);
    if (measureRetryTimer) clearTimeout(measureRetryTimer);
    if (tableHostRO) tableHostRO.disconnect();
  });
</script>
