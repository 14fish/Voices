import React, { useEffect } from 'react';
import './index.css';

export const Voices = ({ voiceArr, setState }) => {
  useEffect(() => {
    let voiceDiv = document.getElementById('voices-div');
    voiceArr.forEach(({ id, src }) => {
      src.classList.add('link');
      return voiceDiv.appendChild(src);
    });
  }, [voiceArr]);

  return <ul id='voices-div'></ul>;
};
