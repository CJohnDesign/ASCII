'use client';

import React, { useRef, useEffect, useState } from 'react';
import { generateHealthCode360, generateDotField, generateVoice1, generateVoice2, generateVoice3, generateVoice4, generateVoice5, generateDotField2, generateDigitalFog, generateDigitalFog2, generateDigitalFog3, generateSoftWaves, generateGentleRipple, generateLightCloud, generateGentleMist, generateSubtleStream, generateLightDrift, generateLogo, generateWaveDepth, generateRadialWaveField, generateInterferenceWaves, generateDataGridFlow, generateCircuitBoard, generateElectricPulse, generateCurrentFlow, generateNeuralNetwork } from '../lib/lightPatterns';
import { useAudio } from '../lib/useAudio';
import { theme } from '../lib/theme';
import { PatternPicker } from './PatternPicker';

interface RetroASCIIProps {
  width: number;
  height: number;
}

const PATTERN_NAMES = [
  'HealthCode360',
  'Voice 1',
  'Voice 2',
  'Voice 3',
  'Voice 4',
  'Voice 5',
  'Dot Field',
  'Dot Field 2',
  'Digital Fog',
  'Digital Fog 2',
  'Digital Fog 3',
  'Soft Waves',
  'Gentle Ripple',
  'Light Cloud',
  'Gentle Mist',
  'Subtle Stream',
  'Light Drift',
  'Logo',
  'Wave Depth',
  'Radial Wave Field',
  'Interference Waves',
  'Starry Night',
  'Quasar Field',
  'Nebula Drift',
  'Cosmic Dust',
  'Stellar Nursery',
];

