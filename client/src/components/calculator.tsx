import React, { useState } from "react";

export interface ICalculatorProps {
  onCalc: (expression: string) => void;
}

const Calculator: React.FC<ICalculatorProps> = props => {
  const [expression, setExpression] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onCalc(expression);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="calc" className="mr-2">
        Expression
      </label>
      <input
        value={expression}
        onChange={e => setExpression(e.target.value)}
        type="text"
        className="form-control form-control-sm mb-2"
        id="calc"
        placeholder="add your expression"
      ></input>
      <button className="btn btn-outline-primary">Calculate</button>
    </form>
  );
};

export default Calculator;
