import { useState } from "react";
import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { DisplayMode } from "./types";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Game from "./pages/Game";
import "./App.css";

const MIN_WORD_LENGTH = 2;
const MAX_WORD_LENGTH = 10;

const App = () => {
  let router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route
          index
          element={
            <Home
              minWordLength={MIN_WORD_LENGTH}
              maxWordLength={MAX_WORD_LENGTH}
            />
          }
        />
        <Route
          path="/endless"
          element={
            <Game
              mode="endless"
              minWordLength={MIN_WORD_LENGTH}
              maxWordLength={MAX_WORD_LENGTH}
            />
          }
        />
        <Route
          path="/daily"
          element={
            <Game
              mode="daily"
              minWordLength={MIN_WORD_LENGTH}
              maxWordLength={MAX_WORD_LENGTH}
            />
          }
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

const Root = () => {
  const [displayMode, setDisplayMode] = useState<DisplayMode>("dark");
  const toggleDisplayMode = () =>
    setDisplayMode((prev) => {
      if (prev === "dark") return "light";
      return "dark";
    });

  return (
    <section className={`app ${displayMode}`}>
      <Navbar displayMode={displayMode} toggleDisplayMode={toggleDisplayMode} />
      <main>
        <Outlet />
      </main>
    </section>
  );
};

export default App;
