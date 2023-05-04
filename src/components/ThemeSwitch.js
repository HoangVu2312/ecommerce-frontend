// This component return a button that can change the theme of website
import React, { useState } from "react";
import { Button} from "react-bootstrap";



function ThemeSwitch({ onSwitch }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  function handleSwitch() {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    onSwitch(newMode);
  }

  return (
    <Button variant="link" onClick={handleSwitch}>
      <i className={`fas ${isDarkMode ? "fa-sun" : "fa-moon-half"}`}></i>
    </Button>
  );
}

export default ThemeSwitch;
