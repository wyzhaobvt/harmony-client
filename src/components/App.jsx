import { Outlet } from 'react-router';
import setTheme from '../utils/setTheme';
import Navbar from './Navbar';

function App() {
  setTheme();
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
export default App;
