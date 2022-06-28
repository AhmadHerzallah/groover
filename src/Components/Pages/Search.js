/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from 'react';
import Style from '../../style/search.module.css';
import Form from 'react-bootstrap/Form';
import Switch from 'react-switch';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Jdenticon from 'react-jdenticon';

// Imports
import ArtistCard from '../SearchCards/ArtistCard';
import TrackCard from '../SearchCards/TrackCard';

const Search = () => {
  //#region
  const [switcher, setSwitcher] = useState(true);
  const [query, setQuery] = useState('JuiceWRLD');
  const [flag, setFlag] = useState(false);
  const [artistData, setArtistData] = useState({});
  const [trackData, setTrackData] = useState({});
  useEffect(() => {
    switcher ? getDataArtist() : getDataTrack();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flag]);
  const handleSwitchChange = () => {
    setSwitcher(!switcher);
  };

  const token =
    'BQC71mgEndqmA_HV6OTABtPUv1mZ7lLsD0lNDJPi0C5HKAO5Ho5m5ufN25GPgmFC1QoAl5sJwAJ-8MJ_YW22ZaFIMbJkKA5nS7ajrXvskCzlOVne9aVRnSz2jO6RTyPMmHUNvwVSwgTxHUzZ64uDNJhwf2xwC_Cz4gv9D8ZkNMK8LeNhF_InKTZkzA0OXIrvVTzA9QUAlM-nSPF_ww';
  const getDataArtist = async () => {
    const res = await fetch(
      `https://api.spotify.com/v1/search?q=${query}&type=artist&limit=10&access_token=${token}`
    );
    const data = await res.json();
    // console.log('searching..');
    setArtistData(data);
  };

  const getDataTrack = async () => {
    const res = await fetch(
      `https://api.spotify.com/v1/search?q=${query}&type=track&limit=10&access_token=${token}`
    );
    const data = await res.json();
    // console.log('searching..');
    setTrackData(data);
  };
  let artistlist = [];
  let tracklist = [];
  const changeAhistory = () => {
    if (localStorage.getItem('AH') != null) {
      if (Array.isArray(JSON.parse(localStorage.getItem('AH')))) {
        artistlist = JSON.parse([localStorage.getItem('AH')]);
        artistlist.push(query);
      } else {
        artistlist = [JSON.parse(localStorage.getItem('AH'))];
        artistlist.push(query);
      }
      localStorage.setItem('AH', JSON.stringify(artistlist));
    } else {
      localStorage.setItem('AH', JSON.stringify(query));
    }
  };
  const changeThistory = () => {
    if (localStorage.getItem('TH') != null) {
      if (Array.isArray(JSON.parse(localStorage.getItem('TH')))) {
        tracklist = JSON.parse([localStorage.getItem('TH')]);
        tracklist.push(query);
      } else {
        tracklist = [JSON.parse(localStorage.getItem('TH'))];
        tracklist.push(query);
      }
      localStorage.setItem('TH', JSON.stringify(tracklist));
    } else {
      localStorage.setItem('TH', JSON.stringify(query));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    switcher ? changeAhistory() : changeThistory();
    setFlag(!flag);
    // console.log(`searched: ${query}`);
  };

  const handleValueChange = (e) => {
    setQuery(e.target.value);

    // console.log(query);
  };
  // let history = [];
  // const isArtist = () => {
  //   history = [];
  //   let Artists = JSON.parse([localStorage.getItem('AH')]);
  //   let len = Artists.length;
  //   // console.log(Artists);
  //   let len2 = 0;
  //   // console.log(len);
  //   if (len <= 10) {
  //     len2 = 0;
  //   } else {
  //     len2 = len - 10;
  //   }
  //   for (let i = len - 1; i >= len2; i--) {
  //     if (history.includes(Artists[i]) === false) {
  //       history.push(Artists[i]);
  //       // console.log(Artists[i]);
  //     }
  //   }
  //   // console.log(history);
  // };
  // const isTrack = () => {
  // history = [];
  // let Tracks = JSON.parse([localStorage.getItem("TH")]);
  // let len3 = Tracks.length;
  // // console.log(Tracks);
  // let len4 = 0;
  // // console.log(len);
  // if (len3 <= 10) {
  //   len4 = 0;
  // } else {
  //   len4 = len3 - 10;
  // }
  // for (let i = len3 - 1; i >= len4; i--) {
  //   if (history.includes(Tracks[i]) === false) {
  //     history.push(Tracks[i]);
  //     // console.log(Tracks[i]);
  //   }
  // }
  // console.log(history);
  // localStorage.setItem("TH", "up up and away");
  // };
  // const handleFocus = () => {
  //   switcher ? isArtist() : isTrack();
  //   history.map((historyItem) => <h1 key={historyItem}>{historyItem}</h1>);
  // };

  //#endregion

  return (
    <Container>
      <div className={Style.search__div}>
        <h1 className={Style.search__title}>Search</h1>
        <form onSubmit={handleSubmit} className={Style.search__form}>
          <Row>
            <Col md={3} sm={12}>
              <div className={Style.search__swtiches}>
                <p className={Style.search__state}>
                  Type:{' '}
                  <span className={Style.search__current}>
                    {switcher ? 'Artist' : 'Track'}
                  </span>
                </p>
                <Switch
                  onChange={handleSwitchChange}
                  checked={switcher}
                  className='react-switch'
                  uncheckedIcon={``}
                  onColor='#7f5af0'
                  checkedIcon={``}
                  width={60}
                  aria-label='switcher'
                />
              </div>
            </Col>
            <Col md={9} sm={12}>
              <input
                placeholder={
                  switcher ? 'Search for an Artist' : 'Search for Track'
                }
                className={Style.search__btn}
                value={query}
                onChange={handleValueChange}
                id='search_bar'
                aria-label='search'
              ></input>
              {/*                 onFocus={handleFocus()} */}
            </Col>
          </Row>
        </form>
        <div className={Style.results}>
          {/* {history && history.map((historyItem) => <h1>{historyItem}</h1>)} */}
          {switcher ? (
            artistData.artists &&
            artistData.artists.items.map((res) => (
              <div>
                <ArtistCard data={res} />
              </div>
            ))
          ) : (
            <>
              {trackData.tracks &&
                trackData.tracks.items.map((res) => <TrackCard data={res} />)}
              {/* {console.log(trackData)} */}
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Search;
