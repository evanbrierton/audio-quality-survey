import { List, ListItem } from '@material-ui/core';
import { useCallback } from 'react';
import { move } from '../utils/arrays';
import { Option } from '../utils/types';
import Card from './Card';

type Props = {
  options: Option[];
  setOptions: React.Dispatch<React.SetStateAction<Option[]>>;
};

const PreferenceOrder = ({ options, setOptions }: Props) => {
  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      setOptions((prevOptions) => move(prevOptions, dragIndex, hoverIndex));
    },
    [setOptions]
  );

  const renderCard = useCallback(
    (card: { id: number; value: React.ReactNode }, index: number) => (
      <ListItem key={card.id}>
        <Card
          index={index}
          id={card.id}
          value={card.value}
          moveCard={moveCard}
        />
      </ListItem>
    ),
    [moveCard]
  );

  return <List>{options.map((card, i) => renderCard(card, i))}</List>;
};

export default PreferenceOrder;
