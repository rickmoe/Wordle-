import Navbar from "./components/Navbar";
import Game from "./pages/Game";
import "./App.css";

const App = () => {
  return (
    <>
      <Navbar />
      <main className="main">
        <Game />
      </main>
    </>
  );
};

export default App;
