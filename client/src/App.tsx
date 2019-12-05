import React, { useState } from "react";
import axios from "axios";
import Calculator from "./components/calculator";

const App: React.FC = () => {
  const url = "http://localhost:4003/api/calc";

  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const calc = async (expression: string) => {
    setError("");

    const response = await axios.post<{ result: string }>(
      url,
      { expression },
      { headers: { "Content-Type": "application/json" } }
    );
    const data = response.data.result;

    if (Number.isNaN(parseInt(data))) setError("Invalid expression");
    else setResult(data);
  };

  return (
    <div className="row">
      <div className="col-md-5 mx-auto mt-5">
        <Calculator onCalc={calc}></Calculator>
        <div className="">
          <span>result: </span>
          <span>{result}</span>
        </div>
        {error && <div className="text-danger">{error}</div>}
      </div>
    </div>
  );
};

export default App;
