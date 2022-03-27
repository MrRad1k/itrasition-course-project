import Google from "../assets/google.png";
import Facebook from "../assets/facebook.png";
import Github from "../assets/github.png";

const Login = () => {
  const google = () => {
    window.open(process.env.REACT_APP_API_URL + "auth/google", "_self");
  };
  const facebook = () => {
    window.open(process.env.REACT_APP_API_URL + "auth/facebook", "_self");
  };
  const github = () => {
    window.open(process.env.REACT_APP_API_URL + "auth/github", "_self");
  };


  return (
    <div className="login">
      <h1 className="loginTitle">Выберите способ входа</h1>
      <div className="wrapper">
        <div className="left">
          <div className="loginButton google" onClick={google}>
            <img src={Google} alt="" className="icon" />
            Google
          </div>
          <div className="loginButton facebook" onClick={facebook}>
            <img src={Facebook} alt="" className="icon" />
            Facebook
          </div>
          <div className="loginButton github" onClick={github}>
            <img src={Github} alt="" className="icon" />
            Github
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;