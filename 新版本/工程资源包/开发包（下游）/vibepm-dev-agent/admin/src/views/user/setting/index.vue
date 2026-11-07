<template>
  <div class="user-setting-page">
    <a-card class="pro-page-card user-setting-header-card" :bordered="false">
      <div class="user-setting-header">
        <div class="user-setting-identity">
          <div
            class="user-setting-avatar-wrap"
            :title="t.changeAvatar"
            role="button"
            tabindex="0"
            @click="onAvatarClick"
            @keydown.enter.prevent="onAvatarClick"
          >
            <input
              ref="avatarInput"
              class="user-setting-avatar-input"
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              @change="onAvatarChange"
              @click.stop
            />
            <div
              class="user-setting-avatar-shell"
              :class="{ 'has-image': !!avatarUrl }"
            >
              <img
                v-if="avatarUrl"
                class="user-setting-avatar-img"
                :src="avatarUrl"
                alt="avatar"
              />
              <a-avatar
                v-else
                :size="72"
                class="pro-avatar-brand user-setting-avatar-fallback"
                :auto-fix-font-size="false"
              >
                <icon-avatar />
              </a-avatar>
            </div>
            <span class="user-setting-avatar-camera" aria-hidden="true"
              ><icon-camera
            /></span>
          </div>
          <div class="user-setting-identity-meta">
            <div class="user-setting-identity-name">{{ userInfo.realName }}</div>
            <div class="user-setting-identity-account">
              {{ t.labelAccount }}：{{ userInfo.name }}
            </div>
          </div>
        </div>
        <div class="user-setting-header-content">
          <div class="user-setting-field-grid">
            <div class="user-setting-field">
              <div class="user-setting-field-label">{{ t.labelVerified }}</div>
              <div class="user-setting-field-value">
                <a-tag
                  v-if="userInfo.verified"
                  color="green"
                  size="small"
                  class="user-setting-verified-tag"
                >
                  {{ t.valueVerified }}
                </a-tag>
                <a-tag
                  v-else
                  color="orangered"
                  size="small"
                  class="user-setting-verified-tag"
                >
                  {{ t.valueNotVerified }}
                </a-tag>
              </div>
            </div>
            <div class="user-setting-field">
              <div class="user-setting-field-label">{{ t.labelPhone }}</div>
              <div class="user-setting-field-value">
                <span class="user-setting-field-text">{{
                  maskPhone(userInfo.phoneNumber)
                }}</span>
              </div>
            </div>
            <div class="user-setting-field">
              <div class="user-setting-field-label">{{ t.labelEmail }}</div>
              <div class="user-setting-field-value">
                <span class="user-setting-field-text">{{
                  maskEmail(userInfo.email)
                }}</span>
              </div>
            </div>
            <div class="user-setting-field">
              <div class="user-setting-field-label">{{ t.labelDepartment }}</div>
              <div class="user-setting-field-value">
                <span class="user-setting-field-text">{{
                  userInfo.department
                }}</span>
              </div>
            </div>
            <div class="user-setting-field">
              <div class="user-setting-field-label">{{ t.labelJobTitle }}</div>
              <div class="user-setting-field-value">
                <span class="user-setting-field-text">{{
                  userInfo.jobTitle
                }}</span>
              </div>
            </div>
            <div class="user-setting-field">
              <div class="user-setting-field-label">
                {{ t.labelRegistrationTime }}
              </div>
              <div class="user-setting-field-value">
                <span class="user-setting-field-text">{{
                  userInfo.registrationTime
                }}</span>
              </div>
            </div>
            <div class="user-setting-field">
              <div class="user-setting-field-label">{{ t.labelOffice }}</div>
              <div class="user-setting-field-value">
                <span class="user-setting-field-text">{{ userInfo.office }}</span>
              </div>
            </div>
            <div class="user-setting-field">
              <div class="user-setting-field-label">{{ t.labelLastLogin }}</div>
              <div class="user-setting-field-value">
                <span class="user-setting-field-text">{{
                  userInfo.lastLogin
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a-card>

    <a-card class="pro-page-card user-setting-tabs-card" :bordered="false">
      <a-tabs
        v-model:active-key="activeTab"
        type="rounded"
        class="user-setting-tabs"
        :header-padding="false"
      >
        <a-tab-pane key="basic" :title="t.basicInfo">
          <a-form
            ref="basicFormRef"
            :model="form"
            layout="horizontal"
            auto-label-width
            class="user-setting-form"
          >
            <a-form-item
              field="realName"
              :label="t.infoRealName"
              :rules="[{ required: true, message: t.infoRealNamePlaceholder }]"
            >
              <a-input
                v-model="form.realName"
                :placeholder="t.infoRealNamePlaceholder"
                allow-clear
              />
            </a-form-item>
            <a-form-item field="name" :label="t.infoAccount">
              <a-input v-model="form.name" disabled />
            </a-form-item>
            <a-form-item
              field="gender"
              :label="t.infoGender"
              :rules="[{ required: true, message: t.infoGenderPlaceholder }]"
            >
              <a-radio-group v-model="form.gender" :options="genderOptions" />
            </a-form-item>
            <a-form-item
              field="birthday"
              :label="t.infoBirthday"
              :rules="[{ required: true, message: t.infoBirthdayPlaceholder }]"
            >
              <a-date-picker
                v-model="form.birthday"
                style="width: 100%"
                :placeholder="t.infoBirthdayPlaceholder"
                allow-clear
              />
            </a-form-item>
            <a-form-item
              field="phoneNumber"
              :label="t.infoPhone"
              :rules="[{ required: true, message: t.infoPhonePlaceholder }]"
            >
              <a-input
                v-model="form.phoneNumber"
                :placeholder="t.infoPhonePlaceholder"
                allow-clear
              />
            </a-form-item>
            <a-form-item
              field="email"
              :label="t.infoEmail"
              :rules="[
                {
                  required: true,
                  type: 'email',
                  message: t.infoEmailPlaceholder,
                },
              ]"
            >
              <a-input
                v-model="form.email"
                :placeholder="t.infoEmailPlaceholder"
                allow-clear
              />
            </a-form-item>
            <a-form-item
              field="department"
              :label="t.infoDepartment"
              :rules="[
                { required: true, message: t.infoDepartmentPlaceholder },
              ]"
            >
              <a-select
                v-model="form.department"
                :options="departmentOptions"
                :placeholder="t.placeholderSelect"
                allow-clear
              />
            </a-form-item>
            <a-form-item
              field="jobTitle"
              :label="t.infoJobTitle"
              :rules="[{ required: true, message: t.infoJobTitlePlaceholder }]"
            >
              <a-input
                v-model="form.jobTitle"
                :placeholder="t.infoJobTitlePlaceholder"
                allow-clear
              />
            </a-form-item>
            <a-form-item field="employeeNo" :label="t.infoEmployeeNo">
              <a-input
                v-model="form.employeeNo"
                :placeholder="t.infoEmployeeNoPlaceholder"
                allow-clear
              />
            </a-form-item>
            <a-form-item field="office" :label="t.infoOffice">
              <a-input
                v-model="form.office"
                :placeholder="t.infoOfficePlaceholder"
                allow-clear
              />
            </a-form-item>
            <a-form-item field="registrationTime" :label="t.infoHireDate">
              <a-input v-model="form.registrationTime" disabled />
            </a-form-item>
            <a-form-item>
              <a-space>
                <a-button type="primary" @click="onSave">{{ t.save }}</a-button>
                <a-button @click="onReset">{{ t.reset }}</a-button>
              </a-space>
            </a-form-item>
          </a-form>
        </a-tab-pane>

        <a-tab-pane key="security" :title="t.security">
          <div class="user-setting-security">
            <div
              v-for="item in securityItems"
              :key="item.key"
              class="user-setting-security-item"
              role="button"
              tabindex="0"
              @click="onSecurityAction(item)"
              @keydown.enter.prevent="onSecurityAction(item)"
            >
              <div class="user-setting-security-title">
                <span class="user-setting-security-icon" aria-hidden="true">
                  <component :is="item.icon" />
                </span>
                <span>{{ item.title }}</span>
              </div>
              <div class="user-setting-security-content">
                <div
                  class="user-setting-security-text"
                  :class="{ 'is-placeholder': !item.value }"
                >
                  {{ item.value || item.placeholder }}
                </div>
                <a-button
                  type="text"
                  class="user-setting-security-action"
                  @click.stop="onSecurityAction(item)"
                >
                  {{ item.action === 'edit' ? t.btnEdit : t.btnSet }}
                </a-button>
              </div>
            </div>
          </div>
        </a-tab-pane>

        <a-tab-pane key="verified" :title="t.tabVerified">
          <div class="user-setting-verified">
            <div class="user-setting-verified-head">
              <div class="user-setting-verified-title">
                {{ t.verifiedEnterprise }}
              </div>
              <a-button
                type="text"
                class="user-setting-verified-action"
                @click="onEditVerified"
              >
                <template #icon><icon-edit /></template>
                {{ t.editVerifiedSubject }}
              </a-button>
            </div>
            <div class="user-setting-verified-enterprise">
              <div class="user-setting-verified-grid">
                <div class="user-setting-verified-item">
                  <div class="user-setting-verified-label">
                    {{ t.verifiedAccountType }}
                  </div>
                  <div class="user-setting-verified-value">
                    {{ verifiedInfo.accountType }}
                  </div>
                </div>
                <div class="user-setting-verified-item">
                  <div class="user-setting-verified-label">
                    {{ t.verifiedStatus }}
                  </div>
                  <div class="user-setting-verified-value">
                    <a-tag color="green" size="small">{{
                      verifiedInfo.status
                    }}</a-tag>
                  </div>
                </div>
                <div class="user-setting-verified-item">
                  <div class="user-setting-verified-label">
                    {{ t.verifiedTime }}
                  </div>
                  <div class="user-setting-verified-value">
                    {{ verifiedInfo.verifiedTime }}
                  </div>
                </div>
                <div class="user-setting-verified-item">
                  <div class="user-setting-verified-label">
                    {{ t.verifiedLegalPerson }}
                  </div>
                  <div class="user-setting-verified-value">
                    {{ verifiedInfo.legalPersonName }}
                  </div>
                </div>
                <div class="user-setting-verified-item">
                  <div class="user-setting-verified-label">
                    {{ t.verifiedCertType }}
                  </div>
                  <div class="user-setting-verified-value">
                    {{ verifiedInfo.certificateType }}
                  </div>
                </div>
                <div class="user-setting-verified-item">
                  <div class="user-setting-verified-label">
                    {{ t.verifiedCertNumber }}
                  </div>
                  <div class="user-setting-verified-value">
                    {{ verifiedInfo.certificationNumber }}
                  </div>
                </div>
                <div class="user-setting-verified-item">
                  <div class="user-setting-verified-label">
                    {{ t.verifiedEnterpriseName }}
                  </div>
                  <div class="user-setting-verified-value">
                    {{ verifiedInfo.enterpriseName }}
                  </div>
                </div>
                <div class="user-setting-verified-item">
                  <div class="user-setting-verified-label">
                    {{ t.verifiedEnterpriseCertType }}
                  </div>
                  <div class="user-setting-verified-value">
                    {{ verifiedInfo.enterpriseCertificateType }}
                  </div>
                </div>
                <div class="user-setting-verified-item">
                  <div class="user-setting-verified-label">
                    {{ t.verifiedOrgCode }}
                  </div>
                  <div class="user-setting-verified-value">
                    {{ verifiedInfo.organizationCode }}
                  </div>
                </div>
              </div>
            </div>

            <div
              class="user-setting-verified-title user-setting-verified-records-title"
            >
              {{ t.verifiedRecords }}
            </div>
            <a-table
              :columns="verifiedColumns"
              :data="verifiedRecords"
              :pagination="false"
              row-key="key"
              :bordered="false"
            >
              <template #authStatus="{ record }">
                <a-badge
                  v-if="record.authStatus === 'waiting'"
                  status="processing"
                  :text="t.verifiedStatusWaiting"
                />
                <a-badge
                  v-else
                  status="success"
                  :text="t.verifiedStatusSuccess"
                />
              </template>
              <template #operation="{ record }">
                <a-space :size="4">
                  <a-button
                    type="text"
                    size="small"
                    class="user-setting-verified-op"
                    @click="onViewRecord(record)"
                  >
                    <template #icon><icon-eye /></template>
                    {{ t.verifiedView }}
                  </a-button>
                  <a-button
                    v-if="record.authStatus === 'waiting'"
                    type="text"
                    size="small"
                    status="danger"
                    class="user-setting-verified-op"
                    @click="onRevokeRecord(record)"
                  >
                    <template #icon><icon-undo /></template>
                    {{ t.verifiedRevoke }}
                  </a-button>
                </a-space>
              </template>
            </a-table>
          </div>
        </a-tab-pane>
      </a-tabs>
    </a-card>

    <a-modal
      :visible="verifiedEditVisible"
      :title="t.editVerifiedSubject"
      :width="520"
      :mask-closable="false"
      unmount-on-close
      @ok="onVerifiedEditOk"
      @cancel="onVerifiedEditCancel"
    >
      <a-form :model="verifiedEditForm" layout="vertical">
        <a-form-item :label="t.verifiedEnterpriseName" required>
          <a-input
            v-model="verifiedEditForm.enterpriseName"
            :placeholder="t.verifiedEnterpriseNamePlaceholder"
            allow-clear
          />
        </a-form-item>
        <a-form-item :label="t.verifiedOrgCode" required>
          <a-input
            v-model="verifiedEditForm.organizationCode"
            :placeholder="t.verifiedOrgCodePlaceholder"
            allow-clear
          />
        </a-form-item>
        <a-form-item :label="t.verifiedLegalPerson" required>
          <a-input
            v-model="verifiedEditForm.legalPersonName"
            :placeholder="t.verifiedLegalPersonPlaceholder"
            allow-clear
          />
        </a-form-item>
        <a-form-item :label="t.verifiedCertNumber" required>
          <a-input
            v-model="verifiedEditForm.certificationNumber"
            :placeholder="t.verifiedCertNumberPlaceholder"
            allow-clear
          />
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal
      :visible="verifiedDetailVisible"
      :title="t.verifiedDetailTitle"
      :width="560"
      :footer="false"
      unmount-on-close
      @cancel="onVerifiedDetailCancel"
    >
      <a-descriptions
        v-if="verifiedDetailRecord"
        :column="1"
        size="large"
        class="user-setting-verified-detail"
      >
        <a-descriptions-item :label="t.verifiedAuthType">{{
          verifiedDetailRecord.authType
        }}</a-descriptions-item>
        <a-descriptions-item :label="t.verifiedAuthContent">{{
          verifiedDetailRecord.authContent
        }}</a-descriptions-item>
        <a-descriptions-item :label="t.verifiedAuthStatus">
          <a-badge
            v-if="verifiedDetailRecord.authStatus === 'waiting'"
            status="processing"
            :text="t.verifiedStatusWaiting"
          />
          <a-badge
            v-else
            status="success"
            :text="t.verifiedStatusSuccess"
          />
        </a-descriptions-item>
        <a-descriptions-item :label="t.verifiedCreatedTime">{{
          verifiedDetailRecord.createdTime
        }}</a-descriptions-item>
      </a-descriptions>
    </a-modal>

    <a-modal
      :visible="securityModalVisible"
      :title="securityModalTitle"
      :width="480"
      :mask-closable="false"
      unmount-on-close
      @ok="onSecurityModalOk"
      @cancel="onSecurityModalCancel"
    >
      <a-form
        :model="securityForm"
        layout="vertical"
        class="user-setting-security-form"
      >
        <template v-if="securityModalKey === 'password'">
          <a-form-item :label="t.securityOldPassword" required>
            <a-input-password
              v-model="securityForm.oldPassword"
              :placeholder="t.securityOldPasswordPlaceholder"
              allow-clear
            />
          </a-form-item>
          <a-form-item :label="t.securityNewPassword" required>
            <a-input-password
              v-model="securityForm.newPassword"
              :placeholder="t.securityNewPasswordPlaceholder"
              allow-clear
            />
          </a-form-item>
          <a-form-item :label="t.securityConfirmPassword" required>
            <a-input-password
              v-model="securityForm.confirmPassword"
              :placeholder="t.securityConfirmPasswordPlaceholder"
              allow-clear
            />
          </a-form-item>
        </template>
        <template v-else-if="securityModalKey === 'question'">
          <a-form-item :label="t.securityQuestionLabel" required>
            <a-select
              v-model="securityForm.question"
              :options="securityQuestionOptions"
              :placeholder="t.placeholderSelect"
              allow-clear
            />
          </a-form-item>
          <a-form-item :label="t.securityAnswerLabel" required>
            <a-input
              v-model="securityForm.answer"
              :placeholder="t.securityAnswerPlaceholder"
              allow-clear
            />
          </a-form-item>
        </template>
        <template v-else-if="securityModalKey === 'phone'">
          <a-form-item :label="t.securityPhoneLabel" required>
            <a-input
              v-model="securityForm.phone"
              :placeholder="t.infoPhonePlaceholder"
              allow-clear
            />
          </a-form-item>
          <a-form-item :label="t.securityCodeLabel" required>
            <div class="user-setting-security-code-row">
              <a-input
                v-model="securityForm.code"
                :placeholder="t.securityCodePlaceholder"
                allow-clear
              />
              <a-button type="outline" @click="onSendSecurityCode">{{
                t.securitySendCode
              }}</a-button>
            </div>
          </a-form-item>
        </template>
        <template v-else-if="securityModalKey === 'email'">
          <a-form-item :label="t.securityEmailLabel" required>
            <a-input
              v-model="securityForm.email"
              :placeholder="t.infoEmailPlaceholder"
              allow-clear
            />
          </a-form-item>
          <a-form-item :label="t.securityCodeLabel" required>
            <div class="user-setting-security-code-row">
              <a-input
                v-model="securityForm.code"
                :placeholder="t.securityCodePlaceholder"
                allow-clear
              />
              <a-button type="outline" @click="onSendSecurityCode">{{
                t.securitySendCode
              }}</a-button>
            </div>
          </a-form-item>
        </template>
      </a-form>
    </a-modal>

    <a-modal
      :visible="cropVisible"
      :title="t.cropTitle"
      :width="468"
      :mask-closable="false"
      unmount-on-close
      modal-class="avatar-crop-modal"
      @cancel="onCropCancel"
    >
      <div class="avatar-crop">
        <div
          class="avatar-crop-stage"
          :class="{ 'is-dragging': cropDragging }"
          @mousedown.prevent="onCropPointerDown"
          @mousemove="onCropPointerMove"
          @mouseup="onCropPointerUp"
          @mouseleave="onCropPointerUp"
          @wheel.prevent="onCropWheel"
        >
          <img
            v-if="cropSourceUrl"
            ref="cropImage"
            class="avatar-crop-image"
            :src="cropSourceUrl"
            :style="cropImageStyle"
            alt="crop"
            draggable="false"
            @load="onCropImageLoad"
          />
          <div class="avatar-crop-mask" aria-hidden="true"></div>
        </div>
        <div class="avatar-crop-toolbar">
          <span class="avatar-crop-toolbar-label">{{ t.cropZoom }}</span>
          <a-slider
            v-model="cropZoom"
            :min="1"
            :max="3"
            :step="0.01"
            :show-tooltip="false"
          />
        </div>
      </div>
      <template #footer>
        <a-space>
          <a-button @click="onCropCancel">{{ t.cropCancel }}</a-button>
          <a-button @click="onCropReselect">{{ t.cropReselect }}</a-button>
          <a-button
            type="primary"
            :disabled="!cropReady"
            @click="onCropConfirm"
            >{{ t.cropConfirm }}</a-button
          >
        </a-space>
      </template>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
  import '@/styles/pages/user.css';
  import { nextTick, onMounted, reactive, ref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { Message, Modal } from '@arco-design/web-vue';
  import type { FormInstance, TableColumnData } from '@arco-design/web-vue';
  import { useUserStore } from '@/store';
  import useAvatarCrop from '@/hooks/use-avatar-crop';

  defineOptions({ name: 'Setting' });

  /** Local copy from frame/admin ArcoProLocale.userSetting */
  const t = {
    title: '用户设置',
    basicInfo: '员工信息',
    security: '安全设置',
    tabVerified: '实名认证',
    save: '保存',
    reset: '重置',
    saveSuccess: '保存成功',
    btnEdit: '修改',
    btnSet: '设置',
    labelName: '账号',
    labelRealName: '姓名',
    labelAccount: '账号',
    labelAccountId: '账号ID',
    labelVerified: '实名认证',
    labelPhone: '手机号码',
    labelEmail: '工作邮箱',
    labelDepartment: '所属部门',
    labelJobTitle: '岗位',
    labelOffice: '办公地点',
    labelLastLogin: '最后登录',
    labelRegistrationTime: '入职时间',
    valueVerified: '已认证',
    valueNotVerified: '未认证',
    infoRealName: '姓名',
    infoRealNamePlaceholder: '请输入员工姓名',
    infoAccount: '账号',
    infoUserName: '账号',
    infoUserNamePlaceholder: '请输入登录账号',
    infoAccountId: '账号',
    infoGender: '性别',
    infoGenderPlaceholder: '请选择性别',
    genderMale: '男',
    genderFemale: '女',
    infoBirthday: '生日',
    infoBirthdayPlaceholder: '请选择生日',
    infoPhone: '手机号码',
    infoPhonePlaceholder: '请输入手机号码',
    infoEmail: '工作邮箱',
    infoEmailPlaceholder: '请输入工作邮箱，如name@company.com',
    infoDepartment: '所属部门',
    infoDepartmentPlaceholder: '请选择所属部门',
    infoJobTitle: '岗位',
    infoJobTitlePlaceholder: '请输入岗位名称',
    infoEmployeeNo: '工号',
    infoEmployeeNoPlaceholder: '请输入员工工号',
    infoOffice: '办公地点',
    infoOfficePlaceholder: '请输入办公地点',
    infoHireDate: '入职时间',
    placeholderSelect: '请选择',
    securityPassword: '登录密码',
    securityPasswordTips:
      '已设置。密码至少6位字符，支持数字、字母和除空格外的特殊字符，且必须同时包含数字和大小写字母。',
    securityQuestion: '密保问题',
    securityQuestionPlaceholder:
      '您暂未设置密保问题，密保问题可以有效的保护账号的安全。',
    securityQuestionSetTips: '已设置密保问题，可用于找回密码与身份校验。',
    securityPhone: '安全手机',
    securityPhoneTips: '已绑定：',
    securityEmail: '安全邮箱',
    securityEmailPlaceholder:
      '您暂未设置邮箱，绑定邮箱可以用来找回密码、接收通知等。',
    securityEmailBoundTips: '已绑定：',
    securityOldPassword: '当前密码',
    securityOldPasswordPlaceholder: '请输入当前密码',
    securityNewPassword: '新密码',
    securityNewPasswordPlaceholder: '请输入新密码',
    securityConfirmPassword: '确认密码',
    securityConfirmPasswordPlaceholder: '请再次输入新密码',
    securityPasswordMismatch: '两次输入的新密码不一致',
    securityQuestionLabel: '密保问题',
    securityAnswerLabel: '密保答案',
    securityAnswerPlaceholder: '请输入密保答案',
    securityPhoneLabel: '安全手机',
    securityEmailLabel: '安全邮箱',
    securityCodeLabel: '验证码',
    securityCodePlaceholder: '请输入验证码',
    securitySendCode: '发送验证码',
    securityCodeSent: '验证码已发送',
    securityFormRequired: '请完善必填信息',
    securitySaveSuccess: '安全设置已更新',
    verifiedEnterprise: '企业实名认证',
    editVerifiedSubject: '修改认证主体',
    verifiedAccountType: '账号类型',
    verifiedStatus: '认证状态',
    verifiedTime: '认证时间',
    verifiedLegalPerson: '法人姓名',
    verifiedLegalPersonPlaceholder: '请输入法人姓名',
    verifiedCertType: '法人证件类型',
    verifiedCertNumber: '法人认证号码',
    verifiedCertNumberPlaceholder: '请输入法人认证号码',
    verifiedEnterpriseName: '企业名称',
    verifiedEnterpriseNamePlaceholder: '请输入企业名称',
    verifiedEnterpriseCertType: '企业证件类型',
    verifiedOrgCode: '组织机构代码',
    verifiedOrgCodePlaceholder: '请输入组织机构代码',
    verifiedRecords: '认证记录',
    verifiedAuthType: '认证类型',
    verifiedAuthContent: '认证内容',
    verifiedAuthStatus: '当前状态',
    verifiedCreatedTime: '创建时间',
    verifiedOperation: '操作',
    verifiedView: '查看',
    verifiedRevoke: '撤回',
    verifiedRevokeTitle: '撤回认证申请',
    verifiedRevokeConfirm: '确认撤回该认证申请？撤回后需重新提交。',
    verifiedDetailTitle: '认证详情',
    verifiedEditSuccess: '认证主体已更新',
    verifiedStatusSuccess: '已通过',
    verifiedStatusWaiting: '审核中',
    changeAvatar: '更换头像',
    avatarTip: '点击上传头像',
    avatarSuccess: '头像已更新',
    avatarInvalid: '请选择图片文件',
    avatarTooLarge: '图片大小不能超过 2MB',
    cropTitle: '裁剪头像',
    cropZoom: '缩放',
    cropTip: '拖拽调整位置，滚轮或滑块缩放',
    cropCancel: '取消',
    cropReselect: '重新选择',
    cropConfirm: '确定',
    cropNotReady: '请等待图片加载完成',
    cropFailed: '裁切失败，请重试',
    editTip: '原型演示：修改设置',
    setTip: '原型演示：去设置',
    editVerifiedTip: '原型演示：修改认证主体',
    viewTip: '原型演示：查看认证详情',
    revokeSuccess: '已撤回认证申请',
  };

  type SettingTab = 'basic' | 'security' | 'verified';
  type SecurityAction = 'edit' | 'set';
  type AuthStatus = 'waiting' | 'success';

  type UserInfoState = {
    name: string;
    realName: string;
    accountId: string;
    phoneNumber: string;
    email: string;
    department: string;
    jobTitle: string;
    employeeNo: string;
    office: string;
    gender: string;
    birthday: string;
    registrationTime: string;
    lastLogin: string;
    verified: boolean;
  };

  type BasicFormState = {
    realName: string;
    name: string;
    accountId: string;
    gender: string;
    birthday: string;
    phoneNumber: string;
    email: string;
    department: string;
    jobTitle: string;
    employeeNo: string;
    office: string;
    registrationTime: string;
  };

  type SecurityItem = {
    key: string;
    icon: string;
    title: string;
    value: string;
    placeholder?: string;
    action: SecurityAction;
  };

  type VerifiedRecord = {
    key: string;
    authType: string;
    authContent: string;
    authStatus: AuthStatus;
    createdTime: string;
  };

  const route = useRoute();
  const userStore = useUserStore();

  const {
    avatarInput,
    cropImage,
    avatarUrl,
    cropVisible,
    cropSourceUrl,
    cropZoom,
    cropDragging,
    cropReady,
    cropImageStyle,
    onAvatarClick,
    onAvatarChange,
    onCropImageLoad,
    onCropPointerDown,
    onCropPointerMove,
    onCropPointerUp,
    onCropWheel,
    onCropCancel,
    onCropReselect,
    onCropConfirm,
  } = useAvatarCrop({
    avatarSuccess: t.avatarSuccess,
    avatarInvalid: t.avatarInvalid,
    avatarTooLarge: t.avatarTooLarge,
    cropNotReady: t.cropNotReady,
    cropFailed: t.cropFailed,
  });

  function resolveActiveTab(): SettingTab {
    const tab = String(route.query.tab || '');
    if (tab === 'security' || tab === 'basic' || tab === 'verified') {
      return tab;
    }
    return 'basic';
  }

  const authName = userStore.name || '王立群';
  const initialUserInfo: UserInfoState = {
    name: 'wangliqun',
    realName: authName,
    accountId: 'wangliqun',
    phoneNumber: '15000000000',
    email: 'wanglq@company.com',
    department: '产品设计部',
    jobTitle: '高级产品经理',
    employeeNo: 'E20210086',
    office: '北京 · 海淀区',
    gender: 'male',
    birthday: '1992-08-16',
    registrationTime: '2013-05-10 12:10:00',
    lastLogin: '2026-08-08 09:32:18',
    verified: true,
  };

  const createFormDefaults = (info: UserInfoState): BasicFormState => ({
    realName: info.realName,
    name: info.name,
    accountId: info.accountId,
    gender: info.gender,
    birthday: info.birthday,
    phoneNumber: info.phoneNumber,
    email: info.email,
    department: info.department,
    jobTitle: info.jobTitle,
    employeeNo: info.employeeNo,
    office: info.office,
    registrationTime: info.registrationTime,
  });

  const activeTab = ref<SettingTab>(resolveActiveTab());
  const userInfo = reactive<UserInfoState>({ ...initialUserInfo });
  const formDefaults = reactive<BasicFormState>(
    createFormDefaults(initialUserInfo)
  );
  const form = reactive<BasicFormState>({ ...formDefaults });
  const basicFormRef = ref<FormInstance>();

  const genderOptions = [
    { label: t.genderMale, value: 'male' },
    { label: t.genderFemale, value: 'female' },
  ];

  const departmentOptions = [
    { label: '产品设计部', value: '产品设计部' },
    { label: '研发中心', value: '研发中心' },
    { label: '市场运营部', value: '市场运营部' },
    { label: '人力资源部', value: '人力资源部' },
    { label: '财务部', value: '财务部' },
  ];

  const securityItems = ref<SecurityItem[]>([
    {
      key: 'password',
      icon: 'icon-lock',
      title: t.securityPassword,
      value: t.securityPasswordTips,
      action: 'edit',
    },
    {
      key: 'question',
      icon: 'icon-safe',
      title: t.securityQuestion,
      value: '',
      placeholder: t.securityQuestionPlaceholder,
      action: 'set',
    },
    {
      key: 'phone',
      icon: 'icon-mobile',
      title: t.securityPhone,
      value: '150******50',
      action: 'edit',
    },
    {
      key: 'email',
      icon: 'icon-email',
      title: t.securityEmail,
      value: '',
      placeholder: t.securityEmailPlaceholder,
      action: 'set',
    },
  ]);

  const securityModalVisible = ref(false);
  const securityModalKey = ref('');
  const securityModalTitle = ref('');
  const securityForm = reactive({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    question: undefined as string | undefined,
    answer: '',
    phone: '',
    email: '',
    code: '',
  });

  const securityQuestionOptions = [
    { label: '您的出生地是？', value: 'birthplace' },
    { label: '您母亲的姓名是？', value: 'mother' },
    { label: '您小学的校名是？', value: 'school' },
  ];

  const verifiedEditVisible = ref(false);
  const verifiedEditForm = reactive({
    enterpriseName: '',
    organizationCode: '',
    legalPersonName: '',
    certificationNumber: '',
  });
  const verifiedDetailVisible = ref(false);
  const verifiedDetailRecord = ref<VerifiedRecord | null>(null);

  const verifiedInfo = reactive({
    accountType: '企业账号',
    status: '已认证',
    verifiedTime: '2018-10-22 14:53:12',
    legalPersonName: '李**',
    certificateType: '中国身份证',
    certificationNumber: '130************123',
    enterpriseName: '低调有实力的企业',
    enterpriseCertificateType: '企业营业执照',
    organizationCode: '7*******9',
  });

  const verifiedRecords = ref<VerifiedRecord[]>([
    {
      key: '1',
      authType: '企业证件认证',
      authContent: '企业实名认证，法人姓名：李**',
      authStatus: 'waiting',
      createdTime: '2021-02-28 10:30:50',
    },
    {
      key: '2',
      authType: '企业证件认证',
      authContent: '企业实名认证，法人姓名：李**',
      authStatus: 'success',
      createdTime: '2020-05-13 08:00:00',
    },
  ]);

  const verifiedColumns: TableColumnData[] = [
    { title: t.verifiedAuthType, dataIndex: 'authType' },
    { title: t.verifiedAuthContent, dataIndex: 'authContent' },
    { title: t.verifiedAuthStatus, slotName: 'authStatus', width: 120 },
    { title: t.verifiedCreatedTime, dataIndex: 'createdTime', width: 180 },
    { title: t.verifiedOperation, slotName: 'operation', width: 140 },
  ];

  function maskPhone(phone: string) {
    const value = String(phone || '');
    if (value.length < 7) return value;
    return `${value.slice(0, 3)}****${value.slice(-4)}`;
  }

  function maskEmail(email: string) {
    const value = String(email || '');
    const at = value.indexOf('@');
    if (at <= 0) return value;
    const name = value.slice(0, at);
    const domain = value.slice(at);
    const keep = Math.min(4, name.length);
    return `${name.slice(0, keep)}****${domain}`;
  }

  function syncShellUserProfile() {
    userStore.setInfo({
      name: form.realName,
      email: form.email,
      organizationName: form.department,
      jobName: form.jobTitle,
      phone: form.phoneNumber,
    });
  }

  function syncHeaderFromForm() {
    userInfo.realName = form.realName;
    userInfo.name = form.name;
    userInfo.accountId = form.accountId;
    userInfo.gender = form.gender;
    userInfo.birthday = form.birthday;
    userInfo.phoneNumber = form.phoneNumber;
    userInfo.email = form.email;
    userInfo.department = form.department;
    userInfo.jobTitle = form.jobTitle;
    userInfo.employeeNo = form.employeeNo;
    userInfo.office = form.office;
    userInfo.registrationTime = form.registrationTime;
    syncShellUserProfile();
  }

  async function onSave() {
    const errors = await basicFormRef.value?.validate();
    if (errors) return;
    syncHeaderFromForm();
    Object.assign(formDefaults, { ...form });
    Message.success(t.saveSuccess);
  }

  function onReset() {
    Object.assign(form, { ...formDefaults });
    syncHeaderFromForm();
    basicFormRef.value?.clearValidate();
  }

  function resetSecurityForm() {
    securityForm.oldPassword = '';
    securityForm.newPassword = '';
    securityForm.confirmPassword = '';
    securityForm.question = undefined;
    securityForm.answer = '';
    securityForm.phone = userInfo.phoneNumber || '';
    securityForm.email = userInfo.email || '';
    securityForm.code = '';
  }

  function openSecurityModal(item: SecurityItem) {
    securityModalKey.value = item.key;
    securityModalTitle.value =
      item.action === 'edit'
        ? `${t.btnEdit}${item.title}`
        : `${t.btnSet}${item.title}`;
    resetSecurityForm();
    securityModalVisible.value = true;
  }

  function onSecurityAction(item: SecurityItem) {
    openSecurityModal(item);
  }

  function onSecurityModalCancel() {
    securityModalVisible.value = false;
  }

  function onSendSecurityCode() {
    Message.success(t.securityCodeSent);
  }

  function onSecurityModalOk() {
    const key = securityModalKey.value;
    const sf = securityForm;
    if (key === 'password') {
      if (!sf.oldPassword || !sf.newPassword || !sf.confirmPassword) {
        Message.warning(t.securityFormRequired);
        return;
      }
      if (sf.newPassword !== sf.confirmPassword) {
        Message.warning(t.securityPasswordMismatch);
        return;
      }
    }
    if (key === 'question' && (!sf.question || !sf.answer)) {
      Message.warning(t.securityFormRequired);
      return;
    }
    if (key === 'phone' && (!sf.phone || !sf.code)) {
      Message.warning(t.securityFormRequired);
      return;
    }
    if (key === 'email' && (!sf.email || !sf.code)) {
      Message.warning(t.securityFormRequired);
      return;
    }

    const index = securityItems.value.findIndex((item) => item.key === key);
    if (index > -1) {
      const next: SecurityItem = { ...securityItems.value[index] };
      if (key === 'password') {
        next.value = t.securityPasswordTips;
        next.action = 'edit';
      } else if (key === 'question') {
        next.value = t.securityQuestionSetTips;
        next.action = 'edit';
      } else if (key === 'phone') {
        next.value = maskPhone(sf.phone);
        next.action = 'edit';
        userInfo.phoneNumber = sf.phone;
        form.phoneNumber = sf.phone;
      } else if (key === 'email') {
        next.value = maskEmail(sf.email);
        next.action = 'edit';
        userInfo.email = sf.email;
        form.email = sf.email;
      }
      securityItems.value.splice(index, 1, next);
    }

    securityModalVisible.value = false;
    Message.success(t.securitySaveSuccess);
  }

  function onEditVerified() {
    verifiedEditForm.enterpriseName = verifiedInfo.enterpriseName;
    verifiedEditForm.organizationCode = verifiedInfo.organizationCode;
    verifiedEditForm.legalPersonName = verifiedInfo.legalPersonName;
    verifiedEditForm.certificationNumber = verifiedInfo.certificationNumber;
    verifiedEditVisible.value = true;
  }

  function onVerifiedEditCancel() {
    verifiedEditVisible.value = false;
  }

  function onVerifiedEditOk() {
    if (
      !verifiedEditForm.enterpriseName ||
      !verifiedEditForm.organizationCode ||
      !verifiedEditForm.legalPersonName ||
      !verifiedEditForm.certificationNumber
    ) {
      Message.warning(t.securityFormRequired);
      return;
    }
    verifiedInfo.enterpriseName = verifiedEditForm.enterpriseName;
    verifiedInfo.organizationCode = verifiedEditForm.organizationCode;
    verifiedInfo.legalPersonName = verifiedEditForm.legalPersonName;
    verifiedInfo.certificationNumber = verifiedEditForm.certificationNumber;
    verifiedEditVisible.value = false;
    Message.success(t.verifiedEditSuccess);
  }

  function onViewRecord(record: VerifiedRecord) {
    verifiedDetailRecord.value = { ...record };
    verifiedDetailVisible.value = true;
  }

  function onVerifiedDetailCancel() {
    verifiedDetailVisible.value = false;
    verifiedDetailRecord.value = null;
  }

  function onRevokeRecord(record: VerifiedRecord) {
    Modal.confirm({
      simple: true,
      titleAlign: 'start',
      modalClass: 'pro-confirm-modal',
      width: 360,
      title: t.verifiedRevokeTitle,
      content: t.verifiedRevokeConfirm,
      okText: t.verifiedRevoke,
      cancelText: t.cropCancel,
      okButtonProps: { status: 'danger' },
      onOk: () => {
        const index = verifiedRecords.value.findIndex(
          (item) => item.key === record.key
        );
        if (index > -1) {
          verifiedRecords.value.splice(index, 1);
        }
        Message.success(t.revokeSuccess);
      },
    });
  }

  function openPasswordFromQuery() {
    const tab = String(route.query.tab || '');
    const action = String(route.query.action || '');
    activeTab.value = resolveActiveTab();
    if (tab === 'security' && action === 'password') {
      const item = securityItems.value.find((row) => row.key === 'password');
      if (item) {
        nextTick(() => openSecurityModal(item));
      }
    }
  }

  onMounted(() => {
    openPasswordFromQuery();
  });

  watch(
    () => [route.query.tab, route.query.action],
    () => {
      openPasswordFromQuery();
    }
  );
</script>
