import Google from "../assets/google.png";

const Login = () => {
  const google = () => {
    window.open(process.env.REACT_APP_API_URL + "auth/google", "_self");
  };

  return (
    <div className="login">
      <h1 className="loginTitle">Choose a Login Method</h1>
      <div className="wrapper">
        <div className="left">
          <div className="loginButton google" onClick={google}>
            <img src={Google} alt="" className="icon" />
            Google
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;