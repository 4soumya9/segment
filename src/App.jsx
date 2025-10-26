import { useState } from "react";
import "./App.css";
import Popup from "./components/Popup";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mainPage">
      <div className="topBar">
        <button className="saveSegBtn" onClick={() => setOpen(true)}>
          Save segment
        </button>
      </div>

      {open && <Popup closePopup={() => setOpen(false)} />}
    </div>
  );
}

export default App;
