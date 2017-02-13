import React from 'react';

import MainNav from './MainNav';

const MainLayout = ({children}) =>
  <div>
    <header>
      <MainNav />
    </header>
    <main className="main-layout">
      {children}
    </main>
  </div>

export default MainLayout;
