import './index.css';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  
  root.render(
    <Provider store={store}>
      <Router basename={import.meta.env.BASE_URL}>
        <App />
      </Router>
    </Provider>
  );
} else {
  console.error('No se encontró el elemento con id "root"');
}