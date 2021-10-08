import React, {useState, useEffect} from 'react';
import MUIDataTable from 'mui-datatables';
import {Box, Grid} from '@material-ui/core';
import AppGlobalObj from '../../utils/AppGlobal';
import {createTheme, MuiThemeProvider} from '@material-ui/core/styles';
import PropTypes from 'prop-types';


const PlayerScoreCard = (props) => {
  const apiContextPath = AppGlobalObj.apiContextPath;

  const [playerData, setPlayerData] = useState(null);

  const {name} = props;

  const getPlayer = () => {
    fetch(apiContextPath + '/employees')
        .then((res) => res.json())
        .then(setPlayerData)
        .catch(console.error);
  };

  useEffect(getPlayer, []);

  const muiTableTheme = () => createTheme({
    overrides: {

      MuiTable: {
        root: {
          border: '2px solid #777777',
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

  const playerTableColumns = [
    {
      name: 'employee_name',
      label: 'Skill',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'id',
      label: 'Rank',
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

  return (
    playerData && playerData.data &&
      (
        <div>
          <Box sx={{m: 2}} maxHeight={'80%'}>
            <Grid container rowSpacing={10} >

              <Grid item xs={8}>
                <MuiThemeProvider theme={muiTableTheme}>
                  <MUIDataTable
                    title={name}
                    data={playerData.data}
                    columns={playerTableColumns}

                    options={{
                      selectableRows: false, // will turn off checkboxes in rows
                      responsive: 'scroll',
                      filter: false,
                      download: false,
                      viewColumns: false,
                      pagination: false,

                    }}
                  />
                </MuiThemeProvider>
              </Grid>

            </Grid>
          </Box>
        </div>
      )
  );
};

PlayerScoreCard.propTypes = {
  name: PropTypes.string,
};

export default PlayerScoreCard;
