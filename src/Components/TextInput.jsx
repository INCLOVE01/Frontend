import React from "react";
import "./TextInput.css";

const TextInput = () => {
  return (
  <>
  <div className="input">
    <input type="text" placeholder="Type your message..." />
    <button>Send</button>
  </div>
  </>
    );
};

export default TextInput;
