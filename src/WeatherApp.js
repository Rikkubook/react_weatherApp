import React, { useState, useEffect, useMemo } from "react";
import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";

import WeatherCard from "./WeatherCard";
import WeatherSetting from "./WeatherSetting";
import useFindLocation from "./composable/UseFindLocation";
import useWeatherApi from "./composable/UseWeatherApi";

// 主題色
const theme = {
  light: {
    backgroundColor: "#ededed",
    foregroundColor: "#f9f9f9",
    boxShadow: "0 1px 3px 0 #999999",
    titleColor: "#212121",
    temperatureColor: "#757575",
    textColor: "#828282"
  },
  dark: {
    backgroundColor: "#1F2022",
    foregroundColor: "#121416",
    boxShadow:
      "0 1px 4px 0 rgba(12, 12, 13, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.15)",
    titleColor: "#f9f9fa",
    temperatureColor: "#dddddd",
    textColor: "#cccccc"
  }
};
// 主題色背景
const Container = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WeatherApp = () => {
  // 控制氣象資料
  const storageCity = localStorage.getItem("cityName");
  const [currentCity, setCurrentCity] = useState(storageCity || "臺北市");

  const {findLocation} =  useFindLocation()
  const currentLocation = findLocation(currentCity) || {};
  const [weatherElement, fetchData] = useWeatherApi(currentLocation);

  // 控制日夜
  const [moment, setMoment] = useState("day");
  const fetchMoment = (locationName) => {
    const newDay = new Date();
    const year = newDay.getFullYear();
    const month = newDay.getMonth();
    const date = newDay.getDate();
    const today = `${year}-${month + 1}-${date}`;
    const url = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/A-B0062-001?Authorization=CWB-8583E89C-3360-42FB-BF91-D8F92910550F&limit=1&format=JSON&locationName=${locationName}&Date=${today}`;

    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.records.locations.location.length === 0) {
          return null;
        } else {
          const locationData = data.records.locations.location[0].time[0];

          const sunriseTimestamp = new Date(`${today} ${locationData.SunRiseTime}`).getTime();
          const sunsetTimestamp = new Date(`${today} ${locationData.SunSetTime}`).getTime();;
          const nowTimeStamp = newDay.getTime();
          return sunriseTimestamp <= nowTimeStamp &&
            nowTimeStamp <= sunsetTimestamp
            ? "day"
            : "night";
        }
      });
  };
  useMemo(async () => {
    const fetchingData = await fetchMoment(currentLocation.sunriseCityName);
    setMoment(fetchingData);
  }, [currentLocation.sunriseCityName]);

  // 切換控制
  const [currentTheme, setCurrentTheme] = useState("light");
  useEffect(() => {
    setCurrentTheme(moment === "day" ? "light" : "dark");
  }, [moment]);

  useEffect(() => {
    localStorage.setItem("cityName", currentCity);
  }, [currentCity]);

  // 切換畫面
  const [currentPage, setCurrentPage] = useState("WeatherCard");

  return (
    <ThemeProvider theme={theme[currentTheme]}>
      <Container>
        {currentPage === "WeatherCard" && (
          <WeatherCard
            cityName={currentLocation.cityName}
            weatherElement={weatherElement}
            moment={moment}
            fetchData={fetchData}
            setCurrentPage={setCurrentPage}
          />
        )}
        {currentPage === "WeatherSetting" && (
          <WeatherSetting
            cityName={currentLocation.cityName}
            setCurrentCity={setCurrentCity}
            setCurrentPage={setCurrentPage}
          />
        )}
      </Container>
    </ThemeProvider>
  );
};

export default WeatherApp;
