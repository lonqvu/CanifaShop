import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable'

const Statistical = Loadable(lazy(() => import('./Statistical')))

const statisticalRoutes = [
    {
        path: '/staff/statistical',
        element: <Statistical />,
    },
]

export default statisticalRoutes
