import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useRoutes } from './hooks/routes.hook';
import { NavBar } from './components/NavBar';
import { ScrollToTop } from './components/ScrollToTop';
import { useModal } from './hooks/modal.hook';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { Footer } from './components/Footer';

const stripePromise = loadStripe('pk_test_51MxaykJI6b434rARdr9xKGW1lg92hRdRcqPE4D2rcvds66USTHq5mZr1ajeiiSiCzJFRlIFAwbZ33jtkbrHsniOU00M8f6kz85');
const App = () => {
  const routes = useRoutes();
  const modals = useModal();
  return (
    <div>
      <Elements stripe={stripePromise}>
        <ToastContainer />
        <Router>
          <NavBar />
          <div className='App'>{routes}</div>
          <Footer />
          <ScrollToTop />
          {modals}
        </Router>
      </Elements>
    </div>
  );
};

export default App;
