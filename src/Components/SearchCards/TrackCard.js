import React from 'react';
import Style from '../../style/search.module.css';
import Jdenticon from 'react-jdenticon';

const TrackCard = (props) => {
  return (
    <div className={Style.search__results__item__track}>
      <div className={Style.search__results__item__wrapper}>
        <ul>
          {props.data.album.images[1] ? (
            <li className={Style.search__results__img}>
              <img
                className={Style.search__results__img__self_tracks}
                src={props.data.album.images[1].url}
                alt=''
                width={150}
              />
            </li>
          ) : (
            <li className={Style.search__results__img}>
              <Jdenticon size='140' value={props.data.name} />
            </li>
          )}
          <li className={Style.search__results__name}>{props.data.name}</li>
          <li className={Style.search__results__artists}>
            {props.data.artists.map((elem) => (
              <span>
                {elem.name}{' '}
                {props.data.artists.length ===
                props.data.artists.indexOf(elem) + 1
                  ? null
                  : ', '}
              </span>
            ))}
          </li>
          <li className={Style.search__results__spotify__player}>
            {/* {console.log(props.data.uri.split(':'))} */}
            <iframe
              src={`https://open.spotify.com/embed/${
                props.data.uri.split(':')[1]
              }/${props.data.uri.split(':')[2]}`}
              width='240'
              title='Spotify'
              height='80'
              style={{ borderRadius: '5px' }}
              frameborder='0'
              allowtransparency='true'
              allow='encrypted-media'
            ></iframe>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TrackCard;
