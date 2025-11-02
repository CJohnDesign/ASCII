import { checkLetterMask } from './letterMask';

/**
 * Light character patterns for subtle, refined visualizations
 */

export const createGrid = (
  cols: number,
  rows: number
): string[][] => {
  return Array(rows).fill(null).map(() =>
    Array(cols).fill(' ')
  );
};

// Pattern 1: Gentle Dot Field - elegant scattered dots with gentle breathing
export const generateDotField = (
  cols: number,
  rows: number,
  frame: number
): string[][] => {
  const grid = createGrid(cols, rows);
  const baseDensity = 0.05; // Increased density for more coverage
  
  // Faster breathing effect - increased animation speed
  const breath = Math.sin(frame * 4) * 0.15 + 0.85;
  const density = baseDensity * breath;
  
  // Use hash-based distribution with spiral/Voronoi-like clustering
  const cellSize = 3.5;
  const verticalPulse = Math.sin(frame * 0.05) * 0.2;
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Grid-based cells with hash variation
      const cellRow = Math.floor((row + verticalPulse) / cellSize);
      const cellCol = Math.floor(col / cellSize);
      
      // Create hash from cell position for consistent distribution
      const hash1 = ((cellCol * 137 + cellRow * 193) % 100) / 100;
      const hash2 = ((cellCol * 211 + cellRow * 157) % 100) / 100;
      const hash3 = ((cellCol * 307 + cellRow * 271) % 100) / 100;
      
      // Position within cell for smooth transitions
      const localRow = ((row + verticalPulse) % cellSize) / cellSize;
      const localCol = (col % cellSize) / cellSize;
      const distFromCenter = Math.sqrt(
        Math.pow(localRow - 0.5, 2) + Math.pow(localCol - 0.5, 2)
      );
      
      // Fade towards edges of cell for smooth clusters
      const fade = 1 - (distFromCenter * 1.4);
      const cellIntensity = (hash1 + hash2 + hash3) / 3;
      
      // Combine cell intensity with fade
      const finalIntensity = cellIntensity * Math.max(0, fade);
      
      if (finalIntensity > density) {
        // Map intensity to character gradient
        const normalized = (finalIntensity - density) / (1 - density);
        const charIndex = Math.floor(normalized * 6);
        const chars = ['·', '•', '◦', '-', '○', '░'];
        grid[row][col] = chars[charIndex] || ' ';
      }
    }
  }
  
  return grid;
};

// Pattern 1b: Dot Field 2 - geometric tessellation with algorithmic flow
export const generateDotField2 = (
  cols: number,
  rows: number,
  frame: number
): string[][] => {
  const grid = createGrid(cols, rows);
  const baseDensity = 0.18;
  
  // Slow, elegant breathing
  const breath = Math.sin(frame * 0.02) * 0.1 + 0.9;
  const density = baseDensity * breath;
  
  // Geometric tessellation with hexagonal-like patterns
  const tileSize = 5;
  const centerX = cols / 2;
  const centerY = rows / 2;
  
  // Rotating grid transformation
  const rotation = frame * 0.01;
  const rotationCos = Math.cos(rotation);
  const rotationSin = Math.sin(rotation);
  
  // Traveling formation waves
  const formationSpeed = frame * 0.04;
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Transform coordinates relative to center
      const dx = col - centerX;
      const dy = row - centerY;
      
      // Apply subtle rotation for algorithmic feel
      const rotatedX = dx * rotationCos - dy * rotationSin;
      const rotatedY = dx * rotationSin + dy * rotationCos;
      
      // Create hexagonal-like tessellation
      const hexX = rotatedX / tileSize;
      const hexY = rotatedY / tileSize;
      
      // Hexagonal grid coordinates
      const q = (2/3 * hexX);
      const r = (-1/3 * hexX + Math.sqrt(3)/3 * hexY);
      const s = -q - r;
      
      // Round to nearest hex center
      const qr = Math.round(q);
      const rr = Math.round(r);
      const sr = Math.round(s);
      
      const qd = Math.abs(qr - q);
      const rd = Math.abs(rr - r);
      const sd = Math.abs(sr - s);
      
      // Distance from hex center
      const hexDist = Math.max(qd, rd, sd);
      
      // Create unique ID for each hex cell
      const hexId = qr * 1000 + rr * 100 + sr;
      
      // Hash-based pattern for each hex
      const hexHash = ((hexId * 137) % 1000) / 1000;
      const hexHash2 = ((hexId * 211) % 1000) / 1000;
      const hexHash3 = ((hexId * 307) % 1000) / 1000;
      
      // Traveling formation patterns
      const formation1 = Math.sin((qr + rr) * 0.3 + formationSpeed) * 0.5 + 0.5;
      const formation2 = Math.sin((qr - sr) * 0.25 + formationSpeed * 0.7) * 0.5 + 0.5;
      const formation3 = Math.sin((rr + sr) * 0.2 + formationSpeed * 1.2) * 0.5 + 0.5;
      
      // Combine formations
      const formation = (formation1 + formation2 + formation3) / 3;
      
      // Radial gradient from center
      const distFromCenter = Math.sqrt(dx * dx + dy * dy);
      const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);
      const radialFade = 1 - (distFromCenter / maxDist) * 0.3;
      
      // Hex cell intensity based on position and formation
      const hexIntensity = (hexHash + hexHash2 + hexHash3) / 3;
      
      // Distance from hex center creates smooth gradient
      const hexFade = 1 - (hexDist * 1.5);
      const hexFadeSmooth = Math.max(0, hexFade);
      
      // Combine all factors
      const finalIntensity = hexIntensity * hexFadeSmooth * formation * radialFade;
      
      if (finalIntensity > density) {
        // Map intensity to character gradient
        const normalized = (finalIntensity - density) / (1 - density);
        const charIndex = Math.floor(normalized * 6);
        const chars = ['·', '•', '◦', '-', '○', '░'];
        grid[row][col] = chars[charIndex] || ' ';
      }
    }
  }
  
  return grid;
};

