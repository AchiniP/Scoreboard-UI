import React, {useState, useEffect} from 'react';
import MUIDataTable from 'mui-datatables';
import {Box, Link, Grid, Typography} from '@material-ui/core';
import axios from 'axios';
import appGlobalObj from '../../utils/AppGlobal';
import AppDialog from '../../utils/AppDialog';
import PlayerScoreCard from './PlayerScoreCard';
import {createTheme, MuiThemeProvider} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const ScoreCard = (props) => {
  const apiRoute = appGlobalObj.scoreAPIRoute;
  const [userData, setUserData] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [playerName, setPlayerName] = useState(null);
  const [popUpTitle, setPopupTitle] = useState(null);

  const {category, ico} = props;


  const getUserList = () => {
    const REQ_OBJ = {
      method: 'GET',
      url: `${apiRoute}/category/${category.toUpperCase()}`,
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        limit: 10,
      },
    };
    axios(REQ_OBJ)
        .then((res) => setUserData(res.data))
        .catch((err) => {
          console.log(err);
          setUserData([]);
        });
  };

  useEffect(getUserList, [category]);

  const muiTableTheme = () => createTheme({
    overrides: {

      MuiTable: {
        root: {
          border: '1px solid #777777',
        },
      },
      MuiTableCell: {
        head: {
          backgroundColor: '#3F4142 !important',
          padding: '5px',
        },
      },
      MUIDataTableBodyCell: {
        root: {
          backgroundColor: '#000000',
          padding: '5px',
          color: '#F78B11',
          borderBlockColor: '#777777 !important',
        },
      },
      MuiToolbar: {
        root: {
          minHeight: '50px !important',
          backgroundColor: '#000000 !important',
          color: '#F78B11',
        },
      },
      MuiInputBase: {
        input: {
          color: '#F78B11',
        },
      },

    },
  });

  const openInPopup = (name) => {
    setPopupTitle('PLAYER SCORECARD');
    setPlayerName(name);
    setOpenPopup(true);
  };

  const columns = [
    {
      name: 'rank',
      label: 'Rank',
    },
    {
      name: 'userId',
      label: 'Name',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => (
          <Link style={{color: 'white', cursor: 'pointer'}}
            onClick={() => {
              openInPopup(value);
            }}
          >{value}</Link>
        ),
      },
    },
    {
      name: 'level',
      label: 'Level',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'score',
      label: 'XP',
      options: {
        filter: true,
        sort: true,
      },
    },

  ];


  const titleTemp =
    <Grid container item xs={12} spacing={2}>
      <Grid item xs={2} >
        <img src={ico} alt='' style={{height: '40px', width: '40px'}}>
        </img>
      </Grid>
      <Grid item xs={8}>
        <Typography
          align="left"
          variant="h5"
          style={{paddingTop: '5px'}}
        >
          {category.toUpperCase()}
        </Typography>

      </Grid>
    </Grid>;


  return (
    userData &&
    (
      <div>
        <Box sx={{m: 4}} minHeight={'100%'}>
          <Grid container rowSpacing={10}>

            <Grid item xs={2}>
            </Grid>
            <Grid item xs={8} style={{border: '1px solid #777777'}}>
              <MuiThemeProvider theme={muiTableTheme}>
                <MUIDataTable
                  title={titleTemp}
                  data={userData}
                  columns={columns}

                  options={{
                    selectableRows: false,
                    responsive: 'scroll',
                    filter: false,
                    download: false,
                    viewColumns: false,
                    pagination: false,

                  }}
                />
              </MuiThemeProvider>
            </Grid>

            <Grid item xs={2}>
            </Grid>

          </Grid>
        </Box>
        <AppDialog
          title={popUpTitle}
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <PlayerScoreCard name={playerName} />
        </AppDialog>
      </div>
    )
  );
};

ScoreCard.propTypes = {
  category: PropTypes.string,
  ico: PropTypes.string,


};
export default ScoreCard;
