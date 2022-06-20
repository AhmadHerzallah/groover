/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Style from "../../style/home.module.css";
const Home = () => {
  const allMoods = [
    {
      moods: ["Hyped"],
      artist: ["Travis Scott", "Shabjdeed", "Lil Uzi Vert", "Kanye West"],
    },
    {
      moods: ["Sad", "Depressed"],
      artist: ["XXXTentacion", "Frank Ocean", "NF", "Joji", "Mac DeMarco"],
    },
    {
      moods: ["Calm"],
      artist: [
        "Post Malone",
        "Bad Bunny",
        "Don Toliver",
        "TV Girl",
        "The Weeknd",
      ],
    },
    {
      moods: ["Romantic"],
      artist: ["Lil Tjay", "Frank Ocean", "Ariana Grande", "YNW Melly"],
    },
    {
      moods: ["Loney"],
      artist: ["NF", "XXXTentaction", "Juice WRLD", "Joji"],
    },
    {
      moods: ["Fearful"],
      artist: [
        "Lucii",
        "Central Cee",
        "J. Cole",
        "Kanye West",
        "Kendrick Lamar",
      ],
    },
  ];

  const [mood, setMood] = useState({});

  const randomMood = () => {
    const len = allMoods.length;
    setMood(Math.floor(Math.random() * len));
    console.log(mood);
  };

  useEffect(() => {
    randomMood();
  }, []);

  return (
    <div className={Style.home__header}>
      {/* <h1>Home</h1> */}
      <Container>
        <Row>
          <Col md={8} sm={12}>
            <h1 className={Style.title}>
              Welcome to <span className={Style.title__name}>Groover</span>
            </h1>
            <p className={Style.header__brief}>
              We provide you with data about your favorite artist.
            </p>
          </Col>
          <Col md={4} sm={12} className="part2">
            <div className={Style.card}>
              <h1 className={Style.title}>
                Feeling{" "}
                {allMoods[mood] &&
                  allMoods[mood].moods.map((rnmood) => (
                    <span>
                      {rnmood}
                      {""}
                      {allMoods[mood].moods.length ===
                      allMoods[mood].moods.indexOf(rnmood) + 1
                        ? null
                        : ", "}
                    </span>
                  ))}{" "}
                ?
              </h1>
              <div className={Style.artist}>
                Go and listen to:
                <div className={Style.allArtist}>
                  {allMoods[mood] &&
                    allMoods[mood].artist.map((rnmood) => (
                      <ul>
                        <li>- {rnmood}</li>
                      </ul>
                    ))}
                </div>
              </div>
              <div className={Style.changeMood}>
                <button className={Style.changeMoodBtn} onClick={randomMood}>
                  into another mood?
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
