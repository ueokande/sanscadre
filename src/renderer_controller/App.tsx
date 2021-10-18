import React from "react";
import CircularIcon from "./components/CircularIcon";
import { faStepForward, faStepBackward, faFastForward, faFastBackward } from "@fortawesome/free-solid-svg-icons";

const App = () => {

  return (
    <div>
      <CircularIcon icon={faFastBackward}/>
      <CircularIcon icon={faStepBackward}/>
      <CircularIcon icon={faStepForward}/>
      <CircularIcon icon={faFastForward}/>
    </div>
  );
};

export default App;

