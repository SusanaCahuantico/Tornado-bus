import './index.css';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';
import { HashRouter as Router } from 'react-router-dom';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  const isProduction = import.meta.env.PROD; // Si usas Vite

  root.render(
    <Provider store={store}>
      <Router basename={isProduction ? "/Tornado-bus/tornado-bus" : ""}>
        <App />
      </Router>
    </Provider>
  );
} else {
  console.error('No se encontró el elemento con id "root"');
}