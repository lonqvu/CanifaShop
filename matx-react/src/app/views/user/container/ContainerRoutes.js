import React, { lazy } from 'react'
import { styled } from '@mui/material'
import Loadable from 'app/components/Loadable/Loadable';
import { Header, Footer } from '../base'

const Home = Loadable(lazy(() => import("./Home")));
const Product = Loadable(lazy(() => import("./Product")));
const Detail = Loadable(lazy(() => import("./Detail")));
const Cart = Loadable(lazy(() => import("./Cart")));
const Profile = Loadable(lazy(() => import("./Profile")));
const Evaluate = Loadable(lazy(() => import("./ProductComment")));


const Root = styled('div')(() => ({
    backgroundColor: 'white',
}));

const Routes = [
    {
        path: '/',
        element: (
            <Root>
                <Header />
                <Home />
                <Footer />
            </Root>
        )
    },
    {
        path: '/category/:categorySeo',
        element: (
            <Root>
                <Header />
                <Product />
                <Footer />
            </Root>
        )
    },
    {
        path: '/detail/:productSeo',
        element: (
            <Root>
                <Header />
                <Detail />
                <Footer />
            </Root>
        )
    },
    {
        path: '/checkout',
        element: (
            <Root>
                <Header />
                <Cart />
                <Footer />
            </Root>
        )
    },
    {
        path: '/profile/:username',
        element: (
            <Root>
                <Header />
                <Profile />
                <Footer />
            </Root>
        )
    },
    {
        path: '/evaluate/:productId',
        element: (
            <Root>
                <Header />
                <Evaluate />
                <Footer />
            </Root>
        )
    },
]

export default Routes;