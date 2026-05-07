import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
} from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

function App() {

  return (

    <BrowserRouter>

      <div>

        {/* NAVBAR */}

        <nav
          style={{
            padding: '20px',
            backgroundColor: '#f0f0f0',
            marginBottom: '30px',
            display: 'flex',
            gap: '20px',
          }}
        >

          <Link to="/login">
            Login
          </Link>

          <Link to="/signup">
            Signup
          </Link>

          <Link to="/dashboard">
            Dashboard
          </Link>

        </nav>

        {/* ROUTES */}

        <Routes>

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/signup"
            element={<Signup />}
          />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="*"
            element={<Navigate to="/login" />}
          />

        </Routes>

      </div>

    </BrowserRouter>

  );

}

export default App;