;(function () {
  const { ref } = Vue
  WebArco.mount('#app', {
    setup() {
      return {
        value: ref(),
        options: [
          {
            label: '华东',
            value: 'east',
            children: [
              {
                label: '上海',
                value: 'shanghai',
                children: [
                  { label: '黄浦区', value: 'huangpu' },
                  { label: '徐汇区', value: 'xuhui' },
                  { label: '浦东新区', value: 'pudong' },
                  { label: '静安区', value: 'jingan' },
                  { label: '闵行区', value: 'minhang' },
                ],
              },
              {
                label: '浙江',
                value: 'zhejiang',
                children: [
                  { label: '杭州', value: 'hangzhou' },
                  { label: '宁波', value: 'ningbo' },
                  { label: '温州', value: 'wenzhou' },
                  { label: '嘉兴', value: 'jiaxing' },
                  { label: '金华', value: 'jinhua' },
                ],
              },
              {
                label: '江苏',
                value: 'jiangsu',
                children: [
                  { label: '南京', value: 'nanjing' },
                  { label: '苏州', value: 'suzhou' },
                  { label: '无锡', value: 'wuxi' },
                  { label: '常州', value: 'changzhou' },
                  { label: '南通', value: 'nantong' },
                ],
              },
              {
                label: '安徽',
                value: 'anhui',
                children: [
                  { label: '合肥', value: 'hefei' },
                  { label: '芜湖', value: 'wuhu' },
                  { label: '蚌埠', value: 'bengbu' },
                ],
              },
              {
                label: '山东',
                value: 'shandong',
                children: [
                  { label: '济南', value: 'jinan' },
                  { label: '青岛', value: 'qingdao' },
                  { label: '烟台', value: 'yantai' },
                  { label: '潍坊', value: 'weifang' },
                ],
              },
              {
                label: '福建',
                value: 'fujian',
                children: [
                  { label: '福州', value: 'fuzhou' },
                  { label: '厦门', value: 'xiamen' },
                  { label: '泉州', value: 'quanzhou' },
                ],
              },
            ],
          },
          {
            label: '华南',
            value: 'south',
            children: [
              {
                label: '广东',
                value: 'guangdong',
                children: [
                  { label: '广州', value: 'guangzhou' },
                  { label: '深圳', value: 'shenzhen' },
                  { label: '珠海', value: 'zhuhai' },
                  { label: '佛山', value: 'foshan' },
                  { label: '东莞', value: 'dongguan' },
                  { label: '惠州', value: 'huizhou' },
                ],
              },
              {
                label: '广西',
                value: 'guangxi',
                children: [
                  { label: '南宁', value: 'nanning' },
                  { label: '桂林', value: 'guilin' },
                  { label: '柳州', value: 'liuzhou' },
                ],
              },
              {
                label: '海南',
                value: 'hainan',
                children: [
                  { label: '海口', value: 'haikou' },
                  { label: '三亚', value: 'sanya' },
                ],
              },
            ],
          },
          {
            label: '华北',
            value: 'north',
            children: [
              {
                label: '北京',
                value: 'beijing',
                children: [
                  { label: '朝阳区', value: 'chaoyang' },
                  { label: '海淀区', value: 'haidian' },
                  { label: '东城区', value: 'dongcheng' },
                  { label: '西城区', value: 'xicheng' },
                  { label: '丰台区', value: 'fengtai' },
                ],
              },
              {
                label: '天津',
                value: 'tianjin',
                children: [
                  { label: '和平区', value: 'heping' },
                  { label: '河西区', value: 'hexi' },
                  { label: '南开区', value: 'nankai' },
                ],
              },
              {
                label: '河北',
                value: 'hebei',
                children: [
                  { label: '石家庄', value: 'shijiazhuang' },
                  { label: '唐山', value: 'tangshan' },
                  { label: '保定', value: 'baoding' },
                ],
              },
              {
                label: '山西',
                value: 'shanxi',
                children: [
                  { label: '太原', value: 'taiyuan' },
                  { label: '大同', value: 'datong' },
                ],
              },
            ],
          },
          {
            label: '华中',
            value: 'central',
            children: [
              {
                label: '湖北',
                value: 'hubei',
                children: [
                  { label: '武汉', value: 'wuhan' },
                  { label: '宜昌', value: 'yichang' },
                  { label: '襄阳', value: 'xiangyang' },
                ],
              },
              {
                label: '湖南',
                value: 'hunan',
                children: [
                  { label: '长沙', value: 'changsha' },
                  { label: '株洲', value: 'zhuzhou' },
                  { label: '岳阳', value: 'yueyang' },
                ],
              },
              {
                label: '河南',
                value: 'henan',
                children: [
                  { label: '郑州', value: 'zhengzhou' },
                  { label: '洛阳', value: 'luoyang' },
                  { label: '开封', value: 'kaifeng' },
                ],
              },
              {
                label: '江西',
                value: 'jiangxi',
                children: [
                  { label: '南昌', value: 'nanchang' },
                  { label: '赣州', value: 'ganzhou' },
                  { label: '九江', value: 'jiujiang' },
                ],
              },
            ],
          },
          {
            label: '西南',
            value: 'southwest',
            children: [
              {
                label: '四川',
                value: 'sichuan',
                children: [
                  { label: '成都', value: 'chengdu' },
                  { label: '绵阳', value: 'mianyang' },
                  { label: '宜宾', value: 'yibin' },
                ],
              },
              {
                label: '重庆',
                value: 'chongqing',
                children: [
                  { label: '渝中区', value: 'yuzhong' },
                  { label: '江北区', value: 'jiangbei' },
                  { label: '渝北区', value: 'yubei' },
                ],
              },
              {
                label: '云南',
                value: 'yunnan',
                children: [
                  { label: '昆明', value: 'kunming' },
                  { label: '大理', value: 'dali' },
                  { label: '丽江', value: 'lijiang' },
                ],
              },
              {
                label: '贵州',
                value: 'guizhou',
                children: [
                  { label: '贵阳', value: 'guiyang' },
                  { label: '遵义', value: 'zunyi' },
                ],
              },
            ],
          },
          {
            label: '西北',
            value: 'northwest',
            children: [
              {
                label: '陕西',
                value: 'shaanxi',
                children: [
                  { label: '西安', value: 'xian' },
                  { label: '咸阳', value: 'xianyang' },
                  { label: '宝鸡', value: 'baoji' },
                ],
              },
              {
                label: '甘肃',
                value: 'gansu',
                children: [
                  { label: '兰州', value: 'lanzhou' },
                  { label: '天水', value: 'tianshui' },
                ],
              },
              {
                label: '新疆',
                value: 'xinjiang',
                children: [
                  { label: '乌鲁木齐', value: 'urumqi' },
                  { label: '喀什', value: 'kashi' },
                ],
              },
            ],
          },
          {
            label: '东北',
            value: 'northeast',
            children: [
              {
                label: '辽宁',
                value: 'liaoning',
                children: [
                  { label: '沈阳', value: 'shenyang' },
                  { label: '大连', value: 'dalian' },
                  { label: '鞍山', value: 'anshan' },
                ],
              },
              {
                label: '吉林',
                value: 'jilin',
                children: [
                  { label: '长春', value: 'changchun' },
                  { label: '吉林市', value: 'jilin-city' },
                ],
              },
              {
                label: '黑龙江',
                value: 'heilongjiang',
                children: [
                  { label: '哈尔滨', value: 'harbin' },
                  { label: '大庆', value: 'daqing' },
                  { label: '齐齐哈尔', value: 'qiqihar' },
                ],
              },
            ],
          },
        ],
      }
    },
  })
})()
