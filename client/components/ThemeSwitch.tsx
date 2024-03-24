'use client'
import React from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className='flex items-center'>
      {resolvedTheme === 'light' ? (
        <FiSun onClick={() => setTheme('dark')} size={25} style={{color:'white'}} />
      ) : (
        <FiMoon onClick={() => setTheme('light')} size={25} />
      )}
    </div>
  );
}