// Pattern 1c: Digital Fog - geometric tessellation with algorithmic flow
export const generateDigitalFog = (
  cols: number,
  rows: number,
  frame: number
): string[][] => {
  const grid = createGrid(cols, rows);
  const baseDensity = 0.08; // Lower threshold so more cells pass
  
  // Slow, elegant breathing
  const breath = Math.sin(frame * 0.02) * 0.1 + 0.9;
  const density = baseDensity * breath;
  
  // Geometric tessellation with hexagonal-like patterns - smaller tiles for more shapes
  const tileSize = 2.5; // Reduced from 5 to create smaller, more numerous hex cells
  const centerX = cols / 2;
  const centerY = rows / 2;
  
  // Traveling formation waves
  const formationSpeed = frame * 0.04;
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Use absolute coordinates instead of relative to center for full coverage
      const hexX = col / tileSize;
      const hexY = row / tileSize;
      
      // Hexagonal grid coordinates
      const q = (2/3 * hexX);
      const r = (-1/3 * hexX + Math.sqrt(3)/3 * hexY);
      const s = -q - r;
      
      // Round to nearest hex center
      const qr = Math.round(q);
      const rr = Math.round(r);
      const sr = Math.round(s);
      
      const qd = Math.abs(qr - q);
      const rd = Math.abs(rr - r);
      const sd = Math.abs(sr - s);
      
      // Distance from hex center
      const hexDist = Math.max(qd, rd, sd);
      
      // Create unique ID for each hex cell
      const hexId = qr * 1000 + rr * 100 + sr;
      
      // Hash-based pattern for each hex
      const hexHash = ((hexId * 137) % 1000) / 1000;
      const hexHash2 = ((hexId * 211) % 1000) / 1000;
      const hexHash3 = ((hexId * 307) % 1000) / 1000;
      
      // Traveling formation patterns
      const formation1 = Math.sin((qr + rr) * 0.3 + formationSpeed) * 0.5 + 0.5;
      const formation2 = Math.sin((qr - sr) * 0.25 + formationSpeed * 0.7) * 0.5 + 0.5;
      const formation3 = Math.sin((rr + sr) * 0.2 + formationSpeed * 1.2) * 0.5 + 0.5;
      
      // Combine formations
      const formation = (formation1 + formation2 + formation3) / 3;
      
      // Hex cell intensity based on position and formation
      const hexIntensity = (hexHash + hexHash2 + hexHash3) / 3;
      
      // Softer fade from hex center - smaller radius for tighter shapes
      const hexFade = 1 - (hexDist * 1.5); // Tighter fade for smaller shapes
      const hexFadeSmooth = Math.max(0, hexFade);
      
      // Combine all factors - remove radial fade for full screen coverage
      const finalIntensity = hexIntensity * hexFadeSmooth * formation;
      
      // Much lower threshold to ensure full screen coverage
      if (finalIntensity > density) {
        // Map intensity to character gradient
        const normalized = (finalIntensity - density) / (1 - density);
        const charIndex = Math.floor(normalized * 6);
        const chars = ['·', '•', '◦', '-', '○', '░'];
        grid[row][col] = chars[charIndex] || ' ';
      } else {
        // Even for cells below threshold, add very light particles
        const ambientIntensity = hexIntensity * 0.4;
        if (ambientIntensity > density * 0.3) {
          grid[row][col] = '·';
        }
      }
    }
  }
  
  return grid;
};

// Pattern 1d: Digital Fog 2 - simple electrons flowing through abstract circuit board
export const generateDigitalFog2 = (
  cols: number,
  rows: number,
  frame: number
): string[][] => {
  const grid = createGrid(cols, rows);
  
  // Simple, elegant flow
  const flowSpeed = frame * 0.02;
  const cellSize = 3;
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Simple hash-based distribution
      const cellRow = Math.floor(row / cellSize);
      const cellCol = Math.floor(col / cellSize);
      const cellId = cellRow * 1000 + cellCol;
      
      // Hash for consistent pattern
      const hash1 = ((cellId * 137) % 1000) / 1000;
      const hash2 = ((cellId * 211) % 1000) / 1000;
      const hash3 = ((cellId * 307) % 1000) / 1000;
      
      // Simple flowing wave
      const wave = Math.sin((col * 0.05 + row * 0.03 + flowSpeed)) * 0.5 + 0.5;
      const baseIntensity = (hash1 + hash2 + hash3) / 3;
      const intensity = baseIntensity * wave;
      
      // Mostly small with rare large embellishments
      const rarityHash = ((cellId * 149) % 1000) / 1000;
      
      if (intensity > 0.4 && rarityHash > 0.92) {
        // Rare large symbols - only 8% chance
        const symbolHash = ((cellId * 173) % 100) / 100;
        if (symbolHash > 0.5) {
          grid[row][col] = '○';
        } else {
          grid[row][col] = '+';
        }
      } else if (intensity > 0.3 && rarityHash > 0.85) {
        // Occasional medium symbols - 15% chance
        const symbolHash = ((cellId * 191) % 100) / 100;
        if (symbolHash > 0.5) {
          grid[row][col] = '•';
        } else {
          grid[row][col] = '◦';
        }
      } else if (intensity > 0.15) {
        // Mostly small dots - majority of the pattern
        grid[row][col] = '·';
      }
    }
  }
  
  return grid;
};

