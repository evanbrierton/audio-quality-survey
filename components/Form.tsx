import { Button, Grid, Typography } from '@material-ui/core';
import { Checkbox, Divider, FormControlLabel, TextField } from '@mui/material';
import React, { useState } from 'react';
import { doc } from '@firebase/firestore'; // for creating a pointer to our Document
import { setDoc } from 'firebase/firestore'; // for adding the Document to Collection
import { Router } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { Option } from '../utils/types';
import PreferenceOrder from './PreferenceOrder';
import Recording from './Recording';
import { firestore } from '../firebase/clientApp'; // firestore instance

const types = ['96mp3.mp3', '320mp3.mp3', 'wav.wav'];

const getTracks = (song: string) => types.map((type) => `${song}/${type}`);
const getOrder = (cards: Option[]) => cards.map((card) => card.id);

const createCards = (options: string[]) =>
  options.map((path, id) => ({
    id,
    value: (<Recording path={path} i={id + 1} />) as React.ReactNode,
  }));

const handleChange =
  (setState: React.Dispatch<React.SetStateAction<string>>) =>
  (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState(event.target.value);
  };

type SongSectionProps = {
  id: number;
  song: Option[];
  setSong: React.Dispatch<React.SetStateAction<Option[]>>;
  explanation: string;
  setExplanation: React.Dispatch<React.SetStateAction<string>>;
};

const SongSection = ({
  id,
  song,
  setSong,
  explanation,
  setExplanation,
}: SongSectionProps) => (
  <Grid item xs={12}>
    <Grid container spacing={1}>
      <Typography variant="h6" gutterBottom>
        Song {id}
      </Typography>

      <Grid item xs={12}>
        <PreferenceOrder options={song} setOptions={setSong} />
      </Grid>

      <Grid item xs={12}>
        <TextField
          value={explanation}
          onChange={handleChange(setExplanation)}
          label="Explanation"
          fullWidth
        />
      </Grid>
    </Grid>
  </Grid>
);

const Form = () => {
  const router = useRouter();

  const [moonlight, setMoonlight] = useState(
    createCards(getTracks('moonlight'))
  );
  const [moonlightExplanation, setMoonlightExplanation] = useState('');

  const [apologies, setApologies] = useState(
    createCards(getTracks('apologies'))
  );
  const [apologiesExplanation, setApologiesExplanation] = useState('');

  const [lucy, setLucy] = useState(createCards(getTracks('lucy')));
  const [lucyExplanation, setLucyExplanation] = useState('');

  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [ageError, setAgeError] = useState(false);
  const [priorMusicalTraining, setPriorMusicalTraining] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const ageAsNumber = parseInt(age, 10);

    if (Number.isNaN(ageAsNumber) && age !== '') {
      setAgeError(true);
      return;
    }

    const data = {
      preferences: {
        moonlight: {
          order: getOrder(moonlight),
          explanation: moonlightExplanation,
        },
        apologies: {
          order: getOrder(apologies),
          explanation: apologiesExplanation,
        },
        lucy: {
          order: getOrder(lucy),
          explanation: lucyExplanation,
        },
      },

      gender: gender === '' ? null : gender,
      age: age === '' ? null : ageAsNumber,
      priorMusicalTraining,
    };

    const timestamp = Date.now().toString();
    const docRef = doc(firestore, `responses/${timestamp}`);

    try {
      await setDoc(docRef, data);
      router.push('success');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <p>
            In each section you will be given 3 formats of the same song,
            presented in varying audio quality. Please listen to each version
            and rank them based on what you think sounds best. Please include a
            reason for your answer if you have one.
          </p>
          <p>
            Song preference is ranked from top to bottom, order can be changed
            using drag and drop or by pressing the arrows.
          </p>
        </Grid>

        <SongSection
          id={1}
          song={moonlight}
          setSong={setMoonlight}
          explanation={moonlightExplanation}
          setExplanation={setMoonlightExplanation}
        />

        <SongSection
          id={2}
          song={apologies}
          setSong={setApologies}
          explanation={apologiesExplanation}
          setExplanation={setApologiesExplanation}
        />

        <SongSection
          id={3}
          song={lucy}
          setSong={setLucy}
          explanation={lucyExplanation}
          setExplanation={setLucyExplanation}
        />

        <Grid item xs={12}>
          <Typography variant="subtitle1">
            Optionally provide some additional information.
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            value={gender}
            onChange={handleChange(setGender)}
            label="Gender"
            variant="standard"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            value={age}
            error={ageError}
            helperText={
              ageError ? 'Please enter a number or do not specify' : ''
            }
            onChange={handleChange(setAge)}
            label="Age"
            variant="standard"
          />
        </Grid>

        <Grid item xs={12} style={{ marginLeft: '0.5rem' }}>
          <FormControlLabel
            control={
              <Checkbox
                color="secondary"
                checked={priorMusicalTraining}
                onChange={() => {
                  setPriorMusicalTraining((prevState) => !prevState);
                }}
              />
            }
            label="I have prior musical training."
          />
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;
