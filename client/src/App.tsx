import { Container } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Header from './components/header';
import AppRoutes from './routes';

function App() {
  return (
    <Router>
      <Container fluid="xxl">
        <Header />
        <div className="mt-3 mt-md-5">
          <AppRoutes />
        </div>
      </Container>
      <ToastContainer
        position="bottom-right"
        autoClose={false}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}

export default App;
