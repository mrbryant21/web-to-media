import { useEffect, useState } from 'react';

const MouseIndicator = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const moveHandler = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', moveHandler);

    return () => {
      window.removeEventListener('mousemove', moveHandler);
    };
  }, []);

  return (
    <>
      {/* Outer circle */}
      <div
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
        }}
        className="fixed pointer-events-none z-50 w-10 h-10 rounded-full border-2 border-orange-500/40 transition-transform duration-75 ease-out"
      ></div>

      {/* Inner dot */}
      <div
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
        }}
        className="fixed pointer-events-none z-50 w-2 h-2 rounded-full bg-orange-500/40 transition-transform duration-75 ease-out"
      ></div>
    </>
  );
};

export default MouseIndicator;
