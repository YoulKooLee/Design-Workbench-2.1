<template>
  <div ref="pageRootRef" class="list-search-table-page">
    <a-card class="general-card pro-page-card">
      <a-row class="pro-search-panel">
        <a-col :flex="isMobile ? '100%' : 1">
          <a-form
            class="pro-search-form"
            :class="{ 'is-collapsed': !searchExpanded }"
            :model="form"
            :layout="isMobile ? 'vertical' : 'horizontal'"
            :label-col-props="isMobile ? undefined : { flex: '6em' }"
            :wrapper-col-props="isMobile ? undefined : { flex: 1 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <a-col :xs="24" :sm="isMobile ? 24 : 12" :md="8">
                <a-form-item field="id" :label="t.colId">
                  <a-input
                    v-model="form.id"
                    :placeholder="t.phId"
                    allow-clear
                    @press-enter="onSearch"
                  />
                </a-form-item>
              </a-col>
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
                <a-form-item field="ticketType" :label="t.colTicketType">
                  <a-select
                    v-model="form.ticketType"
                    :options="ticketTypeOptions"
                    :placeholder="t.selectDefault"
                    allow-clear
                  />
                </a-form-item>
              </a-col>
              <a-col
                v-show="searchExpanded"
                :xs="24"
                :sm="isMobile ? 24 : 12"
                :md="8"
              >
                <a-form-item field="priority" :label="t.colPriority">
                  <a-select
                    v-model="form.priority"
                    :options="priorityOptions"
                    :placeholder="t.selectDefault"
                    allow-clear
                  />
                </a-form-item>
              </a-col>
              <a-col
                v-show="searchExpanded"
                :xs="24"
                :sm="isMobile ? 24 : 12"
                :md="8"
              >
                <a-form-item field="createdTime" :label="t.colCreatedTime">
                  <a-range-picker
                    v-model="form.createdTime"
                    class="pro-field-block"
                  />
                </a-form-item>
              </a-col>
              <a-col
                v-show="searchExpanded"
                :xs="24"
                :sm="isMobile ? 24 : 12"
                :md="8"
              >
                <a-form-item field="status" :label="t.colStatus">
                  <a-select
                    v-model="form.status"
                    :options="statusOptions"
                    :placeholder="t.selectDefault"
                    allow-clear
                  />
                </a-form-item>
              </a-col>
              <a-col
                v-show="searchExpanded"
                :xs="24"
                :sm="isMobile ? 24 : 12"
                :md="8"
              >
                <a-form-item field="assignee" :label="t.colAssignee">
                  <a-select
                    v-model="form.assignee"
                    :options="assigneeOptions"
                    :placeholder="t.selectDefault"
                    allow-clear
                  />
                </a-form-item>
              </a-col>
              <a-col
                v-show="searchExpanded"
                :xs="24"
                :sm="isMobile ? 24 : 12"
                :md="8"
              >
                <a-form-item field="customer" :label="t.colCustomer">
                  <a-select
                    v-model="form.customer"
                    :options="customerOptions"
                    :placeholder="t.selectDefault"
                    allow-clear
                    allow-search
                  />
                </a-form-item>
              </a-col>
              <a-col
                v-show="searchExpanded"
                :xs="24"
                :sm="isMobile ? 24 : 12"
                :md="8"
              >
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
          :flex="isMobile ? '100%' : searchExpanded ? '86px' : 'none'"
          class="pro-search-actions"
          :class="{
            'is-collapsed': !searchExpanded || isMobile,
            'is-mobile': isMobile,
          }"
        >
          <a-button type="primary" @click="onSearch">
            <template #icon><icon-search /></template>{{ t.search }}
          </a-button>
          <a-button @click="onReset">
            <template #icon><icon-refresh /></template>{{ t.reset }}
          </a-button>
          <a-button
            type="text"
            class="pro-search-toggle"
            @click="toggleSearchExpand"
          >
            <span class="pro-search-toggle-text">
              {{ searchExpanded ? t.collapse : t.expand }}
              <span
                v-if="!searchExpanded && hasAdvancedFilters"
                class="pro-search-toggle-dot"
              ></span>
            </span>
            <icon-up v-if="searchExpanded" class="pro-search-toggle-icon" />
            <icon-down v-else class="pro-search-toggle-icon" />
          </a-button>
        </a-col>
      </a-row>
    </a-card>

    <a-card class="general-card">
      <div class="pro-toolbar">
        <a-space>
          <a-button type="primary" @click="openCreate">
            <template #icon><icon-plus /></template>{{ t.add }}
          </a-button>
          <a-button @click="onImport">{{ t.upload }}</a-button>
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
                  v-for="opt in densityOptions"
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
                    <a-button type="text" size="small" @click="resetColumnSetting"
                      >{{ t.columnReset }}</a-button
                    >
                  </div>
                </div>
              </template>
            </a-popover>
          </div>
          <a-button @click="onExport">
            <template #icon><icon-download /></template>{{ t.download }}
          </a-button>
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
        <template #ticketType="{ record }">
          <span class="ticket-type-cell">
            <span
              :class="'ticket-type-dot ticket-type-dot--' + record.ticketType"
            ></span>
            {{ ticketTypes[record.ticketType] }}
          </span>
        </template>
        <template #priority="{ record }">
          <a-tag :color="priorityColors[record.priority]" size="small">
            {{ priorities[record.priority] }}
          </a-tag>
        </template>
        <template #createdAt="{ record }">{{
          formatTime(record.createdAt)
        }}</template>
        <template #status="{ record }">
          <a-badge
            :status="statusBadge[record.status] || undefined"
            :color="statusBadgeColor[record.status] || undefined"
            :text="statusLabels[record.status]"
          />
        </template>
        <template #operations="{ record }">
          <a-space class="pro-table-ops" :size="4">
            <a-button type="text" :size="opsBtnSize" @click="openDetail(record)"
              >{{ t.view }}</a-button
            >
            <a-button type="text" :size="opsBtnSize" @click="openEdit(record)"
              >{{ t.edit }}</a-button
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
          <a-button :disabled="!selectedKeys.length" @click="onBatchClose">{{
            t.batchClose
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
              <div class="pro-detail-label">{{ t.colTicketType }}</div>
              <div class="pro-detail-value">
                <span class="ticket-type-cell">
                  <span
                    :class="
                      'ticket-type-dot ticket-type-dot--' + detail.ticketType
                    "
                  ></span>
                  {{ ticketTypes[detail.ticketType] }}
                </span>
              </div>
            </div>
            <div class="pro-detail-field">
              <div class="pro-detail-label">{{ t.colPriority }}</div>
              <div class="pro-detail-value">
                <a-tag :color="priorityColors[detail.priority]" size="small">
                  {{ priorities[detail.priority] }}
                </a-tag>
              </div>
            </div>
            <div class="pro-detail-field">
              <div class="pro-detail-label">{{ t.colAssignee }}</div>
              <div class="pro-detail-value">{{ detail.assignee }}</div>
            </div>
            <div class="pro-detail-field">
              <div class="pro-detail-label">{{ t.colCustomer }}</div>
              <div class="pro-detail-value">{{ detail.customer }}</div>
            </div>
            <div class="pro-detail-field pro-detail-field--full">
              <div class="pro-detail-label">{{ t.colCreatedTime }}</div>
              <div class="pro-detail-value">
                {{ formatTime(detail.createdAt) }}
              </div>
            </div>
          </div>
        </section>

        <section class="pro-detail-section">
          <h3 class="pro-detail-section-title">{{ t.detailProcess }}</h3>
          <div class="pro-detail-grid">
            <div class="pro-detail-field pro-detail-field--full">
              <div class="pro-detail-label">{{ t.colStatus }}</div>
              <div class="pro-detail-value pro-detail-value--strong">
                <a-badge
                  :status="statusBadge[detail.status] || undefined"
                  :color="statusBadgeColor[detail.status] || undefined"
                  :text="statusLabels[detail.status]"
                />
              </div>
            </div>
            <div class="pro-detail-field pro-detail-field--full">
              <div class="pro-detail-label">{{ t.colDescription }}</div>
              <div class="pro-detail-value pro-detail-value--multiline">
                {{ detail.description || '—' }}
              </div>
            </div>
          </div>
        </section>
      </div>
      <template #footer>
        <a-button @click="closeDrawer">{{ t.cancel }}</a-button>
        <a-button type="primary" :disabled="!detail" @click="openEdit(detail!)"
          >{{ t.edit }}</a-button
        >
      </template>
    </a-drawer>

    <a-modal
      v-if="modalVisible"
      :visible="true"
      :title="modalTitle"
      title-align="start"
      :width="modalWidth"
      :footer="false"
      unmount-on-close
      @cancel="closeModal"
    >
      <a-form
        ref="editorFormRef"
        :model="editor"
        :rules="editorRules"
        layout="vertical"
      >
        <a-form-item
          :label="t.colTitle"
          field="title"
          required
          asterisk-position="end"
        >
          <a-input
            v-model="editor.title"
            :placeholder="t.phTitle"
            allow-clear
          />
        </a-form-item>
        <a-row :gutter="16">
          <a-col :span="editorColSpan">
            <a-form-item
              :label="t.colTicketType"
              field="ticketType"
              required
              asterisk-position="end"
            >
              <a-select
                v-model="editor.ticketType"
                :options="ticketTypeOptions"
                :placeholder="t.emptyTicketType"
                allow-clear
              />
            </a-form-item>
          </a-col>
          <a-col :span="editorColSpan">
            <a-form-item
              :label="t.colPriority"
              field="priority"
              required
              asterisk-position="end"
            >
              <a-select
                v-model="editor.priority"
                :options="priorityOptions"
                :placeholder="t.emptyPriority"
                allow-clear
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="editorColSpan">
            <a-form-item
              :label="t.colAssignee"
              field="assignee"
              required
              asterisk-position="end"
            >
              <a-select
                v-model="editor.assignee"
                :options="assigneeOptions"
                :placeholder="t.emptyAssignee"
                allow-clear
              />
            </a-form-item>
          </a-col>
          <a-col :span="editorColSpan">
            <a-form-item
              :label="t.colCustomer"
              field="customer"
              required
              asterisk-position="end"
            >
              <a-select
                v-model="editor.customer"
                :options="customerOptions"
                :placeholder="t.emptyCustomer"
                allow-search
                allow-clear
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item
          :label="t.colStatus"
          field="status"
          required
          asterisk-position="end"
        >
          <a-select
            v-model="editor.status"
            :options="statusOptions"
            :placeholder="t.emptyStatus"
            allow-clear
          />
        </a-form-item>
        <a-form-item
          :label="t.colDescription"
          field="description"
          required
          asterisk-position="end"
        >
          <a-textarea
            v-model="editor.description"
            :auto-size="{ minRows: 3, maxRows: 6 }"
          />
        </a-form-item>
      </a-form>
      <div class="pro-modal-footer-actions">
        <a-space>
          <a-button @click="closeModal">{{ t.cancel }}</a-button>
          <a-button type="primary" :loading="saving" @click="onSave">{{
            t.save
          }}</a-button>
        </a-space>
      </div>
    </a-modal>

    <a-modal
      v-if="importVisible"
      :visible="true"
      :title="t.importTitle"
      title-align="start"
      :width="ioModalWidth"
      modal-class="pro-io-modal"
      :footer="false"
      unmount-on-close
      @cancel="closeImport"
    >
      <div class="pro-io-modal-body">
        <div class="pro-io-tip">
          <icon-info-circle class="pro-io-tip-icon" :size="14" />
          <span class="pro-io-tip-text">{{ t.importTip }}</span>
        </div>
        <a-upload
          class="pro-io-upload"
          draggable
          accept=".xlsx,.xls,.csv"
          :auto-upload="false"
          :limit="1"
          :file-list="importFileList"
          @change="onImportFileChange"
          @before-upload="beforeImportUpload"
        >
          <template #upload-button>
            <div class="pro-upload-drag">
              <div class="pro-upload-drag-icon"><icon-upload /></div>
              <div class="pro-upload-drag-text">{{ t.importDrag }}</div>
              <div class="pro-upload-drag-hint">{{ t.importDragHint }}</div>
            </div>
          </template>
        </a-upload>
        <div class="pro-io-footer">
          <a-link class="pro-io-template" @click="onDownloadTemplate">
            <icon-download /> {{ t.importTemplate }}
          </a-link>
          <a-space>
            <a-button @click="closeImport">{{ t.cancel }}</a-button>
            <a-button
              type="primary"
              :loading="importing"
              @click="submitImport"
              >{{ t.importSubmit }}</a-button
            >
          </a-space>
        </div>
      </div>
    </a-modal>

    <a-modal
      v-if="exportVisible"
      :visible="true"
      :title="t.exportTitle"
      title-align="start"
      :width="ioModalWidth"
      modal-class="pro-io-modal"
      :footer="false"
      unmount-on-close
      @cancel="closeExport"
    >
      <div class="pro-io-modal-body">
        <a-form :model="exportForm" layout="vertical" class="pro-export-form">
          <a-form-item :label="t.exportScope">
            <a-radio-group v-model="exportForm.scope" direction="vertical">
              <a-radio
                v-for="opt in exportScopeOptions"
                :key="opt.value"
                :value="opt.value"
                :disabled="opt.disabled"
                >{{ opt.label }}</a-radio
              >
            </a-radio-group>
          </a-form-item>
          <a-form-item :label="t.exportFormat">
            <a-radio-group
              v-model="exportForm.format"
              direction="vertical"
              :options="exportFormatOptions"
            />
          </a-form-item>
        </a-form>
        <div class="pro-io-footer">
          <div class="pro-export-hint">
            {{ t.exportCountHint }} {{ exportCount }} 条
          </div>
          <a-space>
            <a-button @click="closeExport">{{ t.cancel }}</a-button>
            <a-button
              type="primary"
              :loading="exporting"
              @click="submitExport"
              >{{ t.exportSubmit }}</a-button
            >
          </a-space>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import '@/styles/pages/list-search-table.css';
  import {
    computed,
    nextTick,
    onBeforeUnmount,
    onMounted,
    reactive,
    ref,
  } from 'vue';
  import { Message, Modal } from '@arco-design/web-vue';
  import type {
    FileItem,
    FormInstance,
    TableColumnData,
  } from '@arco-design/web-vue';
  import {
    closeTickets,
    createItem,
    deleteItem,
    deleteItems,
    getItem,
    getList,
    updateItem,
  } from '@/api/ticket';
  import {
    assignees,
    customers,
    formatDateTime,
    priorities,
    statusLabels,
    ticketTypes,
  } from '@/mock/ticket';
  import type { TicketRecord } from '@/types/ticket';
  import useTableDensity, {
    type TableDensity,
  } from '@/hooks/use-table-density';

  defineOptions({ name: 'ListSearchTablePage' });

  const t = {
    title: '数据列表',
    add: '新建工单',
    upload: '批量导入',
    download: '导出',
    search: '查询',
    reset: '重置',
    expand: '展开',
    collapse: '收起',
    selectDefault: '全部',
    phId: '请输入工单编号',
    phTitle: '请输入工单标题',
    phKeyword: '请输入问题描述关键词',
    colId: '工单编号',
    colTitle: '工单标题',
    colTicketType: '工单类型',
    colPriority: '优先级',
    colAssignee: '处理人',
    colCustomer: '客户',
    colKeyword: '关键词',
    colCreatedTime: '创建时间',
    colStatus: '状态',
    colOperations: '操作',
    colDescription: '问题描述',
    view: '查看',
    edit: '编辑',
    remove: '删除',
    batchDelete: '批量删除',
    batchClose: '关闭',
    save: '保存',
    cancel: '取消',
    createTitle: '新建工单',
    editTitle: '编辑工单',
    detailTitle: '工单详情',
    detailOverview: '工单概览',
    detailProcess: '处理信息',
    deleteConfirm: '确认删除该工单？删除后不可恢复。',
    batchDeleteConfirm: '确认删除选中的工单？删除后不可恢复。',
    batchCloseConfirm: '确认将选中工单设为已关闭？',
    selectRequired: '请先勾选工单',
    deleteOk: '删除成功',
    batchCloseOk: '已关闭选中工单',
    createOk: '创建成功',
    updateOk: '保存成功',
    importOk: '已模拟导入 3 条工单',
    exportOk: '导出任务已开始',
    importTitle: '批量导入',
    importTip:
      '支持 .xlsx / .xls / .csv，单文件不超过 10MB，单次建议不超过 1000 条',
    importDrag: '点击或拖拽文件到此处',
    importDragHint: '仅支持 Excel / CSV 文件，单文件不超过 10MB',
    importTemplate: '下载导入模板',
    importSubmit: '开始导入',
    importFileRequired: '请先选择要导入的文件',
    importFormatInvalid:
      '文件格式不符合要求，仅支持 Excel / CSV（.xlsx、.xls、.csv）',
    importSizeInvalid: '文件过大，单文件不能超过 10MB',
    importTemplateOk: '模板下载已开始',
    exportTitle: '导出工单',
    exportScope: '导出范围',
    exportScopeSelected: '仅勾选数据',
    exportScopePage: '当前页',
    exportScopeAll: '全部筛选结果',
    exportFormat: '导出格式',
    exportFormatXlsx: 'Excel（.xlsx）',
    exportFormatCsv: 'CSV（.csv）',
    exportSubmit: '开始导出',
    exportCountHint: '预计导出',
    emptyTitle: '请输入工单标题',
    emptyTicketType: '请选择工单类型',
    emptyPriority: '请选择优先级',
    emptyAssignee: '请选择处理人',
    emptyCustomer: '请选择客户',
    emptyStatus: '请选择状态',
    emptyDescription: '请输入问题描述',
    validateFail: '请完善必填项后再提交',
    refresh: '刷新',
    density: '密度',
    columnSetting: '列设置',
    columnReset: '恢复默认',
    refreshOk: '已刷新',
    keepOneColumn: '至少保留一列',
  };

  const priorityColors = ['gray', 'arcoblue', 'orangered', 'red'];
  const statusBadge: Array<'warning' | 'processing' | 'success' | undefined> = [
    'warning',
    'processing',
    'success',
    undefined,
  ];
  const statusBadgeColor: Array<string | undefined> = [
    undefined,
    undefined,
    undefined,
    'gray',
  ];

  type SearchForm = {
    id: string;
    title: string;
    ticketType: number | undefined | '';
    priority: number | undefined | '';
    createdTime: (string | Date | number)[];
    status: number | undefined | '';
    assignee: string;
    customer: string;
    keyword: string;
  };

  type EditorForm = {
    id: string;
    title: string;
    ticketType: number | undefined;
    priority: number | undefined;
    assignee: string | undefined;
    customer: string | undefined;
    status: number | undefined;
    description: string;
  };

  function emptyForm(): SearchForm {
    return {
      id: '',
      title: '',
      ticketType: '',
      priority: '',
      createdTime: [],
      status: '',
      assignee: '',
      customer: '',
      keyword: '',
    };
  }

  function emptyEditor(): EditorForm {
    return {
      id: '',
      title: '',
      ticketType: undefined,
      priority: undefined,
      assignee: undefined,
      customer: undefined,
      status: undefined,
      description: '',
    };
  }

  function createDefaultColumns(): TableColumnData[] {
    return [
      { title: t.colId, dataIndex: 'id', width: 150 },
      {
        title: t.colTitle,
        dataIndex: 'title',
        minWidth: 160,
        ellipsis: true,
        tooltip: true,
      },
      {
        title: t.colTicketType,
        dataIndex: 'ticketType',
        width: 100,
        slotName: 'ticketType',
      },
      {
        title: t.colPriority,
        dataIndex: 'priority',
        width: 100,
        slotName: 'priority',
      },
      { title: t.colAssignee, dataIndex: 'assignee', width: 100 },
      { title: t.colCustomer, dataIndex: 'customer', width: 110 },
      {
        title: t.colCreatedTime,
        dataIndex: 'createdAt',
        width: 180,
        slotName: 'createdAt',
      },
      {
        title: t.colStatus,
        dataIndex: 'status',
        width: 110,
        slotName: 'status',
      },
      {
        title: t.colOperations,
        dataIndex: 'operations',
        width: 160,
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

  const { density, setDensity, densityOptions } = useTableDensity();

  const pageRootRef = ref<HTMLElement | null>(null);
  const editorFormRef = ref<FormInstance>();
  const form = reactive(emptyForm());
  const searchExpanded = ref(false);
  const isMobile = ref(
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );
  const data = ref<TicketRecord[]>([]);
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
  const showColumnKeys = ref(defaultColumns.map((col) => col.dataIndex as string));
  const dragColIndex = ref(-1);
  const dragOverColIndex = ref(-1);
  const tableHostWidth = ref(0);
  const drawerVisible = ref(false);
  const detail = ref<TicketRecord | null>(null);
  const modalVisible = ref(false);
  const modalMode = ref<'create' | 'edit'>('create');
  const editor = reactive(emptyEditor());
  const saving = ref(false);
  const editorRules = {
    title: [{ required: true, message: t.emptyTitle }],
    ticketType: [{ required: true, message: t.emptyTicketType }],
    priority: [{ required: true, message: t.emptyPriority }],
    assignee: [{ required: true, message: t.emptyAssignee }],
    customer: [{ required: true, message: t.emptyCustomer }],
    status: [{ required: true, message: t.emptyStatus }],
    description: [{ required: true, message: t.emptyDescription }],
  };
  const importVisible = ref(false);
  const importFileList = ref<FileItem[]>([]);
  const importing = ref(false);
  const exportVisible = ref(false);
  const exporting = ref(false);
  const exportForm = reactive({
    scope: 'all' as 'selected' | 'page' | 'all',
    format: 'xlsx' as 'xlsx' | 'csv',
  });

  let tableHostRO: ResizeObserver | null = null;
  let measureRetryTimer: ReturnType<typeof setTimeout> | null = null;

  const ticketTypeOptions = ticketTypes.map((label, value) => ({
    label,
    value,
  }));
  const priorityOptions = priorities.map((label, value) => ({ label, value }));
  const statusOptions = statusLabels.map((label, value) => ({ label, value }));
  const assigneeOptions = assignees.map((label) => ({ label, value: label }));
  const customerOptions = customers.map((label) => ({ label, value: label }));

  const modalTitle = computed(() =>
    modalMode.value === 'create' ? t.createTitle : t.editTitle
  );
  const modalWidth = computed(() =>
    isMobile.value ? 'calc(100vw - 32px)' : 520
  );
  const ioModalWidth = computed(() =>
    isMobile.value ? 'calc(100vw - 32px)' : 520
  );
  const drawerWidth = computed(() => (isMobile.value ? '100%' : 560));
  const detailDrawerTitle = computed(() => {
    if (!detail.value) return t.detailTitle;
    return `${t.detailTitle}（${detail.value.id}）`;
  });
  const editorColSpan = computed(() => (isMobile.value ? 24 : 12));
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

  const hasAdvancedFilters = computed(() => {
    const f = form;
    if (f.priority !== '' && f.priority != null) return true;
    if (f.status !== '' && f.status != null) return true;
    if (f.createdTime && f.createdTime.length === 2) return true;
    if (f.assignee) return true;
    if (f.customer) return true;
    if (f.keyword) return true;
    return false;
  });

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

  const exportScopeOptions = computed(() => [
    {
      label: `${t.exportScopeSelected}（${selectedKeys.value.length}）`,
      value: 'selected',
      disabled: !selectedKeys.value.length,
    },
    {
      label: `${t.exportScopePage}（${data.value.length}）`,
      value: 'page',
    },
    {
      label: `${t.exportScopeAll}（${pagination.total}）`,
      value: 'all',
    },
  ]);
  const exportFormatOptions = [
    { label: t.exportFormatXlsx, value: 'xlsx' },
    { label: t.exportFormatCsv, value: 'csv' },
  ];
  const exportCount = computed(() => {
    if (exportForm.scope === 'selected') return selectedKeys.value.length;
    if (exportForm.scope === 'page') return data.value.length;
    return pagination.total;
  });

  function measureTableHost() {
    try {
      const root = pageRootRef.value;
      if (!root) return;
      const el = root.querySelector('.arco-table-container') as HTMLElement | null;
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

  async function fetchData(
    page: number,
    pageSize: number,
    params?: SearchForm | Record<string, never>
  ) {
    loading.value = true;
    try {
      const source = (params || form) as SearchForm;
      const res = await getList({
        id: source.id || undefined,
        title: source.title || undefined,
        ticketType:
          source.ticketType === '' || source.ticketType == null
            ? null
            : Number(source.ticketType),
        priority:
          source.priority === '' || source.priority == null
            ? null
            : Number(source.priority),
        status:
          source.status === '' || source.status == null
            ? null
            : Number(source.status),
        assignee: source.assignee || undefined,
        customer: source.customer || undefined,
        keyword: source.keyword || undefined,
        createdTime:
          source.createdTime && source.createdTime.length === 2
            ? source.createdTime
            : null,
        current: page,
        pageSize,
      });
      data.value = res.data.list;
      pagination.current = page;
      pagination.pageSize = pageSize;
      pagination.total = res.data.total;
      selectedKeys.value = [];
    } catch {
      Message.error('列表加载失败');
    } finally {
      loading.value = false;
      nextTick(() => measureTableHost());
    }
  }

  function toggleSearchExpand() {
    searchExpanded.value = !searchExpanded.value;
  }

  function onSearch() {
    fetchData(1, pagination.pageSize, form);
  }

  function onReset() {
    Object.assign(form, emptyForm());
    searchExpanded.value = false;
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

  function formatTime(v: string) {
    return formatDateTime(v);
  }

  function openCreate() {
    modalMode.value = 'create';
    Object.assign(editor, emptyEditor());
    modalVisible.value = true;
    nextTick(() => editorFormRef.value?.clearValidate());
  }

  function openEdit(record: TicketRecord) {
    modalMode.value = 'edit';
    Object.assign(editor, {
      id: record.id,
      title: record.title,
      ticketType: record.ticketType,
      priority: record.priority,
      assignee: record.assignee,
      customer: record.customer,
      status: record.status,
      description: record.description || '',
    });
    modalVisible.value = true;
    nextTick(() => editorFormRef.value?.clearValidate());
  }

  function openDetail(record: TicketRecord) {
    detail.value = { ...record };
    drawerVisible.value = true;
  }

  function closeDrawer() {
    drawerVisible.value = false;
  }

  function closeModal() {
    modalVisible.value = false;
  }

  async function runSave() {
    saving.value = true;
    try {
      const payload = {
        title: editor.title,
        ticketType: Number(editor.ticketType),
        priority: Number(editor.priority),
        assignee: String(editor.assignee || ''),
        customer: String(editor.customer || ''),
        status: Number(editor.status),
        description: editor.description,
      };
      if (modalMode.value === 'create') {
        await createItem(payload);
        Message.success(t.createOk);
      } else {
        await updateItem(editor.id, { ...payload, id: editor.id });
        Message.success(t.updateOk);
        if (detail.value && detail.value.id === editor.id) {
          const res = await getItem(editor.id);
          if (res.data) detail.value = { ...res.data };
        }
      }
      modalVisible.value = false;
      await fetchData(1, pagination.pageSize, form);
    } catch {
      Message.error('保存失败');
    } finally {
      saving.value = false;
    }
  }

  function onSave() {
    const formRef = editorFormRef.value;
    if (!formRef || typeof formRef.validate !== 'function') {
      const e = editor;
      if (!String(e.title || '').trim()) {
        Message.warning(t.emptyTitle);
        return;
      }
      if (e.ticketType == null) {
        Message.warning(t.emptyTicketType);
        return;
      }
      if (e.priority == null) {
        Message.warning(t.emptyPriority);
        return;
      }
      if (!String(e.assignee || '').trim()) {
        Message.warning(t.emptyAssignee);
        return;
      }
      if (!String(e.customer || '').trim()) {
        Message.warning(t.emptyCustomer);
        return;
      }
      if (e.status == null) {
        Message.warning(t.emptyStatus);
        return;
      }
      if (!String(e.description || '').trim()) {
        Message.warning(t.emptyDescription);
        return;
      }
      runSave();
      return;
    }
    formRef.validate((errors) => {
      if (errors) {
        Message.error(t.validateFail);
        return;
      }
      runSave();
    });
  }

  function onDelete(record: TicketRecord) {
    openConfirm({
      title: t.remove,
      content: t.deleteConfirm,
      okText: t.remove,
      cancelText: t.cancel,
      okButtonProps: { status: 'danger' },
      onOk: async () => {
        await deleteItem(record.id);
        Message.success(t.deleteOk);
        if (detail.value && detail.value.id === record.id) {
          drawerVisible.value = false;
        }
        const page =
          data.value.length <= 1 && pagination.current > 1
            ? pagination.current - 1
            : pagination.current;
        await fetchData(page, pagination.pageSize, form);
      },
    });
  }

  function onImport() {
    importFileList.value = [];
    importVisible.value = true;
  }

  function closeImport() {
    importVisible.value = false;
    importFileList.value = [];
    importing.value = false;
  }

  function onImportFileChange(
    fileList: FileItem[] | { fileList?: FileItem[] }
  ) {
    const list = Array.isArray(fileList)
      ? fileList
      : fileList && fileList.fileList;
    importFileList.value = (list || []).slice(-1);
  }

  function beforeImportUpload(file: File) {
    const name = file?.name || '';
    const size = file?.size || 0;
    if (!/\.(xlsx|xls|csv)$/i.test(name)) {
      Message.warning(t.importFormatInvalid);
      return false;
    }
    if (size > 10 * 1024 * 1024) {
      Message.warning(t.importSizeInvalid);
      return false;
    }
    return true;
  }

  function onDownloadTemplate() {
    Message.success(t.importTemplateOk);
  }

  function submitImport() {
    if (!importFileList.value.length) {
      Message.warning(t.importFileRequired);
      return;
    }
    importing.value = true;
    setTimeout(() => {
      importing.value = false;
      importVisible.value = false;
      importFileList.value = [];
      Message.success(t.importOk);
      fetchData(1, pagination.pageSize, form);
    }, 600);
  }

  function onExport() {
    exportForm.scope = selectedKeys.value.length ? 'selected' : 'all';
    exportForm.format = 'xlsx';
    exportVisible.value = true;
  }

  function onRefreshTable() {
    fetchData(pagination.current, pagination.pageSize, form);
    Message.success(t.refreshOk);
  }

  function onDensityChange(size: string | number | Record<string, unknown> | undefined) {
    if (size === 'medium' || size === 'small' || size === 'mini') {
      setDensity(size as TableDensity);
    }
  }

  function onColumnCheckChange(key: string, checked: boolean | (string | number | boolean)[]) {
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

  function closeExport() {
    exportVisible.value = false;
    exporting.value = false;
  }

  function submitExport() {
    exporting.value = true;
    setTimeout(() => {
      exporting.value = false;
      exportVisible.value = false;
      Message.success(
        `${t.exportOk}（${exportCount.value} 条 · ${exportForm.format.toUpperCase()}）`
      );
    }, 500);
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
      onOk: async () => {
        const res = await deleteItems(selectedKeys.value);
        const n =
          typeof res.data === 'number'
            ? res.data
            : (res.data as { count?: number })?.count ??
              selectedKeys.value.length;
        Message.success(`${t.deleteOk}（${n} 条）`);
        if (detail.value && selectedKeys.value.includes(detail.value.id)) {
          drawerVisible.value = false;
        }
        const page =
          data.value.length <= selectedKeys.value.length &&
          pagination.current > 1
            ? pagination.current - 1
            : pagination.current;
        await fetchData(page, pagination.pageSize, form);
      },
    });
  }

  function onBatchClose() {
    if (!ensureSelection()) return;
    openConfirm({
      title: t.batchClose,
      content: t.batchCloseConfirm,
      okText: t.batchClose,
      cancelText: t.cancel,
      onOk: async () => {
        const res = await closeTickets(selectedKeys.value);
        const n =
          typeof res.data === 'number'
            ? res.data
            : (res.data as { count?: number })?.count ??
              selectedKeys.value.length;
        Message.success(`${t.batchCloseOk}（${n} 条）`);
        await fetchData(pagination.current, pagination.pageSize, form);
      },
    });
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