// Pattern 1f: HealthCode360 - elegant Matrix-inspired cascading code with mathematical harmony
export const generateHealthCode360 = (
  cols: number,
  rows: number,
  frame: number
): string[][] => {
  const grid = createGrid(cols, rows);
  
  // Mathematical constants for harmony
  const phi = 1.618033988749895; // Golden ratio
  const phiInv = 0.618033988749895; // 1/phi
  
  // Elegant, slow breathing animation
  const breath1 = Math.sin(frame * 0.012) * 0.08 + 0.92;
  const breath2 = Math.sin(frame * 0.008 + Math.PI / 3) * 0.06 + 0.94;
  const breath = (breath1 + breath2) / 2;
  
  // Matrix-style vertical cascading speed - bottom-up direction
  const verticalSpeed = frame * 0.08;
  const columnSpacing = 2; // Thinner columns
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Column-based system for visible vertical lines
      const columnId = Math.floor(col / columnSpacing);
      const columnHash = ((columnId * 137) % 1000) / 1000;
      
      // Per-cell hash for randomization
      const cellId = row * cols + col;
      const hash1 = ((cellId * 137) % 1000) / 1000;
      const hash2 = ((cellId * 211) % 1000) / 1000;
      const hash3 = ((cellId * 307) % 1000) / 1000;
      
      // Calculate horizontal distance from column center for thinner lines
      const columnCenter = columnId * columnSpacing + columnSpacing / 2;
      const distFromColumn = Math.abs(col - columnCenter);
      const columnWidth = columnSpacing * 0.6;
      const horizontalFade = Math.max(0, 1 - (distFromColumn / columnWidth));
      
      // Randomized speeds per column with per-cell variation
      const speedVariation = 0.6 + columnHash * 0.8;
      const cellSpeedVariation = 0.9 + hash1 * 0.2; // Subtle per-cell variation
      const columnSpeed = verticalSpeed * speedVariation * cellSpeedVariation;
      
      // Bottom-up cascading with multiple cascade layers for consistent density
      const bottomUpRow = rows - row;
      
      // Multiple cascades at different phases - ensure full coverage from start
      // Offset by initial phase so cascades are spread across screen from frame 0
      const initialPhase1 = columnHash * rows * 2;
      const initialPhase2 = hash2 * rows * 2;
      const initialPhase3 = hash3 * rows * 2;
      
      const cascade1 = (bottomUpRow - columnSpeed + initialPhase1) % (rows * 2);
      const cascade2 = (bottomUpRow - columnSpeed * 0.7 + initialPhase2) % (rows * 2);
      const cascade3 = (bottomUpRow - columnSpeed * 1.3 + initialPhase3) % (rows * 2);
      
      // Calculate cascade intensity - no tail fade, always full coverage
      const cascadeHead1 = Math.sin(cascade1 * 0.15) * 0.5 + 0.5;
      const cascadeIntensity1 = cascadeHead1 * horizontalFade;
      
      const cascadeHead2 = Math.sin(cascade2 * 0.15) * 0.5 + 0.5;
      const cascadeIntensity2 = cascadeHead2 * horizontalFade * 0.7;
      
      const cascadeHead3 = Math.sin(cascade3 * 0.15) * 0.5 + 0.5;
      const cascadeIntensity3 = cascadeHead3 * horizontalFade * 0.5;
      
      // Combine cascades for consistent density
      const cascadeIntensity = Math.max(cascadeIntensity1, cascadeIntensity2, cascadeIntensity3);
      
      // More randomized noise for organic variation
      const noise1 = Math.sin((hash1 * Math.PI * 2 + frame * 0.01)) * 0.5 + 0.5;
      const noise2 = Math.sin((hash2 * Math.PI * 2 + frame * 0.008)) * 0.5 + 0.5;
      const noise3 = Math.sin((hash3 * Math.PI * 2 + frame * 0.006)) * 0.5 + 0.5;
      const noiseWave = (noise1 * 0.4 + noise2 * 0.3 + noise3 * 0.3);
      
      // Base intensity with consistent density - ensure always coverage
      const baseIntensity = cascadeIntensity * 0.75 + noiseWave * 0.25;
      // Higher base density floor to ensure full screen coverage
      const baseDensity = 0.25; // Minimum density floor - increased for full coverage
      const intensity = Math.max(baseIntensity * breath, baseDensity);
      
      // Continuous character mapping
      const charValue = intensity;
      
      // Character hash for selection
      const charHash = ((cellId * 157 + Math.floor(frame * 0.5)) % 1000) / 1000;
      
      // Simple character selection - dashes, stars, and abstract icons only (no │)
      if (charValue > 0.65) {
        // High intensity - stars and larger icons
        const smooth = (charValue - 0.65) / 0.35;
        if (smooth > 0.85 && cascadeIntensity > 0.7) {
          // Bright cascade head - stars
          grid[row][col] = '*';
        } else if (smooth > 0.7) {
          grid[row][col] = '○';
        } else if (smooth > 0.5) {
          grid[row][col] = '◦';
        } else {
          grid[row][col] = '+';
        }
      } else if (charValue > 0.45) {
        // Medium-high intensity - mix of stars, dashes, and icons
        const smooth = (charValue - 0.45) / 0.2;
        if (smooth > 0.7 && cascadeIntensity > 0.5) {
          if (charHash > 0.7) {
            grid[row][col] = '*';
          } else {
            grid[row][col] = '─';
          }
        } else if (smooth > 0.5) {
          grid[row][col] = '◦';
        } else {
          grid[row][col] = '•';
        }
      } else if (charValue > 0.25) {
        // Medium intensity - dashes and dots
        const smooth = (charValue - 0.25) / 0.2;
        if (smooth > 0.6) {
          grid[row][col] = '─';
        } else if (smooth > 0.3) {
          grid[row][col] = '•';
        } else {
          grid[row][col] = '·';
        }
      } else if (charValue > 0.12) {
        // Low-medium intensity - small dots
        grid[row][col] = '·';
      }
      // Below 0.12 - leave empty for elegant spacing
    }
  }
  
  return grid;
};

