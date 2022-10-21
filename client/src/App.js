import { Route } from "react-router-dom";
import LadingPage from "./components/LandingPage/LadingPage";
import DetailsDogs from "./components/DetailsDogs/DetailsDogs";
import Home from "./components/Home/Home";

function App() {
  return (
    <>
      <Route exact path={"/"}>
        <LadingPage />
      </Route>
      <Route exact path={"/dogs"}>
        <Home />
      </Route>
      <Route path={"/dogs/:breed"} component={DetailsDogs} />
    </>
  );
}

export default App;
