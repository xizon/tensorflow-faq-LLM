import React from 'react';
import { createRoot } from 'react-dom/client';

import {
    // IMPORTANT NOTE:  
    // Please do not use `BrowserRouter`, otherwise routing will not be available in the CORE PROGRAM
    HashRouter as Router
} from "react-router-dom";


import RoutesConfig from './router/routes-config';


//
const root = createRoot(
    document.getElementById('root') as HTMLDivElement
);

root.render(
    <React.StrictMode>

        <Router>
            <RoutesConfig />
        </Router>

    </React.StrictMode>
);