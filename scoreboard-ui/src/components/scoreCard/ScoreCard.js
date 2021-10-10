import React, {useState, useEffect} from 'react';
import MUIDataTable from 'mui-datatables';
import {Box, Link, Grid, Typography} from '@material-ui/core';
import appGlobalObj from '../../utils/AppGlobal';
import AppDialog from '../../utils/AppDialog';
import PlayerScoreCard from './PlayerScoreCard';
import {createTheme, MuiThemeProvider} from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const ScoreCard = (props) => {
  console.log(props);

  const apiContextPath = appGlobalObj.apiContextPath;
  const [userData, setUserData] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [playerName, setPlayerName] = useState(null);
  const [popUpTitle, setPopupTitle] = useState(null);

  const {category, ico} = props;


  const getUserList = () => {
    fetch(apiContextPath + '/employees')
        .then((res) => res.json())
        .then((empData) => {
          if (category === 'magic') {
            const data = empData.data.filter((e) => e.employee_age > 50);
            empData.data = data;
          }
          return empData;
        })
        .then((empData) => {
          console.log(empData);
          setUserData(empData);
        })
        .catch(console.error);
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
    setPopupTitle('Player Scorecard');
    setPlayerName(name);
    setOpenPopup(true);
  };

  const columns = [
    {
      name: 'id',
      label: 'Rank',
    },
    {
      name: 'employee_name',
      label: 'Name',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => (
          <Link
            onClick={() => {
              openInPopup(value);
            }}
          >{value}</Link>
        ),
      },
    },
    {
      name: 'employee_age',
      label: 'Level',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'employee_salary',
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
    userData && userData.data &&
    (
      <div>
        <Box sx={{m: 5}} minHeight={'100%'}>
          <Grid container rowSpacing={10}>

            <Grid item xs={2}>
            </Grid>
            <Grid item xs={8} style={{border: '1px solid #777777'}}>
              <MuiThemeProvider theme={muiTableTheme}>
                <MUIDataTable
                  title={titleTemp}
                  data={userData.data}
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
