import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  body {
    ${'' /* align-items: center; */}
    background: ${({ theme }) => theme.body};
    color: #FAFAFA;
    ${'' /* display: flex; */}
    ${'' /* flex-direction: column; */}
    ${'' /* justify-content: center; */}
    height: 100vh;
    margin: 0;
    padding: 0;
    ${
      '' /* font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; */
    }
    font-family: 'TT Norms Pro';
    transition: all 0.25s linear;
  }

  ::selection {
    background-color: #7f5af0;
    font-weight: 700 !important;

    color: black;
  }
  .navbar {
    background-color: ${({ theme }) => theme.nav} !important;
  }
  .navbar-brand {
    color: ${({ theme }) => theme.text} !important;
  }
  .navbar-nav a{
    color: ${({ theme }) => theme.text} !important;
  }
  .nav-link{
    color: ${({ theme }) => theme.text} !important;
    font-size: 20px;
  }

  .login__btn {
    color: ${({ theme }) => theme.text} !important;
    ${'' /* font-size: 1rem; */}
  }

  .navbar-brand a {
    color: ${({ theme }) => theme.text} !important;
    text-decoration: none;
}
  .react-switch {
    margin-top: 18px;
    margin-right: 20px;
    margin-left: 10px;
  }

  ${
    '' /* .react-switch-bg > div:first-of-type {
    margin-left: 7px;
    padding-top: 1px;
  }
  .react-switch-bg > div:last-of-type {
    margin-right: 7px;
    padding-top: 1.5px;
  } */
  }

  `;
