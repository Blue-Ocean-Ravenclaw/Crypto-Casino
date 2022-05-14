import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Navigation from './Navigation';

function Layout({ children }) {
  const router = useRouter();

  if (
    router.pathname === '/' ||
    router.pathname === '/login' ||
    router.pathname === '/signup'
  ) {
    return <div>{children}</div>;
  }

  return (
    <div>
      {children}
      <Navigation />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
