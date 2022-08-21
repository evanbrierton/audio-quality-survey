import { Button, ButtonGroup, IconButton } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

type Props = {
  length: number;
  index: number;
  move: (dragIndex: number, hoverIndex: number) => void;
};

const UpDownButtonGroup = ({ length, index, move }: Props) => {
  const renderUpArrow = () => {
    if (index === 0) return null;

    return (
      <IconButton size="large" onClick={() => move(index, index - 1)}>
        <ArrowDropUpIcon />
      </IconButton>
    );
  };

  const renderDownArrow = () => {
    if (index === length - 1) return null;

    return (
      <IconButton size="large" onClick={() => move(index, index + 1)}>
        <ArrowDropDownIcon />
      </IconButton>
    );
  };

  return (
    <ButtonGroup size="large">
      {renderUpArrow()}
      {renderDownArrow()}
    </ButtonGroup>
  );
};

export default UpDownButtonGroup;
