"use client";

import React from 'react';

/**
 * Canvas component renders a canvas and a percentage display.
 * It dynamically loads the canvas_handler.js script on mount and cleans up on unmount.
 */
export default function Canvas() {
  /**
   * useEffect loads the external canvas handler script when the component mounts,
   * and removes it when the component unmounts.
   */
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