import React from 'react'
import { useState } from "react";
import { ScaleLoader } from "react-spinners";

const SpinnerHome = () => {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("teal");
    return (
      <div className="sweet-loading">
  
        <ScaleLoader
          color={color}
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
}

export default SpinnerHome