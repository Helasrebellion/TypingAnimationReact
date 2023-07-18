import React, { useState, useEffect, useRef } from 'react';

const TypingAnimation = () => {
  const textToType = '> Sylvia Mullins!';
  const typingSpeed = 100; // milliseconds per character
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [startTime, setStartTime] = useState(Date.now());
  const timerRef = useRef(null);

  useEffect(() => {
    const typeText = async () => {
      for (let i = 0; i < textToType.length; i++) {
        setTypedText((prevText) => prevText + textToType[i]);
        await new Promise((resolve) => (timerRef.current = setTimeout(resolve, typingSpeed)));
      }
      setShowCursor(false); // Hide cursor when typing is complete
    };

    typeText();

    return () => {
      clearTimeout(timerRef.current);
      setTypedText('');
      setShowCursor(true);
    };
  }, []); 

  useEffect(() => {
    // Show/hide cursor every 500ms after typing is complete
    const cursorTimer = setInterval(() => {
      setShowCursor((prevShowCursor) => !prevShowCursor);
    }, 500);

    const resetAnimation = () => {
      setTypedText('');
      setShowCursor(true);
      setStartTime(Date.now());
    };

    // Reset animation after 3 minutes (180,000 milliseconds)
    const resetTimeout = setTimeout(resetAnimation, 180000);

    return () => {
      clearInterval(cursorTimer);
      clearTimeout(resetTimeout);
    };
  }, [typedText]); 

  return (
    <h1 style={{ fontSize: '24px', lineHeight: '1.5', textAlign: 'center', margin: '20px' }}>
      <pre style={{ fontSize: 'inherit', display: 'inline', background: 'none', border: 'none' }}>
        {typedText}
      </pre>
      {showCursor && <span style={{ display: 'inline-block', verticalAlign: 'top', animation: 'blink 0.7s infinite' }}>&#124;</span>}
    </h1>
  );
};

export default TypingAnimation;
