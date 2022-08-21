import { Button, Icon } from '@material-ui/core';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import React from 'react';

type Props = {
  path: string;
  i: number;
};

const Recording = ({ path, i }: Props) => {
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const play = () => {
    document.querySelectorAll('audio').forEach((audio) => audio.pause());
    audioRef.current?.play();
  };

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio src={path} id={path} ref={audioRef} />
      <Button startIcon={<PlayArrowIcon />} onClick={play}>
        File {i}
      </Button>
    </>
  );
};

export default Recording;
