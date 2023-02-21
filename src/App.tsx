import "./App.css";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";

function App(): JSX.Element {
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return { loaded } && <Navbar />;
}

export default App;
