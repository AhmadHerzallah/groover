import React, { useEffect, useState } from 'react';
import Style from '../style/search.module.css';
import Form from 'react-bootstrap/Form';
import Switch from 'react-switch';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
const Search = () => {
  const [switcher, setSwitcher] = useState(false);
  const handleSwitchChange = () => {
    setSwitcher(!switcher);
    console.log(
      switcher
        ? `artist condition: ${switcher}`
        : `song condition: ${switcher}`,
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
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
                    {switcher ? 'Artist' : 'Song'}
                  </span>
                </p>
                <Switch
                  onChange={handleSwitchChange}
                  checked={switcher}
                  className="react-switch"
                  uncheckedIcon={``}
                  onColor="#7f5af0"
                  checkedIcon={``}
                  width={60}
                />
              </div>
            </Col>
            <Col md={9} sm={12}>
              <input
                placeholder="Search..."
                className={Style.search__btn}
              ></input>
            </Col>
          </Row>
        </form>
      </div>
    </Container>
  );
};

export default Search;
