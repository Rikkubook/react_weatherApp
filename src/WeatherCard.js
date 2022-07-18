import React from "react";
import styled from "@emotion/styled";
import { ReactComponent as AirFlowIcon } from "./images/airFlow.svg";
import { ReactComponent as RainIcon } from "./images/rain.svg";
import { ReactComponent as RefreshIcon } from "./images/refresh.svg";
import { ReactComponent as LoadingIcon } from "./images/loading.svg";
import { ReactComponent as CogIcon } from "./images/cog.svg";

import WeatherIcon from "./WeatherIcon";

// Weather
const WeatherCardWapper = styled.div`
  position: relative;
  min-width: 360px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  background-color: ${({ theme }) => theme.foregroundColor};
  box-sizing: border-box;
  padding: 30px 15px;
`;

const Location = styled.div`
  font-size: 28px;
  color: ${({ theme }) => theme.titleColor};
  margin-bottom: 20px;
`;

const Description = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 0px;
`;

const CurrentWeather = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Temperature = styled.div`
  color: ${({ theme }) => theme.temperatureColor};
  font-size: 96px;
  font-weight: 300;
  display: flex;
`;

const Celsius = styled.div`
  font-weight: normal;
  font-size: 42px;
`;

const AirFlow = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 20px;
  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`;

const Rain = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: ${({ theme }) => theme.textColor};
  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`;

const Refresh = styled.div`
  position: absolute;
  right: 15px;
  bottom: 15px;
  font-size: 12px;
  display: inline-flex;
  align-items: flex-end;
  color: ${({ theme }) => theme.textColor};

  svg {
    margin-left: 10px;
    width: 15px;
    height: 15px;
    cursor: pointer;
    animation: rotate infinite 1.5s linear;

    /* STEP 2：使用 rotate 動畫效果在 svg 圖示上 */
    animation-duration: ${({ isLoading }) => (isLoading ? "1.5s" : "0s")};
  }

  /* STEP 1：定義旋轉的動畫效果，並取名為 rotate */
  @keyframes rotate {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
`;

// STEP 2：為 CogIcon 添加樣式
const Cog = styled(CogIcon)`
  position: absolute;
  top: 30px;
  right: 15px;
  width: 15px;
  height: 15px;
  cursor: pointer;
`;

const WeatherCard = (props) => {
  const { weatherElement, moment, fetchData, setCurrentPage, cityName } = props;
  const {
    obsTime,
    CI,
    TEMP,
    Wx,
    WxCode,
    WDSD,
    PoP,
    isLoading
  } = weatherElement;

  return (
    <WeatherCardWapper>
      <Cog onClick={() => setCurrentPage("WeatherSetting")} />
      <Location>
        {cityName} {""} {CI}
      </Location>
      <CurrentWeather>
        <Temperature>
          {TEMP} <Celsius>°C</Celsius>
        </Temperature>
        <WeatherIcon currentWeatherCode={WxCode} moment={moment || "day"} />
      </CurrentWeather>
      <AirFlow>
        <AirFlowIcon />
        {WDSD} m/h
      </AirFlow>
      <Rain>
        <RainIcon />
        {Math.round(PoP)} %
      </Rain>
      <Refresh onClick={fetchData} isLoading={isLoading}>
        <Description>
          最後觀測時間：
          {new Intl.DateTimeFormat("zh-TW", {
            hour: "numeric",
            minute: "numeric",
            weekday: "long"
          }).format(new Date(obsTime))}{" "}
          {Wx}
        </Description>
        {isLoading ? <LoadingIcon /> : <RefreshIcon />}
      </Refresh>
    </WeatherCardWapper>
  );
};

export default WeatherCard;
