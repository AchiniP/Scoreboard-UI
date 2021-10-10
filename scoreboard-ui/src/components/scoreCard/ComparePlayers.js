/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react';
import {Box, Grid, TableCell, TableHead, TableRow} from '@material-ui/core';
import AppGlobalObj from '../../utils/AppGlobal';
import {createTheme, MuiThemeProvider} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';

const ComparePlayers = (props) => {
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
          backgroundColor: '#3F4142',
          padding: '5px',
        },
        body: {
          backgroundColor: '#323232',
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

  const p1BG = '#005301';
  const p2BG = '#003866';
  const p1BGBd = '#1B5720';
  const p2BGBd = '#1B3F57';

  return (
    playerData && playerData.data &&
      (
        <div>
          <Box sx={{m: 2}} maxHeight={'80%'} p={2}>
            <Grid container rowSpacing={10} >

              <Grid item xs={10}>
                <MuiThemeProvider theme={muiTableTheme}>
                  <MaterialTable
                    title='Compare Players'
                    data={playerData.data}
                    components={{
                      Header: () => {
                        return (
                          <TableHead>
                            <TableRow>
                              <TableCell colSpan={1} align="center">
                              </TableCell>
                              <TableCell colSpan={3} align="center"
                                style={{backgroundColor: p1BG}}
                              >
                                <Box>
                                  Player 1
                                </Box>
                              </TableCell>
                              <TableCell colSpan={3} align="center"
                                style={{backgroundColor: p2BG}}>
                                <Box>
                                Player 2
                                </Box>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell align="left">
                                <Box>Skill</Box>
                              </TableCell>
                              <TableCell align="left"
                                style={{backgroundColor: p1BG}}>
                                <Box>Rank</Box>
                              </TableCell>
                              <TableCell align="left"
                                style={{backgroundColor: p1BG}}>
                                <Box>Level</Box>
                              </TableCell>
                              <TableCell align="left"
                                style={{backgroundColor: p1BG}}>
                                <Box>XP</Box>
                              </TableCell>
                              <TableCell align="left"
                                style={{backgroundColor: p2BG}}>
                                <Box>Rank</Box>
                              </TableCell>
                              <TableCell align="left"
                                style={{backgroundColor: p2BG}}>
                                <Box>Level</Box>
                              </TableCell>
                              <TableCell align="left"
                                style={{backgroundColor: p2BG}}>
                                <Box>XP</Box>
                              </TableCell>
                            </TableRow>
                          </TableHead>
                        );
                      },
                      Row: ({data}) => {
                        return (
                          <TableRow>
                            <TableCell align="left">Skill 1
                            </TableCell>
                            <TableCell align="left"
                              style={{backgroundColor: p1BGBd}}>
                              Rank 1
                            </TableCell>
                            <TableCell align="left"
                              style={{backgroundColor: p1BGBd}}>
                              Rank 1
                            </TableCell>
                            <TableCell align="left"
                              style={{backgroundColor: p1BGBd}}>
                              Rank 1
                            </TableCell>
                            <TableCell align="left"
                              style={{backgroundColor: p2BGBd}}>
                              Rank 1
                            </TableCell>
                            <TableCell align="left"
                              style={{backgroundColor: p2BGBd}}>
                              Rank 1
                            </TableCell>
                            <TableCell align="left"
                              style={{backgroundColor: p2BGBd}}>
                              Rank 1
                            </TableCell>
                          </TableRow>
                        );
                      },
                    }}

                    options={{
                      selectableRows: false, // will turn off checkboxes in rows
                      responsive: 'scroll',
                      paging: false,
                      search: false,
                      maxBodyHeight: '600px',


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

ComparePlayers.propTypes = {
  name: PropTypes.string,
};

export default ComparePlayers;
