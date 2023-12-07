const availableLocations = [
  {
    cityName: "宜蘭縣",
    locationName: "宜蘭",
    sunriseCityName: "宜蘭縣"
  },
  {
    cityName: "嘉義市",
    locationName: "嘉義",
    sunriseCityName: "嘉義市"
  },
  {
    cityName: "屏東縣",
    locationName: "恆春",
    sunriseCityName: "屏東縣"
  },
  {
    cityName: "雲林縣",
    locationName: "草嶺",
    sunriseCityName: "雲林縣"
  },
  {
    cityName: "臺東縣",
    locationName: "成功",
    sunriseCityName: "臺東縣"
  },
  {
    cityName: "臺北市",
    locationName: "臺北",
    sunriseCityName: "臺北市"
  },
  {
    cityName: "金門縣",
    locationName: "金門",
    sunriseCityName: "金門縣"
  },
  {
    cityName: "桃園市",
    locationName: "新屋",
    sunriseCityName: "桃園市"
  },
  {
    cityName: "彰化縣",
    locationName: "田中",
    sunriseCityName: "彰化縣"
  },
  // {
  //   cityName: '嘉義縣',
  //   locationName: '阿里山',
  //   sunriseCityName: '嘉義',
  // },
  {
    cityName: "高雄市",
    locationName: "復興",
    sunriseCityName: "高雄市"
  },
  {
    cityName: "基隆市",
    locationName: "基隆",
    sunriseCityName: "基隆市"
  },
  {
    cityName: "臺南市",
    locationName: "臺南",
    sunriseCityName: "臺南市"
  },
  {
    cityName: "南投縣",
    locationName: "日月潭",
    sunriseCityName: "南投縣"
  },
  {
    cityName: "臺中市",
    locationName: "臺中",
    sunriseCityName: "臺中市"
  },
  {
    cityName: "新竹縣",
    locationName: "梅花",
    sunriseCityName: "新竹縣"
  },
  {
    cityName: "花蓮縣",
    locationName: "大禹嶺",
    sunriseCityName: "花蓮縣"
  },
  {
    cityName: "連江縣",
    locationName: "東莒",
    sunriseCityName: "連江縣"
  },
  {
    cityName: "澎湖縣",
    locationName: "西嶼",
    sunriseCityName: "澎湖縣"
  },
  {
    cityName: "新北市",
    locationName: "板橋",
    sunriseCityName: "新北市"
  }
];

const findLocation = (cityName) => {
  return availableLocations.find((location) => location.cityName === cityName);
};

const useFindLocation= ()=>{
  return  { availableLocations, findLocation };
}

export default useFindLocation;
