import React, { lazy, Suspense } from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

const Home = lazy(()=>import('./pages/Home'))
const Dash = lazy(()=>import('./pages/Dash'))
const Upload = lazy(()=>import('./pages/Upload'))

export default function AppRoute() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: (<Suspense fallback={(<>Loading</>)}><Home /></Suspense>),
            errorElement: <div>Error occurred</div>
        },
        {
            path: '/dashboard',
            element: (<Suspense fallback={(<>Loading....</>)}><Dash /></Suspense>),
            errorElement: <div>Error occurred loading dashboard page</div>
        },
        {
            path: '/upload',
            element: (<Suspense fallback={(<>Loading....</>)}><Upload /></Suspense>),
            errorElement: <div>Error occurred loading page</div>
        }
    ])
  return (
    <RouterProvider router={router} />
  )
}
