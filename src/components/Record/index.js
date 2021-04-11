import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {
  getElementArray,
  pauseRecording,
  startRecording,
  stopRecording,
} from './recorder.js';
import './index.css';

const useStyle = makeStyles({
  container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    textAlign: 'center',
  },
  record: {
    width: '20%',
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0 auto',
  },
  skip: {},
});

export const Record = ({ state, setState, nextSlide, prevSlide }) => {
  const { container, record, skip } = useStyle();

  const onClickStop = () => {
    stopRecording().then(() => {
      console.log('stopRecording');
      setState({
        ...state,
        voices: [...getElementArray()],
      });
    });
  };

  return (
    <Grid item container className={container}>
      <div className={`${record}`}>
        <Button
          onClick={pauseRecording}
          variant='contained'
          color='secondary'
          id='pauseButton'
        >
          Pause
        </Button>
        <Button
          onClick={startRecording}
          variant='contained'
          color='primary'
          id='recordButton'
        >
          Record
        </Button>
        <Button
          onClick={() => {
            onClickStop();
            nextSlide();
          }}
          variant='contained'
          color='secondary'
          id='stopButton'
        >
          Stop
        </Button>
      </div>
      <div className={skip}>
        <Button onClick={nextSlide} variant='outlined' color='primary'>
          Skip
        </Button>
      </div>
    </Grid>
  );
};