// Pattern 1e: Digital Fog 3 - elegant Matrix-inspired cascading code with mathematical harmony
export const generateDigitalFog3 = (
  cols: number,
  rows: number,
  frame: number
): string[][] => {
  const grid = createGrid(cols, rows);
  
  // Mathematical constants for harmony
  const phi = 1.618033988749895; // Golden ratio
  const phiInv = 0.618033988749895; // 1/phi
  
  // Elegant, slow breathing animation
  const breath1 = Math.sin(frame * 0.012) * 0.08 + 0.92;
  const breath2 = Math.sin(frame * 0.008 + Math.PI / 3) * 0.06 + 0.94;
  const breath = (breath1 + breath2) / 2;
  
  // Matrix-style vertical cascading speed
  const verticalSpeed = frame * 0.08;
  const columnSpacing = 2; // Thinner columns - reduced from 4
  
  // Code characters for Matrix aesthetic
  const codeChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Matrix-style vertical cascading columns
      const columnId = Math.floor(col / columnSpacing);
      const columnHash = ((columnId * 137) % 1000) / 1000;
      
      // Calculate horizontal distance from column center for thinner lines
      const columnCenter = columnId * columnSpacing + columnSpacing / 2;
      const distFromColumn = Math.abs(col - columnCenter);
      const columnWidth = columnSpacing * 0.6; // Narrower width
      const horizontalFade = Math.max(0, 1 - (distFromColumn / columnWidth));
      
      // Varying speeds per column for organic cascading
      const columnSpeed = verticalSpeed * (0.7 + columnHash * 0.6);
      const verticalPos = (row - columnSpeed + columnHash * rows) % (rows * 2);
      
      // Calculate cascade intensity (brightest at head, fading tail)
      const cascadeHead = Math.sin(verticalPos * 0.15) * 0.5 + 0.5;
      const cascadeTail = Math.max(0, 1 - (verticalPos / rows) * 0.7);
      const cascadeIntensity = cascadeHead * cascadeTail * horizontalFade; // Apply horizontal fade
      
      // Subtle horizontal noise for organic variation (no spirals)
      const noise1 = Math.sin((col * 0.05 + frame * 0.01)) * 0.5 + 0.5;
      const noise2 = Math.sin((col * 0.08 + row * 0.03 + frame * 0.008)) * 0.5 + 0.5;
      const noiseWave = (noise1 * 0.6 + noise2 * 0.4);
      
      // Base intensity from cascades and noise
      const baseIntensity = cascadeIntensity * 0.7 + noiseWave * 0.3;
      const intensity = baseIntensity * breath;
      
      // Continuous character mapping
      const charValue = intensity;
      
      // Character hash for code selection
      const charHash = ((col * 113 + row * 197 + Math.floor(frame * 0.5)) % 1000) / 1000;
      
      // Matrix-inspired character selection - pure vertical cascading
      if (charValue > 0.65) {
        // High intensity - code characters and elegant symbols
        const smooth = (charValue - 0.65) / 0.35;
        if (smooth > 0.85 && cascadeIntensity > 0.7) {
          // Bright cascade head - code characters
          const codeIndex = Math.floor(charHash * codeChars.length);
          grid[row][col] = codeChars[codeIndex] || '0';
        } else if (smooth > 0.6) {
          grid[row][col] = '○';
        } else if (smooth > 0.4) {
          grid[row][col] = '●';
        } else {
          grid[row][col] = '◦';
        }
      } else if (charValue > 0.45) {
        // Medium-high intensity - mix of code and symbols
        const smooth = (charValue - 0.45) / 0.2;
        if (smooth > 0.7 && cascadeIntensity > 0.5 && charHash > 0.7) {
          // Occasional code character in cascade
          const codeIndex = Math.floor(charHash * codeChars.length);
          grid[row][col] = codeChars[codeIndex] || '0';
        } else if (smooth > 0.7) {
          grid[row][col] = '◦';
        } else if (smooth > 0.4) {
          grid[row][col] = '•';
        } else {
          grid[row][col] = '◦';
        }
      } else if (charValue > 0.25) {
        // Medium intensity
        const smooth = (charValue - 0.25) / 0.2;
        if (smooth > 0.5) {
          grid[row][col] = '•';
        } else {
          grid[row][col] = '·';
        }
      } else if (charValue > 0.12) {
        // Low-medium intensity - graceful dots
        grid[row][col] = '·';
      }
      // Below 0.12 - leave empty for elegant spacing
    }
  }
  
  return grid;
};

// Pattern 2: Soft Wave Ripple - gentle horizontal waves
export const generateSoftWaves = (
  cols: number,
  rows: number,
  frame: number
): string[][] => {
  const grid = createGrid(cols, rows);
  const frequency = 0.08;
  const amplitude = 2;
  
  // Use frame for vertical pulsing instead of horizontal movement
  const verticalPulse = Math.sin(frame * 0.02) * 0.5;
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Remove frame from horizontal position - waves stay in place
      const wave1 = Math.sin(col * frequency);
      const wave2 = Math.sin((col * frequency * 1.5) + Math.PI / 3);
      const combined = (wave1 + wave2) / 2;
      
      // Apply vertical pulse for gentle breathing effect
      const distFromCenter = Math.abs(row - (rows / 2 + combined * amplitude + verticalPulse));
      
      if (distFromCenter < 1.5) {
        const intensity = 1 - (distFromCenter / 1.5);
        if (intensity > 0.25) {
          // Smooth gradient with creative characters
          const charIndex = Math.floor(intensity * 6);
          const chars = ['·', '•', '◦', '○', '●', '░'];
          grid[row][col] = chars[charIndex] || '·';
        }
      }
    }
  }
  
  return grid;
};

// Pattern 3: Gentle Ripple - soft concentric circles
export const generateGentleRipple = (
  cols: number,
  rows: number,
  frame: number
): string[][] => {
  const grid = createGrid(cols, rows);
  const centerX = cols / 2;
  const centerY = rows / 2;
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const dx = col - centerX;
      const dy = row - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      // Create ripples with gentle animation
      const ripple1 = Math.sin((dist * 0.2) - (frame * 0.05));
      const ripple2 = Math.sin((dist * 0.15) - (frame * 0.04) + Math.PI / 4);
      const combined = (ripple1 + ripple2) / 2;
      
      const intensity = (combined + 1) / 2; // Normalize to 0-1
      
      if (intensity > 0.35) {
        const fade = Math.max(0, 1 - (dist / Math.max(cols, rows)));
        const finalIntensity = intensity * fade;
        
        if (finalIntensity > 0.45) {
          // Smooth gradient with creative characters
          const charIndex = Math.floor(finalIntensity * 6);
          const chars = ['·', '•', '◦', '○', '●', '░'];
          grid[row][col] = chars[charIndex] || '·';
        }
      }
    }
  }
  
  return grid;
};

