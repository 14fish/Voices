import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Card, Voices, Record } from './components';

const useStyles = makeStyles({
  app: {},
  container: {
    minHeight: '100vh',
    backgroundImage: 'linear-gradient(0deg, #fff 0%, #f3f2f1)',
    borderRadius: 0,
    border: '1px solid rgba(0, 0, 0, 0.15)',
    boxShadow: '0px 0px 35px 0px rgba(0, 0, 0, 0.3)',
    padding: '22px 20px',
  },
  textCardContainer: {
    justifyContent: 'space-between',
    height: '70vh',
    border: '3px solid rgba(0, 0, 0, 0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  submitSkipContainer: {
    height: '30vh',
    border: '3px solid rgba(0, 0, 0, 0.1)',
    borderTop: 'none',
  },
  cardContainer: {
    flexGrow: 5,
    width: '60%',
  },
  voiceContainer: {
    flexGrow: 10,
    zIndex: 1,
    overflowX: 'auto',
    overflowY: 'auto',
    maxHeight: '100%',
    borderLeft: '3px solid rgba(0, 0, 0, 0.1)',
    backgroundImage: 'linear-gradient(0deg, #fff 0%, #f3f2f1)',
  },
});

function App() {
  const {
    app,
    container,
    submitSkipContainer,
    textCardContainer,
    cardContainer,
    voiceContainer,
  } = useStyles();

  const getFiveRandomUnreadText = (texts) => {
    const unReadTexts = [];
    let fiveRandomUnreadText = [];

    while (fiveRandomUnreadText.length < 5) {
      const randomIndex = Math.floor(Math.random() * unReadTexts.length);

      texts.map((text) => !text.isRead && unReadTexts.push(text));

      fiveRandomUnreadText.push(unReadTexts[randomIndex]);
      fiveRandomUnreadText = Array.from(new Set(fiveRandomUnreadText));
    }

    return fiveRandomUnreadText;
  };

  const [sliderRef, setSliderRef] = useState();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [state, setState] = useState({
    voices: [],
    textsToRead: [
      { id: 0, desc: 'Lorem ipsum1', isRead: true },
      { id: 1, desc: 'Lorem ipsum1', isRead: true },
      { id: 2, desc: 'Lorem ipsum2', isRead: true },
      { id: 3, desc: 'Lorem ipsum3', isRead: false },
      { id: 4, desc: 'Lorem ipsum4', isRead: false },
      { id: 5, desc: 'Lorem ipsum5', isRead: false },
      { id: 6, desc: 'Lorem ipsum6', isRead: false },
      { id: 7, desc: 'Lorem ipsum7', isRead: true },
      { id: 8, desc: 'Lorem ipsum8', isRead: false },
      { id: 9, desc: 'Lorem ipsum9', isRead: false },
      { id: 10, desc: 'Lorem ipsum10', isRead: true },
    ],
    currentText: { id: '', desc: '', isRead: false },
    hasNext: true,
  });

  useEffect(() => {
    console.log(currentSlideIndex);
  }, [currentSlideIndex]);

  return (
    <div className={app}>
      <Grid container className={container}>
        <Grid container item className={textCardContainer}>
          <Grid item className={cardContainer}>
            <Card
              texts={getFiveRandomUnreadText(state.textsToRead)}
              setState={setState}
              setSliderRef={setSliderRef}
              setSlideIndex={setCurrentSlideIndex}
            />
          </Grid>
          <Grid item className={voiceContainer}>
            <Voices voiceArr={state.voices} setState={setState} />
          </Grid>
        </Grid>
        <Grid container className={submitSkipContainer}>
          <Record
            state={state}
            setState={setState}
            nextSlide={sliderRef && sliderRef.slickNext}
            prevSlide={sliderRef && sliderRef.slickPrev}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
