import { useState, useContext } from "react";
import { MoonLoader } from "react-spinners";
import { AppContext } from "../../Admin/Context/Context";

const Loading = () => {
  const {currentLightDarkMode} = useContext(AppContext)
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState(currentLightDarkMode.lightMode === false? '#fff' : '#000');
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