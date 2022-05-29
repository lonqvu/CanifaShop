import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';

const AppList = Loadable(lazy(() => import("./List")));
const AppOrderDetail = Loadable(lazy(() => import("./Detail")));
const OrderRoutes = [
    {
        path: '/staff/order/list',
        element: <AppList />,
    },
    {
        path: '/staff/order/detail/:id',
        element: < AppOrderDetail />,
    },
    
]

export default OrderRoutes;