// Pattern 4: Light Cloud - soft flowing cloud-like pattern (lighter version)
export const generateLightCloud = (
  cols: number,
  rows: number,
  frame: number
): string[][] => {
  const grid = createGrid(cols, rows);
  const verticalSpeed = frame * 0.1;
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const upwardRow = row - verticalSpeed;
      
      // Create soft cloud-like noise pattern
      const noise1 = Math.sin((col * 0.15) + (upwardRow * 0.12) + (frame * 0.02));
      const noise2 = Math.sin((col * 0.23) + (upwardRow * 0.18) + (frame * 0.03));
      const noise3 = Math.sin((col * 0.31) + (upwardRow * 0.25) + (frame * 0.025));
      
      const combined = (noise1 + noise2 + noise3) / 3;
      const intensity = (combined + 1) / 2;
      
      // Smooth gradient with creative characters
      if (intensity > 0.3 && intensity < 0.7) {
        const fade = Math.abs(intensity - 0.5) * 2; // Fade from center
        if (fade > 0.25) {
          const charIndex = Math.floor(fade * 6);
          const chars = ['·', '•', '◦', '○', '●', '░'];
          grid[row][col] = chars[charIndex] || '·';
        }
      }
    }
  }
  
  return grid;
};

// Pattern 5: Gentle Mist - very light mist-like pattern flowing upward
export const generateGentleMist = (
  cols: number,
  rows: number,
  frame: number
): string[][] => {
  const grid = createGrid(cols, rows);
  const verticalSpeed = frame * 0.12;
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const upwardRow = row - verticalSpeed;
      
      // Create soft mist pattern
      const mist1 = Math.sin((col * 0.12) + (upwardRow * 0.08) + (frame * 0.015));
      const mist2 = Math.cos((col * 0.18) + (upwardRow * 0.14) + (frame * 0.02));
      
      const combined = (mist1 + mist2) / 2;
      const intensity = (combined + 1) / 2;
      
      // Smooth gradient with creative characters
      if (intensity > 0.35 && intensity < 0.65) {
        const fade = Math.abs(intensity - 0.5) * 2;
        if (fade > 0.2) {
          const charIndex = Math.floor(fade * 6);
          const chars = ['·', '•', '◦', '○', '●', '░'];
          grid[row][col] = chars[charIndex] || '·';
        }
      }
    }
  }
  
  return grid;
};

// Pattern 6: Subtle Stream - elegant flowing streams with curves and motion
export const generateSubtleStream = (
  cols: number,
  rows: number,
  frame: number
): string[][] => {
  const grid = createGrid(cols, rows);
  const flowSpeed = frame * 0.02; // Very slow and elegant
  const streamWidth = cols * 0.25;
  
  // Multiple flowing streams with curves
  const streamCount = 3;
  const streamSpacing = cols / (streamCount + 1);
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let maxIntensity = 0;
      
      // Create multiple curved streams
      for (let i = 0; i < streamCount; i++) {
        const streamCenterX = streamSpacing * (i + 1);
        
        // Create flowing curves with sine waves - slow and elegant
        const curve = Math.sin((row * 0.05) + (flowSpeed * 0.3) + (i * Math.PI / 3)) * (streamWidth * 0.25);
        const centerX = streamCenterX + curve;
        
        const distFromCenter = Math.abs(col - centerX);
        
        // Create flowing wave pattern along the stream - very slow
        const flowWave = Math.sin((row * 0.08) - (flowSpeed * 1.2) + (i * 0.5)) * 0.25 + 0.75;
        const streamIntensity = flowWave;
        
        // Fade from center with smooth edges
        const fade = 1 - (distFromCenter / (streamWidth / 2));
        
        if (fade > 0 && distFromCenter < streamWidth / 2) {
          const finalIntensity = streamIntensity * Math.max(0, fade);
          if (finalIntensity > maxIntensity) {
            maxIntensity = finalIntensity;
          }
        }
      }
      
      // Add very subtle ambient particles around streams
      const ambientWave = Math.sin((col * 0.04) + (row * 0.03) + flowSpeed * 0.5) * 0.5 + 0.5;
      const ambientIntensity = ambientWave * 0.1; // Very subtle
      
      const totalIntensity = Math.max(maxIntensity, ambientIntensity);
      
      if (totalIntensity > 0.35) {
        const charIndex = Math.floor(totalIntensity * 6);
        const chars = ['·', '•', '◦', '○', '●', '░'];
        grid[row][col] = chars[charIndex] || '·';
      }
    }
  }
  
  return grid;
};

// Pattern 7: Light Drift - gentle particles drifting upward (wrapping)
export const generateLightDrift = (
  cols: number,
  rows: number,
  frame: number
): string[][] => {
  const grid = createGrid(cols, rows);
  const density = 0.3;
  const cellSize = 2.5;
  const verticalSpeed = frame * 0.14;
  const patternHeight = rows * cellSize; // Height of repeating pattern
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Calculate upward position
      const upwardRow = row - verticalSpeed;
      
      // Wrap the position to keep pattern continuous
      const wrappedUpwardRow = ((upwardRow % patternHeight) + patternHeight) % patternHeight;
      
      // Create drifting pattern using wrapped position
      const hash1 = ((col * 113) + Math.floor(wrappedUpwardRow / cellSize) * 157) % 100;
      const hash2 = ((col * 197) + Math.floor(wrappedUpwardRow / (cellSize * 1.3)) * 211) % 100;
      
      const intensity1 = hash1 / 100;
      const intensity2 = hash2 / 100;
      const combined = (intensity1 + intensity2) / 2;
      
      if (combined > density) {
        const charIndex = Math.floor((combined - density) / (1 - density) * 6);
        const chars = ['·', '•', '◦', '○', '●', '░']; // Smooth gradient with creative characters
        grid[row][col] = chars[charIndex] || ' ';
      }
    }
  }
  
  return grid;
};

