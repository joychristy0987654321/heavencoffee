import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    localStorage.setItem(
      "loggedInUser",
      JSON.stringify({
        email,
        remember,
      })
    );

    navigate("/");
  };

  return (
    <div className="login-page">

      <div className="login-box">

        {/* LEFT SIDE */}
        <div className="login-left">

          <div className="brand">
            <div className="coffee-icon">☕</div>

            <h1>
              Coffee <span>Haven</span>
            </h1>

            <p>PREMIUM COFFEE • FRESH VIBES</p>
          </div>

          <div className="welcome">
            <h2>Welcome Back!</h2>

            <p>
              Login to continue your coffee journey
              <br />
              and enjoy your favourite coffee.
            </p>

            <div className="benefits">
              <div>🍃 &nbsp; Better Coffee</div>
              <div>♥️ &nbsp; Happier Moments</div>
              <div>🍃 &nbsp; Together Always</div>
            </div>
          </div>

          <div className="fresh-text">
            Fresh Coffee
            <br />
            Fresh Start
          </div>

          <div className="coffee-cup">
            ☕
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="login-right">

          <div className="leaf">🍂</div>

          <h2>Sign In</h2>

          <p className="subtitle">
            Enter your details to continue
          </p>

          <form onSubmit={handleLogin}>

            {/* EMAIL */}
            <label>Email Address</label>

            <div className="input-box">
              <span>✉</span>

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <small>Enter your email</small>

            {/* PASSWORD */}
            <label>Password</label>

            <div className="input-box">
              <span>🔒</span>

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <span>👁</span>
            </div>

            <small>Enter your password</small>

            {/* OPTIONS */}
            <div className="options">

              <label className="remember">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) =>
                    setRemember(e.target.checked)
                  }
                />

                Remember Me
              </label>

              <button
                type="button"
                className="forgot"
                onClick={() =>
                  alert("Password reset coming soon")
                }
              >
                Forgot Password?
              </button>

            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="login-button"
            >
              Login
              <span>→</span>
            </button>

          </form>

          {/* OR */}
          <div className="or">
            <div></div>
            <span>or</span>
            <div></div>
          </div>

          {/* GOOGLE */}
          <button
            className="google-button"
            onClick={() =>
              alert("Google Login coming soon")
            }
          >
            <span className="google-icon">G</span>
            Continue with Google
          </button>

          {/* CREATE ACCOUNT */}
          <p className="create-account">
            Don't have an account?

            <Link to="/register">
              Create Account
            </Link>
          </p>

        </div>

      </div>

      <style>{`

        * {
          box-sizing: border-box;
        }

        .login-page {
          min-height: 90vh;
          padding: 50px 20px;
          display: flex;
          justify-content: center;
          align-items: center;

          background:
            radial-gradient(
              circle at top left,
              #fff7e9,
              #ead8bd
            );
        }

        .login-box {
          width: 100%;
          max-width: 1250px;
          min-height: 700px;

          display: grid;
          grid-template-columns: 1fr 1fr;

          background: white;

          border-radius: 25px;
          overflow: hidden;

          box-shadow:
            0 25px 60px
            rgba(60, 35, 20, 0.25);
        }

        /* LEFT */

        .login-left {
          position: relative;

          padding: 65px 65px;

          color: white;

          display: flex;
          flex-direction: column;

          background:
            linear-gradient(
              rgba(35, 18, 10, 0.65),
              rgba(35, 18, 10, 0.85)
            ),
            url("https://images.unsplash.com/photo-1495474472287-4d71bcdd2085");

          background-size: cover;
          background-position: center;

          overflow: hidden;
        }

        .brand {
          text-align: center;
        }

        .coffee-icon {
          font-size: 65px;
          margin-bottom: 5px;
        }

        .brand h1 {
          font-family: Georgia, serif;
          font-size: 42px;
          margin: 0;
          letter-spacing: -1px;
        }

        .brand h1 span {
          color: #dca55d;
        }

        .brand p {
          margin-top: 10px;

          font-size: 12px;
          letter-spacing: 4px;

          color: #eee;
        }

        .welcome {
          margin-top: 65px;
        }

        .welcome h2 {
          font-family: Georgia, serif;
          font-size: 42px;
          margin-bottom: 15px;
        }

        .welcome p {
          font-size: 18px;
          line-height: 1.7;
          color: #f3f3f3;
        }

        .benefits {
          margin-top: 25px;

          font-size: 16px;
          line-height: 2.7;

          color: #f5d7a6;
        }

        .fresh-text {
          margin-top: 40px;

          font-family: cursive;
          font-size: 28px;

          color: #f4d39d;

          transform: rotate(-5deg);
        }

        .coffee-cup {
          position: absolute;

          bottom: -35px;
          right: 50px;

          font-size: 180px;

          filter:
            drop-shadow(
              0 15px 20px
              rgba(0,0,0,0.5)
            );
        }

        /* RIGHT */

        .login-right {
          position: relative;

          padding: 70px 75px;

          background: #fffdf9;
        }

        .leaf {
          position: absolute;

          top: 35px;
          right: 45px;

          font-size: 40px;
        }

        .login-right h2 {
          font-family: Georgia, serif;

          font-size: 48px;

          color: #29170e;

          margin: 20px 0 10px;
        }

        .subtitle {
          color: #888;
          font-size: 18px;

          margin-bottom: 45px;
        }

        .login-right form label {
          display: block;

          font-size: 15px;
          font-weight: 600;

          color: #553222;

          margin-bottom: 8px;
        }

        .input-box {
          width: 100%;

          height: 60px;

          border: 1px solid #d9d9d9;

          border-radius: 10px;

          display: flex;
          align-items: center;

          padding: 0 18px;

          background: white;

          transition: 0.3s;
        }

        .input-box:focus-within {
          border-color: #8b4f2c;

          box-shadow:
            0 0 0 3px
            rgba(139,79,44,0.1);
        }

        .input-box span {
          color: #777;
          font-size: 20px;
        }

        .input-box input {
          flex: 1;

          border: none;
          outline: none;

          font-size: 16px;

          padding: 0 14px;

          background: transparent;
        }

        .input-box input::placeholder {
          color: #aaa;
        }

        .login-right small {
          display: block;

          color: #999;

          margin: 7px 0 30px;

          font-size: 14px;
        }

        .options {
          display: flex;

          justify-content: space-between;
          align-items: center;

          margin-top: -5px;
          margin-bottom: 25px;
        }

        .remember {
          display: flex !important;

          align-items: center;

          gap: 9px;

          font-weight: normal !important;

          color: #666 !important;

          margin: 0 !important;
        }

        .remember input {
          width: 18px;
          height: 18px;

          accent-color: #754021;
        }

        .forgot {
          border: none;

          background: transparent;

          color: #753d20;

          font-size: 14px;

          font-weight: 600;

          cursor: pointer;
        }

        .login-button {
          width: 100%;

          height: 60px;

          border: none;

          border-radius: 12px;

          background:
            linear-gradient(
              135deg,
              #6e3d20,
              #9a5b32
            );

          color: white;

          font-size: 20px;

          font-family: Georgia, serif;

          cursor: pointer;

          display: flex;

          justify-content: center;
          align-items: center;

          gap: 20px;

          transition: 0.3s;
        }

        .login-button:hover {
          transform: translateY(-2px);

          box-shadow:
            0 10px 25px
            rgba(100,55,25,0.3);
        }

        .login-button span {
          font-size: 25px;
        }

        .or {
          display: flex;

          align-items: center;

          gap: 15px;

          margin: 35px 0;

          color: #999;
        }

        .or div {
          flex: 1;

          height: 1px;

          background: #ddd;
        }

        .google-button {
          width: 100%;

          height: 58px;

          border: 1px solid #d8d8d8;

          border-radius: 12px;

          background: white;

          font-size: 17px;

          cursor: pointer;

          display: flex;

          justify-content: center;

          align-items: center;

          gap: 15px;
        }

        .google-icon {
          font-weight: bold;

          font-size: 23px;

          color: #4285f4;
        }

        .create-account {
          text-align: center;

          margin-top: 35px;

          color: #888;

          font-size: 16px;
        }

        .create-account a {
          color: #753d20;

          font-weight: 600;

          text-decoration: none;

          margin-left: 8px;
        }

        .create-account a:hover {
          text-decoration: underline;
        }

        /* MOBILE */

        @media (max-width: 850px) {

          .login-box {
            grid-template-columns: 1fr;
          }

          .login-left {
            min-height: 500px;
          }

          .login-right {
            padding: 45px 30px;
          }

        }

        @media (max-width: 500px) {

          .login-page {
            padding: 20px 10px;
          }

          .login-left {
            padding: 45px 30px;
          }

          .welcome h2 {
            font-size: 32px;
          }

          .login-right h2 {
            font-size: 38px;
          }

          .options {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }

        }

      `}</style>
    </div>
  );
}

export default Login;













