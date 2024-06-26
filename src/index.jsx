import { createRoot } from 'react-dom/client';
import { MainView } from '../Components/main-view/main-view';
import { Container } from 'react-bootstrap';

// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";

// Main component (will eventually use all the others)
const movieAPIApplication = () => {
   return (
      <Container className='text-light'>
        <MainView />
      </Container>
    );
  };
  


// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<movieAPIApplication />);