// Pattern 8: Logo - Light Drift with mask that thickens characters to form "HEALTHCODE360"
export const generateLogo = (
  cols: number,
  rows: number,
  frame: number
): string[][] => {
  const grid = createGrid(cols, rows);
  const density = 0.3;
  const cellSize = 2.5;
  const verticalSpeed = frame * 0.14;
  const patternHeight = rows * cellSize;
  
  const logoText = 'HEALTHCODE360';
  
  // Diverse character set for interesting variety
  const lightChars = ['·', '*', '+', '-', '=', '×', '÷', '±', '•', '○', '●', '░', '▄', '▀'];
  const mediumChars = ['░', '▒', '▄', '▀', '*', '+', '=', '×', '±'];
  const thickChars = ['▒', '▓', '▄', '▀', '*', '+', '=', '×'];
  const veryThickChars = ['▓', '█', '▄', '▀', '*', '+'];
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Calculate upward position
      const upwardRow = row - verticalSpeed;
      
      // Wrap the position to keep pattern continuous
      const wrappedUpwardRow = ((upwardRow % patternHeight) + patternHeight) % patternHeight;
      
      // Create drifting pattern using wrapped position
      const hash1 = ((col * 113) + Math.floor(wrappedUpwardRow / cellSize) * 157) % 100;
      const hash2 = ((col * 197) + Math.floor(wrappedUpwardRow / (cellSize * 1.3)) * 211) % 100;
      const hash3 = ((col * 271) + Math.floor(wrappedUpwardRow / (cellSize * 0.7)) * 307) % 100;
      
      const intensity1 = hash1 / 100;
      const intensity2 = hash2 / 100;
      const combined = (intensity1 + intensity2) / 2;
      
      if (combined > density) {
        // Check letter mask - returns mask strength (0-1)
        const maskStrength = checkLetterMask(col, row, cols, rows, logoText);
        
        // Use hash3 to determine character variety
        const charHash = hash3;
        
        // If in letter area, use thicker characters based on mask strength
        if (maskStrength > 0.3) {
          // Use progressively thicker characters based on mask strength
          if (maskStrength > 0.75) {
            // Very thick in center of letters - use variety of thick characters
            const charIndex = Math.floor(charHash / 100 * veryThickChars.length);
            grid[row][col] = veryThickChars[charIndex] || '▓';
          } else if (maskStrength > 0.6) {
            // Thick characters
            const charIndex = Math.floor(charHash / 100 * thickChars.length);
            grid[row][col] = thickChars[charIndex] || '▒';
          } else if (maskStrength > 0.45) {
            // Medium characters
            const charIndex = Math.floor(charHash / 100 * mediumChars.length);
            grid[row][col] = mediumChars[charIndex] || '░';
          } else {
            // Light characters near edges
            const charIndex = Math.floor(charHash / 100 * lightChars.length);
            grid[row][col] = lightChars[charIndex] || '·';
          }
        } else {
          // Outside letter area - use diverse light characters
          const charIndex = Math.floor(charHash / 100 * lightChars.length);
          grid[row][col] = lightChars[charIndex] || '·';
        }
      }
    }
  }
  
  return grid;
};

// Pattern 9: Wave Depth - Horizontal waves with larger characters in darker areas
export const generateWaveDepth = (
  cols: number,
  rows: number,
  frame: number
): string[][] => {
  const grid = createGrid(cols, rows);
  const waveSpeed = frame * 0.05;
  const waveFrequency = 0.1;
  
  // Character sets from light to dark (small to large)
  const lightChars = [' ', '·', '•', '○'];
  const mediumChars = ['░', '▒', '▄', '▀'];
  const darkChars = ['▓', '█', '▄', '▀'];
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Create multiple overlapping waves
      const wave1 = Math.sin((col * waveFrequency) + waveSpeed) * 0.5 + 0.5;
      const wave2 = Math.sin((col * waveFrequency * 1.3) + (row * 0.05) + waveSpeed * 0.7) * 0.5 + 0.5;
      const wave3 = Math.sin((row * waveFrequency * 0.8) + waveSpeed * 1.2) * 0.5 + 0.5;
      
      // Combine waves for depth
      const combined = (wave1 + wave2 + wave3) / 3;
      
      // Map darkness to character size
      if (combined < 0.2) {
        // Very light - sparse or empty
        const hash = ((col * 137) + (row * 193)) % 100;
        if (hash > 80) {
          const charIndex = Math.floor(hash / 20);
          grid[row][col] = lightChars[charIndex] || ' ';
        }
      } else if (combined < 0.45) {
        // Light area - small characters
        const charIndex = Math.floor((combined - 0.2) / 0.25 * lightChars.length);
        grid[row][col] = lightChars[charIndex] || '·';
      } else if (combined < 0.7) {
        // Medium area - medium characters
        const charIndex = Math.floor((combined - 0.45) / 0.25 * mediumChars.length);
        grid[row][col] = mediumChars[charIndex] || '░';
      } else {
        // Dark area - large/thick characters
        const charIndex = Math.floor((combined - 0.7) / 0.3 * darkChars.length);
        grid[row][col] = darkChars[charIndex] || '▓';
      }
    }
  }
  
  return grid;
};

// Pattern 10: Radial Wave Field - Concentric waves from center with character size based on depth
export const generateRadialWaveField = (
  cols: number,
  rows: number,
  frame: number
): string[][] => {
  const grid = createGrid(cols, rows);
  const centerX = cols / 2;
  const centerY = rows / 2;
  const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
  const waveSpeed = frame * 0.08;
  const waveFrequency = 0.15;
  
  // Character sets from light to dark
  const lightChars = [' ', '·', '•'];
  const mediumChars = ['░', '▒', '▄'];
  const darkChars = ['▓', '█', '▀'];
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Calculate distance from center
      const dx = col - centerX;
      const dy = row - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Create radial waves
      const radialWave = Math.sin((distance * waveFrequency) + waveSpeed) * 0.5 + 0.5;
      const angularWave = Math.sin((Math.atan2(dy, dx) * 3) + waveSpeed * 0.5) * 0.3 + 0.7;
      
      // Combine for depth effect
      const combined = (radialWave * angularWave);
      
      // Normalize by distance (closer to center = darker)
      const normalized = combined * (1 - (distance / maxDistance) * 0.3);
      
      // Map darkness to character size
      if (normalized < 0.25) {
        // Very light - sparse
        const hash = ((col * 137) + (row * 193)) % 100;
        if (hash > 85) {
          grid[row][col] = lightChars[0] || ' ';
        }
      } else if (normalized < 0.5) {
        // Light area - small characters
        const charIndex = Math.floor((normalized - 0.25) / 0.25 * lightChars.length);
        grid[row][col] = lightChars[charIndex] || '·';
      } else if (normalized < 0.75) {
        // Medium area - medium characters
        const charIndex = Math.floor((normalized - 0.5) / 0.25 * mediumChars.length);
        grid[row][col] = mediumChars[charIndex] || '░';
      } else {
        // Dark area - large/thick characters
        const charIndex = Math.floor((normalized - 0.75) / 0.25 * darkChars.length);
        grid[row][col] = darkChars[charIndex] || '▓';
      }
    }
  }
  
  return grid;
};

