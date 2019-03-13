import React from 'react';
import { Route } from 'react-router-dom'

import { Breadcrumbs } from '../../../shared/components/Breadcrumbs/Breadcrumbs'

export const DiscNavbar = (props) => {
    return (
        <nav className='disc-navbar'>
            <div className="container-fluid breadcrumbs d-flex">
               <Route path='/:path' component={Breadcrumbs} />
           </div>
        </nav>
    );
};
