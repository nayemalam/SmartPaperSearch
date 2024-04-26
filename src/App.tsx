import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// internal css imports
import './global.scss';
import Main from './pages/Main';

const App = () => {
  return (
    <div className="app">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Main />
    </div>
  );
};

export default App;
