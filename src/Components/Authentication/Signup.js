import React from 'react';
import signUpStyle from '../../style/signup.module.scss';
import { createGlobalStyle } from 'styled-components';
import { ArrowLeft } from 'react-feather';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Google from '../../assets/icons/google.svg';

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
          <Col md={7} className={signUpStyle.column__left}>
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
              <button className={signUpStyle.social__github}>
                Continue with Google
              </button>
            </div>
            <div className={signUpStyle.lineBreaker}>
              <p>or Sign up with Email</p>
            </div>
            <div className={signUpStyle.email__form}>
              <form>
                <label htmlFor='name'>Name</label>
                <br />
                <input
                  className={signUpStyle.form__input}
                  type='text'
                  id='name'
                  placeholder='Joe Smith'
                />
                <br />
                <label htmlFor='email'>Email</label>
                <br />
                <input
                  className={signUpStyle.form__input}
                  type='text'
                  id='email'
                  placeholder='mail@mail.com'
                />
                <br />
                <label htmlFor='password'>Password</label>
                <br />
                <input
                  className={signUpStyle.form__input}
                  type='text'
                  id='password'
                  placeholder='Min. 8 character'
                />
                <br />
                <input type='checkbox' name='' id='terms' />
                <label
                  htmlFor='terms'
                  className={signUpStyle.indented__checkbox__text}
                >
                  I agree to the terms and conditions
                </label>
              </form>
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
