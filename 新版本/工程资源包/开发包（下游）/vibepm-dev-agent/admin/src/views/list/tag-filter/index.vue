<template>
  <div ref="pageRootRef" class="list-tag-filter-page">
    <a-card class="general-card pro-page-card">
      <div class="pro-tag-filter">
        <div
          v-for="group in filterGroupsPrimary"
          :key="group.key"
          class="pro-tag-filter-row"
        >
          <div class="pro-tag-filter-label">{{ group.label }}</div>
          <div class="pro-tag-filter-tags">
            <span
              v-for="opt in group.options"
              :key="group.key + '-' + String(opt.value)"
              class="pro-tag-filter-item"
              :class="{ 'is-active': isTagActive(group.key, opt.value) }"
              @click="onSelectTag(group.key, opt.value)"
              >{{ opt.label }}</span
            >
          </div>
        </div>
        <div class="pro-tag-filter-search">
          <a-row class="pro-search-panel">
            <a-col
              :flex="isMobile ? '100%' : 'none'"
              class="pro-tag-filter-search-main"
            >
              <a-form
                class="pro-search-form is-collapsed"
                :model="filters"
                :layout="isMobile ? 'vertical' : 'horizontal'"
                label-align="left"
              >
                <a-row :gutter="16" class="pro-tag-filter-search-fields">
                  <a-col flex="168px">
                    <a-form-item field="owner" hide-label>
                      <a-select
                        v-model="filters.owner"
                        :options="ownerSelectOptions"
                        :placeholder="t.filterOwner"
                        allow-clear
                        @change="onSearch"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col flex="168px">
                    <a-form-item field="dealScale" hide-label>
                      <a-select
                        v-model="filters.dealScale"
                        :options="dealScaleSelectOptions"
                        :placeholder="t.filterDealScale"
                        allow-clear
                        @change="onSearch"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col flex="168px">
                    <a-form-item field="followWindow" hide-label>
                      <a-select
                        v-model="filters.followWindow"
                        :options="followWindowSelectOptions"
                        :placeholder="t.filterFollow"
                        allow-clear
                        @change="onSearch"
                      />
                    </a-form-item>
                  </a-col>
                  <a-col :flex="1" class="pro-tag-filter-search-keyword">
                    <a-form-item field="keyword" hide-label>
                      <a-input
                        v-model="filters.keyword"
                        :placeholder="t.phKeyword"
                        allow-clear
                        @press-enter="onSearch"
                      >
                        <template #prefix><icon-search /></template>
                      </a-input>
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-form>
            </a-col>
            <a-col
              :flex="isMobile ? '100%' : 'none'"
              class="pro-search-actions is-collapsed"
              :class="{ 'is-mobile': isMobile }"
            >
              <a-button type="primary" @click="onSearch">
                <template #icon><icon-search /></template>{{ t.search }}
              </a-button>
              <a-button :disabled="!hasActiveFilters" @click="onReset">
                <template #icon><icon-refresh /></template>{{ t.reset }}
              </a-button>
            </a-col>
          </a-row>
        </div>
      </div>
    </a-card>

    <a-card class="general-card">
      <div class="pro-toolbar">
        <a-space>
          <a-button type="primary" @click="openCreate">
            <template #icon><icon-plus /></template>{{ t.add }}
          </a-button>
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
        <template #level="{ record }">
          <a-tag
            class="customer-level-tag"
            :class="'customer-level-tag--' + record.level"
            size="small"
            bordered
          >
            {{ customerLevels[record.level] }}
          </a-tag>
        </template>
        <template #industry="{ record }">{{
          customerIndustries[record.industry]
        }}</template>
        <template #source="{ record }">{{
          customerSources[record.source]
        }}</template>
        <template #region="{ record }">{{
          customerRegions[record.region]
        }}</template>
        <template #status="{ record }">
          <a-badge
            :status="statusBadge[record.status] || undefined"
            :color="statusBadgeColor[record.status] || undefined"
            :text="customerStatuses[record.status]"
          />
        </template>
        <template #dealAmount="{ record }">{{
          formatAmount(record.dealAmount)
        }}</template>
        <template #lastFollowAt="{ record }">
          <span class="customer-follow-time">{{
            formatTime(record.lastFollowAt)
          }}</span>
        </template>
        <template #operations="{ record }">
          <a-space class="pro-table-ops" :size="4">
            <a-button type="text" :size="opsBtnSize" @click="openDetail(record)">{{
              t.view
            }}</a-button>
            <a-button type="text" :size="opsBtnSize" @click="openEdit(record)">{{
              t.edit
            }}</a-button>
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
      :visible="drawerVisible"
      :width="drawerWidth"
      :title="detailDrawerTitle"
      unmount-on-close
      @cancel="closeDrawer"
    >
      <template v-if="detail">
        <div class="pro-detail">
          <div class="pro-detail-section">
            <div class="pro-detail-section-title">{{ t.detailOverview }}</div>
            <a-descriptions :column="1" size="medium">
              <a-descriptions-item :label="t.colId">{{
                detail.id
              }}</a-descriptions-item>
              <a-descriptions-item :label="t.colName">{{
                detail.name
              }}</a-descriptions-item>
              <a-descriptions-item :label="t.colLevel">{{
                customerLevels[detail.level]
              }}</a-descriptions-item>
              <a-descriptions-item :label="t.colIndustry">{{
                customerIndustries[detail.industry]
              }}</a-descriptions-item>
              <a-descriptions-item :label="t.colStatus">{{
                customerStatuses[detail.status]
              }}</a-descriptions-item>
              <a-descriptions-item :label="t.colSource">{{
                customerSources[detail.source]
              }}</a-descriptions-item>
              <a-descriptions-item :label="t.colRegion">{{
                customerRegions[detail.region]
              }}</a-descriptions-item>
            </a-descriptions>
          </div>
          <div class="pro-detail-section">
            <div class="pro-detail-section-title">{{ t.detailBiz }}</div>
            <a-descriptions :column="1" size="medium">
              <a-descriptions-item :label="t.colContact">{{
                detail.contact
              }}</a-descriptions-item>
              <a-descriptions-item :label="t.colPhone">{{
                detail.phone
              }}</a-descriptions-item>
              <a-descriptions-item :label="t.colOwner">{{
                detail.owner
              }}</a-descriptions-item>
              <a-descriptions-item :label="t.colDealAmount">{{
                formatAmount(detail.dealAmount)
              }}</a-descriptions-item>
              <a-descriptions-item :label="t.colLastFollow">{{
                formatTime(detail.lastFollowAt)
              }}</a-descriptions-item>
              <a-descriptions-item :label="t.colCreatedTime">{{
                formatTime(detail.createdAt)
              }}</a-descriptions-item>
              <a-descriptions-item :label="t.colRemark">{{
                detail.remark || '-'
              }}</a-descriptions-item>
            </a-descriptions>
          </div>
        </div>
      </template>
    </a-drawer>

    <a-modal
      :visible="modalVisible"
      :title="modalTitle"
      :width="modalWidth"
      :ok-loading="saving"
      unmount-on-close
      @ok="onSave"
      @cancel="closeModal"
    >
      <a-form
        ref="editorFormRef"
        :model="editor"
        :rules="editorRules"
        layout="vertical"
      >
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item field="name" :label="t.colName">
              <a-input
                v-model="editor.name"
                :placeholder="t.phName"
                allow-clear
              />
            </a-form-item>
          </a-col>
          <a-col :span="editorColSpan">
            <a-form-item field="level" :label="t.colLevel">
              <a-select
                v-model="editor.level"
                :options="levelOptions"
                :placeholder="t.selectDefault"
                allow-clear
              />
            </a-form-item>
          </a-col>
          <a-col :span="editorColSpan">
            <a-form-item field="industry" :label="t.colIndustry">
              <a-select
                v-model="editor.industry"
                :options="industryOptions"
                :placeholder="t.selectDefault"
                allow-clear
              />
            </a-form-item>
          </a-col>
          <a-col :span="editorColSpan">
            <a-form-item field="status" :label="t.colStatus">
              <a-select
                v-model="editor.status"
                :options="statusOptions"
                :placeholder="t.selectDefault"
                allow-clear
              />
            </a-form-item>
          </a-col>
          <a-col :span="editorColSpan">
            <a-form-item field="source" :label="t.colSource">
              <a-select
                v-model="editor.source"
                :options="sourceOptions"
                :placeholder="t.selectDefault"
                allow-clear
              />
            </a-form-item>
          </a-col>
          <a-col :span="editorColSpan">
            <a-form-item field="region" :label="t.colRegion">
              <a-select
                v-model="editor.region"
                :options="regionOptions"
                :placeholder="t.selectDefault"
                allow-clear
              />
            </a-form-item>
          </a-col>
          <a-col :span="editorColSpan">
            <a-form-item field="contact" :label="t.colContact">
              <a-input
                v-model="editor.contact"
                :placeholder="t.phContact"
                allow-clear
              />
            </a-form-item>
          </a-col>
          <a-col :span="editorColSpan">
            <a-form-item field="phone" :label="t.colPhone">
              <a-input
                v-model="editor.phone"
                :placeholder="t.phPhone"
                allow-clear
              />
            </a-form-item>
          </a-col>
          <a-col :span="editorColSpan">
            <a-form-item field="owner" :label="t.colOwner">
              <a-select
                v-model="editor.owner"
                :options="ownerOptions"
                :placeholder="t.selectDefault"
                allow-clear
                allow-search
              />
            </a-form-item>
          </a-col>
          <a-col :span="editorColSpan">
            <a-form-item field="dealAmount" :label="t.colDealAmount">
              <a-input-number
                v-model="editor.dealAmount"
                :min="0"
                :step="10000"
                class="pro-field-block"
                :placeholder="t.phDealAmount"
              />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item field="remark" :label="t.colRemark">
              <a-textarea
                v-model="editor.remark"
                :placeholder="t.phRemark"
                :auto-size="{ minRows: 3, maxRows: 6 }"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
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
            <a-button type="primary" :loading="exporting" @click="submitExport">{{
              t.exportSubmit
            }}</a-button>
          </a-space>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import '@/styles/pages/list-tag-filter.css';
  import {
    computed,
    nextTick,
    onBeforeUnmount,
    onMounted,
    reactive,
    ref,
  } from 'vue';
  import { Message, Modal } from '@arco-design/web-vue';
  import type { FormInstance, TableColumnData } from '@arco-design/web-vue';
  import useTableDensity, {
    type TableDensity,
  } from '@/hooks/use-table-density';

  defineOptions({ name: 'ListTagFilterPage' });

  const t = {
    title: '标签筛选',
    add: '新建客户',
    download: '导出',
    search: '查询',
    reset: '重置',
    tagAll: '全部',
    selectDefault: '请选择',
    filterLevel: '客户等级',
    filterIndustry: '所属行业',
    filterStatus: '客户状态',
    filterSource: '客户来源',
    filterRegion: '所属区域',
    filterOwner: '负责人',
    filterDealScale: '成交规模',
    filterFollow: '跟进时效',
    colKeyword: '关键词',
    phKeyword: '搜索客户名称、联系人、手机号或编号',
    phName: '请输入客户名称',
    phContact: '请输入联系人',
    phPhone: '请输入手机号',
    phDealAmount: '请输入成交金额',
    phRemark: '请输入备注',
    colId: '客户编号',
    colName: '客户名称',
    colLevel: '客户等级',
    colIndustry: '所属行业',
    colStatus: '客户状态',
    colSource: '客户来源',
    colRegion: '所属区域',
    colContact: '联系人',
    colPhone: '手机号',
    colOwner: '负责人',
    colDealAmount: '成交金额',
    colLastFollow: '最近跟进',
    colCreatedTime: '创建时间',
    colRemark: '备注',
    colOperations: '操作',
    view: '查看',
    edit: '编辑',
    remove: '删除',
    batchDelete: '批量删除',
    cancel: '取消',
    createTitle: '新建客户',
    editTitle: '编辑客户',
    detailTitle: '客户详情',
    detailOverview: '基础信息',
    detailBiz: '业务信息',
    deleteConfirm: '确认删除该客户？删除后不可恢复。',
    batchDeleteConfirm: '确认删除选中的客户？删除后不可恢复。',
    selectRequired: '请先勾选客户',
    deleteOk: '删除成功',
    createOk: '创建成功',
    updateOk: '保存成功',
    exportOk: '导出任务已开始',
    exportTitle: '导出客户',
    exportScope: '导出范围',
    exportScopeSelected: '仅勾选数据',
    exportScopePage: '当前页',
    exportScopeAll: '全部筛选结果',
    exportFormat: '导出格式',
    exportFormatXlsx: 'Excel（.xlsx）',
    exportFormatCsv: 'CSV（.csv）',
    exportSubmit: '开始导出',
    exportCountHint: '预计导出',
    emptyName: '请输入客户名称',
    emptyLevel: '请选择客户等级',
    emptyIndustry: '请选择所属行业',
    emptyStatus: '请选择客户状态',
    emptySource: '请选择客户来源',
    emptyRegion: '请选择所属区域',
    emptyContact: '请输入联系人',
    emptyPhone: '请输入手机号',
    emptyOwner: '请选择负责人',
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

  type BadgeStatus = 'normal' | 'processing' | 'success' | 'warning' | 'danger';

  const statusBadge: Array<BadgeStatus | undefined> = [
    'processing',
    'success',
    undefined,
    'warning',
    undefined,
    undefined,
  ];
  const statusBadgeColor: Array<string | undefined> = [
    undefined,
    undefined,
    'gray',
    undefined,
    'orangered',
    'gray',
  ];

  const customerLevels = ['战略', '核心', '重点', '普通', '潜在', '观察'] as const;
  const customerIndustries = [
    '互联网',
    '制造',
    '零售',
    '金融',
    '物流',
    '传媒',
    '教育',
    '医疗',
    '地产',
    '能源',
  ] as const;
  const customerStatuses = [
    '跟进中',
    '已成交',
    '已流失',
    '待分配',
    '公海',
    '无效',
  ] as const;
  const customerSources = [
    '官网注册',
    '转介绍',
    '展会',
    '电销',
    '渠道合作',
    '广告投放',
    '社媒获客',
    '合作伙伴',
    '老客复购',
  ] as const;
  const customerRegions = [
    '华东',
    '华南',
    '华北',
    '华中',
    '西南',
    '西北',
    '海外',
  ] as const;
  const customerDealScales = [
    { label: '10 万以下', value: 'lt10' },
    { label: '10-50 万', value: '10-50' },
    { label: '50-100 万', value: '50-100' },
    { label: '100 万以上', value: 'gte100' },
  ] as const;
  const customerFollowWindows = [
    { label: '近 7 天', value: '7' },
    { label: '近 30 天', value: '30' },
    { label: '近 90 天', value: '90' },
    { label: '超 90 天未跟进', value: 'over90' },
  ] as const;
  const customerOwners = [
    '销售-张敏',
    '销售-李强',
    '销售-王芳',
    '销售-赵磊',
    '销售-陈晨',
    '销售-周宁',
    '未分配',
  ] as const;

  const CUSTOMER_NAMES = [
    '星河科技有限公司',
    '云启商贸集团',
    '北辰零售连锁',
    '青禾生鲜供应链',
    '澜海传媒工作室',
    '远景智联科技',
    '海纳供应链',
    '智权法务咨询',
    '鼎新设备制造',
    '极光云计算',
    '速达物流股份',
    '星澜数字营销',
  ] as const;
  const CUSTOMER_CONTACTS = [
    '陈明',
    '林芳',
    '王磊',
    '赵雪',
    '周凯',
    '孙婷',
    '刘洋',
    '黄倩',
  ] as const;

  type CustomerCrmRecord = {
    id: string;
    name: string;
    shortName: string;
    level: number;
    industry: number;
    status: number;
    source: number;
    region: number;
    contact: string;
    phone: string;
    owner: string;
    dealAmount: number;
    lastFollowAt: string;
    createdAt: string;
    remark: string;
  };

  type FilterForm = {
    level: number | '';
    industry: number | '';
    status: number | '';
    source: number | '';
    region: number | '';
    owner: string;
    dealScale: string;
    followWindow: string;
    keyword: string;
  };

  type EditorForm = {
    id: string;
    name: string;
    level: number | undefined;
    industry: number | undefined;
    status: number | undefined;
    source: number | undefined;
    region: number | undefined;
    contact: string;
    phone: string;
    owner: string | undefined;
    dealAmount: number | undefined;
    remark: string;
  };

  type FilterGroupKey =
    | 'level'
    | 'industry'
    | 'status'
    | 'source'
    | 'region';

  function pad(n: number, len: number) {
    return String(n).padStart(len, '0');
  }

  function customerCrmId(n: number) {
    return `CU2026${pad(n, 4)}`;
  }

  /** 确定性相对时间：按天数与 index 推算，无随机 */
  function daysAgo(days: number, index = 0): string {
    const d = new Date();
    d.setDate(d.getDate() - days);
    d.setHours(9 + (index % 10), (index * 7) % 60, (index * 13) % 60, 0);
    return d.toISOString();
  }

  function createCustomerCrm(i: number): CustomerCrmRecord {
    const name = CUSTOMER_NAMES[i % CUSTOMER_NAMES.length];
    return {
      id: customerCrmId(i + 1),
      name,
      shortName: name.replace(/(有限公司|集团|连锁|股份|工作室)$/, ''),
      level: i % customerLevels.length,
      industry: i % customerIndustries.length,
      status: i % customerStatuses.length,
      source: i % customerSources.length,
      region: i % customerRegions.length,
      contact: CUSTOMER_CONTACTS[i % CUSTOMER_CONTACTS.length],
      phone: `138${pad((10000000 + i * 137) % 100000000, 8)}`,
      owner: customerOwners[i % customerOwners.length],
      dealAmount: (((i * 37) % 518) + 3) * 10000,
      lastFollowAt: daysAgo(i % 121, i),
      createdAt: daysAgo((i * 7) % 371 + 30, i + 3),
      remark: `客户备注：${name}，关注产品方案与商务条款，需持续跟进。`,
    };
  }

  let customerCrmListAll: CustomerCrmRecord[] = Array.from(
    { length: 64 },
    (_, i) => createCustomerCrm(i)
  );
  let customerCrmSeq = customerCrmListAll.length;

  function hasSelectFilter(value: unknown): boolean {
    if (value === '' || value == null) return false;
    if (Array.isArray(value)) return value.length > 0;
    return true;
  }

  function matchSelect(value: unknown, target: number): boolean {
    if (Array.isArray(value)) return value.includes(target);
    return Number(value) === target;
  }

  function matchDealScale(amount: number, scale: string): boolean {
    const n = Number(amount) || 0;
    if (scale === 'lt10') return n < 100000;
    if (scale === '10-50') return n >= 100000 && n < 500000;
    if (scale === '50-100') return n >= 500000 && n < 1000000;
    if (scale === 'gte100') return n >= 1000000;
    return true;
  }

  function matchFollowWindow(iso: string, windowKey: string): boolean {
    if (!iso || !windowKey) return true;
    const days =
      (Date.now() - new Date(iso).getTime()) / (24 * 60 * 60 * 1000);
    if (windowKey === '7') return days <= 7;
    if (windowKey === '30') return days <= 30;
    if (windowKey === '90') return days <= 90;
    if (windowKey === 'over90') return days > 90;
    return true;
  }

  function filterCustomerCrmList(params?: Partial<FilterForm> | null) {
    let rows = customerCrmListAll.slice();
    if (!params) return rows;
    if (hasSelectFilter(params.level)) {
      rows = rows.filter((r) => matchSelect(params.level, r.level));
    }
    if (hasSelectFilter(params.industry)) {
      rows = rows.filter((r) => matchSelect(params.industry, r.industry));
    }
    if (hasSelectFilter(params.status)) {
      rows = rows.filter((r) => matchSelect(params.status, r.status));
    }
    if (hasSelectFilter(params.source)) {
      rows = rows.filter((r) => matchSelect(params.source, r.source));
    }
    if (hasSelectFilter(params.region)) {
      rows = rows.filter((r) => matchSelect(params.region, r.region));
    }
    if (params.owner) rows = rows.filter((r) => r.owner === params.owner);
    if (hasSelectFilter(params.dealScale)) {
      rows = rows.filter((r) =>
        matchDealScale(r.dealAmount, String(params.dealScale))
      );
    }
    if (hasSelectFilter(params.followWindow)) {
      rows = rows.filter((r) =>
        matchFollowWindow(r.lastFollowAt, String(params.followWindow))
      );
    }
    if (params.keyword) {
      const kw = String(params.keyword).toLowerCase();
      rows = rows.filter(
        (r) =>
          r.id.toLowerCase().includes(kw) ||
          r.name.toLowerCase().includes(kw) ||
          String(r.shortName || '')
            .toLowerCase()
            .includes(kw) ||
          String(r.contact || '')
            .toLowerCase()
            .includes(kw) ||
          String(r.phone || '').includes(kw) ||
          String(r.remark || '')
            .toLowerCase()
            .includes(kw)
      );
    }
    return rows;
  }

  function paginate(rows: CustomerCrmRecord[], page: number, pageSize: number) {
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

  function getCustomerCrmById(id: string) {
    return customerCrmListAll.find((r) => r.id === id) || null;
  }

  function addCustomerCrm(payload: Partial<EditorForm>) {
    customerCrmSeq += 1;
    const row: CustomerCrmRecord = {
      id: customerCrmId(customerCrmSeq),
      name: payload.name || '新客户',
      shortName: payload.name || '新客户',
      level: payload.level != null ? payload.level : 3,
      industry: payload.industry != null ? payload.industry : 0,
      status: payload.status != null ? payload.status : 0,
      source: payload.source != null ? payload.source : 0,
      region: payload.region != null ? payload.region : 0,
      contact: payload.contact || CUSTOMER_CONTACTS[0],
      phone: payload.phone || '13800000000',
      owner: payload.owner || customerOwners[customerOwners.length - 1],
      dealAmount: Number(payload.dealAmount) || 0,
      lastFollowAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      remark: payload.remark || '',
    };
    customerCrmListAll.unshift(row);
    return row;
  }

  function updateCustomerCrm(id: string, payload: Partial<EditorForm>) {
    const idx = customerCrmListAll.findIndex((r) => r.id === id);
    if (idx < 0) return null;
    customerCrmListAll[idx] = {
      ...customerCrmListAll[idx],
      ...payload,
      id,
      level: payload.level ?? customerCrmListAll[idx].level,
      industry: payload.industry ?? customerCrmListAll[idx].industry,
      status: payload.status ?? customerCrmListAll[idx].status,
      source: payload.source ?? customerCrmListAll[idx].source,
      region: payload.region ?? customerCrmListAll[idx].region,
      owner: payload.owner ?? customerCrmListAll[idx].owner,
      dealAmount:
        payload.dealAmount != null
          ? Number(payload.dealAmount)
          : customerCrmListAll[idx].dealAmount,
    };
    return customerCrmListAll[idx];
  }

  function removeCustomerCrm(id: string) {
    const before = customerCrmListAll.length;
    customerCrmListAll = customerCrmListAll.filter((r) => r.id !== id);
    return customerCrmListAll.length < before;
  }

  function removeCustomerCrms(ids: string[]) {
    const set = new Set(ids || []);
    const before = customerCrmListAll.length;
    customerCrmListAll = customerCrmListAll.filter((r) => !set.has(r.id));
    return before - customerCrmListAll.length;
  }

  function emptyFilters(): FilterForm {
    return {
      level: '',
      industry: '',
      status: '',
      source: '',
      region: '',
      owner: '',
      dealScale: '',
      followWindow: '',
      keyword: '',
    };
  }

  function emptyEditor(): EditorForm {
    return {
      id: '',
      name: '',
      level: undefined,
      industry: undefined,
      status: undefined,
      source: undefined,
      region: undefined,
      contact: '',
      phone: '',
      owner: undefined,
      dealAmount: undefined,
      remark: '',
    };
  }

  function createDefaultColumns(): TableColumnData[] {
    return [
      { title: t.colId, dataIndex: 'id', width: 130 },
      {
        title: t.colName,
        dataIndex: 'name',
        minWidth: 160,
        ellipsis: true,
        tooltip: true,
      },
      { title: t.colLevel, dataIndex: 'level', width: 100, slotName: 'level' },
      {
        title: t.colIndustry,
        dataIndex: 'industry',
        width: 100,
        slotName: 'industry',
      },
      {
        title: t.colStatus,
        dataIndex: 'status',
        width: 110,
        slotName: 'status',
      },
      {
        title: t.colSource,
        dataIndex: 'source',
        width: 110,
        slotName: 'source',
      },
      {
        title: t.colRegion,
        dataIndex: 'region',
        width: 90,
        slotName: 'region',
      },
      { title: t.colContact, dataIndex: 'contact', width: 90 },
      { title: t.colOwner, dataIndex: 'owner', width: 120 },
      {
        title: t.colDealAmount,
        dataIndex: 'dealAmount',
        width: 120,
        slotName: 'dealAmount',
      },
      {
        title: t.colLastFollow,
        dataIndex: 'lastFollowAt',
        width: 190,
        slotName: 'lastFollowAt',
        ellipsis: true,
        tooltip: true,
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

  function formatAmount(n: number | undefined) {
    const num = Number(n) || 0;
    return `¥${num.toLocaleString('zh-CN')}`;
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
  const editorFormRef = ref<FormInstance>();
  const filters = reactive(emptyFilters());
  const isMobile = ref(
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );
  const data = ref<CustomerCrmRecord[]>([]);
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
  const detail = ref<CustomerCrmRecord | null>(null);
  const modalVisible = ref(false);
  const modalMode = ref<'create' | 'edit'>('create');
  const editor = reactive(emptyEditor());
  const saving = ref(false);
  const exportVisible = ref(false);
  const exporting = ref(false);
  const exportForm = reactive({
    scope: 'all' as 'selected' | 'page' | 'all',
    format: 'xlsx' as 'xlsx' | 'csv',
  });
  const editorRules = {
    name: [{ required: true, message: t.emptyName }],
    level: [{ required: true, message: t.emptyLevel }],
    industry: [{ required: true, message: t.emptyIndustry }],
    status: [{ required: true, message: t.emptyStatus }],
    source: [{ required: true, message: t.emptySource }],
    region: [{ required: true, message: t.emptyRegion }],
    contact: [{ required: true, message: t.emptyContact }],
    phone: [{ required: true, message: t.emptyPhone }],
    owner: [{ required: true, message: t.emptyOwner }],
  };

  let tableHostRO: ResizeObserver | null = null;
  let measureRetryTimer: ReturnType<typeof setTimeout> | null = null;

  const withAll = <T extends { label: string; value: string | number }>(
    options: T[]
  ) => [{ label: t.tagAll, value: '' as const }, ...options];

  const filterGroupsPrimary = computed(() => [
    {
      key: 'level' as const,
      label: t.filterLevel,
      options: withAll(
        customerLevels.map((label, value) => ({ label, value }))
      ),
    },
    {
      key: 'industry' as const,
      label: t.filterIndustry,
      options: withAll(
        customerIndustries.map((label, value) => ({ label, value }))
      ),
    },
    {
      key: 'status' as const,
      label: t.filterStatus,
      options: withAll(
        customerStatuses.map((label, value) => ({ label, value }))
      ),
    },
    {
      key: 'source' as const,
      label: t.filterSource,
      options: withAll(
        customerSources.map((label, value) => ({ label, value }))
      ),
    },
    {
      key: 'region' as const,
      label: t.filterRegion,
      options: withAll(
        customerRegions.map((label, value) => ({ label, value }))
      ),
    },
  ]);

  const ownerSelectOptions = computed(() =>
    withAll(customerOwners.map((label) => ({ label, value: label })))
  );
  const dealScaleSelectOptions = computed(() =>
    withAll(customerDealScales.map((item) => ({ ...item })))
  );
  const followWindowSelectOptions = computed(() =>
    withAll(customerFollowWindows.map((item) => ({ ...item })))
  );
  const ownerOptions = customerOwners.map((label) => ({ label, value: label }));
  const levelOptions = customerLevels.map((label, value) => ({ label, value }));
  const industryOptions = customerIndustries.map((label, value) => ({
    label,
    value,
  }));
  const statusOptions = customerStatuses.map((label, value) => ({
    label,
    value,
  }));
  const sourceOptions = customerSources.map((label, value) => ({
    label,
    value,
  }));
  const regionOptions = customerRegions.map((label, value) => ({
    label,
    value,
  }));

  const localDensityOptions = [
    { label: t.densityDefault, value: 'medium' as TableDensity },
    { label: t.densityMedium, value: 'small' as TableDensity },
    { label: t.densitySmall, value: 'mini' as TableDensity },
  ];

  const modalTitle = computed(() =>
    modalMode.value === 'create' ? t.createTitle : t.editTitle
  );
  const modalWidth = computed(() =>
    isMobile.value ? 'calc(100vw - 32px)' : 560
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

  const hasActiveFilters = computed(() => {
    const f = filters;
    return (
      f.level !== '' ||
      f.industry !== '' ||
      f.status !== '' ||
      f.source !== '' ||
      f.region !== '' ||
      !!f.owner ||
      !!f.dealScale ||
      !!f.followWindow ||
      !!String(f.keyword || '').trim()
    );
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

  function normalizeFilters() {
    if (filters.owner == null) filters.owner = '';
    if (filters.dealScale == null) filters.dealScale = '';
    if (filters.followWindow == null) filters.followWindow = '';
  }

  function fetchData(
    page: number,
    pageSize: number,
    params?: Partial<FilterForm> | Record<string, never>
  ) {
    loading.value = true;
    normalizeFilters();
    setTimeout(() => {
      const filtered = filterCustomerCrmList(params || filters);
      const res = paginate(filtered, page, pageSize);
      data.value = res.list;
      pagination.current = page;
      pagination.pageSize = pageSize;
      pagination.total = res.total;
      selectedKeys.value = [];
      loading.value = false;
      nextTick(() => measureTableHost());
    }, 240);
  }

  function isTagActive(key: FilterGroupKey, value: string | number) {
    const current = filters[key];
    if (value === '') return current === '' || current == null;
    return current === value;
  }

  function onSelectTag(key: FilterGroupKey, value: string | number) {
    if (value === '') {
      filters[key] = '';
    } else {
      filters[key] = value as number;
    }
    fetchData(1, pagination.pageSize, filters);
  }

  function onSearch() {
    fetchData(1, pagination.pageSize, filters);
  }

  function onReset() {
    Object.assign(filters, emptyFilters());
    fetchData(1, pagination.pageSize, {});
  }

  function onPageChange(page: number) {
    fetchData(page, pagination.pageSize, filters);
  }

  function onPageSizeChange(pageSize: number) {
    fetchData(1, pageSize, filters);
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

  function openEdit(record: CustomerCrmRecord) {
    modalMode.value = 'edit';
    Object.assign(editor, {
      id: record.id,
      name: record.name,
      level: record.level,
      industry: record.industry,
      status: record.status,
      source: record.source,
      region: record.region,
      contact: record.contact,
      phone: record.phone,
      owner: record.owner,
      dealAmount: record.dealAmount,
      remark: record.remark || '',
    });
    modalVisible.value = true;
    nextTick(() => editorFormRef.value?.clearValidate());
  }

  function openDetail(record: CustomerCrmRecord) {
    detail.value = { ...record };
    drawerVisible.value = true;
  }

  function closeDrawer() {
    drawerVisible.value = false;
  }

  function closeModal() {
    modalVisible.value = false;
  }

  function runSave() {
    saving.value = true;
    setTimeout(() => {
      if (modalMode.value === 'create') {
        addCustomerCrm({ ...editor });
        Message.success(t.createOk);
      } else {
        updateCustomerCrm(editor.id, { ...editor });
        Message.success(t.updateOk);
        if (detail.value && detail.value.id === editor.id) {
          const next = getCustomerCrmById(editor.id);
          if (next) detail.value = { ...next };
        }
      }
      saving.value = false;
      modalVisible.value = false;
      fetchData(1, pagination.pageSize, filters);
    }, 220);
  }

  function onSave() {
    const formRef = editorFormRef.value;
    if (!formRef || typeof formRef.validate !== 'function') {
      const e = editor;
      if (!String(e.name || '').trim()) {
        Message.warning(t.emptyName);
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

  function onDelete(record: CustomerCrmRecord) {
    openConfirm({
      title: t.remove,
      content: t.deleteConfirm,
      okText: t.remove,
      cancelText: t.cancel,
      okButtonProps: { status: 'danger' },
      onOk: () => {
        removeCustomerCrm(record.id);
        Message.success(t.deleteOk);
        if (detail.value && detail.value.id === record.id) {
          drawerVisible.value = false;
        }
        const page =
          data.value.length <= 1 && pagination.current > 1
            ? pagination.current - 1
            : pagination.current;
        fetchData(page, pagination.pageSize, filters);
      },
    });
  }

  function onRefreshTable() {
    fetchData(pagination.current, pagination.pageSize, filters);
    Message.success(t.refreshOk);
  }

  function onExport() {
    exportForm.scope = selectedKeys.value.length ? 'selected' : 'all';
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
        const n = removeCustomerCrms(selectedKeys.value);
        Message.success(`${t.deleteOk}（${n} 条）`);
        if (detail.value && selectedKeys.value.includes(detail.value.id)) {
          drawerVisible.value = false;
        }
        const page =
          data.value.length <= selectedKeys.value.length &&
          pagination.current > 1
            ? pagination.current - 1
            : pagination.current;
        fetchData(page, pagination.pageSize, filters);
      },
    });
  }

  onMounted(() => {
    window.addEventListener('resize', onResize);
    nextTick(() => measureTableHost());
    fetchData(1, pagination.pageSize, filters);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', onResize);
    if (measureRetryTimer) clearTimeout(measureRetryTimer);
    if (tableHostRO) tableHostRO.disconnect();
  });
</script>
