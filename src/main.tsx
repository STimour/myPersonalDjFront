import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import './index.css'
import Accueil from './components/Accueil.tsx';
import AddM from './components/AddM.tsx';
import ModifiM from './components/ModifiM.tsx';
import Connexion from './components/Connexion.tsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Connexion /> 
  },
  {
    path: "/accueil",
    element: <Accueil />
  },
  {
    path: "/addMusique",
    element: <AddM />
  },
  {
    path: "/modifierMusique",
    element: <ModifiM />
  }
])
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
