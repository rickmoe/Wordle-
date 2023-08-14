import { useState } from "react";
import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { DisplayMode } from "./types/types";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Game from "./pages/Game/Game";
import "./App.css";

const wordLengthBounds = { min: 2, max: 10 };

const App = () => {
  let router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home wordLengthBounds={wordLengthBounds} />} />
        <Route
          path="/endless"
          element={<Game mode="endless" wordLengthBounds={wordLengthBounds} />}
        />
        <Route
          path="/daily"
          element={<Game mode="daily" wordLengthBounds={wordLengthBounds} />}
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
