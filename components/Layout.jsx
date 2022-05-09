import * as React from 'react';
import Navigation from './Navigation';

function Layout({ children }) {
  return (
    <div>
      { children }
      <Navigation />
    </div>
  )
}

export default Layout;