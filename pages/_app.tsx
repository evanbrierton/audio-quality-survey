import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const MyApp = ({ Component }: AppProps) => (
  <DndProvider backend={HTML5Backend}>
    <Component />
  </DndProvider>
);

export default MyApp;
