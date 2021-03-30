import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Style from '../style/home.module.css';
const Home = ({ mute, handleMuteChange }) => {
  console.log(mute);

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
            <p>Special thanks to:</p>
            <button onClick={handleMuteChange}>click to change the prop</button>

            <ul>
              <li>Spotify API</li>
              <li>styled-components</li>
              <li>react-bootstrap</li>
              <li>Jdenticon</li>
              <li>Firebase</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
