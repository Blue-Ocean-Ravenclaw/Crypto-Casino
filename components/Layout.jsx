import * as React from 'react';

function Layout({ children }) {
  return (
    <div>
      { children }
      <h1>Navigation</h1>
    </div>
  )
}

export default Layout;