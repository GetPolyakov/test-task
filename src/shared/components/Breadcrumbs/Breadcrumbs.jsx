import React from 'react'
import { NavLink, Route } from 'react-router-dom'

import './Breadcrumbs.scss'

export const Breadcrumbs = ({ match, ...rest }) => (
    <span className="row">
      <NavLink to={match.url || ''} exact className='breadcrumb' activeClassName="breadcrumb active">
          {match.url.substr(match.url.lastIndexOf('/') + 1, match.url.length)}
      </NavLink>

      <Route path={`${match.url}/:path`} component={Breadcrumbs} />
  </span>
)
