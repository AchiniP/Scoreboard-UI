import React, {useState, useEffect} from 'react';
import MUIDataTable from 'mui-datatables';
import {Box, Grid} from '@material-ui/core';
import AppGlobalObj from '../../utils/AppGlobal';
import {createTheme, MuiThemeProvider} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {useLocation} from 'react-router-dom';
import axios from 'axios';


const ComparePlayers = () => {
  const {state} = useLocation();

  const apiRoute = AppGlobalObj.scoreAPIRoute;

  const [sourceUserData, setSourceUserData] = useState([]);
  const [targetUserData, setTargetUserData] = useState([]);


  const {sourceUserName, targetUserName} = state;

  const getPlayer = () => {
    const REQ_OBJ_SOURCE = {
      method: 'GET',
      url: `${apiRoute}/user/${sourceUserName.trim()}`,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const REQ_OBJ_TARGET = {
      method: 'GET',
      url: `${apiRoute}/user/${targetUserName.trim()}`,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    axios(REQ_OBJ_SOURCE)
        .then((res) => setSourceUserData(res.data))
        .catch((err) => {
          console.log(err);
          setSourceUserData([]);
        });
    axios(REQ_OBJ_TARGET)
        .then((res) => setTargetUserData(res.data))
        .catch((err) => {
          console.log(err);
          setTargetUserData([]);
        });
  };

  useEffect(getPlayer, [apiRoute, sourceUserName, targetUserName]);

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
      name: 'category',
      label: 'Skill',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'rank',
      label: 'Rank',
      options: {
        filter: true,
        sort: true,
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

  return (
    <Grid xs={12}>
      <Box xs={4}>
        {
          sourceUserData &&
          (
            <div>
              <Box sx={{m: 2}} maxHeight={'80%'}
                style={{padding: '10px 10px 10px 10%'}}>
                <Grid container rowSpacing={10} >

                  <Grid item xs={8}>
                    <MuiThemeProvider theme={muiTableTheme}>
                      <MUIDataTable
                        title={sourceUserName.toUpperCase()}
                        data={sourceUserData}
                        columns={playerTableColumns}

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

                </Grid>
              </Box>
            </div>
          )
        }
      </Box>
      <Box xs={4}>
        {
          targetUserData &&
          (
            <div>
              <Box sx={{m: 2}} maxHeight={'80%'}
                style={{padding: '10px 10px 10px 10%'}}>
                <Grid container rowSpacing={10} >

                  <Grid item xs={8}>
                    <MuiThemeProvider theme={muiTableTheme}>
                      <MUIDataTable
                        title={targetUserName.toUpperCase()}
                        data={targetUserData}
                        columns={playerTableColumns}

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

                </Grid>
              </Box>
            </div>
          )
        }
      </Box>
    </Grid>
  );
};

ComparePlayers.propTypes = {
  name: PropTypes.string,
};

export default ComparePlayers;
