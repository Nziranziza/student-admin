import { Container } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';

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
    </Router>
  );
}

export default App;
