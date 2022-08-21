import type { Identifier, XYCoord } from 'dnd-core';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Card as MUICard } from '@material-ui/core';
import { Box } from '@mui/system';
import UpDownButtonGroup from './UpDownButtonGroup';

const style = {
  cursor: 'move',
};

type Props = {
  id: any;
  value: React.ReactNode;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
};

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const Card = ({ id, value, index, moveCard }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: 'card',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },

    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.

      // eslint-disable-next-line no-param-reassign
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'card',
    item: () => ({ id, index }),
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{ ...style, opacity, width: '100%' }}
      data-handler-id={handlerId}
    >
      <MUICard>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {value}
          <UpDownButtonGroup index={index} length={3} move={moveCard} />
        </Box>
      </MUICard>
    </div>
  );
};

export default Card;
