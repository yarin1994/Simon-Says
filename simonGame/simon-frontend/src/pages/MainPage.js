import React, { useState, useEffect } from "react";
import ColorCard from "../components/ColorCard";
import timeout from "../utils/util";
import "../App.css";

const MainPage = () => {
  const [isOn, setIsOn] = useState(false);
  const colorList = ["green", "red", "yellow", "blue"];

  const initPlay = {
    isDisplay: false,
    colors: [],
    score: 0,
    userState: false,
    userColors: [],
  };

  const [play, setPlay] = useState(initPlay);
  const [flashColor, setFlashColor] = useState("");

  const startHandle = () => {
    setIsOn(true);
  };

  useEffect(() => {
    if (isOn) {
      setPlay({ ...initPlay, isDisplay: true });
    } else {
      setPlay(initPlay);
    }
  }, [isOn]);

  useEffect(() => {
    if (isOn && play.isDisplay) {
      let newColor = colorList[Math.floor(Math.random() * 4)];
      const copyColors = [...play.colors];
      copyColors.push(newColor);
      setPlay({ ...play, colors: copyColors });
    }
  }, [isOn, play.isDisplay]);

  useEffect(() => {
    if (isOn && play.isDisplay && play.colors.length) {
      displayColors();
    }
  }, [isOn, play.isDisplay, play.colors.length]);

  const displayColors = async () => {
    await timeout(1000);
    for (let i = 0; i < play.colors.length; i++) {
      setFlashColor(play.colors[i]);
      await timeout(1000);
      setFlashColor("");
      await timeout(1000);

      if (i === play.colors.length - 1) {
        const copyColors = [...play.colors];

        setPlay({
          ...play,
          isDisplay: false,
          userPlay: true,
          userColors: copyColors.reverse(),
        });
      }
    }
  };

  const cardClickHandle = async (color) => {
    if (!play.isDisplay && play.userPlay) {
      const copyUserColors = [...play.userColors];
      const lastColor = copyUserColors.pop();
      setFlashColor(color);
      await timeout(1000);
      setFlashColor("");

      if (color === lastColor) {
        if (copyUserColors.length) {
          setPlay({ ...play, userColors: copyUserColors });
        } else {
          await timeout(1000);
          setPlay({
            ...play,
            isDisplay: true,
            userPlay: false,
            score: play.colors.length,
            userColors: [],
          });
        }
      } else {
        await timeout(1000);
        setPlay({ ...initPlay, score: play.colors.length });
      }
      await timeout(1000);
      setFlashColor("");

    }
  };

  const closeHandle = () => {
    setIsOn(false);
  };
  return (
    <>
      <div className="cardWrapper">
        {colorList &&
          colorList.map((v, i) => (
            <ColorCard
              onCLick={() => {
                cardClickHandle(v);
              }}
              flash={flashColor === v}
              color={v}
            ></ColorCard>
          ))}
      </div>
      {isOn && !play.isDisplay && !play.userPlay && play.score && (
        <div className="lost">
          <div>Final Score: {play.score}</div>
          <button onClick={closeHandle}>Close</button>
        </div>
      )}
      {!isOn && !play.score && (
        <button onClick={startHandle} className="startButton">
          Start
        </button>

      )}
      {isOn && (play.isDisplay || play.userPlay) && (
        <div className="score">{play.score}</div>
      )}
    </>
  );
};

export default MainPage;
