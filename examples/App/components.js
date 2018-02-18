// @flow
// @jsx glam

import glam from 'glam';
import React, { Component, type Node } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { colors } from '../theme';

const navWidth = 180;
const appWidth = 840;
const appGutter = 15;
const contentGutter = 20;
const pagePadding = 120;
const smallDevice = '@media (max-width: 769px)';
const largeDevice = '@media (min-width: 770px)';

export const AppContainer = (props: any) => (
  <div
    css={{
      boxSizing: 'border-box',
      marginLeft: 'auto',
      marginRight: 'auto',
      maxWidth: appWidth,
      minHeight: '100vh',
      padding: `0 ${appGutter}px ${pagePadding}px`,
    }}
    {...props}
  />
);
export const PageContent = (props: any) => (
  <div
    css={{
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingBottom: contentGutter,
      paddingTop: contentGutter,

      [smallDevice]: {
        paddingTop: 70,
      },
    }}
    {...props}
  />
);
export const AppContent = (props: any) => (
  <div
    css={{
      flex: '1 1 auto',
      marginLeft: 'auto',
      marginRight: 'auto',

      [largeDevice]: {
        paddingLeft: navWidth,
      },
    }}
    {...props}
  />
);
export const Nav = ({ children }: { children: Node }) => (
  <div
    css={{
      [smallDevice]: {
        backgroundColor: 'rgba(255, 255, 255, 0.96)',
        boxShadow: 'inset 0 -1px 0 rgba(0, 0, 0, 0.1)',
        display: 'flex ',
        fontSize: 13,
        marginLeft: -appGutter,
        marginRight: -appGutter,
        overflowX: 'auto',
        position: 'fixed',
        top: 0,
        width: '100%',
        WebkitOverflowScrolling: 'touch',
      },

      [largeDevice]: {
        display: 'block',
        float: 'left',
        paddingTop: contentGutter,
        position: 'fixed',
        width: navWidth,
        zIndex: 1,
      },
    }}
  >
    {children}
    <GithubButton />
  </div>
);

type ItemProps = {
  children: Node,
  icon: string,
  isSelected: boolean,
  to: string,
};
export const NavItem = ({ children, icon, isSelected, to }: ItemProps) => (
  <Link
    to={to}
    css={{
      border: 0,
      color: isSelected ? colors.N100 : colors.N60,
      display: 'inline-block',
      fontWeight: isSelected ? 500 : null,
      position: 'relative',
      textDecoration: 'none',
      whiteSpace: 'nowrap',

      ':hover, :active': {
        color: colors.N80,
        textDecoration: 'none',
      },

      [smallDevice]: {
        boxShadow: isSelected ? 'inset 0 -2px 0 black' : null,
        padding: `8px ${appGutter}px`,
      },

      [largeDevice]: {
        backgroundColor: isSelected ? 'white' : 'transparent',
        display: 'block',
        padding: '8px 20px 8px 0',
      },
    }}
  >
    <span css={{ fontSize: '1.33em', marginRight: '0.5em' }}>{icon}</span>
    {children}
  </Link>
);

const GithubButton = () => {
  const size = window.innerWidth > 769 ? 'large' : null;

  return (
    <div
      css={{
        [smallDevice]: {
          padding: appGutter,
        },
        [largeDevice]: {
          position: 'fixed',
          bottom: 30,
        },
      }}
    >
      <a
        className="github-button"
        href="https://github.com/jossmac/react-images"
        data-size={size}
        data-show-count="true"
        aria-label="Star jossmac/react-images on GitHub"
      >
        Star
      </a>
    </div>
  );
};

// Return scroll to top on route change
class ScrollToTop extends Component<*> {
  componentDidUpdate(prevProps) {
    const { history, location } = this.props;

    // do not influence scroll on browser back/forward
    if (history.action === 'POP') return;

    // no scroll when extending the current path
    const pathArr = location.pathname.split('/');
    if (!prevProps.location.pathname.includes(pathArr[1])) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export const ScrollRestoration = withRouter(ScrollToTop);
