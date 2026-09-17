/**
 * @name 京东金融首页
 */
import React from 'react';
import {
  BadgeCheck,
  Banknote,
  Bell,
  ChevronRight,
  CircleDollarSign,
  Coins,
  CreditCard,
  Eye,
  Grid3X3,
  Landmark,
  MessageCircle,
  ScanLine,
  Search,
  ShieldCheck,
  Smartphone,
  Umbrella,
  type LucideIcon,
} from 'lucide-react';
import './style.css';

type HomeService = {
  label: string;
  Icon: LucideIcon;
  tone: 'red' | 'orange' | 'blue' | 'gold' | 'green' | 'violet' | 'gray';
  badge?: string;
};

const primaryServices: HomeService[] = [
  { label: '白条', Icon: CreditCard, tone: 'red', badge: '立减' },
  { label: '金条借款', Icon: Banknote, tone: 'orange' },
  { label: '小金库', Icon: Landmark, tone: 'gold' },
  { label: '基金', Icon: CircleDollarSign, tone: 'red' },
  { label: '保险', Icon: Umbrella, tone: 'blue' },
  { label: '手机充值', Icon: Smartphone, tone: 'violet' },
  { label: '签到', Icon: Coins, tone: 'green', badge: '红包' },
  { label: '京东信誉分', Icon: BadgeCheck, tone: 'blue' },
  { label: '黄金', Icon: ShieldCheck, tone: 'gold' },
  { label: '全部服务', Icon: Grid3X3, tone: 'gray' },
];

const quickAssets = [
  { title: '小金库资产', value: '0.00', note: '灵活取用' },
  { title: '白条可用', value: '49,000', note: '先消费后付款' },
  { title: '金条额度', value: '80,000', note: '最快实时到账' },
];

const feedCards = [
  {
    title: '稳健理财专区',
    value: '2.18%',
    unit: '七日年化参考',
    text: '新客专属产品更新',
  },
  {
    title: '家庭保障计划',
    value: '12期',
    unit: '车险免息',
    text: '医疗、意外、车险一站查看',
  },
];

function ServiceButton({ service }: { service: HomeService }) {
  const { Icon } = service;

  return (
    <button className="jd-home-service" type="button">
      <span className={`jd-home-service-icon jd-home-service-${service.tone}`}>
        <Icon aria-hidden="true" className="h-[22px] w-[22px]" strokeWidth={2.35} />
        {service.badge ? <span className="jd-home-service-badge">{service.badge}</span> : null}
      </span>
      <span className="jd-home-service-label">{service.label}</span>
    </button>
  );
}

export default function JDFinanceHome() {
  return (
    <div className="jd-home-page">
      <header className="jd-home-header">
        <div className="jd-home-brand" aria-label="京东金融">
          <span className="jd-home-brand-mark">JD</span>
          <span className="jd-home-brand-title">京东金融</span>
        </div>

        <button className="jd-home-icon-btn" type="button" aria-label="扫一扫">
          <ScanLine aria-hidden="true" />
        </button>
        <button className="jd-home-icon-btn" type="button" aria-label="消息">
          <MessageCircle aria-hidden="true" />
          <span className="jd-home-dot" />
        </button>
      </header>

      <section className="jd-home-search-wrap">
        <button className="jd-home-search" type="button">
          <Search aria-hidden="true" />
          <span>搜索基金、白条、借钱、保险</span>
        </button>
        <button className="jd-home-all-link" type="button">
          全部服务
          <ChevronRight aria-hidden="true" />
        </button>
      </section>

      <main className="jd-home-main">
        <section className="jd-home-asset-card">
          <div className="jd-home-asset-topline">
            <span>我的金融资产</span>
            <button className="jd-home-eye" type="button" aria-label="隐藏资产">
              <Eye aria-hidden="true" />
            </button>
          </div>
          <div className="jd-home-asset-amount">0.00</div>
          <div className="jd-home-asset-meta">
            <span>昨日收益 0.00</span>
            <span>资金安全保障中</span>
          </div>

          <div className="jd-home-asset-grid">
            {quickAssets.map((item) => (
              <button className="jd-home-asset-mini" type="button" key={item.title}>
                <span>{item.title}</span>
                <strong>{item.value}</strong>
                <em>{item.note}</em>
              </button>
            ))}
          </div>
        </section>

        <section className="jd-home-matrix" aria-label="常用服务">
          {primaryServices.map((service) => (
            <ServiceButton service={service} key={service.label} />
          ))}
        </section>

        <section className="jd-home-banner-row">
          <button className="jd-home-banner jd-home-banner-red" type="button">
            <span className="jd-home-banner-kicker">京东支付</span>
            <strong>领支付券</strong>
            <span>支付、还款、缴费都能用</span>
          </button>
          <button className="jd-home-banner jd-home-banner-gold" type="button">
            <span className="jd-home-banner-kicker">省钱频道</span>
            <strong>天天红包</strong>
            <span>签到领现金奖励</span>
          </button>
        </section>

        <section className="jd-home-section">
          <div className="jd-home-section-title">
            <h2>精选服务</h2>
            <button type="button">
              更多
              <ChevronRight aria-hidden="true" />
            </button>
          </div>

          <div className="jd-home-feed">
            {feedCards.map((card) => (
              <button className="jd-home-feed-card" type="button" key={card.title}>
                <span>{card.title}</span>
                <strong>{card.value}</strong>
                <em>{card.unit}</em>
                <p>{card.text}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="jd-home-news">
          <div>
            <span>财富观察</span>
            <strong>市场震荡时如何安排活钱与稳健理财</strong>
          </div>
          <button type="button" aria-label="查看财富观察">
            <Bell aria-hidden="true" />
          </button>
        </section>
      </main>
    </div>
  );
}
