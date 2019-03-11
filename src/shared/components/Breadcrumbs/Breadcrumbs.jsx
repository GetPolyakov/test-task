import React from 'react'
import { Link, Route } from 'react-router-dom'

import './Breadcrumbs.scss'

export const Breadcrumbs = ({ match, ...rest }) => (
    <span className="row">
      <Link to={match.url || ''} className={match.isExact ? 'breadcrumb active' : 'breadcrumb'}>
          {match.url.substr(match.url.lastIndexOf('/')+1, match.url.length)}
      </Link>

      <Route path={`${match.url}/:path`} component={Breadcrumbs} />
  </span>
)
