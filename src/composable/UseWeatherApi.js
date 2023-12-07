import { useState, useEffect, useCallback } from "react";

const fetchWeatherForecase = (cityName) => {
  return fetch(
    `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-8583E89C-3360-42FB-BF91-D8F92910550F&locationName=${cityName}`
  )
    .then((response) => response.json())
    .then((data) => {
      const locationData = data.records.location[0];
      let obj = {};
      console.log(locationData)
      locationData.weatherElement.forEach((item) => {
        if (["Wx", "PoP", "CI"].includes(item.elementName)) {
          obj[item.elementName] = item.time[0].parameter;
        }
      });
      console.log(obj)
      return {
        Wx: obj.Wx.parameterName,
        WxCode: obj.Wx.parameterValue,
        PoP: obj.PoP.parameterName,
        CI: obj.CI.parameterName
      };
    });
};
const fetchCurrentWeather = (locationName) => {
  return fetch(
    `https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-8583E89C-3360-42FB-BF91-D8F92910550F`
  )
    .then((response) => response.json())
    .then((data) => {
      const locationDataArray = data.records.Station;
      const locationData = locationDataArray.find((location)=>{
        return locationName.includes(location.StationName)
      })
      if (locationData) {
        return {
          obsTime: locationData.ObsTime.DateTime,
          TEMP: locationData.WeatherElement.AirTemperature,
          WDSD: locationData.WeatherElement.WindSpeed,
          HUMD: locationData.WeatherElement.RelativeHumidity
        };
      }

      return {
        obsTime: 0,
        TEMP: locationData.WeatherElement.AirTemperature,
        WDSD: locationData.WeatherElement.WindSpeed,
        HUMD: locationData.WeatherElement.RelativeHumidity
      };
    });
};

const useWeatherApi = (currentLocation) => {
  const { locationName, cityName } = currentLocation;
  const [weatherElement, setWeatherElement] = useState({
    obsTime: new Date(),
    Wx: "",
    WxCode: 0,
    PoP: 0,
    CI: "",
    TEMP: 0,
    WDSD: 0,
    HUMD: 0,
    isLoading: true
  });

  const fetchData = useCallback(() => {
    // STEP 3：把原本的 fetchData 改名為 fetchingData 放到 useCallback 的函式內
    const fetchingData = async () => {
      const [currentData, forecaseData] = await Promise.all([
        fetchCurrentWeather(locationName),
        fetchWeatherForecase(cityName)
      ]);
      setWeatherElement({
        ...currentData,
        ...forecaseData,
        isLoading: false
      });
    };
    // STEP 4：記得要呼叫 fetchingData 這個方法
    fetchingData();
    // STEP 5：因為 fetchingData 沒有相依到 React 組件中的資料狀態，所以 dependencies 陣列中不帶入元素
  }, [locationName, cityName]);

  useEffect(() => {
    setWeatherElement((prevState) => ({
      ...prevState,
      isLoading: true
    }));

    // STEP 6：把透過 useCallback 回傳的函式放到 useEffect 的 dependencies 中
    fetchData();
  }, [fetchData]);

  return [weatherElement, fetchData];
};

export default useWeatherApi;
