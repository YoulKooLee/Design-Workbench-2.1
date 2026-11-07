<template>
  <li class="pro-navbar-item">
    <a-popover
      trigger="hover"
      position="br"
      content-class="pro-message-popover"
      :content-style="{ padding: 0 }"
      :arrow-style="{ display: 'none' }"
    >
      <a-badge :count="unreadTotal" :offset="[2, 2]" :max-count="99">
        <a-button type="text" class="pro-nav-icon-btn" aria-label="消息">
          <template #icon>
            <icon-notification class="pro-nav-icon" />
          </template>
        </a-button>
      </a-badge>
      <template #content>
        <div class="pro-message-panel">
          <a-tabs
            v-model:active-key="messageTab"
            size="large"
            class="pro-message-tabs"
            :header-padding="false"
            :animation="false"
          >
            <a-tab-pane key="message">
              <template #title>
                <span class="pro-message-tab-title">
                  <span class="pro-message-tab-label">消息</span>
                  <span
                    class="pro-message-tab-count"
                    :class="{ 'is-empty': !unreadMessageCount }"
                    >{{ unreadMessageCount || 0 }}</span
                  >
                </span>
              </template>
            </a-tab-pane>
            <a-tab-pane key="notice">
              <template #title>
                <span class="pro-message-tab-title">
                  <span class="pro-message-tab-label">通知</span>
                  <span
                    class="pro-message-tab-count"
                    :class="{ 'is-empty': !unreadNoticeCount }"
                    >{{ unreadNoticeCount || 0 }}</span
                  >
                </span>
              </template>
            </a-tab-pane>
            <a-tab-pane key="todo">
              <template #title>
                <span class="pro-message-tab-title">
                  <span class="pro-message-tab-label">待办</span>
                  <span
                    class="pro-message-tab-count"
                    :class="{ 'is-empty': !unreadTodoCount }"
                    >{{ unreadTodoCount || 0 }}</span
                  >
                </span>
              </template>
            </a-tab-pane>
          </a-tabs>
          <div class="pro-message-list">
            <button
              v-for="item in activeMessageList"
              :key="item.id"
              type="button"
              class="pro-message-item"
              :class="{ 'is-unread': item.unread }"
              @click="markItemRead(item)"
            >
              <a-avatar
                :size="36"
                class="pro-message-avatar"
                :class="'is-' + item.tone"
              >
                <component :is="item.icon" />
              </a-avatar>
              <div class="pro-message-body">
                <div class="pro-message-title">{{ item.title }}</div>
                <div class="pro-message-content">{{ item.content }}</div>
                <div class="pro-message-time">{{ item.time }}</div>
              </div>
              <span
                v-if="item.unread"
                class="pro-message-dot"
                aria-hidden="true"
              ></span>
            </button>
            <div v-if="!activeMessageList.length" class="pro-message-empty">
              暂无内容
            </div>
          </div>
          <div class="pro-message-footer">
            <a-link @click="clearUnread">清空未读</a-link>
            <a-link @click="viewMoreMessages">查看更多</a-link>
          </div>
        </div>
      </template>
    </a-popover>
  </li>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import { useRouter } from 'vue-router';

  defineOptions({ name: 'ProShellMessagePopover' });

  interface MessageItem {
    id: string;
    icon: string;
    tone: string;
    title: string;
    content: string;
    time: string;
    unread: boolean;
  }

  const router = useRouter();
  const messageTab = ref('message');
  const messageItems = ref<MessageItem[]>([
    {
      id: 'm1',
      icon: 'icon-message',
      tone: 'primary',
      title: '郑曦月 回复了你',
      content: '此处内容需要有一定长度，方便看效果。',
      time: '今天 12:30:01',
      unread: true,
    },
    {
      id: 'm2',
      icon: 'icon-message',
      tone: 'success',
      title: '宁波 关注了你',
      content: '此处内容需要有一定长度，方便看效果。',
      time: '今天 10:00:15',
      unread: true,
    },
    {
      id: 'm3',
      icon: 'icon-message',
      tone: 'warning',
      title: '内容中心 催更提醒',
      content: '你的内容还未更新，请及时更新。',
      time: '昨天 20:15:00',
      unread: true,
    },
  ]);
  const noticeItems = ref<MessageItem[]>([
    {
      id: 'n1',
      icon: 'icon-notification',
      tone: 'primary',
      title: '内容发布审核通过',
      content: '你提交的《每日推荐视频集》已通过审核。',
      time: '今天 09:12:00',
      unread: true,
    },
    {
      id: 'n2',
      icon: 'icon-exclamation-circle',
      tone: 'danger',
      title: '系统维护通知',
      content: '本周六 02:00–04:00 进行例行维护。',
      time: '昨天 18:00:00',
      unread: true,
    },
    {
      id: 'n3',
      icon: 'icon-info-circle',
      tone: 'success',
      title: '新功能上线',
      content: '消息中心支持批量已读，欢迎体验。',
      time: '前天 11:20:00',
      unread: false,
    },
  ]);
  const todoItems = ref<MessageItem[]>([
    {
      id: 't1',
      icon: 'icon-calendar',
      tone: 'warning',
      title: '质检工单待处理',
      content: 'WO2026080003 待你受理',
      time: '今天 08:00:00',
      unread: true,
    },
    {
      id: 't2',
      icon: 'icon-check-circle',
      tone: 'primary',
      title: '周报待提交',
      content: '本周工作周报尚未提交',
      time: '今天 07:30:00',
      unread: true,
    },
    {
      id: 't3',
      icon: 'icon-clock-circle',
      tone: 'danger',
      title: '合同即将到期',
      content: '澜海传媒合同将于 3 天后到期',
      time: '昨天 16:40:00',
      unread: true,
    },
  ]);

  const unreadMessageCount = computed(
    () => messageItems.value.filter((item) => item.unread).length
  );
  const unreadNoticeCount = computed(
    () => noticeItems.value.filter((item) => item.unread).length
  );
  const unreadTodoCount = computed(
    () => todoItems.value.filter((item) => item.unread).length
  );
  const unreadTotal = computed(
    () =>
      unreadMessageCount.value +
      unreadNoticeCount.value +
      unreadTodoCount.value
  );
  const activeMessageList = computed(() => {
    if (messageTab.value === 'notice') return noticeItems.value;
    if (messageTab.value === 'todo') return todoItems.value;
    return messageItems.value;
  });

  const clearUnread = () => {
    ;[messageItems.value, noticeItems.value, todoItems.value].forEach(
      (list) => {
        list.forEach((item) => {
          item.unread = false;
        });
      }
    );
    Message.success('已清空未读');
  };

  const markItemRead = (item: MessageItem) => {
    item.unread = false;
  };

  const viewMoreMessages = () => {
    router.push({ name: 'UserMessage' });
  };
</script>
