import React from 'react';
import {Navigate} from 'react-router-dom';
import DashboardLayout from './components/dashboard/DashboardLayout';
import ScoreCard from './components/scoreCard/ScoreCard';
import NotFound from './components/NotFound/NotFound';


export const appRoutes = [
  {
    path: '/',
    element: <Navigate to = "/app/overall" />,
  },
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      {path: 'overall', element: <ScoreCard category={'overall'}/>},
      {path: 'attack', element: <ScoreCard category={'attack'}/>},
      {path: 'defence', element: <ScoreCard category={'defence'}/>},
      {path: 'magic', element: <ScoreCard category={'magic'}/>},
      {path: 'cooking', element: <ScoreCard category={'cooking'}/>},
      {path: 'crafting', element: <ScoreCard category={'crafting'}/>},
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
