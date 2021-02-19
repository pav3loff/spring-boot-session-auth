import "./Home.css";

function Home(props) {
  return (
    <div className="home-main-container">
      {props.isLoggedIn ? (
        <h1 className="home-welcome-text">
          Welcome {localStorage.getItem("loggedUserName")}!
        </h1>
      ) : (
        <h1 className="home-welcome-text">Welcome!</h1>
      )}
    </div>
  );
}

export default Home;
