import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog, DialogTitle, DialogContent, makeStyles, Typography, Button, Divider,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Background from './images/DialogBackground.jpg';

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: theme.spacing(4),
    position: 'absolute',
    top: theme.spacing(3),
    backgroundImage: 'url(' + Background + ')',
    minHeight: '40%',
    maxHeight: '600px',
    overflow: 'hidden',
    border: '2px solid #777777',
    marginTop: '60px',
    marginLeft: '15%',
    minWidth: '50%',

  },
  dialogTitle: {
    padding: '1px 0px 0px 20px',
  },
  divider: {
    background: '#777777',
  },

}));

const AppDialog = (props) => {
  const {title, children, openPopup, setOpenPopup} = props;
  const classes = useStyles();

  return (
    <div className={classes.root} style={{
      backgroundImage: 'url(' + Background + ')',
      backgroundPosition: 'center',
    }}>
      <Dialog open={openPopup}
        fullWidth
        maxWidth="md"
        classes={{paper: classes.dialogWrapper}}
      >
        <DialogTitle className={classes.dialogTitle} />
        <div style={{display: 'flex'}}>
          <Typography variant="h4" component="div" style={{flexGrow: 1}}>
            {title}
          </Typography>
          <Button
            color="secondary"
            onClick={()=>{
              setOpenPopup(false);
            }}>
            <CloseIcon />
          </Button>
        </div>
        <Divider classes={{root: classes.divider}}/>
        <DialogContent style={{
          overflow: 'hidden', height: '80%', width: '100%',
        }}>
          <div style={{overflow: 'hidden', height: '90%', width: '100%'}}>
            {children}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

AppDialog.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
  openPopup: PropTypes.bool,
  setOpenPopup: PropTypes.func,
};
export default AppDialog;
