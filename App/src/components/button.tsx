import React from 'react';

const StyledButton = ({ text, onClick, style, href }) => (
  <div>
    {href ? (
      <a href={href} onClick={onClick} style={style} className="button">
        {text}
      </a>
    ) : (
      <button onClick={onClick} style={style} className="button">
        {text}
      </button>
    )}
    <style jsx>{`
      .button {
        padding: 10px 20px;
        background-color: #0070f3;
        border: none;
        color: white;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;
        font-size: 16px; /* Default font size */
        outline: none; /* Removes the outline */
        text-decoration: none; /* No underline for link */
        display: inline-block; /* Ensures link is on the same line */
      }
      .button:hover {
        background-color: #0056b3;
      }
    `}</style>
  </div>
);

export default StyledButton;
