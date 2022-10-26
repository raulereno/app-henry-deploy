import { Route } from "react-router-dom";
import LadingPage from "./components/LandingPage/LadingPage";
import DetailsDogs from "./components/DetailsDogs/DetailsDogs";
import Home from "./components/Home/Home";
import NewDog from "./components/NewDog/NewDog";
import "./styles/styles.scss";
import About from "./components/About/About";

function App() {
  return (
    <>
      <Route exact path={"/"} component={LadingPage} />
      <Route exact path={"/dogs"} component={Home} />
      <Route exact path={"/createDog"} component={NewDog} />
      <Route exact path={"/about"} component={About} />
      <Route path={"/dogs/:breed"} component={DetailsDogs} />
    </>
  );
}

export default App;