// Pattern 11: Interference Waves - Multiple wave patterns creating interference patterns
export const generateInterferenceWaves = (
  cols: number,
  rows: number,
  frame: number
): string[][] => {
  const grid = createGrid(cols, rows);
  const waveSpeed = frame * 0.06;
  
  // Character sets from light to dark
  const lightChars = [' ', '·', '•', '○'];
  const mediumChars = ['░', '▒', '▄', '▀'];
  const darkChars = ['▓', '█', '▄', '▀'];
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Create multiple interference waves
      const wave1 = Math.sin((col * 0.08) + (row * 0.06) + waveSpeed);
      const wave2 = Math.sin((col * 0.12) - (row * 0.09) + waveSpeed * 0.8);
      const wave3 = Math.sin((col * 0.15) + (row * 0.12) + waveSpeed * 1.2);
      const wave4 = Math.sin((col * 0.11) + (row * 0.14) + waveSpeed * 0.6);
      
      // Create interference pattern
      const interference = (wave1 + wave2 + wave3 + wave4) / 4;
      
      // Convert to 0-1 range
      const normalized = (interference + 1) / 2;
      
      // Map darkness to character size
      if (normalized < 0.2) {
        // Very light - sparse
        const hash = ((col * 137) + (row * 193)) % 100;
        if (hash > 75) {
          const charIndex = Math.floor(hash / 25);
          grid[row][col] = lightChars[charIndex] || ' ';
        }
      } else if (normalized < 0.45) {
        // Light area - small characters
        const charIndex = Math.floor((normalized - 0.2) / 0.25 * lightChars.length);
        grid[row][col] = lightChars[charIndex] || '·';
      } else if (normalized < 0.7) {
        // Medium area - medium characters
        const charIndex = Math.floor((normalized - 0.45) / 0.25 * mediumChars.length);
        grid[row][col] = mediumChars[charIndex] || '░';
      } else {
        // Dark area - large/thick characters
        const charIndex = Math.floor((normalized - 0.7) / 0.3 * darkChars.length);
        grid[row][col] = darkChars[charIndex] || '▓';
      }
    }
  }
  
  return grid;
};

// Pattern 12: Starry Night - Sparse stars drifting across the canvas
export const generateDataGridFlow = (
  cols: number,
  rows: number,
  frame: number
): string[][] => {
  const grid = createGrid(cols, rows);
  const driftSpeed = frame * 0.08;
  const starDensity = 0.08; // Very sparse
  
  const starChars = ['·', '•', '○', '*', '+'];
  const brightStars = ['*', '+', '×'];
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Create drifting star field
      const driftPos = (col * 0.3 + row * 0.5 + driftSpeed) % 100;
      const hash = ((col * 137) + (row * 193) + Math.floor(driftSpeed)) % 100;
      
      if (hash / 100 < starDensity) {
        // Star brightness based on position
        const brightness = Math.sin((driftPos / 100) * Math.PI * 2) * 0.5 + 0.5;
        if (brightness > 0.7) {
          const charIndex = hash % brightStars.length;
          grid[row][col] = brightStars[charIndex] || '*';
        } else {
          const charIndex = hash % starChars.length;
          grid[row][col] = starChars[charIndex] || '·';
        }
      }
    }
  }
  
  return grid;
};

// Pattern 13: Quasar Field - Distant energetic sources with subtle radiation
export const generateCircuitBoard = (
  cols: number,
  rows: number,
  frame: number
): string[][] => {
  const grid = createGrid(cols, rows);
  const quasarCount = 8;
  const pulseSpeed = frame * 0.05;
  
  const coreChars = ['●', '○', '◉'];
  const haloChars = ['·', '•', '○'];
  const faintChars = ['·', ' '];
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let maxIntensity = 0;
      
      // Check distance to nearest quasar
      for (let i = 0; i < quasarCount; i++) {
        const qx = (cols / quasarCount) * (i + 0.5);
        const qy = (rows / quasarCount) * (i % 2 + 0.5);
        const dx = col - qx;
        const dy = row - qy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = Math.min(cols, rows) / 4;
        
        // Quasar pulse
        const pulse = Math.sin((dist * 0.1) + pulseSpeed * 2) * 0.3 + 0.7;
        const intensity = pulse * (1 - dist / maxDist);
        
        if (intensity > maxIntensity) {
          maxIntensity = intensity;
        }
      }
      
      // Place characters based on intensity
      if (maxIntensity > 0.5) {
        grid[row][col] = coreChars[Math.floor(maxIntensity * coreChars.length)] || '●';
      } else if (maxIntensity > 0.25) {
        grid[row][col] = haloChars[Math.floor(maxIntensity * haloChars.length)] || '•';
      } else if (maxIntensity > 0.1) {
        const hash = ((col * 137) + (row * 193)) % 100;
        if (hash > 85) {
          grid[row][col] = faintChars[hash % faintChars.length] || '·';
        }
      }
    }
  }
  
  return grid;
};

