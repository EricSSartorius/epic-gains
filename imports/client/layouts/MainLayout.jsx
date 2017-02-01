import React from 'react';

import Header from './Header';
import Footer from './Footer';

const MainLayout = ({children}) =>
  <div className="main-layout">
    <Header />
    {children}
    <Footer />
  </div>

export default MainLayout;
