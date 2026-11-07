<template>
  <div ref="pageRootRef" class="list-tree-table-page">
    <div class="list-split-layout">
      <div class="list-split-side">
        <a-card class="general-card pro-page-card" :bordered="false">
          <div class="list-tree-panel">
            <div class="list-tree-panel-header">
              <span class="list-tree-panel-title">{{ t.treeTitle }}</span>
            </div>
            <a-input
              v-model="treeKeyword"
              class="list-tree-search"
              allow-clear
              :placeholder="t.treeSearchPh"
            >
              <template #prefix><icon-search /></template>
            </a-input>
            <div class="list-tree-body">
              <a-tree
                class="list-tree"
                block-node
                :data="treeData"
                v-model:selected-keys="selectedKeys"
                v-model:expanded-keys="expandedKeys"
                @select="onTreeSelect"
              />
            </div>
          </div>
        </a-card>
      </div>

      <div class="list-split-main">
        <a-card class="general-card pro-page-card" :bordered="false">
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
                    <a-form-item field="name" :label="t.colName">
                      <a-input
                        v-model="form.name"
                        :placeholder="t.phName"
                        allow-clear
                        @press-enter="onSearch"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :xs="24" :sm="isMobile ? 24 : 12" :md="8">
                    <a-form-item field="account" :label="t.colAccount">
                      <a-input
                        v-model="form.account"
                        :placeholder="t.phAccount"
                        allow-clear
                        @press-enter="onSearch"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :xs="24" :sm="isMobile ? 24 : 12" :md="8">
                    <a-form-item field="phone" :label="t.colPhone">
                      <a-input
                        v-model="form.phone"
                        :placeholder="t.phPhone"
                        allow-clear
                        @press-enter="onSearch"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :xs="24" :sm="isMobile ? 24 : 12" :md="8">
                    <a-form-item field="enabled" :label="t.colStatus">
                      <a-select
                        v-model="form.enabled"
                        :options="statusOptions"
                        :placeholder="t.selectDefault"
                        allow-clear
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :xs="24" :sm="isMobile ? 24 : 12" :md="8">
                    <a-form-item field="role" :label="t.colRole">
                      <a-select
                        v-model="form.role"
                        :options="roleOptions"
                        :placeholder="t.selectDefault"
                        allow-clear
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

        <a-card class="general-card" :bordered="false">
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
                              dragOverColIndex === index &&
                              dragColIndex !== index,
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
                              (checked) =>
                                onColumnCheckChange(opt.value, checked)
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
              <a-button @click="onExport">
                <template #icon><icon-download /></template>{{ t.download }}
              </a-button>
            </div>
          </div>
          <a-table
            row-key="id"
            :loading="loading"
            :columns="columns"
            :data="data"
            :size="density"
            :pagination="false"
            :bordered="false"
            :scroll="tableScroll"
            :row-selection="{
              type: 'checkbox',
              showCheckedAll: true,
              width: 48,
            }"
            :selected-keys="selectedRowKeys"
            @selection-change="onSelectionChange"
          >
            <template #name="{ record }">
              {{ record.name }}
            </template>
            <template #createdAt="{ record }">{{
              formatTime(record.createdAt)
            }}</template>
            <template #enabled="{ record }">
              <a-switch
                :key="record.id + '-' + String(record.enabled)"
                :model-value="record.enabled"
                size="small"
                @change="(val) => onStatusChange(record, val)"
              />
            </template>
            <template #operations="{ record }">
              <a-space class="pro-table-ops" :size="4">
                <a-button
                  type="text"
                  :size="opsBtnSize"
                  @click="openDetail(record)"
                  >{{ t.view }}</a-button
                >
                <a-button
                  type="text"
                  :size="opsBtnSize"
                  @click="openEdit(record)"
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
              <a-button
                :disabled="!selectedRowKeys.length"
                @click="onBatchDelete"
                >{{ t.batchDelete }}</a-button
              >
              <a-button
                :disabled="!selectedRowKeys.length"
                @click="onBatchDisable"
                >{{ t.batchDisable }}</a-button
              >
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
                  <div class="pro-detail-label">{{ t.colName }}</div>
                  <div class="pro-detail-value">{{ detail.name }}</div>
                </div>
                <div class="pro-detail-field">
                  <div class="pro-detail-label">{{ t.colDepartment }}</div>
                  <div class="pro-detail-value">{{ detail.department }}</div>
                </div>
                <div class="pro-detail-field">
                  <div class="pro-detail-label">{{ t.colRole }}</div>
                  <div class="pro-detail-value">{{ detail.role }}</div>
                </div>
                <div class="pro-detail-field">
                  <div class="pro-detail-label">{{ t.colPhone }}</div>
                  <div class="pro-detail-value">{{ detail.phone }}</div>
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
              <h3 class="pro-detail-section-title">{{ t.detailAccount }}</h3>
              <div class="pro-detail-grid">
                <div class="pro-detail-field">
                  <div class="pro-detail-label">{{ t.colAccount }}</div>
                  <div class="pro-detail-value">{{ detail.account }}</div>
                </div>
                <div class="pro-detail-field">
                  <div class="pro-detail-label">{{ t.colStatus }}</div>
                  <div class="pro-detail-value pro-detail-value--strong">
                    {{
                      detail.enabled ? t.statusEnabled : t.statusDisabled
                    }}
                  </div>
                </div>
              </div>
            </section>
          </div>
          <template #footer>
            <a-button @click="closeDrawer">{{ t.cancel }}</a-button>
            <a-button
              type="primary"
              :disabled="!detail"
              @click="openEdit(detail!)"
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
              :label="t.colName"
              field="name"
              required
              asterisk-position="end"
            >
              <a-input
                v-model="editor.name"
                :placeholder="t.phName"
                allow-clear
              />
            </a-form-item>
            <a-form-item
              :label="t.colAccount"
              field="account"
              required
              asterisk-position="end"
            >
              <a-input
                v-model="editor.account"
                :placeholder="t.phAccount"
                allow-clear
              />
            </a-form-item>
            <a-row :gutter="16">
              <a-col :span="editorColSpan">
                <a-form-item
                  :label="t.colDepartment"
                  field="departmentKey"
                  required
                  asterisk-position="end"
                >
                  <a-select
                    v-model="editor.departmentKey"
                    :options="departmentOptions"
                    :placeholder="t.emptyDepartment"
                    allow-clear
                    allow-search
                  />
                </a-form-item>
              </a-col>
              <a-col :span="editorColSpan">
                <a-form-item
                  :label="t.colRole"
                  field="role"
                  required
                  asterisk-position="end"
                >
                  <a-select
                    v-model="editor.role"
                    :options="roleOptions"
                    :placeholder="t.emptyRole"
                    allow-clear
                  />
                </a-form-item>
              </a-col>
            </a-row>
            <a-form-item
              :label="t.colPhone"
              field="phone"
              required
              asterisk-position="end"
            >
              <a-input
                v-model="editor.phone"
                :placeholder="t.phPhone"
                allow-clear
              />
            </a-form-item>
            <a-form-item :label="t.colStatus" field="enabled">
              <a-switch v-model="editor.enabled" />
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
            <a-form
              :model="exportForm"
              layout="vertical"
              class="pro-export-form"
            >
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
    </div>
  </div>
