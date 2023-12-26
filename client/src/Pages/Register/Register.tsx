import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "../../User.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [error, setError] = useState<any>("");
  const [repeatpassword, setRepeatPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorData, setErrorData] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  const navigate = useNavigate();
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const checkError = await handleValidate();
    setError(checkError);
    if (
      !checkError.email &&
      !checkError.password &&
      !checkError.fullName &&
      !checkError.repeatPassword
    ) {
      const user = {
        fullName: fullName,
        email: email,
        password: password,
        repeatpassword: repeatpassword,
      };
      await axios
        .post("http://localhost:4000/api/v1/auth/register", user)
        .then((response) => {
          if (response.data.status === 200) {
            setFullName(""),
              setEmail(""),
              setPassword(""),
              setRepeatPassword("");
            alert("Register successfully");
            navigate("/auth");
          }
          if (response.data.type == "password") {
            setErrorPassword(response.data.msg);
            setErrorEmail("");
          }
          if (response.data.type == "email") {
            setErrorEmail(response.data.msg);
          }
        })
        .catch((err) => {
          setErrorData(err.response.data.msg);
        });
    }
  }
  function handleValidate() {
    const newError: any = {};
    if (!email.trim()) {
      newError.email = "Email is required";
    }
    if (!password.trim()) {
      newError.password = "Password is required";
    }
    if (!repeatpassword.trim()) {
      newError.repeatPassword = "Repeatpassword is required";
    } else if (password.trim().length < 8) {
      newError.password = "Password must be at least 8 characters long";
    }
    if (!fullName.trim()) {
      newError.fullName = "Full Name is required";
    }
    return newError;
  }
  useEffect(() => {}, [error, errorPassword, errorEmail]);
  return (
    <div style={{ width: "350px", display: "block", margin: "0 auto" }}>
      <form onSubmit={handleSubmit} className={styles.formRegister}>
        <h3>REGISTER</h3>
        <p>Please fill in the information below:</p>
        <div className={styles.inputRegister}>
          <input
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            name="lastName"
            type="text"
            placeholder="Full Name"
            id="full-name"
          />
          <p className={styles.renderErrorrrr}>{error.fullName}</p>
        </div>
        <div className={styles.inputRegister}>
          {" "}
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name="email"
            type="email"
            placeholder="Email"
            id="email"
          />
          <p className={styles.renderErrorrrr}>
            {errorEmail}
            {error.email}{" "}
          </p>
        </div>
        <div className={styles.inputRegister}>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name="password"
            type="password"
            placeholder="Password"
            id="password"
          />
          <p className={styles.renderErrorrrr}>{error.password}</p>
        </div>
        <div className={styles.inputRegister}>
          <input
            onChange={(e) => setRepeatPassword(e.target.value)}
            value={repeatpassword}
            type="password"
            placeholder="Repeat password"
            id="repeat-password"
          />
          <p className={styles.renderErrorrrr}>
            {error.repeatPassword}
            {errorPassword}
          </p>
        </div>
        {/* <input style={{display:"none"}} placeholder="Chọn ảnh đại diện" className={styles.upload} type="file" onChange={handleAvatarChange} /> */}
        <input type="submit" value="CREATE MY ACCOUNT" />
      </form>
    </div>
  );
};

export default Register;
