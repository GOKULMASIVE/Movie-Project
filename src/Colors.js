import { useState } from "react";


function ColorComponent() {
  let [color, setColor] = useState("");
  let [colorList, setColorList] = useState([
    "crimson",
    "orange",
    "skyblue",
    "plum",
  ]);
  return (
    <div className="color-game">
      <input
        type="text"
        placeholder="Name"
        onChange={(event) => setColor(event.target.value)}
      />
      <button type="button" onClick={() => setColorList([...colorList, color])}>
        Add Color
      </button>
      {colorList.map((clr ,ind) => (
        <ColorBox color={clr} ind={ind}/>
      ))}
    </div>
  );
}

function ColorBox({ color ,ind}) {
  const styles = {
    background: color,
    width: "100%",
    height: "2rem",
    marginTop: "1rem",
  };
  return <div style={styles} key={ind}></div>;
}

export default ColorComponent;