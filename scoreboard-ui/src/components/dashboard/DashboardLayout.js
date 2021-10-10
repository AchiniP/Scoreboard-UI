
import React, {useState} from 'react';
import {Outlet} from 'react-router-dom';
import {makeStyles} from '@material-ui/core';
import Header from '../header/Header';
import LeftPanel from '../leftPanel/LeftPanel';
import Background from '../../utils/images/Background.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%',
  },
  wrapper: {
    height: '100%',
    fontSize: '12px',
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 48,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 240,
    },
  },
  contentContainer: {
    height: '100%',
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto',
  },
  overrides: {
    MuiPaper: {
      root: {
        height: '100%',
      },
    },
  },
}));

const DashboardLayout = () => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (

    <div className={classes.root} style={{
      backgroundImage: 'url(' + Background + ')',
      backgroundPosition: 'center',
    }}>
      <Header onMobileNavOpen={() => setMobileNavOpen(true)} />
      <LeftPanel
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />

      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <Outlet />
          </div>
        </div>
      </div>

    </div>
  );
};

export default DashboardLayout;
