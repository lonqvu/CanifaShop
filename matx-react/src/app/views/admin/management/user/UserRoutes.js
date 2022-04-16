import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';

const AppList = Loadable(lazy(() => import("./List")));

const UserRoutes = [
    {
        path: '/admin/user/list',
        element: <AppList />,
    },
]

export default UserRoutes
