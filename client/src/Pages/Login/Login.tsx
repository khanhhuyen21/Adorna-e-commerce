import { Link, useNavigate } from "react-router-dom";
import styles from "../../User.module.css";
import { FormEvent, useState } from "react";
import axios from "axios";
import GoogleButton from "react-google-button";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<any>("");
  function handleGoogleLogin() {
    window.open(
      "http://localhost:4000/api/v1/auth/google",
      "_blank",
      "width=500,height=600"
    );
  }
  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (email !== "" && password !== "") {
      const userLogin = {
        email: email,
        password: password,
      };
      axios
        .post("http://localhost:4000/api/v1/auth/login", userLogin)
        .then((data) => {
          localStorage.setItem("accessToken", data.data.accessToken);
          localStorage.setItem("username", JSON.stringify(data.data.data));
          setEmail("");
          setPassword("");
          setError({ email: "", password: "" });
          navigate("/");
        })
        .catch((error) => {
          setError({
            email: "Email or password is not match",
            password: "Email or password is not match",
          });
          console.log(error);
        });
    }
  }

  return (
    <div style={{ width: "350px", display: "block", margin: "0 auto" }}>
      <form onSubmit={handleLogin} action="" className={styles.formLogin}>
        <h1>LOG IN</h1>
        <p>Please enter your e-mail and password:</p>
        <div className={styles.inputLogin}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            id="email"
          />
          {error.email && <p className={styles.renderError}>{error.email}</p>}
        </div>
        <div className={styles.inputLogin}>
          <input
            className={styles.lastinputt}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            id="password"
          />
          {error.password && (
            <p className={styles.renderError}>{error.password}</p>
          )}
          <Link to="/auth/forgot-password">
            <span className={styles.forgotpassword}>Forgot Password</span>
          </Link>
        </div>
        <div>
          <a
            title="Login with Google"
            onClick={handleGoogleLogin}
            className="flex w-full px-5 py-1 mb-2 font-bold text-middle uppercase align-center transition-all bg-transparent border border-gray-200 border-solid  shadow-none cursor-pointer hover:scale-102 leading-pro text-xs ease-soft-in tracking-tight-soft bg-150 bg-x-25 hover:bg-transparent hover:opacity-75"
          >
            <svg
              xmlnsXlink="http://www.w3.org/1999/xlink"
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              viewBox="0 0 64 64"
              height="32px"
              width="24px"
            >
              <g fillRule="evenodd" fill="none" strokeWidth={1} stroke="none">
                <g fillRule="nonzero" transform="translate(3.000000, 2.000000)">
                  <path
                    fill="#4285F4"
                    d="M57.8123233,30.1515267 C57.8123233,27.7263183 57.6155321,25.9565533 57.1896408,24.1212666 L29.4960833,24.1212666 L29.4960833,35.0674653 L45.7515771,35.0674653 C45.4239683,37.7877475 43.6542033,41.8844383 39.7213169,44.6372555 L39.6661883,45.0037254 L48.4223791,51.7870338 L49.0290201,51.8475849 C54.6004021,46.7020943 57.8123233,39.1313952 57.8123233,30.1515267"
                  />
                  <path
                    fill="#34A853"
                    d="M29.4960833,58.9921667 C37.4599129,58.9921667 44.1456164,56.3701671 49.0290201,51.8475849 L39.7213169,44.6372555 C37.2305867,46.3742596 33.887622,47.5868638 29.4960833,47.5868638 C21.6960582,47.5868638 15.0758763,42.4415991 12.7159637,35.3297782 L12.3700541,35.3591501 L3.26524241,42.4054492 L3.14617358,42.736447 C7.9965904,52.3717589 17.959737,58.9921667 29.4960833,58.9921667"
                  />
                  <path
                    fill="#FBBC05"
                    d="M12.7159637,35.3297782 C12.0932812,33.4944915 11.7329116,31.5279353 11.7329116,29.4960833 C11.7329116,27.4640054 12.0932812,25.4976752 12.6832029,23.6623884 L12.6667095,23.2715173 L3.44779955,16.1120237 L3.14617358,16.2554937 C1.14708246,20.2539019 0,24.7439491 0,29.4960833 C0,34.2482175 1.14708246,38.7380388 3.14617358,42.736447 L12.7159637,35.3297782"
                  />
                  <path
                    fill="#EB4335"
                    d="M29.4960833,11.4050769 C35.0347044,11.4050769 38.7707997,13.7975244 40.9011602,15.7968415 L49.2255853,7.66898166 C44.1130815,2.91684746 37.4599129,0 29.4960833,0 C17.959737,0 7.9965904,6.62018183 3.14617358,16.2554937 L12.6832029,23.6623884 C15.0758763,16.5505675 21.6960582,11.4050769 29.4960833,11.4050769"
                  />
                </g>
              </g>
            </svg>
            Login with Google
          </a>
        </div>
        <input className={styles.btnLogin} type="submit" value="LOGIN" />
        <p>
          Don't have an account? <Link to="/auth/register">Create one</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