// Pattern 14: Nebula Drift - Subtle cloud-like formations drifting
export const generateElectricPulse = (
  cols: number,
  rows: number,
  frame: number
): string[][] => {
  const grid = createGrid(cols, rows);
  const driftSpeed = frame * 0.07;
  const density = 0.12; // Very sparse
  
  const brightChars = ['•', '○', '●'];
  const mediumChars = ['·', '•'];
  const faintChars = ['·', ' '];
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Create drifting nebula pattern
      const wave1 = Math.sin((col * 0.05) + (row * 0.03) + driftSpeed);
      const wave2 = Math.sin((col * 0.08) - (row * 0.06) + driftSpeed * 1.2);
      const wave3 = Math.sin((col * 0.03) + (row * 0.08) + driftSpeed * 0.8);
      
      const combined = (wave1 + wave2 + wave3) / 3;
      const normalized = (combined + 1) / 2;
      
      const hash = ((col * 137) + (row * 193)) % 100;
      const placeChance = normalized * density;
      
      if (hash / 100 < placeChance) {
        if (normalized > 0.6) {
          const charIndex = Math.floor((normalized - 0.6) / 0.4 * brightChars.length);
          grid[row][col] = brightChars[charIndex] || '•';
        } else if (normalized > 0.4) {
          grid[row][col] = mediumChars[hash % mediumChars.length] || '·';
        } else {
          grid[row][col] = faintChars[hash % faintChars.length] || '·';
        }
      }
    }
  }
  
  return grid;
};

// Pattern 15: Cosmic Dust - Graceful dust field drifting slowly through vast space
export const generateCurrentFlow = (
  cols: number,
  rows: number,
  frame: number
): string[][] => {
  const grid = createGrid(cols, rows);
  const driftSpeed = frame * 0.02; // Very slow - cosmic scale movement
  const density = 0.35; // Increased density for more particles
  
  // Glowing characters - arranged from faintest glow to brightest glow
  const glowChars = ['·', '•', '○', '●', '*', '+', '×'];
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Create slow, graceful drift - cosmic scale
      const driftX = (col * 0.015 + driftSpeed * 0.5) % 1000;
      const driftY = (row * 0.012 + driftSpeed * 0.7) % 1000;
      const driftPos = Math.sqrt(driftX * driftX + driftY * driftY);
      
      // Multiple overlapping waves for smooth, organic flow
      const wave1 = Math.sin((driftX / 1000) * Math.PI * 2) * 0.5 + 0.5;
      const wave2 = Math.sin((driftY / 1000) * Math.PI * 2) * 0.5 + 0.5;
      const wave3 = Math.sin((driftPos / 1500) * Math.PI * 2 + driftSpeed) * 0.3 + 0.7;
      
      // Smooth, organic density pattern
      const organicDensity = (wave1 + wave2 + wave3) / 3;
      const adjustedDensity = density * organicDensity;
      
      // Check if particle should exist
      const hash = ((col * 137) + (row * 193) + Math.floor(driftSpeed * 10)) % 100;
      
      if (hash / 100 < adjustedDensity) {
        // Calculate individual particle variation - each particle changes independently
        const particleOffset = ((col * 211) + (row * 307)) % 1000; // Unique offset per particle
        const individualPhase = (driftPos + particleOffset) % 2000; // Individual phase for each particle
        
        // Each particle has its own glow cycle - they change independently
        const glowIntensity = Math.sin((individualPhase / 1200) * Math.PI * 3 + driftSpeed * 2) * 0.2 + 0.7; // Range 0.5 to 0.9 (middle range)
        const localGlow = organicDensity * glowIntensity;
        
        // Add randomized variation per particle for consistent mix without stripes
        // Use multiple hash values to create truly random distribution
        const randomHash1 = ((col * 401) + (row * 503) + Math.floor(driftSpeed * 3)) % 100;
        const randomHash2 = ((col * 617) + (row * 719) + Math.floor(driftSpeed * 7)) % 100;
        const randomVariation = ((randomHash1 + randomHash2) / 200) * 0.3; // 0 to 0.3 variation
        
        // Combine glow with random variation for consistent mix
        const adjustedGlow = localGlow + randomVariation - 0.15; // Center around 0.7
        
        // Map to glow characters - smooth progression, staying in middle brightness range
        // Creates a glowing effect as particles drift, but more consistent distribution
        let charIndex;
        if (adjustedGlow < 0.4) {
          charIndex = 1; // '•' - light glow (skip faintest)
        } else if (adjustedGlow < 0.5) {
          charIndex = 2; // '○' - soft glow
        } else if (adjustedGlow < 0.6) {
          charIndex = 2; // '○' - soft glow
        } else if (adjustedGlow < 0.7) {
          charIndex = 3; // '●' - medium glow
        } else if (adjustedGlow < 0.8) {
          charIndex = 4; // '*' - bright glow
        } else if (adjustedGlow < 0.85) {
          charIndex = 5; // '+' - very bright glow
        } else {
          charIndex = 4; // '*' - bright glow (avoid darkest)
        }
        
        grid[row][col] = glowChars[charIndex] || '•';
      }
    }
  }
  
  return grid;
};

// Pattern 16: Stellar Nursery - Sparse star formation regions
export const generateNeuralNetwork = (
  cols: number,
  rows: number,
  frame: number
): string[][] => {
  const grid = createGrid(cols, rows);
  const nurseryCount = 6;
  const formationSpeed = frame * 0.04;
  
  const protoStarChars = ['○', '●', '◉'];
  const cloudChars = ['·', '•'];
  const emptyChars = ['·', ' '];
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let maxIntensity = 0;
      
      // Check distance to nurseries
      for (let i = 0; i < nurseryCount; i++) {
        const nx = (cols / nurseryCount) * (i + 0.5);
        const ny = (rows / nurseryCount) * (i % 2 + 0.5);
        const dx = col - nx;
        const dy = row - ny;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = Math.min(cols, rows) / 3;
        
        // Formation pulse
        const pulse = Math.sin((dist * 0.08) + formationSpeed * 3) * 0.4 + 0.6;
        const intensity = pulse * (1 - dist / maxDist);
        
        if (intensity > maxIntensity) {
          maxIntensity = intensity;
        }
      }
      
      // Place stars and clouds
      const hash = ((col * 137) + (row * 193)) % 100;
      if (maxIntensity > 0.4) {
        if (hash / 100 < maxIntensity * 0.3) {
          grid[row][col] = protoStarChars[Math.floor(maxIntensity * protoStarChars.length)] || '●';
        }
      } else if (maxIntensity > 0.2) {
        if (hash > 94) {
          grid[row][col] = cloudChars[hash % cloudChars.length] || '·';
        }
      } else {
        if (hash > 99) {
          grid[row][col] = emptyChars[hash % emptyChars.length] || '·';
        }
      }
    }
  }
  
  return grid;
};

