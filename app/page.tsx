'use client';

import React, { useState, useEffect } from 'react';
import { RetroASCII } from '../components/RetroASCII';
import styles from './page.module.css';

export default function Home() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <main className={styles.main}>
      {dimensions.width > 0 && dimensions.height > 0 && (
        <RetroASCII width={dimensions.width} height={dimensions.height} />
      )}
    </main>
  );
}