export const RetroASCII: React.FC<RetroASCIIProps> = ({ width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const [selectedPattern, setSelectedPattern] = useState<number>(0); // Start with HealthCode360
  const selectedPatternRef = useRef<number>(0);
  
  // Audio hook - enabled when Voice 1, Voice 2, Voice 3, Voice 4, or Voice 5 is selected
  const isVoicePatternSelected = selectedPattern === 1 || selectedPattern === 2 || selectedPattern === 3 || selectedPattern === 4 || selectedPattern === 5;
  const { audioData, isAccessGranted, error } = useAudio(isVoicePatternSelected);
  
  // Store audio data in ref for animation loop
  const audioDataRef = useRef(audioData);
  useEffect(() => {
    audioDataRef.current = audioData;
  }, [audioData]);
  
  // Keep ref in sync with state
  useEffect(() => {
    selectedPatternRef.current = selectedPattern;
  }, [selectedPattern]);
  
  const CHAR_WIDTH = 6;  // Even smaller for tinier particles
  const CHAR_HEIGHT = 10; // Even smaller for tinier particles
  const COLS = Math.floor(width / CHAR_WIDTH);
  const ROWS = Math.floor(height / CHAR_HEIGHT);

  // Animation loop
  useEffect(() => {
    if (width === 0 || height === 0 || COLS === 0 || ROWS === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Limit frame rate for better performance
    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;
    
    const animate = (currentTime: number) => {
      if (currentTime - lastTimeRef.current < frameInterval) {
        requestAnimationFrame(animate);
        return;
      }
      
      const deltaTime = (currentTime - lastTimeRef.current) / 16.67;
      lastTimeRef.current = currentTime;
      frameRef.current += deltaTime;

      // Clear with light background
      ctx.fillStyle = theme.colors.background;
      ctx.fillRect(0, 0, width, height);

      // Generate full-screen patterns based on selected pattern
      const frame = Math.floor(frameRef.current);
      const currentPattern = selectedPatternRef.current;
      
      let combined: string[][];
      
      switch (currentPattern) {
        case 0:
          combined = generateHealthCode360(COLS, ROWS, frameRef.current);
          break;
        case 1:
          combined = generateVoice1(COLS, ROWS, frameRef.current, audioDataRef.current);
          break;
        case 2:
          combined = generateVoice2(COLS, ROWS, frameRef.current, audioDataRef.current);
          break;
        case 3:
          combined = generateVoice3(COLS, ROWS, frameRef.current, audioDataRef.current);
          break;
        case 4:
          combined = generateVoice4(COLS, ROWS, frameRef.current, audioDataRef.current);
          break;
        case 5:
          combined = generateVoice5(COLS, ROWS, frameRef.current, audioDataRef.current);
          break;
        case 6:
          combined = generateDotField(COLS, ROWS, frameRef.current);
          break;
        case 7:
          combined = generateDotField2(COLS, ROWS, frameRef.current);
          break;
        case 8:
          combined = generateDigitalFog(COLS, ROWS, frameRef.current);
          break;
        case 9:
          combined = generateDigitalFog2(COLS, ROWS, frameRef.current);
          break;
        case 10:
          combined = generateDigitalFog3(COLS, ROWS, frameRef.current);
          break;
        case 11:
          combined = generateSoftWaves(COLS, ROWS, frameRef.current);
          break;
        case 12:
          combined = generateGentleRipple(COLS, ROWS, frameRef.current);
          break;
        case 13:
          combined = generateLightCloud(COLS, ROWS, frameRef.current);
          break;
        case 14:
          combined = generateGentleMist(COLS, ROWS, frameRef.current);
          break;
        case 15:
          combined = generateSubtleStream(COLS, ROWS, frameRef.current);
          break;
        case 16:
          combined = generateLightDrift(COLS, ROWS, frameRef.current);
          break;
        case 17:
          combined = generateLogo(COLS, ROWS, frameRef.current);
          break;
        case 18:
          combined = generateWaveDepth(COLS, ROWS, frameRef.current);
          break;
        case 19:
          combined = generateRadialWaveField(COLS, ROWS, frameRef.current);
          break;
        case 20:
          combined = generateInterferenceWaves(COLS, ROWS, frameRef.current);
          break;
        case 21:
          combined = generateDataGridFlow(COLS, ROWS, frameRef.current);
          break;
        case 22:
          combined = generateCircuitBoard(COLS, ROWS, frameRef.current);
          break;
        case 23:
          combined = generateElectricPulse(COLS, ROWS, frameRef.current);
          break;
        case 24:
          combined = generateCurrentFlow(COLS, ROWS, frameRef.current);
          break;
        case 25:
          combined = generateNeuralNetwork(COLS, ROWS, frameRef.current);
          break;
        default:
          combined = generateHealthCode360(COLS, ROWS, frameRef.current);
      }

      // Render ASCII grid
      ctx.font = `${CHAR_HEIGHT}px 'Courier New', 'Courier', monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Batch rendering optimizations
      ctx.save();

      // Calculate pulse for breathing effect - more subtle and calmer
      const pulse = 0.85 + Math.sin(frameRef.current * 0.01) * 0.15; // Slower, smaller variation

      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const char = combined[row][col];
          
          if (char === ' ') continue;

          const x = col * CHAR_WIDTH + CHAR_WIDTH / 2;
          const y = row * CHAR_HEIGHT + CHAR_HEIGHT / 2;

          // Calculate brightness based on character type - with glow for cosmic characters
          let brightness = 0.6;
          if (char === '█') brightness = 0.15; // Very dark for dark square center
          else if (char === '▓') brightness = 0.25; // Dark for dark square
          else if (char === '▒') brightness = 0.35; // Medium-dark for dark square
          else if (char === '░') brightness = 0.55; // Light for dark square edges
          else if (char === '·') brightness = 0.45; // Tiny dots - faint glow
          else if (char === '•') brightness = 0.52; // Small dots - soft glow
          else if (char === '◦') brightness = 0.55; // Hollow circles
          else if (char === '○') brightness = 0.58; // Circles - medium glow
          else if (char === '●') brightness = 0.65; // Filled circles - brighter glow
          else if (char === '*') brightness = 0.72; // Stars - bright glow
          else if (char === '+') brightness = 0.75; // Plus - very bright glow
          else if (char === '×') brightness = 0.78; // Cross - brightest glow
          else brightness = 0.58;

          // Apply pulse (subtle for light theme) - skip pulse for dark square characters
          if (char === '█' || char === '▓' || char === '▒') {
            // Dark square characters - minimal pulse, stay dark
            brightness *= (0.9 + pulse * 0.1);
          } else {
            brightness *= pulse;
          }
          brightness = Math.max(0.1, brightness); // Lower minimum for dark characters

          // CRT phosphor glow effect - light theme colors
          const alpha = brightness;
          const r = 95;   // Light blue-green
          const g = 179;
          const b = 179;

          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          
          // Add glow for brighter characters - enhanced for cosmic dust
          if (brightness > 0.6) {
            ctx.shadowBlur = Math.max(1, brightness * 3); // More glow for brighter chars
            ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${alpha * 0.5})`; // Stronger glow
          } else if (brightness > 0.5) {
            ctx.shadowBlur = brightness * 2;
            ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${alpha * 0.3})`;
          } else {
            ctx.shadowBlur = brightness * 1;
            ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${alpha * 0.15})`; // Subtle glow even for faint particles
          }

          ctx.fillText(char, x, y);
        }
      }
      
      ctx.restore();
      
      // Add subtle scan line effect for light theme
      ctx.fillStyle = theme.colors.scanline;
      const scanLineY = Math.floor((frameRef.current * 2) % CHAR_HEIGHT);
      ctx.fillRect(0, scanLineY, width, 1);
      ctx.fillRect(0, scanLineY + CHAR_HEIGHT, width, 1);

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [width, height, COLS, ROWS]); // Removed selectedPattern from deps since we use ref

  return (
    <>
      {isVoicePatternSelected && error && (
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0, 0, 0, 0.7)',
          color: '#ff6b6b',
          padding: '10px 20px',
          borderRadius: '4px',
          fontSize: '14px',
          zIndex: 10,
          fontFamily: 'monospace',
        }}>
          Microphone access needed: {error}
        </div>
      )}
      {isVoicePatternSelected && !isAccessGranted && !error && (
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0, 0, 0, 0.7)',
          color: '#51cf66',
          padding: '10px 20px',
          borderRadius: '4px',
          fontSize: '14px',
          zIndex: 10,
          fontFamily: 'monospace',
        }}>
          Requesting microphone access...
        </div>
      )}
      <PatternPicker
        selectedPattern={selectedPattern}
        onPatternChange={setSelectedPattern}
        patterns={PATTERN_NAMES}
      />
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          imageRendering: 'pixelated',
          pointerEvents: 'none', // Allow clicks to pass through to picker
        }}
      />
    </>
  );
};

