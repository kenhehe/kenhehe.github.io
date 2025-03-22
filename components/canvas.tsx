"use client";

import React from 'react';

export default function Canvas() {
  React.useEffect(() => {
    // Dynamically load the script
    const script = document.createElement('script');
    script.src = '/scripts/canvas_handler.js'; // Path relative to the public folder
    script.async = true;
    document.body.appendChild(script);

    // Cleanup the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section>
      <canvas id="eraseCanvas"></canvas>
      <div id="percentage">Erased: 0%</div>
    </section>
  );
}