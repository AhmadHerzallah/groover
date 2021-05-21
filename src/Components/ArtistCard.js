import React from 'react';

const ArtistCard = (props) => {
  console.log(props.data);
  return (
    <div>
      <h1>Hey</h1>
      <p>{props.data.name}</p>
      {props.data.images[2] ? (
        <div>
          <img src={props.data.images[2].url} alt='' />
        </div>
      ) : null}

      <li>
        {props.data.genres.map((elem) => (
          <span>
            {elem}{' '}
            {props.data.genres.length === props.data.genres.indexOf(elem) + 1
              ? null
              : ', '}
          </span>
        ))}
      </li>
      <a
        href={props.data.external_urls.spotify}
        rel='noreferrer'
        target='_blank'
      >
        {props.data.name}
      </a>
    </div>
  );
};

export default ArtistCard;
