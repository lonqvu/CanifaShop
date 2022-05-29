import React from 'react'
import { MatxLayouts2 } from './index'
import { MatxSuspense } from 'app/components'
import useSettings from 'app/hooks/useSettings'

const MatxLayout2 = (props) => {
    const { settings } = useSettings()
    const Layout = MatxLayouts2[settings.activeLayout]

    return (
        <MatxSuspense>
            <Layout {...props} />
        </MatxSuspense>
    )
}

export default MatxLayout2
