/* eslint-disable react-hooks/exhaustive-deps */
//#region import

import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

//#endregion

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 }); // cursor's position
  const [hidden, setHidden] = useState(false); // cursor's
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    addEventListeners();
    handleLinkHoverEvents();

    return () => removeEventListeners();
  }, []);

  const addEventListeners = () => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
  };

  const removeEventListeners = () => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseenter', onMouseEnter);
    document.removeEventListener('mouseleave', onMouseLeave);
    document.removeEventListener('mousedown', onMouseDown);
    document.removeEventListener('mouseup', onMouseUp);
  };

  const handleLinkHoverEvents = () => {
    document.querySelectorAll('a').forEach((el) => {
      el.addEventListener('mouseover', () => setLinkHovered(true));
      el.addEventListener('mouseout', () => setLinkHovered(false));
    });
    document.querySelectorAll('button').forEach((el) => {
      el.addEventListener('mouseover', () => setLinkHovered(true));
      el.addEventListener('mouseout', () => setLinkHovered(false));
    });
    document.querySelectorAll('span').forEach((el) => {
      el.addEventListener('mouseover', () => setLinkHovered(true));
      el.addEventListener('mouseout', () => setLinkHovered(false));
    });
  };

  const onMouseLeave = () => {
    setHidden(true);
  };

  const onMouseEnter = () => {
    setHidden(false);
  };

  const onMouseDown = () => {
    setClicked(true);
  };

  const onMouseUp = () => {
    setClicked(false);
  };

  const onMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const cursorClasses = classNames('cursor', {
    'cursor--hidden': hidden,
    'cursor--clicked': clicked,
    'cursor--link-hovered': linkHovered,
  });

  // function to check if the user's machine
  // is a mobile or not.
  const isMobile = () => {
    // get userAgent from browser.
    const ua = navigator.userAgent;
    // check if Android / Mobi word
    // in userAgent and then return
    // true / false.
    return /Android|Mobi/i.test(ua);
  };
  // if it's mobile then don't return the cursor.
  if (typeof navigator !== 'undefined' && isMobile()) return null;

  return (
    <div
      className={cursorClasses}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
};

export default Cursor;
