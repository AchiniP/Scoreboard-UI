import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useLocation} from 'react-router-dom';
import {
  Box, Button, Divider, Drawer, Hidden, List, makeStyles, TextField, Typography,
} from '@material-ui/core';
import {BarChart, Search, SupervisedUserCircle} from '@material-ui/icons';
import NavItem from './NavItem';


const appMenu = [
  {
    href: '/app/overall',
    icon: BarChart,
    title: 'Overall',
  },
  {
    href: '/app/attack',
    icon: SupervisedUserCircle,
    title: 'Attack',
  },
  {
    href: '/app/defence',
    icon: SupervisedUserCircle,
    title: 'Defence',
  },
  {
    href: '/app/magic',
    icon: SupervisedUserCircle,
    title: 'Magic',
  },
  {
    href: '/app/cooking',
    icon: SupervisedUserCircle,
    title: 'Cooking',
  },
  {
    href: '/app/crafting',
    icon: SupervisedUserCircle,
    title: 'Crafting',
  },
];

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
}));

const LeftPanel = ({onMobileClose, openMobile}) => {
  const [user, setUser] = useState(null);

  const classes = useStyles();
  const location = useLocation();

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
      <Box p={4}>
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
      <Box p={5}>
        <Typography
          align="center"
          color="textPrimary"
          variant="h4"
        >
          Search by Name
        </Typography>
        <TextField
          onChange={(e) => {
            setUser(e.target.value);
          }}
          value={user}
          placeholder="User Name"
          variant="outlined"
          required
          type="string"
        />
        <Button variant="contained"
          color="primary"
          endIcon={<Search/>}
          onClick={handleClick
          }>Search</Button>

      </Box>

      <Divider classes={{root: classes.divider}}/>
      <Box p={3}>
      </Box>
      <Box p={5}>
        <Typography
          align="center"
          color="textPrimary"
          variant="h4"
        >
                Compare Users
        </Typography>
        <TextField
          onChange={(e) => {
            setUser(e.target.value);
          }}
          value={user}
          placeholder="User Name"
          variant="outlined"
          required
          type="string"
        />
        <TextField
          onChange={(e) => {
            setUser(e.target.value);
          }}
          value={user}
          placeholder="User Name"
          variant="outlined"
          required
          type="string"
        />
        <Button variant="contained"
          color="primary"
          endIcon={<Search/>}
          onClick={handleClick
          }>Search</Button>
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
