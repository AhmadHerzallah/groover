import React from "react";
import Style from "../../style/search.module.css";
import { useState, useEffect } from "react";
import Jdenticon from "react-jdenticon";

const ArtistCard = (props) => {
  const [backgroundImage1, setbackgroundImage1] = useState(
    "https://color-hex.org/colors/242629.png",
  );
  useEffect(() => {
    props.data.images[1]
      ? setbackgroundImage1(props.data.images[1].url)
      : setbackgroundImage1("https://www.colorhexa.com/19191d.png");
  }, [props.data]);
  // console.log(backgroundImage1);
  //           backgroundImage: `url(${backgroundImage1})`,

  return (
    <div className={Style.search__results__item}>
      <div
        style={{
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          // filter: 'blur(3.5px)',
          filter: "brightness(0.5) blur(3.5px)",
          zIndex: -1,
        }}
      ></div>
      {props.data.images[2] ? (
        <div className={Style.search__results__item__wrapper}>
          <img
            src={props.data.images[2].url}
            alt=""
            className={Style.search__results__img__self_artists}
          />
        </div>
      ) : (
        <li className={Style.search__results__img}>
          <Jdenticon
            size="140"
            value={props.data.name}
            style={{
              borderRadius: "10px",
            }}
          />
        </li>
      )}
      <p>{props.data.name}</p>
      <li>
        {props.data.genres.length === 0 ? (
          <span>no genres found</span>
        ) : (
          props.data.genres.map((elem) => (
            <span>
              {elem}{" "}
              {props.data.genres.length === props.data.genres.indexOf(elem) + 1
                ? null
                : ", "}
            </span>
          ))
        )}
      </li>
      <a
        href={props.data.external_urls.spotify}
        rel="noreferrer"
        target="_blank"
      >
        {props.data.name}
      </a>
    </div>
  );
};

export default ArtistCard;
