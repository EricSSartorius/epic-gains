import React from 'react';

import Header from './Header';
import Footer from './Footer';

const MainLayout = ({children}) =>
  <div>
    <Header />
    <main className="main-layout">
      {children}
    </main>
    <Footer />
  </div>

export default MainLayout;
