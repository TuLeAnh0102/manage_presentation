import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    CHeader,
    CToggler,
    CHeaderBrand,
    CHeaderNav,
    CSidebarBrand
} from '@coreui/react'

import {
    TheHeaderDropdown,
} from './index'
import { commonConstants } from "../constants/common.constants.js";

// routes config
import routes from '../routes'

const styleHeader = {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    backgroundImage: `url('https://binhphuoc.gov.vn/themes/binhphuoc/images/logo-bg.png')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
}
const styleBrand = {
    width: '100%',
    textAlign: 'center',
}

const TheNewHeader = () => {
    const dispatch = useDispatch();
    const sidebarShow = useSelector(state => state.common.sidebarShow);
    const isLoggin = useSelector(state => state.authentication.loggedIn);
    // useEffect(() => {
    //   console.log('isLoggin',isLoggin);
    // }, [isLoggin])

    const toggleSidebar = () => {
        const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
        dispatch({ type: commonConstants.SIDEBAR_SHOW, sidebarShow: val })
    }

    const toggleSidebarMobile = () => {
        const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
        dispatch({ type: commonConstants.SIDEBAR_SHOW, sidebarShow: val })
    }

    return (
        <div id="header">
            <div class="logo" style={styleHeader}>
                <a title="Bình Phước : Cổng thông tin điện tử" href="/vi/">
                    <img src="https://binhphuoc.gov.vn/uploads/binhphuoc/quochuy_1.png" 
                    alt="Bình Phước : Cổng thông tin điện tử"/></a>
            </div>
        </div>
    )
}

export default TheNewHeader
