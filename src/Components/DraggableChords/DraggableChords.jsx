import React, { useState, useRef, useEffect } from 'react';

const DraggableChords = ({ children, containerRef }) => {
  const [leftPosition, setLeftPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [initialX, setInitialX] = useState(0);

  useEffect(() => {
    const containerWidth = containerRef.current.offsetWidth;
    const pWidth = containerRef.current.firstChild.offsetWidth;
    if (leftPosition > containerWidth - pWidth) {
      setLeftPosition(containerWidth - pWidth);
    }
  }, [leftPosition]);

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setInitialX(event.clientX - leftPosition);
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      const newLeftPosition = event.clientX - initialX;
      setLeftPosition(newLeftPosition);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <p
      style={{ left: leftPosition }}
      className="relative font-bold text-gray-700"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {children}
    </p>
  );
};

export default DraggableChords;