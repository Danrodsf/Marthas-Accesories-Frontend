import Logo from "../../img/logo-black.png";
import Hero from "../../img/hero.jpg";
const Home = () => {
  return (
    <div className="main">
      <img className="hero" src={Hero} alt="hero" />
      <div className="home-container container">
        <img className="logo" src={Logo} alt="martha's accesorios" />
      </div>
    </div>
  );
};

export default Home;
