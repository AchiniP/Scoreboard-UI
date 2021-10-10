import React from 'react';
import {Navigate} from 'react-router-dom';
import DashboardLayout from './components/dashboard/DashboardLayout';
import ScoreCard from './components/scoreCard/ScoreCard';
import NotFound from './components/NotFound/NotFound';
import PlayerDetails from './components/scoreCard/PlayerDetails';
import ComparePlayers from './components/scoreCard/ComparePlayers';
import overrallIcon from './utils/images/overrall.png';
import atackIcon from './utils/images/attack.png';
import deffenceIcon from './utils/images/defence.png';
import magicIcon from './utils/images/magic5.png';
import cookIcon from './utils/images/cook.png';
import craftIcon from './utils/images/crafting.png';


export const appRoutes = [
  {
    path: '/',
    element: <Navigate to = "/app/overall" />,
  },
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      {path: 'overall', element: <ScoreCard category={'overall'}
        ico={overrallIcon}/>},
      {path: 'attack', element: <ScoreCard category={'attack'}
        ico={atackIcon}/>},
      {path: 'defence', element: <ScoreCard category={'defence'}
        ico={deffenceIcon}/>},
      {path: 'magic', element: <ScoreCard category={'magic'}
        ico={magicIcon}/>},
      {path: 'cooking', element: <ScoreCard category={'cooking'}
        ico={cookIcon}/>},
      {path: 'crafting', element: <ScoreCard category={'crafting'}
        ico={craftIcon}/>},
      {path: 'player', element: <PlayerDetails />},
      {path: 'compareplayers', element: <ComparePlayers />},
      {path: '404', element: <NotFound />},
      {path: '*', element: <Navigate to="/404" />},
    ],
  },
  {
    path: '/',
    children: [
      {path: '/app/overall', element: <ScoreCard category={'overall'}/>},
      {path: '/*', element: <Navigate to="/app/overrall" />},
    ],
  },
];
