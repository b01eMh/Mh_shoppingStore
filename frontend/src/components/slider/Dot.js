import React, { useEffect } from 'react';

function Dot({ isActive, index, setCurrentDot }) {
  return (
    <div
      className={isActive ? 'dot active' : 'dot'}
      onClick={() => {
        setCurrentDot(index);
      }}
    ></div>
  );
}

export default Dot;
