import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';

const AppList = Loadable(lazy(() => import("./List")));
const Role = Loadable(lazy(() => import("./UpdateRole")));

const UserRoutes = [
    {
        path: '/admin/user/list',
        element: <AppList />,
    },

    {
        path: '/admin/user/update/:id',
        element: <Role />,
    },
]

export default UserRoutes
