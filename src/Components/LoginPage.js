import React from 'react';
import Style from '../style/loginPanel.module.css';
const LoginPage = (props) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    handleSignup,
    hasAccount,
    setHasAccount,
    emailError,
    passwordError,
  } = props;

  return (
    <div className={`${Style.login__panel} text-center`}>
      <h1>Login</h1>
      <div className={Style.login__card}>
        <form onSubmit={(e) => {
          e.preventDefault()
        }}>
          <label>Username</label>
          <input
            type="text"
            autoFocus
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={Style.login__email__input}
          />
          <p className={Style.errorMsg}>{emailError}</p>
          <label>Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className={Style.errorMsg}>{passwordError}</p>
          <div className={Style.login__btn__container}>
            {hasAccount ? (
              <>
                <button onClick={handleLogin}>Sign in</button>
                <p>
                  Don't have an account ?{' '}
                  <span onClick={() => setHasAccount(!hasAccount)}>
                    Sign up
                  </span>
                </p>
              </>
            ) : (
              <>
                <button onClick={handleSignup}>Sign up</button>
                <p>
                  Have an account?{' '}
                  <span onClick={() => setHasAccount(!hasAccount)}>
                    Sign in
                  </span>
                </p>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