</template>

<script lang="ts" setup>
  import '@/styles/pages/list-tree-table.css';
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
    TreeNodeData,
  } from '@arco-design/web-vue';
  import useTableDensity, {
    type TableDensity,
  } from '@/hooks/use-table-density';

  defineOptions({ name: 'ListTreeTablePage' });

  const t = {
    title: '左树右表',
    treeTitle: '部门列表',
    treeSearchPh: '搜索部门',
    search: '查询',
    reset: '重置',
    expand: '展开',
    collapse: '收起',
    selectDefault: '请选择',
    phName: '请输入人员姓名',
    phAccount: '请输入账号',
    phPhone: '请输入手机号',
    phKeyword: '请输入姓名 / 账号 / 手机号',
    add: '新增成员',
    upload: '批量导入',
    download: '导出',
    edit: '编辑',
    view: '查看',
    remove: '删除',
    batchDelete: '批量删除',
    batchDisable: '批量停用',
    deleteConfirm: '确认删除该成员？删除后不可恢复。',
    batchDeleteConfirm: '确认删除选中的成员？删除后不可恢复。',
    batchDisableConfirm: '确认停用选中的成员？',
    selectRequired: '请先勾选成员',
    deleteOk: '删除成功',
    batchDisableOk: '已停用选中成员',
    createOk: '创建成功',
    updateOk: '保存成功',
    createTitle: '新增成员',
    editTitle: '编辑成员',
    detailTitle: '成员详情',
    detailOverview: '基本信息',
    detailAccount: '账号信息',
    statusEnabled: '启用',
    statusDisabled: '停用',
    colName: '员工姓名',
    colAccount: '账号',
    colDepartment: '所属部门',
    colRole: '角色',
    colPhone: '手机号',
    colStatus: '状态',
    colCreatedTime: '入职时间',
    colKeyword: '关键词',
    colOperations: '操作',
    cancel: '取消',
    save: '保存',
    emptyName: '请输入员工姓名',
    emptyAccount: '请输入账号',
    emptyDepartment: '请选择所属部门',
    emptyRole: '请选择角色',
    emptyPhone: '请输入手机号',
    validateFail: '请完善必填项后再提交',
    refresh: '刷新',
    refreshOk: '已刷新',
    density: '密度',
    densityDefault: '默认',
    densityMedium: '紧凑',
    densitySmall: '迷你',
    columnSetting: '列设置',
    columnReset: '恢复默认',
    keepOneColumn: '至少保留一列',
    importTitle: '批量导入成员',
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
    importOk: '已模拟导入 3 名成员',
    exportTitle: '导出成员',
    exportScope: '导出范围',
    exportScopeSelected: '仅勾选数据',
    exportScopePage: '当前页',
    exportScopeAll: '全部筛选结果',
    exportFormat: '导出格式',
    exportFormatXlsx: 'Excel（.xlsx）',
    exportFormatCsv: 'CSV（.csv）',
    exportSubmit: '开始导出',
    exportCountHint: '预计导出',
    exportOk: '导出任务已开始',
  };

  interface EmployeeRecord {
    id: string;
    name: string;
    account: string;
    departmentKey: string;
    department: string;
    role: string;
    phone: string;
    enabled: boolean;
    createdAt: string;
  }

  type SearchForm = {
    name: string;
    account: string;
    phone: string;
    enabled: boolean | '' | undefined;
    role: string;
    createdTime: (string | Date | number)[];
  };

  type EditorForm = {
    id: string;
    name: string;
    account: string;
    departmentKey: string | undefined;
    role: string | undefined;
    phone: string;
    enabled: boolean;
  };

  type EmployeeFilterParams = {
    name?: string;
    account?: string;
    phone?: string;
    enabled?: boolean;
    role?: string;
    createdTime?: (string | Date | number)[];
    departmentKeys?: string[];
  };

  type DeptNode = {
    key: string;
    title: string;
    children?: DeptNode[];
  };

  const DEPARTMENT_TREE: DeptNode[] = [
    {
      key: 'hq',
      title: '平台总部',
      children: [
        {
          key: 'product-center',
          title: '商品中心',
          children: [
            { key: 'product-ops', title: '商品运营' },
            { key: 'category-mgmt', title: '类目管理' },
            { key: 'product-design', title: '商品设计' },
          ],
        },
        {
          key: 'order-center',
          title: '订单中心',
          children: [
            { key: 'order-fulfill', title: '履约运营' },
            { key: 'order-aftersale', title: '售后处理' },
          ],
        },
        {
          key: 'marketing-center',
          title: '营销中心',
          children: [
            { key: 'growth-ops', title: '增长运营' },
            { key: 'brand-ops', title: '品牌运营' },
          ],
        },
        {
          key: 'cs-center',
          title: '客服中心',
          children: [
            { key: 'cs-online', title: '在线客服' },
            { key: 'cs-hotline', title: '热线客服' },
          ],
        },
        {
          key: 'warehouse-center',
          title: '仓配中心',
          children: [
            { key: 'warehouse-ops', title: '仓储运营' },
            { key: 'logistics-ops', title: '物流调度' },
          ],
        },
      ],
    },
  ];

  const DEPARTMENT_LABELS: Record<string, string> = {
    hq: '平台总部',
    'product-center': '商品中心',
    'product-ops': '商品运营',
    'category-mgmt': '类目管理',
    'product-design': '商品设计',
    'order-center': '订单中心',
    'order-fulfill': '履约运营',
    'order-aftersale': '售后处理',
    'marketing-center': '营销中心',
    'growth-ops': '增长运营',
    'brand-ops': '品牌运营',
    'cs-center': '客服中心',
    'cs-online': '在线客服',
    'cs-hotline': '热线客服',
    'warehouse-center': '仓配中心',
    'warehouse-ops': '仓储运营',
    'logistics-ops': '物流调度',
  };

  const EMPLOYEE_ROLES = [
    '运营经理',
    '客服专员',
    '数据分析师',
    '产品经理',
    '开发工程师',
    '测试工程师',
    'UI 设计师',
    '仓储主管',
  ] as const;

  const EMPLOYEE_SEEDS: Array<{
    name: string;
    account: string;
    departmentKey: string;
    role: string;
    phone: string;
  }> = [
    {
      name: '林晓峰',
      account: 'linxiaofeng',
      departmentKey: 'order-fulfill',
      role: '运营经理',
      phone: '13800000003',
    },
    {
      name: '周静怡',
      account: 'zhoujingyi',
      departmentKey: 'order-aftersale',
      role: '客服专员',
      phone: '13800000004',
    },
    {
      name: '马腾',
      account: 'mateng',
      departmentKey: 'order-center',
      role: '数据分析师',
      phone: '13800000005',
    },
    {
      name: '陈雨桐',
      account: 'chenyutong',
      departmentKey: 'product-center',
      role: '产品经理',
      phone: '13800000006',
    },
    {
      name: '张明远',
      account: 'zhangmingyuan',
      departmentKey: 'product-ops',
      role: '运营经理',
      phone: '13800000007',
    },
    {
      name: '刘思琪',
      account: 'liusiqi',
      departmentKey: 'category-mgmt',
      role: '数据分析师',
      phone: '13800000008',
    },
    {
      name: '赵晓彤',
      account: 'zhaoxiaotong',
      departmentKey: 'growth-ops',
      role: '运营经理',
      phone: '13800000009',
    },
    {
      name: '王浩然',
      account: 'wanghaoran',
      departmentKey: 'cs-online',
      role: '客服专员',
      phone: '13800000010',
    },
    {
      name: '李若溪',
      account: 'liruoxi',
      departmentKey: 'warehouse-ops',
      role: '仓储主管',
      phone: '13800000011',
    },
    {
      name: '孙嘉怡',
      account: 'sunjiayi',
      departmentKey: 'product-design',
      role: 'UI 设计师',
      phone: '13800000012',
    },
    {
      name: '吴承泽',
      account: 'wuchengze',
      departmentKey: 'brand-ops',
      role: '数据分析师',
      phone: '13800000013',
    },
    {
      name: '郑雅文',
      account: 'zhengyawen',
      departmentKey: 'cs-hotline',
      role: '客服专员',
      phone: '13800000014',
    },
    {
      name: '黄俊豪',
      account: 'huangjunhao',
      departmentKey: 'logistics-ops',
      role: '开发工程师',
      phone: '13800000015',
    },
    {
      name: '许梦琪',
      account: 'xumengqi',
      departmentKey: 'product-ops',
      role: '测试工程师',
      phone: '13800000016',
    },
    {
      name: '何子涵',
      account: 'heziihan',
      departmentKey: 'order-fulfill',
      role: '开发工程师',
      phone: '13800000017',
    },
    {
      name: '高一凡',
      account: 'gaoyifan',
      departmentKey: 'marketing-center',
      role: '运营经理',
      phone: '13800000018',
    },
    {
      name: '宋佳宁',
      account: 'songjianing',
      departmentKey: 'cs-center',
      role: '产品经理',
      phone: '13800000019',
    },
    {
      name: '邓启航',
      account: 'dengqihang',
      departmentKey: 'warehouse-center',
      role: '开发工程师',
      phone: '13800000020',
    },
  ];

  function pad(n: number, len: number) {
    return String(n).padStart(len, '0');
  }

  function employeeId(n: number) {
    return `EMP${pad(n, 5)}`;
  }

  function daysAgo(index: number): string {
    const days = index % 366;
    const d = new Date();
    d.setDate(d.getDate() - days);
    d.setHours(9 + (index % 10), (index * 7) % 60, (index * 13) % 60, 0);
    return d.toISOString();
  }

  function createEmployee(
    i: number,
    seed?: (typeof EMPLOYEE_SEEDS)[number]
  ): EmployeeRecord {
    const base = seed || {
      name: `员工${i + 1}`,
      account: `user${i + 1}`,
      departmentKey: 'product-ops',
      role: EMPLOYEE_ROLES[i % EMPLOYEE_ROLES.length],
      phone: `138${pad(10000000 + (i % 89999999), 8)}`,
    };
    return {
      id: employeeId(i + 1),
      name: base.name,
      account: base.account,
      departmentKey: base.departmentKey,
      department: DEPARTMENT_LABELS[base.departmentKey] || base.departmentKey,
      role: base.role,
      phone: base.phone,
      enabled: i % 7 !== 0,
      createdAt: daysAgo(i),
    };
  }

  let employeeListAll: EmployeeRecord[] = EMPLOYEE_SEEDS.map((seed, i) =>
    createEmployee(i, seed)
  );
  let employeeSeq = employeeListAll.length;

  function collectDepartmentKeys(
    nodes: DeptNode[] | undefined,
    targetKey: string
  ): string[] | null {
    for (const node of nodes || []) {
      if (node.key === targetKey) {
        const keys: string[] = [];
        const walk = (list: DeptNode[]) => {
          list.forEach((n) => {
            keys.push(n.key);
            if (n.children) walk(n.children);
          });
        };
        walk([node]);
        return keys;
      }
      const found = collectDepartmentKeys(node.children, targetKey);
      if (found) return found;
    }
    return null;
  }

  function toDayStart(v: string | Date | number) {
    const d = v instanceof Date ? new Date(v) : new Date(v);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  }

  function toDayEnd(v: string | Date | number) {
    const d = v instanceof Date ? new Date(v) : new Date(v);
    d.setHours(23, 59, 59, 999);
    return d.getTime();
  }

  function filterEmployees(params?: EmployeeFilterParams | null) {
    let rows = employeeListAll.slice();
    if (!params) return rows;
    if (params.departmentKeys && params.departmentKeys.length) {
      const set = new Set(params.departmentKeys);
      rows = rows.filter((r) => set.has(r.departmentKey));
    }
    if (params.name) {
      const kw = String(params.name).toLowerCase();
      rows = rows.filter((r) =>
        String(r.name || '')
          .toLowerCase()
          .includes(kw)
      );
    }
    if (params.account) {
      const kw = String(params.account).toLowerCase();
      rows = rows.filter((r) =>
        String(r.account || '')
          .toLowerCase()
          .includes(kw)
      );
    }
    if (params.phone) {
      rows = rows.filter((r) =>
        String(r.phone || '').includes(String(params.phone))
      );
    }
    if (params.enabled === true || params.enabled === false) {
      rows = rows.filter((r) => r.enabled === params.enabled);
    }
    if (params.role) rows = rows.filter((r) => r.role === params.role);
    if (params.createdTime && params.createdTime.length === 2) {
      const start = toDayStart(params.createdTime[0]);
      const end = toDayEnd(params.createdTime[1]);
      rows = rows.filter((r) => {
        const ts = new Date(r.createdAt).getTime();
        return ts >= start && ts <= end;
      });
    }
    return rows;
  }

  function paginate(rows: EmployeeRecord[], page: number, pageSize: number) {
    const start = (page - 1) * pageSize;
    return {
      list: rows.slice(start, start + pageSize),
      total: rows.length,
    };
  }

  function formatDateTime(iso: string) {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return '-';
    const p = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(
      d.getHours()
    )}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
  }

  function flattenDepartmentOptions(
    nodes: DeptNode[] | undefined,
    result?: Array<{ label: string; value: string }>
  ) {
    const out = result || [];
    (nodes || []).forEach((node) => {
      if (node.key !== 'hq') out.push({ label: node.title, value: node.key });
      if (node.children) flattenDepartmentOptions(node.children, out);
    });
    return out;
  }

  function getEmployeeById(id: string) {
    return employeeListAll.find((r) => r.id === id) || null;
  }

  function addEmployee(payload: Partial<EditorForm>) {
    employeeSeq += 1;
    const departmentKey = payload.departmentKey || 'order-center';
    const row: EmployeeRecord = {
      id: employeeId(employeeSeq),
      name: payload.name || '新员工',
      account: payload.account || `user${employeeSeq}`,
      departmentKey,
      department: DEPARTMENT_LABELS[departmentKey] || departmentKey,
      role: payload.role || EMPLOYEE_ROLES[0],
      phone: payload.phone || '13800000000',
      enabled: payload.enabled !== false,
      createdAt: new Date().toISOString(),
    };
    employeeListAll.unshift(row);
    return row;
  }

  function updateEmployee(id: string, payload: Partial<EditorForm>) {
    const idx = employeeListAll.findIndex((r) => r.id === id);
    if (idx < 0) return null;
    const next: EmployeeRecord = {
      ...employeeListAll[idx],
      ...payload,
      id,
      departmentKey:
        payload.departmentKey || employeeListAll[idx].departmentKey,
      role: payload.role || employeeListAll[idx].role,
      name: payload.name ?? employeeListAll[idx].name,
      account: payload.account ?? employeeListAll[idx].account,
      phone: payload.phone ?? employeeListAll[idx].phone,
      enabled:
        payload.enabled !== undefined
          ? payload.enabled
          : employeeListAll[idx].enabled,
    };
    if (payload.departmentKey) {
      next.department =
        DEPARTMENT_LABELS[payload.departmentKey] || payload.departmentKey;
    }
    employeeListAll[idx] = next;
    return next;
  }

  function removeEmployee(id: string) {
    const before = employeeListAll.length;
    employeeListAll = employeeListAll.filter((r) => r.id !== id);
    return employeeListAll.length < before;
  }

  function removeEmployees(ids: string[]) {
    const set = new Set(ids || []);
    const before = employeeListAll.length;
    employeeListAll = employeeListAll.filter((r) => !set.has(r.id));
    return before - employeeListAll.length;
  }

  function disableEmployees(ids: string[]) {
    const set = new Set(ids || []);
    let count = 0;
    employeeListAll = employeeListAll.map((r) => {
      if (!set.has(r.id) || !r.enabled) return r;
      count += 1;
      return { ...r, enabled: false };
    });
    return count;
  }

  function toggleEmployeeEnabled(id: string, enabled: boolean) {
    const row = employeeListAll.find((r) => r.id === id);
    if (!row) return null;
    row.enabled = enabled;
    return row;
  }

  function filterKeyword(nodes: DeptNode[], keyword: string): TreeNodeData[] {
    const kw = String(keyword || '')
      .trim()
      .toLowerCase();
    if (!kw) return nodes as TreeNodeData[];
    const walk = (list: DeptNode[]): TreeNodeData[] => {
      const out: TreeNodeData[] = [];
      list.forEach((node) => {
        const children = node.children ? walk(node.children) : [];
        const hit = String(node.title || '')
          .toLowerCase()
          .includes(kw);
        if (hit || children.length) {
          out.push({
            ...node,
            children: children.length ? children : node.children,
          } as TreeNodeData);
        }
      });
      return out;
    };
    return walk(nodes);
  }

  function emptyForm(): SearchForm {
    return {
      name: '',
      account: '',
      phone: '',
      enabled: '',
      role: '',
      createdTime: [],
    };
  }

  function emptyEditor(): EditorForm {
    return {
      id: '',
      name: '',
      account: '',
      departmentKey: undefined,
      role: undefined,
      phone: '',
      enabled: true,
    };
  }

  function createDefaultColumns(): TableColumnData[] {
    return [
      {
        title: t.colName,
        dataIndex: 'name',
        minWidth: 160,
        slotName: 'name',
      },
      { title: t.colAccount, dataIndex: 'account', width: 130 },
      { title: t.colDepartment, dataIndex: 'department', width: 120 },
      { title: t.colRole, dataIndex: 'role', width: 120 },
      { title: t.colPhone, dataIndex: 'phone', width: 140 },
      {
        title: t.colCreatedTime,
        dataIndex: 'createdAt',
        width: 180,
        slotName: 'createdAt',
      },
      {
        title: t.colStatus,
        dataIndex: 'enabled',
        width: 90,
        slotName: 'enabled',
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

  const { density, setDensity } = useTableDensity();

  const densityOptions = [
    { label: t.densityDefault, value: 'medium' as TableDensity },
    { label: t.densityMedium, value: 'small' as TableDensity },
    { label: t.densitySmall, value: 'mini' as TableDensity },
  ];

  const pageRootRef = ref<HTMLElement | null>(null);
  const editorFormRef = ref<FormInstance>();
  const treeKeyword = ref('');
  const selectedKeys = ref<string[]>(['hq']);
  const expandedKeys = ref<string[]>([
    'hq',
    'product-center',
    'order-center',
    'marketing-center',
    'cs-center',
    'warehouse-center',
  ]);
  const activeDepartmentKey = ref('hq');
  const form = reactive(emptyForm());
  const isMobile = ref(
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );
  const data = ref<EmployeeRecord[]>([]);
  const loading = ref(false);
  const selectedRowKeys = ref<string[]>([]);
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
  const detail = ref<EmployeeRecord | null>(null);
  const modalVisible = ref(false);
  const modalMode = ref<'create' | 'edit'>('create');
  const editor = reactive(emptyEditor());
  const saving = ref(false);
  const editorRules = {
    name: [{ required: true, message: t.emptyName }],
    account: [{ required: true, message: t.emptyAccount }],
    departmentKey: [{ required: true, message: t.emptyDepartment }],
    role: [{ required: true, message: t.emptyRole }],
    phone: [{ required: true, message: t.emptyPhone }],
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

  const statusOptions = [
    { label: t.statusEnabled, value: true },
    { label: t.statusDisabled, value: false },
  ];
  const roleOptions = EMPLOYEE_ROLES.map((label) => ({ label, value: label }));
  const departmentOptions = flattenDepartmentOptions(DEPARTMENT_TREE);

  const treeData = computed(() =>
    filterKeyword(DEPARTMENT_TREE, treeKeyword.value)
  );
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
    return `${t.detailTitle}（${detail.value.name}）`;
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
      label: `${t.exportScopeSelected}（${selectedRowKeys.value.length}）`,
      value: 'selected',
      disabled: !selectedRowKeys.value.length,
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
    if (exportForm.scope === 'selected') return selectedRowKeys.value.length;
    if (exportForm.scope === 'page') return data.value.length;
    return pagination.total;
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

  function buildParams(): EmployeeFilterParams {
    const params: EmployeeFilterParams = {
      name: form.name || undefined,
      account: form.account || undefined,
      phone: form.phone || undefined,
      role: form.role || undefined,
    };
    const keys = collectDepartmentKeys(
      DEPARTMENT_TREE,
      activeDepartmentKey.value
    );
    if (keys) params.departmentKeys = keys;
    if (form.enabled === true || form.enabled === false) {
      params.enabled = form.enabled;
    }
    if (form.createdTime && form.createdTime.length === 2) {
      params.createdTime = form.createdTime;
    }
    return params;
  }

  function fetchData(page: number, pageSize: number) {
    loading.value = true;
    setTimeout(() => {
      const filtered = filterEmployees(buildParams());
      const res = paginate(filtered, page, pageSize);
      data.value = res.list;
      pagination.current = page;
      pagination.pageSize = pageSize;
      pagination.total = res.total;
      selectedRowKeys.value = [];
      loading.value = false;
      nextTick(() => measureTableHost());
    }, 280);
  }

  function onTreeSelect(keys: (string | number)[]) {
    if (!keys || !keys.length) return;
    const key = String(keys[0]);
    selectedKeys.value = [key];
    activeDepartmentKey.value = key;
    fetchData(1, pagination.pageSize);
  }

  function onSearch() {
    fetchData(1, pagination.pageSize);
  }

  function onReset() {
    Object.assign(form, emptyForm());
    fetchData(1, pagination.pageSize);
  }

  function onPageChange(page: number) {
    fetchData(page, pagination.pageSize);
  }

  function onPageSizeChange(pageSize: number) {
    fetchData(1, pageSize);
  }

  function onSelectionChange(keys: (string | number)[]) {
    selectedRowKeys.value = keys.map(String);
  }

  function formatTime(v: string) {
    return formatDateTime(v);
  }

  function onStatusChange(
    record: EmployeeRecord,
    enabled: string | number | boolean
  ) {
    const next = !!enabled;
    toggleEmployeeEnabled(record.id, next);
    data.value = data.value.map((r) =>
      r.id === record.id ? { ...r, enabled: next } : r
    );
    if (detail.value && detail.value.id === record.id) {
      detail.value = { ...detail.value, enabled: next };
    }
  }

  function onRefreshTable() {
    fetchData(pagination.current, pagination.pageSize);
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

  function openCreate() {
    modalMode.value = 'create';
    Object.assign(editor, emptyEditor());
    modalVisible.value = true;
    nextTick(() => editorFormRef.value?.clearValidate());
  }

  function openEdit(record: EmployeeRecord) {
    modalMode.value = 'edit';
    Object.assign(editor, {
      id: record.id,
      name: record.name,
      account: record.account,
      departmentKey: record.departmentKey,
      role: record.role,
      phone: record.phone,
      enabled: record.enabled,
    });
    modalVisible.value = true;
    nextTick(() => editorFormRef.value?.clearValidate());
  }

  function openDetail(record: EmployeeRecord) {
    detail.value = { ...record };
    drawerVisible.value = true;
  }

  function closeDrawer() {
    drawerVisible.value = false;
  }

  function closeModal() {
    modalVisible.value = false;
  }

  function onSave() {
    const formRef = editorFormRef.value;
    const runSave = () => {
      saving.value = true;
      setTimeout(() => {
        if (modalMode.value === 'create') {
          addEmployee({ ...editor });
          Message.success(t.createOk);
        } else {
          updateEmployee(editor.id, { ...editor });
          Message.success(t.updateOk);
          if (detail.value && detail.value.id === editor.id) {
            detail.value = { ...getEmployeeById(editor.id)! };
          }
        }
        saving.value = false;
        modalVisible.value = false;
        fetchData(1, pagination.pageSize);
      }, 220);
    };

    if (!formRef || typeof formRef.validate !== 'function') {
      if (!String(editor.name || '').trim()) {
        Message.warning(t.emptyName);
        return;
      }
      if (!String(editor.account || '').trim()) {
        Message.warning(t.emptyAccount);
        return;
      }
      if (!editor.departmentKey) {
        Message.warning(t.emptyDepartment);
        return;
      }
      if (!editor.role) {
        Message.warning(t.emptyRole);
        return;
      }
      if (!String(editor.phone || '').trim()) {
        Message.warning(t.emptyPhone);
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

  function onDelete(record: EmployeeRecord) {
    openConfirm({
      title: t.remove,
      content: t.deleteConfirm,
      okText: t.remove,
      cancelText: t.cancel,
      okButtonProps: { status: 'danger' },
      onOk: () => {
        removeEmployee(record.id);
        Message.success(t.deleteOk);
        if (detail.value && detail.value.id === record.id) {
          drawerVisible.value = false;
        }
        const page =
          data.value.length <= 1 && pagination.current > 1
            ? pagination.current - 1
            : pagination.current;
        fetchData(page, pagination.pageSize);
      },
    });
  }

  function ensureSelection() {
    if (!selectedRowKeys.value.length) {
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
        const n = removeEmployees(selectedRowKeys.value);
        Message.success(`${t.deleteOk}（${n} 条）`);
        if (
          detail.value &&
          selectedRowKeys.value.includes(detail.value.id)
        ) {
          drawerVisible.value = false;
        }
        const page =
          data.value.length <= selectedRowKeys.value.length &&
          pagination.current > 1
            ? pagination.current - 1
            : pagination.current;
        fetchData(page, pagination.pageSize);
      },
    });
  }

  function onBatchDisable() {
    if (!ensureSelection()) return;
    openConfirm({
      title: t.batchDisable,
      content: t.batchDisableConfirm,
      okText: t.batchDisable,
      cancelText: t.cancel,
      onOk: () => {
        const n = disableEmployees(selectedRowKeys.value);
        Message.success(`${t.batchDisableOk}（${n} 条）`);
        fetchData(pagination.current, pagination.pageSize);
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
      fetchData(1, pagination.pageSize);
    }, 600);
  }

  function onExport() {
    exportForm.scope = selectedRowKeys.value.length ? 'selected' : 'all';
    exportForm.format = 'xlsx';
    exportVisible.value = true;
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

  onMounted(() => {
    window.addEventListener('resize', onResize);
    nextTick(() => measureTableHost());
    fetchData(1, pagination.pageSize);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize);
    if (measureRetryTimer) clearTimeout(measureRetryTimer);
    if (tableHostRO) tableHostRO.disconnect();
  });
</script>
