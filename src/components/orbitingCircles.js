// src/components/OrbitingCircles.js

import React from 'react';
import { cn } from './utils';

export default function OrbitingCircles({
  className,
  children,
  reverse = false,
  duration = 20,
  delay = 0,
  radius = 150,
  angle = 0,
  path = true,
}) {
  return (
    <div className="relative" style={{ transform: `rotate(${angle}deg)` }}>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          <circle
            className="stroke-black/10 stroke-1 dark:stroke-white/10"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            strokeDasharray={"4 4"}
          />
        </svg>
      )}

      <div
        style={{
          '--duration': `${duration}s`,
          '--radius': `${radius}px`,
          '--delay': `${delay}s`,
        }}
        className={cn(
          'absolute flex transform-gpu animate-orbit items-center justify-center rounded-full [animation-delay:calc(var(--delay)*1000ms)]',
          { 'animate-reverse-orbit': reverse },
          className
        )}
      >
        <div
          className="absolute"
          style={{
            transform: 'rotate(90deg)', // Set initial rotation to 0 degrees
            animation: `counter-orbit var(--duration) linear infinite`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
