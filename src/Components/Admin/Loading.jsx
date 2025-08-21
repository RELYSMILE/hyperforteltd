import React from 'react'
import { useState } from "react";
import { MoonLoader } from "react-spinners";

const Loading = () => {
    
  let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#000");
  return (
    <div className="sweet-loading sweet-loading-custom">

      <MoonLoader
        color={color}
        loading={loading}
        size={40}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Loading