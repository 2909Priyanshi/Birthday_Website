import { useState } from 'react';
import BirthdayHome from './components/BirthdayHome/BirthdayHome.jsx';
import OpeningScreen from './components/OpeningScreen/OpeningScreen.jsx';

function App() {
  const [hasOpened, setHasOpened] = useState(false);

  return (
    <div className="app">
      {!hasOpened && <OpeningScreen onOpen={() => setHasOpened(true)} />}
      {hasOpened && <BirthdayHome />}
    </div>
  );
}

export default App;
