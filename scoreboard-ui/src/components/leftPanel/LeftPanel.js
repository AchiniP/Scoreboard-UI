import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useLocation} from 'react-router-dom';
import {
  Box, Button, Divider, Drawer, Hidden, List, makeStyles,
  TextField, Typography, Grid,
} from '@material-ui/core';
import {
  Search, Compare,
} from '@material-ui/icons';
import NavItem from './NavItem';
import overrallIcon from '../../utils/images/overrall.png';
import atackIcon from '../../utils/images/attack.png';
import deffenceIcon from '../../utils/images/defence.png';
import magicIcon from '../../utils/images/magic5.png';
import cookIcon from '../../utils/images/cook.png';
import craftIcon from '../../utils/images/crafting.png';


const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 240,
  },
  desktopDrawer: {
    width: 240,
    top: 50,
    height: 'calc(100% - 64px)',
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64,
  },
  divider: {
    background: '#777777',
  },
  MuiGrid: {
    item: {
      padding: '2px !important',
    },
  },
  imageIcon: {
    display: 'flex',
    height: 'inherit',
    width: 'inherit',
  },
}));


const LeftPanel = ({onMobileClose, openMobile}) => {
  const [user, setUser] = useState(null);

  const classes = useStyles();
  const location = useLocation();

  const appMenu = [
    {
      href: '/app/overall',
      icon: overrallIcon,
      title: 'Overall',
    },
    {
      href: '/app/attack',
      icon: atackIcon,
      title: 'Attack',
    },
    {
      href: '/app/defence',
      icon: deffenceIcon,
      title: 'Defence',
    },
    {
      href: '/app/magic',
      icon: magicIcon,
      title: 'Magic',
    },
    {
      href: '/app/cooking',
      icon: cookIcon,
      title: 'Cooking',
    },
    {
      href: '/app/crafting',
      icon: craftIcon,
      title: 'Crafting',
    },
  ];

  const items = appMenu;

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const handleClick = () => {
    console.log('Comes here');
    setUser('');
    // todo Achini Navigate to user
  };


  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Divider classes={{root: classes.divider}}/>

      <Box p={1}>
        <Grid container spacing={1}>
          <Grid item xs={11}>
            <Typography
              align="left"
              color="textPrimary"
              variant="h5"
            >
              Search
            </Typography>
          </Grid>
          <Grid item xs={11}>
            <TextField
              onChange={(e) => {
                setUser(e.target.value);
              }}
              value={user}
              placeholder="Player Name"
              variant="outlined"
              required
              type="string"
              inputProps={{
                style: {
                  padding: 5,
                },
              }}
            />
          </Grid>
          <Grid item xs={11}>
            <Button variant="contained"
              color="primary"
              endIcon={<Search/>}
              href="/app/player"
              size= 'small'
              onClick={handleClick}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>


      <Divider classes={{root: classes.divider}}/>

      <Box p={1}>
        <Grid container spacing={1}>
          <Grid item xs={11}>
            <Typography
              align="left"
              color="textPrimary"
              variant="h5"
            >
              Compare Players
            </Typography>
          </Grid>
          <Grid item xs={11}>
            <TextField
              onChange={(e) => {
                setUser(e.target.value);
              }}
              value={user}
              placeholder="Player 1"
              variant="outlined"
              required
              type="string"
              inputProps={{
                style: {
                  padding: 5,
                },
              }}
            />
          </Grid>
          <Grid item xs={11}>
            <TextField
              onChange={(e) => {
                setUser(e.target.value);
              }}
              value={user}
              placeholder="Player 2"
              variant="outlined"
              required
              type="string"
              inputProps={{
                style: {
                  padding: 5,
                },
              }}
            />
          </Grid>
          <Grid item xs={11}>
            <Button variant="contained"
              color="primary"
              endIcon={<Compare/>}
              href="/app/compareplayers"
            >Compare</Button>
          </Grid>
        </Grid>
      </Box>


    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{paper: classes.mobileDrawer}}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{paper: classes.desktopDrawer}}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

LeftPanel.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

LeftPanel.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default LeftPanel;
