import React from 'react';

import MainNav from './MainNav';
import Footer from './Footer';

const HomeLayout = ({children}) =>
  <div>
    <header>
      <MainNav />
    </header>
    <main className="home-layout">
      {children}
    </main>
    <Footer />
  </div>

export default HomeLayout;
