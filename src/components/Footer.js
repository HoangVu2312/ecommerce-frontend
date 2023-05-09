import React, { useContext } from "react";
import { ThemeContext } from "../App";

function Footer() {
  const footerStyle = {
    textAlign: "center",
    height: "80px",
    padding: "40px",
    position: "relative",
  };

  // get the global theme
  const { theme} = useContext(ThemeContext);

  return (
    <footer style={footerStyle} id={theme}>
      <p>&copy; 2023 Hoang Vu. All Rights Reserved.</p>
    </footer>
  );
}

export default Footer;
