import { BrowserRouter } from "react-router-dom";
import Wrapper from "./components/Wrapper";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Wrapper />
      </div>
    </BrowserRouter>
  );
};

export default App;
