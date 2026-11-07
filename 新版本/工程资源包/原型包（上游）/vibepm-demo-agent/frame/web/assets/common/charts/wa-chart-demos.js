/**
 * WEB 图表预览挂载：按 slug / 家族挂 Unovis + shadcn-charts
 * 依赖：ProShadcnCharts、ProShadcnChartData、可选 ArcoProChartPalette
 */
;(function () {
  if (window.WaChartDemos) return

  const xyMargin = { top: 6, bottom: 22, right: 8 }
  const xyAxisLabel = { yLabelMinWidth: 36, yLabelMaxWidth: 56 }

  function last12MonthLabels(endDate) {
    const d = endDate ? new Date(endDate) : new Date()
    const labels = []
    for (let i = 11; i >= 0; i -= 1) {
      const x = new Date(d.getFullYear(), d.getMonth() - i, 1)
      labels.push(String(x.getMonth() + 1).padStart(2, '0') + '月')
    }
    return labels
  }

  function fillLegend(el, items) {
    if (!el || !items || !items.length) return
    if (el.tagName === 'UL') {
      el.innerHTML = items
        .map(function (item) {
          const color = item.color || 'var(--chart-1)'
          const label = item.label || item.name || ''
          const value = item.valueText ? '<span class="shadcn-donut-legend-value">' + item.valueText + '</span>' : ''
          const pct = item.percentText
            ? '<span class="shadcn-donut-legend-pct">' + item.percentText + '</span>'
            : ''
          return (
            '<li class="shadcn-donut-legend-item">' +
            '<div class="shadcn-donut-legend-name-row">' +
            '<i class="shadcn-donut-legend-dot" style="background:' +
            color +
            '"></i>' +
            '<span class="shadcn-donut-legend-label">' +
            label +
            '</span></div>' +
            (value || pct
              ? '<div class="shadcn-donut-legend-meta">' + value + pct + '</div>'
              : '') +
            '</li>'
          )
        })
        .join('')
      return
    }
    el.innerHTML = items
      .map(function (item) {
        return (
          '<span class="shadcn-chart-legend-item">' +
          '<span class="shadcn-chart-legend-dot" style="--legend-color:' +
          (item.color || 'var(--chart-1)') +
          '"></span>' +
          (item.label || item.name || '') +
          '</span>'
        )
      })
      .join('')
  }

  function fillSwatches(el, colors, softAlpha) {
    if (!el || !colors) return
    const api = window.ArcoProChartPalette || window.WaChartPalette
    const alpha = softAlpha != null ? softAlpha : 0.14
    el.innerHTML = colors
      .map(function (c) {
        const hex = c.hex || c.css || '#165dff'
        const soft = api && api.soft ? api.soft(hex, alpha) : hex
        const label = c.name ? c.id + ' ' + c.name : c.id || ''
        return (
          '<div>' +
          '<div class="chart-palette-chip" style="background:' +
          hex +
          '"></div>' +
          '<div class="chart-palette-soft" style="background:' +
          soft +
          '"></div>' +
          '<div class="chart-palette-meta"><b>' +
          label +
          '</b>' +
          hex +
          '</div>' +
          '</div>'
        )
      })
      .join('')
  }

  function areaData() {
    const monthLabels = last12MonthLabels(new Date(2026, 7, 1))
    const contentVals = ProShadcnChartData.contentTrend().map(function (d) {
      return d.y
    })
    return monthLabels.map(function (label, i) {
      return {
        x: i,
        label: label,
        y: contentVals[i] != null ? contentVals[i] : contentVals[contentVals.length - 1],
      }
    })
  }

  function lineData() {
    const monthLabels = last12MonthLabels(new Date(2026, 7, 1))
    const lineVals = [
      [268, 118],
      [238, 162],
      [318, 128],
      [292, 246],
      [156, 268],
      [306, 168],
      [248, 208],
      [274, 142],
      [214, 236],
      [176, 278],
      [168, 302],
      [252, 188],
    ]
    return monthLabels.map(function (label, i) {
      return { label: label, desktop: lineVals[i][0], mobile: lineVals[i][1] }
    })
  }

  function compareAreaOpts() {
    const compareTraffic = ProShadcnChartData.trafficDenseCompare()
    const comparePeak = Math.max.apply(
      null,
      compareTraffic.map(function (d) {
        return Math.max(Number(d.clicks) || 0, Number(d.uniques) || 0)
      }).concat([1])
    )
    var v = comparePeak * 1.06
    var compareNiceTop =
      v <= 4000 ? 4000 : v <= 5000 ? 5000 : v <= 6000 ? 6000 : v <= 8000 ? 8000 : Math.ceil(v / 1000) * 1000
    var compareYTicks = [0, 0.25, 0.5, 0.75, 1].map(function (t) {
      return Math.round(compareNiceTop * t)
    })
    return {
      data: compareTraffic,
      height: 260,
      margin: xyMargin,
      autoMargin: false,
      yLabelMinWidth: xyAxisLabel.yLabelMinWidth,
      yLabelMaxWidth: xyAxisLabel.yLabelMaxWidth,
      stacked: false,
      lineWidth: 2,
      xTickValues: compareTraffic
        .filter(function (d) {
          return d.label
        })
        .map(function (d) {
          return d.x
        }),
      tooltipLabel: function (d) {
        return d.tipLabel || d.label || ''
      },
      yDomain: [0, compareNiceTop],
      yTickValues: compareYTicks,
      series: [
        { key: 'clicks', label: '点击量', color: 'var(--chart-1)', opacity: 0.22 },
        { key: 'uniques', label: '独立访客', color: 'var(--chart-2)', opacity: 0.14 },
      ],
    }
  }

  function funnelStages() {
    return [
      { stage: '潜在线索', value: 680, color: 'var(--chart-1)' },
      { stage: '线索合格', value: 480, color: 'var(--chart-2)' },
      { stage: '已发方案', value: 210, color: 'var(--chart-3)' },
      { stage: '商务谈判', value: 120, color: 'var(--chart-4)' },
      { stage: '成功成交', value: 45, color: 'var(--chart-5)' },
    ]
  }

  function mountFunnel(host, legendEl) {
    if (!host) return null
    const stages = funnelStages()
    const max = Math.max.apply(
      null,
      stages
        .map(function (s) {
          return s.value
        })
        .concat([1])
    )
    const pcts = stages.map(function (s) {
      return (s.value / max) * 100
    })
    const rows = stages.map(function (s, index) {
      // 上沿 = 本层占比，下沿 = 下一层占比；末层保持梯形，勿撑宽成沙漏
      const topPct = pcts[index]
      const bottomPct =
        index < pcts.length - 1 ? pcts[index + 1] : Math.max(topPct * 0.45, 3)
      const topInset = (100 - topPct) / 2
      const bottomInset = (100 - bottomPct) / 2
      const prev = index > 0 ? stages[index - 1].value : null
      const conv = prev != null ? Math.round((s.value / prev) * 1000) / 10 : null
      return {
        stage: s.stage,
        value: s.value,
        color: s.color,
        index: index,
        light: index >= 3,
        clipPath:
          'polygon(' +
          topInset +
          '% 0%, ' +
          (100 - topInset) +
          '% 0%, ' +
          (100 - bottomInset) +
          '% 100%, ' +
          bottomInset +
          '% 100%)',
        // 与 Admin 一致：层上标相邻转化率；首层 100%
        pctLabel: conv != null ? conv + '%' : '100%',
      }
    })
    host.innerHTML = rows
      .map(function (step) {
        return (
          '<div class="crm-funnel-step' +
          (step.light ? ' is-light' : '') +
          '" style="background:' +
          step.color +
          ';clip-path:' +
          step.clipPath +
          ';-webkit-clip-path:' +
          step.clipPath +
          ';animation-delay:' +
          step.index * 80 +
          'ms">' +
          '<span class="crm-funnel-step-pct">' +
          step.pctLabel +
          '</span></div>'
        )
      })
      .join('')
    fillLegend(
      legendEl,
      rows.map(function (r) {
        return {
          label: r.stage,
          color: r.color,
          valueText: String(r.value),
          percentText: r.pctLabel,
        }
      })
    )
    return { kind: 'funnel', destroy: function () {} }
  }

  function applyLocalPalette(root, schemeId) {
    const api = window.ArcoProChartPalette || window.WaChartPalette
    if (!api || !root) return []
    const scheme = api.getScheme(schemeId)
    let resolved = []
    if (scheme.mode === 'theme') {
      const prev = api.getCurrentId()
      api.apply(schemeId, { persist: false })
      resolved = api.getColors().slice()
      api.apply(prev, { persist: false })
    } else {
      resolved = (scheme.colors || []).map(function (c) {
        return { id: c.id, name: c.name, hex: c.hex, css: c.hex }
      })
    }
    for (let i = 1; i <= 10; i += 1) {
      const c = resolved[i - 1] || resolved[0]
      if (c) root.style.setProperty('--chart-' + i, c.css || c.hex)
    }
    root.setAttribute('data-chart-palette', schemeId)
    return resolved
  }

  function mountPaletteDemo(schemeId, host, legendEl, swatchesEl) {
    const scope =
      (swatchesEl && swatchesEl.closest && swatchesEl.closest('.wa-fam-card__stage, .wa-embed__stage')) ||
      (host && host.closest && host.closest('.wa-fam-card__stage, .wa-embed__stage')) ||
      host ||
      swatchesEl
    const colors = applyLocalPalette(scope, schemeId)
    const api = window.ArcoProChartPalette || window.WaChartPalette
    const scheme = api && api.getScheme ? api.getScheme(schemeId) : null
    fillSwatches(swatchesEl, colors, scheme && scheme.softAlpha)
    if (host) {
      host.hidden = true
      host.style.display = 'none'
    }
    if (legendEl) {
      legendEl.hidden = true
      legendEl.style.display = 'none'
      legendEl.innerHTML = ''
    }
    return { kind: 'palette', destroy: function () {} }
  }

  const MOUNTERS = {
    'chart-bar-default': function (el, legendEl) {
      const data = areaData().map(function (d) {
        return { label: d.label, value: d.y / 1000 }
      })
      const c = ProShadcnCharts.mountBarChart(el, {
        data: data,
        height: 260,
        margin: xyMargin,
        autoMargin: false,
        yLabelMinWidth: xyAxisLabel.yLabelMinWidth,
        yLabelMaxWidth: xyAxisLabel.yLabelMaxWidth,
        groupWidth: 28,
        dataStep: 1,
        xDomainPad: 0.35,
        series: [{ key: 'value', label: '内容量', color: 'var(--chart-1)' }],
        yTickFormat: function (v) {
          return v + 'k'
        },
      })
      fillLegend(legendEl, [{ label: '内容量', color: 'var(--chart-1)' }])
      return c
    },
    'chart-bar-grouped': function (el, legendEl) {
      const c = ProShadcnCharts.mountBarChart(el, {
        data: [
          { label: '周一', desktop: 210, mobile: 98 },
          { label: '周二', desktop: 320, mobile: 210 },
          { label: '周三', desktop: 258, mobile: 132 },
          { label: '周四', desktop: 298, mobile: 188 },
          { label: '周五', desktop: 236, mobile: 148 },
          { label: '周六', desktop: 248, mobile: 162 },
          { label: '周日', desktop: 192, mobile: 112 },
        ],
        height: 260,
        margin: xyMargin,
        autoMargin: false,
        yLabelMinWidth: xyAxisLabel.yLabelMinWidth,
        yLabelMaxWidth: xyAxisLabel.yLabelMaxWidth,
        xDomainPad: 0.35,
        series: [
          { key: 'desktop', label: '桌面端', color: 'var(--chart-1)' },
          { key: 'mobile', label: '移动端', color: 'var(--chart-2)' },
        ],
      })
      fillLegend(legendEl, [
        { label: '桌面端', color: 'var(--chart-1)' },
        { label: '移动端', color: 'var(--chart-2)' },
      ])
      return c
    },
    'chart-bar-stacked': function (el, legendEl) {
      const c =
        typeof ProShadcnCharts.mountStackedBarChart === 'function'
          ? ProShadcnCharts.mountStackedBarChart(el, {
              data: ProShadcnChartData.categorySales(),
              height: 260,
              margin: xyMargin,
              autoMargin: false,
              yLabelMinWidth: xyAxisLabel.yLabelMinWidth,
              yLabelMaxWidth: xyAxisLabel.yLabelMaxWidth,
              xDomainPad: 0.35,
              series: [
                { key: 'online', label: '线上', color: 'var(--chart-1)' },
                { key: 'offline', label: '门店', color: 'var(--chart-2)' },
                { key: 'partner', label: '合作', color: 'var(--chart-3)' },
              ],
            })
          : null
      fillLegend(legendEl, [
        { label: '线上', color: 'var(--chart-1)' },
        { label: '门店', color: 'var(--chart-2)' },
        { label: '合作', color: 'var(--chart-3)' },
      ])
      return c
    },
    'chart-combo-default': function (el, legendEl) {
      const comboBarRaw = [
        { label: '周一', desktop: 210, mobile: 98 },
        { label: '周二', desktop: 320, mobile: 210 },
        { label: '周三', desktop: 258, mobile: 132 },
        { label: '周四', desktop: 298, mobile: 188 },
        { label: '周五', desktop: 236, mobile: 148 },
        { label: '周六', desktop: 248, mobile: 162 },
        { label: '周日', desktop: 192, mobile: 112 },
      ]
      const comboWeekPeak = Math.max.apply(
        null,
        comboBarRaw
          .map(function (d) {
            return d.desktop + d.mobile
          })
          .concat([1])
      )
      const comboBarData = comboBarRaw.map(function (d) {
        return Object.assign({}, d, {
          rate: Math.round(((d.desktop + d.mobile) / comboWeekPeak) * 1000) / 10,
        })
      })
      const c =
        typeof ProShadcnCharts.mountComboChart === 'function'
          ? ProShadcnCharts.mountComboChart(el, {
              data: comboBarData,
              height: 260,
              margin: xyMargin,
              autoMargin: false,
              yLabelMinWidth: xyAxisLabel.yLabelMinWidth,
              yLabelMaxWidth: xyAxisLabel.yLabelMaxWidth,
              x: function (d) {
                return d.label
              },
              xLabel: function (d) {
                return d.label
              },
              curveType: 'linear',
              lineWidth: 2,
              xDomainPad: 0.35,
              lineAxis: 'right',
              rightYDomain: [0, 100],
              rightYTickValues: [0, 25, 50, 75, 100],
              rightYTickFormat: function (v) {
                return v + '%'
              },
              bars: [
                { key: 'desktop', label: '桌面端', color: 'var(--chart-1)' },
                { key: 'mobile', label: '移动端', color: 'var(--chart-2)' },
              ],
              line: { key: 'rate', label: '达成率', color: 'var(--chart-3)' },
            })
          : null
      fillLegend(legendEl, [
        { label: '桌面端', color: 'var(--chart-1)' },
        { label: '移动端', color: 'var(--chart-2)' },
        { label: '达成率', color: 'var(--chart-3)' },
      ])
      return c
    },
    'chart-horizontal-bar-default': function (el, legendEl) {
      const c =
        typeof ProShadcnCharts.mountHorizontalBarChart === 'function'
          ? ProShadcnCharts.mountHorizontalBarChart(el, {
              data: ProShadcnChartData.regionRank
                ? ProShadcnChartData.regionRank()
                : [
                    { label: '华东', value: 420 },
                    { label: '华南', value: 360 },
                    { label: '华北', value: 310 },
                    { label: '西南', value: 260 },
                    { label: '东北', value: 180 },
                  ],
              height: 260,
              margin: { top: 6, bottom: 22, right: 8 },
              autoMargin: false,
              yLabelMinWidth: xyAxisLabel.yLabelMinWidth,
              yLabelMaxWidth: xyAxisLabel.yLabelMaxWidth,
              yDomainPad: 0.35,
              barMaxWidth: 40,
              barPadding: 0.25,
              xDomain: [0, 450],
              xTickValues: [0, 100, 200, 300, 450],
              series: [{ key: 'value', label: '销量', color: 'var(--chart-1)' }],
            })
          : null
      fillLegend(legendEl, [{ label: '销量', color: 'var(--chart-1)' }])
      return c
    },
    'chart-horizontal-bar-compare': function (el, legendEl) {
      const c =
        typeof ProShadcnCharts.mountHorizontalBarChart === 'function'
          ? ProShadcnCharts.mountHorizontalBarChart(el, {
              data: ProShadcnChartData.regionCompare
                ? ProShadcnChartData.regionCompare()
                : [
                    { label: '华东', current: 420, previous: 380 },
                    { label: '华南', current: 360, previous: 340 },
                    { label: '华北', current: 310, previous: 290 },
                    { label: '西南', current: 260, previous: 250 },
                    { label: '东北', current: 180, previous: 200 },
                  ],
              height: 260,
              margin: { top: 6, bottom: 22, right: 8 },
              autoMargin: false,
              yLabelMinWidth: xyAxisLabel.yLabelMinWidth,
              yLabelMaxWidth: xyAxisLabel.yLabelMaxWidth,
              yDomainPad: 0.35,
              groupMaxWidth: 40,
              groupPadding: 0.2,
              barPadding: 0.1,
              xDomain: [0, 450],
              xTickValues: [0, 100, 200, 300, 450],
              series: [
                { key: 'current', label: '本期', color: 'var(--chart-1)' },
                { key: 'previous', label: '上期', color: 'var(--chart-2)' },
              ],
            })
          : null
      fillLegend(legendEl, [
        { label: '本期', color: 'var(--chart-1)' },
        { label: '上期', color: 'var(--chart-2)' },
      ])
      return c
    },
    'chart-area-sharp': function (el, legendEl) {
      const c = ProShadcnCharts.mountAreaChart(el, {
        data: areaData(),
        height: 260,
        margin: xyMargin,
        autoMargin: false,
        yLabelMinWidth: xyAxisLabel.yLabelMinWidth,
        yLabelMaxWidth: xyAxisLabel.yLabelMaxWidth,
        curveType: 'linear',
        lineWidth: 2,
        valueLabel: '内容量',
        yTickFormat: function (v) {
          return v >= 1000 ? v / 1000 + 'k' : String(v)
        },
      })
      fillLegend(legendEl, [{ label: '内容量', color: 'var(--chart-1)' }])
      return c
    },
    'chart-area-sharp-compare': function (el, legendEl) {
      const c = ProShadcnCharts.mountAreaChart(el, Object.assign({}, compareAreaOpts(), { curveType: 'linear' }))
      fillLegend(legendEl, [
        { label: '点击量', color: 'var(--chart-1)' },
        { label: '独立访客', color: 'var(--chart-2)' },
      ])
      return c
    },
    'chart-area-smooth': function (el, legendEl) {
      const c = ProShadcnCharts.mountAreaChart(el, {
        data: areaData(),
        height: 260,
        margin: xyMargin,
        autoMargin: false,
        yLabelMinWidth: xyAxisLabel.yLabelMinWidth,
        yLabelMaxWidth: xyAxisLabel.yLabelMaxWidth,
        curveType: 'monotoneX',
        lineWidth: 2,
        valueLabel: '内容量',
        yTickFormat: function (v) {
          return v >= 1000 ? v / 1000 + 'k' : String(v)
        },
      })
      fillLegend(legendEl, [{ label: '内容量', color: 'var(--chart-1)' }])
      return c
    },
    'chart-area-smooth-compare': function (el, legendEl) {
      const c = ProShadcnCharts.mountAreaChart(el, Object.assign({}, compareAreaOpts(), { curveType: 'monotoneX' }))
      fillLegend(legendEl, [
        { label: '点击量', color: 'var(--chart-1)' },
        { label: '独立访客', color: 'var(--chart-2)' },
      ])
      return c
    },
    'chart-line-sharp': function (el, legendEl) {
      const c = ProShadcnCharts.mountLineChart(el, {
        data: lineData(),
        height: 260,
        margin: xyMargin,
        autoMargin: false,
        yLabelMinWidth: xyAxisLabel.yLabelMinWidth,
        yLabelMaxWidth: xyAxisLabel.yLabelMaxWidth,
        lineWidth: 2,
        curveType: 'linear',
        series: [
          { key: 'desktop', label: '桌面端', color: 'var(--chart-1)' },
          { key: 'mobile', label: '移动端', color: 'var(--chart-2)' },
        ],
      })
      fillLegend(legendEl, [
        { label: '桌面端', color: 'var(--chart-1)' },
        { label: '移动端', color: 'var(--chart-2)' },
      ])
      return c
    },
    'chart-line-smooth': function (el, legendEl) {
      const c = ProShadcnCharts.mountLineChart(el, {
        data: lineData(),
        height: 260,
        margin: xyMargin,
        autoMargin: false,
        yLabelMinWidth: xyAxisLabel.yLabelMinWidth,
        yLabelMaxWidth: xyAxisLabel.yLabelMaxWidth,
        lineWidth: 2,
        curveType: 'monotoneX',
        series: [
          { key: 'desktop', label: '桌面端', color: 'var(--chart-1)' },
          { key: 'mobile', label: '移动端', color: 'var(--chart-2)' },
        ],
      })
      fillLegend(legendEl, [
        { label: '桌面端', color: 'var(--chart-1)' },
        { label: '移动端', color: 'var(--chart-2)' },
      ])
      return c
    },
    'chart-funnel-default': function (el, legendEl) {
      return mountFunnel(el, legendEl)
    },
    'chart-donut-basic': function (el, legendEl) {
      const channelItems = [
        { name: '直接访问', value: 508, color: 'var(--chart-1)' },
        { name: '搜索引擎', value: 237, color: 'var(--chart-2)' },
        { name: '社交媒体', value: 178, color: 'var(--chart-3)' },
        { name: '外部推荐', value: 154, color: 'var(--chart-4)' },
        { name: '内容博客', value: 107, color: 'var(--chart-5)' },
      ]
      const total = channelItems.reduce(function (s, i) {
        return s + i.value
      }, 0)
      const legend = channelItems.map(function (item) {
        return {
          name: item.name,
          label: item.name,
          color: item.color,
          valueText: String(item.value),
          percentText: Math.round((item.value / total) * 100) + '%',
        }
      })
      const c = ProShadcnCharts.mountDonutChart(el, {
        data: legend.map(function (item) {
          return { label: item.name, value: Number(item.valueText) }
        }),
        height: 220,
        centralLabel: String(total).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        centralSubLabel: '总量',
        colors: channelItems.map(function (item) {
          return item.color
        }),
      })
      fillLegend(legendEl, legend)
      return c
    },
    'chart-donut-compact': function (el, legendEl) {
      const data = ProShadcnChartData.channelShare()
      const c = ProShadcnCharts.mountDonutChart(el, {
        data: data,
        height: 200,
        radius: 100,
        arcWidth: 28,
        // 长金额演示全局动态字号（mountDonutChart 按内径收缩）
        centralLabel: '¥12,345,678',
        centralSubLabel: '合计',
      })
      const legend =
        (c && c.legend) ||
        data.map(function (d, i) {
          return { label: d.label || d.name, color: 'var(--chart-' + ((i % 5) + 1) + ')' }
        })
      fillLegend(legendEl, legend)
      return c
    },
    'chart-radar-dots': function (el, legendEl) {
      const c = ProShadcnCharts.mountRadarChart(el, {
        data: ProShadcnChartData.radarVisits(),
        height: 250,
        showDots: true,
        series: [{ key: 'desktop', label: '桌面端', color: 'var(--chart-1)', fillOpacity: 0.6 }],
      })
      fillLegend(legendEl, (c && c.legend) || [{ label: '桌面端', color: 'var(--chart-1)' }])
      return c
    },
    'chart-radar-circle': function (el, legendEl) {
      const c = ProShadcnCharts.mountRadarChart(el, {
        data: ProShadcnChartData.radarVisitsCircle(),
        height: 250,
        gridType: 'circle',
        gridFill: true,
        gridFillOpacity: 0.2,
        showDots: false,
        series: [{ key: 'desktop', label: '桌面端', color: 'var(--chart-1)', fillOpacity: 0.5 }],
      })
      fillLegend(legendEl, (c && c.legend) || [{ label: '桌面端', color: 'var(--chart-1)' }])
      return c
    },
    'chart-radar-compare': function (el, legendEl) {
      const c = ProShadcnCharts.mountRadarChart(el, {
        data: ProShadcnChartData.radarVisitsCompare(),
        height: 250,
        showDots: false,
        series: [
          { key: 'desktop', label: '桌面端', color: 'var(--chart-1)', fillOpacity: 0.6 },
          { key: 'mobile', label: '移动端', color: 'var(--chart-2)', fillOpacity: 0.55 },
        ],
      })
      fillLegend(
        legendEl,
        (c && c.legend) || [
          { label: '桌面端', color: 'var(--chart-1)' },
          { label: '移动端', color: 'var(--chart-2)' },
        ]
      )
      return c
    },
    'chart-rose-nightingale': function (el, legendEl) {
      const c =
        typeof ProShadcnCharts.mountRoseChart === 'function'
          ? ProShadcnCharts.mountRoseChart(el, {
              layout: 'nightingale',
              roseType: 'radius',
              data: ProShadcnChartData.roseShare(),
              height: 220,
              size: 220,
              innerRadius: 36,
              outerRadius: 100,
              padAngle: 1.2,
            })
          : null
      const legend = ((c && c.legend) || ProShadcnChartData.roseShare()).map(function (d) {
        const value = Number(d.value)
        const valueText = Number.isInteger(value) ? String(value) : String(Math.round(value * 10) / 10)
        return {
          label: d.label,
          color: d.color,
          valueText: valueText,
          percentText: (Number.isInteger(value) ? value.toFixed(1) : valueText) + '%',
        }
      })
      fillLegend(legendEl, legend)
      return c
    },
    'chart-rose-semi': function (el, legendEl) {
      const c =
        typeof ProShadcnCharts.mountRoseChart === 'function'
          ? ProShadcnCharts.mountRoseChart(el, {
              layout: 'semi',
              roseType: 'radius',
              data: ProShadcnChartData.roseCityRank(),
              height: 280,
              maxValue: 800,
              gridValues: [200, 400, 600, 800],
              padAngle: 2.4,
              color: 'var(--chart-1)',
              colorStart: 'color-mix(in srgb, var(--chart-1) 28%, #ffffff)',
            })
          : null
      const legend =
        (c && c.legend) ||
        (ProShadcnChartData.roseCityRank() || []).map(function (d, i) {
          return { label: d.label, color: 'var(--chart-' + ((i % 5) + 1) + ')', value: d.value }
        })
      const total = legend.reduce(function (s, d) {
        const v = Number(d.value)
        return s + (Number.isFinite(v) ? v : 0)
      }, 0)
      fillLegend(
        legendEl,
        legend.map(function (d) {
          const value = Number(d.value)
          const valueText = Number.isFinite(value)
            ? Number.isInteger(value)
              ? String(value)
              : String(Math.round(value * 10) / 10)
            : d.valueText || ''
          const pct =
            total > 0 && Number.isFinite(value) ? Math.round((value / total) * 100) + '%' : d.percentText || ''
          return {
            label: d.label,
            color: d.color || 'var(--chart-1)',
            valueText: valueText,
            percentText: pct,
          }
        })
      )
      return c
    },
    'chart-radial-simple': function (el, legendEl) {
      const items = [
        { name: '微信支付', value: 275, color: 'var(--chart-radial-1)' },
        { name: '支付宝', value: 200, color: 'var(--chart-radial-2)' },
        { name: '银行卡', value: 187, color: 'var(--chart-radial-3)' },
        { name: '信用卡', value: 173, color: 'var(--chart-radial-4)' },
        { name: '其他', value: 90, color: 'var(--chart-radial-5)' },
      ]
      const total = items.reduce(function (s, i) {
        return s + i.value
      }, 0)
      const c = ProShadcnCharts.mountRadialBarChart(el, {
        mode: 'bars',
        data: items.map(function (i) {
          return { label: i.name, value: i.value, color: i.color }
        }),
        height: 250,
        size: 250,
        innerRadius: 30,
        outerRadius: 110,
        startAngle: 0,
        endAngle: 360,
        background: true,
        barGap: 4,
        cornerRadius: 5,
      })
      fillLegend(
        legendEl,
        items.map(function (i) {
          return {
            name: i.name,
            label: i.name,
            color: i.color,
            valueText: String(i.value),
            percentText: Math.round((i.value / total) * 100) + '%',
          }
        })
      )
      return c
    },
    'chart-radial-label': function (el, legendEl) {
      const items = [
        { name: 'Chrome', value: 275, color: 'var(--chart-radial-1)' },
        { name: 'Safari', value: 200, color: 'var(--chart-radial-2)' },
        { name: 'Firefox', value: 187, color: 'var(--chart-radial-3)' },
        { name: 'Edge', value: 173, color: 'var(--chart-radial-4)' },
        { name: '其他', value: 90, color: 'var(--chart-radial-5)' },
      ]
      const total = items.reduce(function (s, i) {
        return s + i.value
      }, 0)
      const c = ProShadcnCharts.mountRadialBarChart(el, {
        mode: 'bars',
        data: items.map(function (i) {
          return { label: i.name, value: i.value, color: i.color }
        }),
        height: 250,
        size: 250,
        innerRadius: 30,
        outerRadius: 110,
        startAngle: -90,
        endAngle: 380,
        background: true,
        barGap: 4,
        cornerRadius: 0,
        showLabels: true,
      })
      fillLegend(
        legendEl,
        items.map(function (i) {
          return {
            name: i.name,
            label: i.name,
            color: i.color,
            valueText: String(i.value),
            percentText: Math.round((i.value / total) * 100) + '%',
          }
        })
      )
      return c
    },
    'chart-radial-text': function (el, legendEl) {
      const pct = 69
      const c = ProShadcnCharts.mountRadialBarChart(el, {
        mode: 'gauge',
        data: [{ label: '移动端', value: pct, color: 'var(--chart-1)' }],
        height: 250,
        size: 250,
        innerRadius: 80,
        outerRadius: 110,
        startAngle: 90,
        endAngle: -270,
        maxValue: 100,
        background: false,
        polarTrack: true,
        cornerRadius: 10,
        formatValue: function (v) {
          return v + '%'
        },
        centralLabel: pct + '%',
        centralSubLabel: '移动端',
      })
      if (legendEl) legendEl.innerHTML = ''
      return c
    },
    'chart-radial-shape': function (el, legendEl) {
      const pct = 28
      const c = ProShadcnCharts.mountRadialBarChart(el, {
        mode: 'gauge',
        data: [{ label: '移动端', value: pct, color: 'var(--chart-1)' }],
        height: 250,
        size: 250,
        innerRadius: 80,
        outerRadius: 110,
        startAngle: 90,
        endAngle: -270,
        maxValue: 100,
        background: false,
        polarTrack: true,
        cornerRadius: 0,
        formatValue: function (v) {
          return v + '%'
        },
        centralLabel: pct + '%',
        centralSubLabel: '移动端',
      })
      if (legendEl) legendEl.innerHTML = ''
      return c
    },
    'chart-radial-stacked': function (el, legendEl) {
      const stackedData = ProShadcnChartData.radialStackedShare()
      const stackedTotal = stackedData.reduce(function (s, d) {
        return s + d.value
      }, 0)
      const c = ProShadcnCharts.mountRadialBarChart(el, {
        mode: 'stacked',
        data: stackedData,
        height: 250,
        size: 250,
        innerRadius: 94,
        outerRadius: 124,
        startAngle: 180,
        endAngle: 0,
        cyRatio: 0.64,
        cornerRadius: 5,
        centralLabel: String(stackedTotal).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
        centralSubLabel: '访客',
      })
      fillLegend(legendEl, (c && c.legend) || [
        { label: '桌面端', color: 'var(--chart-1)' },
        { label: '移动端', color: 'var(--chart-2)' },
      ])
      return c
    },
    'chart-gauge-default': function (el) {
      return ProShadcnCharts.mountGaugeChart(el, {
        value: 75,
        maxValue: 100,
        height: 250,
        size: 250,
        radius: 96,
        strokeWidth: 18,
        startAngle: 225,
        endAngle: -45,
        color: 'var(--chart-1)',
        colorStart: 'color-mix(in srgb, var(--chart-1) 42%, #ffffff)',
        label: '完成度',
        centralLabel: '75%',
        centralSubLabel: '完成度',
        labelOrder: 'sub-main',
        formatValue: function (v) {
          return v + '%'
        },
      })
    },
    'chart-gauge-semi': function (el) {
      return ProShadcnCharts.mountGaugeChart(el, {
        value: 85,
        maxValue: 100,
        height: 250,
        size: 250,
        radius: 100,
        strokeWidth: 22,
        startAngle: 180,
        endAngle: 0,
        cyRatio: 0.58,
        linecap: 'round',
        color: 'var(--chart-1)',
        colorStart: 'color-mix(in srgb, var(--chart-1) 40%, #ffffff)',
        label: '完成率',
        centralLabel: '85%',
        centralSubLabel: '完成率',
        labelOrder: 'sub-main',
        formatValue: function (v) {
          return v + '%'
        },
      })
    },
    'chart-gauge-score': function (el) {
      const c = ProShadcnCharts.mountGaugeChart(el, {
        value: 800,
        maxValue: 1000,
        height: 250,
        size: 250,
        radius: 96,
        strokeWidth: 18,
        startAngle: 225,
        endAngle: -45,
        cyRatio: 0.46,
        linecap: 'butt',
        color: 'var(--chart-1)',
        colorStart: 'color-mix(in srgb, var(--chart-1) 38%, #ffffff)',
        label: '信用评分',
        centralLabel: '800',
        centralSubLabel: '信用评分',
        labelOrder: 'sub-main',
        formatValue: function (v) {
          return String(Math.round(v))
        },
      })
      const footer =
        (el.parentElement && el.parentElement.querySelector('.wa-chart-gauge-footer')) ||
        document.getElementById('chart-gauge-footer') ||
        document.querySelector('[data-gauge-footer="chart-gauge-score"]')
      if (footer) {
        const d = new Date()
        const y = d.getFullYear()
        const m = String(d.getMonth() + 1).padStart(2, '0')
        const day = String(d.getDate()).padStart(2, '0')
        footer.textContent = '评估时间：' + y + '-' + m + '-' + day
      }
      return c
    },
    'chart-gauge-needle': function (el) {
      return ProShadcnCharts.mountGaugeChart(el, {
        value: 65,
        maxValue: 100,
        height: 250,
        size: 250,
        radius: 96,
        strokeWidth: 16,
        startAngle: 225,
        endAngle: -45,
        linecap: 'round',
        showTicks: true,
        tickCount: 30,
        showNeedle: true,
        color: 'var(--chart-1)',
        colorStart: 'color-mix(in srgb, var(--chart-1) 48%, #ffffff)',
        label: '风险评分',
        centralLabel: '65%',
        centralSubLabel: '风险评分',
        labelOrder: 'sub-main',
        formatValue: function (v) {
          return v + '%'
        },
      })
    },
    'chart-liquid-default': function (el) {
      return ProShadcnCharts.mountLiquidFillChart(el, {
        value: 62,
        maxValue: 100,
        height: 250,
        size: 250,
        radius: 92,
        color: 'var(--chart-1)',
        formatValue: function (v) {
          return Math.round(v) + '%'
        },
      })
    },
    'chart-palette-theme': function (el, legendEl, swatchesEl) {
      return mountPaletteDemo('theme', el, legendEl, swatchesEl)
    },
    'chart-palette-colorful': function (el, legendEl, swatchesEl) {
      return mountPaletteDemo('a', el, legendEl, swatchesEl)
    },
    'chart-palette-brand': function (el, legendEl, swatchesEl) {
      return mountPaletteDemo('b', el, legendEl, swatchesEl)
    },
    'chart-palette-muted': function (el, legendEl, swatchesEl) {
      return mountPaletteDemo('c', el, legendEl, swatchesEl)
    },
  }

  function mountOne(slug, host, legendEl, swatchesEl) {
    const fn = MOUNTERS[slug]
    if (!fn) {
      console.warn('[WaChartDemos] unknown slug', slug)
      return null
    }
    const isPalette = String(slug).indexOf('chart-palette-') === 0
    if (!isPalette && (!window.ProShadcnCharts || !host)) return null
    try {
      return fn(host, legendEl, swatchesEl)
    } catch (err) {
      console.error('[WaChartDemos] mount failed', slug, err)
      return null
    }
  }

  function mountFamily(familyId) {
    const nodes = document.querySelectorAll('[data-family="' + familyId + '"] [data-slug]')
    const charts = []
    nodes.forEach(function (card) {
      const slug = card.getAttribute('data-slug')
      const host = document.getElementById('host-' + slug)
      const legend = card.querySelector('[data-legend-for="' + slug + '"]')
      const swatches = card.querySelector('[data-palette-swatches="' + slug + '"]')
      const inst = mountOne(slug, host, legend, swatches)
      if (inst) charts.push(inst)
    })
    return charts
  }

  window.WaChartDemos = {
    mountOne: mountOne,
    mountFamily: mountFamily,
    funnelStages: funnelStages,
  }
})()
