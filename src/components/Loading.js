// This component display the loading icon

import React from "react";
import { Spinner } from "react-bootstrap";
function Loading() {
    return (
        <div className="loading-container" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
}

export default Loading;