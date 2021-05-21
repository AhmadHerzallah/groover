import React from 'react';
import signUpStyle from '../../style/signup.module.css';
import { createGlobalStyle } from 'styled-components';
import { ArrowLeft } from 'react-feather';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import MobileIllustration from '../../assets/icons/mobile_ill.svg';

const GlobalStyle = createGlobalStyle`
  .navbar {
    display: none;
  }
  html, body {
    overflow-x: hidden;
    overflow-y: hidden;
  }
`;

const Signup = () => {
  return (
    <div className='signUpPage'>
      <GlobalStyle />

      <div>
        <Row>
          <Col md={7}>
            <div className={signUpStyle.backButton}>
              <Link to='/' className={signUpStyle.backButton__Link}>
                {' '}
                <ArrowLeft style={{ marginBottom: '2px' }} />
                <p className={signUpStyle.backButton__Text}>Go back</p>
              </Link>
            </div>
            <div className={signUpStyle.signUp__Title}>
              <h2>Sign up</h2>
            </div>
            <div className={signUpStyle.social}>
              <button className={signUpStyle.social__google}>
                Continue with Google
              </button>
            </div>
          </Col>
          <Col>
            <div className={signUpStyle.right}>
              <div className={signUpStyle.layout}>
                <h1>Groover</h1>
                <h2 className={signUpStyle.layout__words}>
                  A few clicks away from creating your Profile
                </h2>
                <div className={signUpStyle.layout__image}>
                  <img
                    className={signUpStyle.layout__illustraion}
                    // width={'380'}
                    src={MobileIllustration}
                    alt=''
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Signup;
