import React, { useState, useEffect } from "react";
import ColorCard from "../components/ColorCard";
import timeout from "../utils/util";
import axios from "axios";
import "../App.css";
const BASE_URL = "http://localhost:5001";

const MainPage = () => {
  const [isOn, setIsOn] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [winnerName, setWinnerName] = useState("");
  const [playerScore, setPlayerScore] = useState(0);
  const colorList = ["green", "red", "yellow", "blue"];
  // const user_name = localStorage.getItem("user_name");
  const user_email = localStorage.getItem("email");

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
    fetchData();
    setIsOn(true);
  };

  const fetchData = async () => {
    const response = await axios.get(
      `${BASE_URL}/api/scores?email=${user_email}`
    );
    console.log(`response.data`, response);
    const { name, score } = response.data;
    setHighScore(score);
    setWinnerName(name);
  };

  useEffect(() => {
    if (isOn) {
      setPlay({ ...initPlay, isDisplay: true });
    } else {
      setPlay(initPlay);
    }
  }, [isOn]);

  useEffect(() => {
    fetchData();
  }, []);

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
    await timeout(600);
    for (let i = 0; i < play.colors.length; i++) {
      setFlashColor(play.colors[i]);
      await timeout(600);
      setFlashColor("");
      await timeout(600);

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
      await timeout(600);
      setFlashColor("");

      if (color === lastColor) {
        if (copyUserColors.length) {
          setPlay({ ...play, userColors: copyUserColors });
        } else {
          await timeout(600);
          setPlay({
            ...play,
            isDisplay: true,
            userPlay: false,
            score: setPlayerScore(play.colors.length),
            userColors: [],
          });
        }
      } else {
        // await timeout(600);
        setPlay({ ...initPlay, score: play.colors.length });
      }
      await timeout(600);
      setFlashColor("");
    }
  };

  const closeHandle = () => {
    if (playerScore >= highScore) {
      axios.put(`${BASE_URL}/api/scores`, {
        email: user_email,
        score: playerScore,
      });
    }
    setIsOn(false);
  };
  return (
    <>
      {isOn ? (
        <h3>
          The highscore is: {highScore} by {winnerName}
        </h3>
      ) : (
        <h3>Hi {winnerName}, Welcome to Simon Says</h3>
      )}

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
          <div>Final Score: {playerScore}</div>
          <button onClick={closeHandle}>Close</button>
        </div>
      )}
      {!isOn && !play.score && (
        <button onClick={startHandle} className="startButton">
          Start
        </button>
      )}
      {isOn && (play.isDisplay || play.userPlay) && (
        <div className="score">{playerScore}</div>
      )}
    </>
  );
};

export default MainPage;
