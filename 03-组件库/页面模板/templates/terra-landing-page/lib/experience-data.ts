export interface Experience {
  id: string
  title: string
  company: string
  location: {
    city: string
    country: string
    lat: number
    lng: number
    isRemote: boolean
  }
  startDate: string
  endDate: string
  color: "pink" | "yellow" | "green" | "blue"
}

export const experiences: Experience[] = [
  {
    id: "1",
    title: "亚马逊雨林保护",
    company: "巴西倡议",
    location: {
      city: "马瑙斯",
      country: "巴西",
      lat: -3.119,
      lng: -60.0217,
      isRemote: false,
    },
    startDate: "2020-01-15",
    endDate: "2024-12-27",
    color: "green",
  },
  {
    id: "2",
    title: "刚果盆地保护",
    company: "中非项目",
    location: {
      city: "金沙萨",
      country: "刚果（金）",
      lat: -4.4419,
      lng: 15.2663,
      isRemote: false,
    },
    startDate: "2020-06-20",
    endDate: "2024-12-27",
    color: "green",
  },
  {
    id: "3",
    title: "婆罗洲森林监测",
    company: "东南亚项目",
    location: {
      city: "古晋",
      country: "马来西亚",
      lat: 1.5535,
      lng: 110.3593,
      isRemote: false,
    },
    startDate: "2021-03-10",
    endDate: "2024-12-27",
    color: "blue",
  },
  {
    id: "4",
    title: "泰加林保护",
    company: "北方森林倡议",
    location: {
      city: "雅库茨克",
      country: "俄罗斯",
      lat: 62.0355,
      lng: 129.6755,
      isRemote: false,
    },
    startDate: "2021-09-05",
    endDate: "2024-12-27",
    color: "pink",
  },
  {
    id: "5",
    title: "太平洋西北地区保护",
    company: "北美项目",
    location: {
      city: "温哥华",
      country: "加拿大",
      lat: 49.2827,
      lng: -123.1207,
      isRemote: false,
    },
    startDate: "2022-02-18",
    endDate: "2024-12-27",
    color: "yellow",
  },
]
