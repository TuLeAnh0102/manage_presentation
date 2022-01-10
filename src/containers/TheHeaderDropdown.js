import React from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useDispatch } from 'react-redux'
import { userAction } from '../actions'
import { MdDelete, MdModeEdit, MdExitToApp, MdEdit } from 'react-icons/md';
import logo from 'src/assets/img/avatars/default.png'

const TheHeaderDropdown = () => {
  const dispatch = useDispatch();
  let user = JSON.parse(localStorage.getItem("user"));
  const onClick = (e) => {
    dispatch(userAction.logout());
  }
  const onClickRsPassword = (e) => {
    alert("Chức năng chưa phát triển!")
  }
  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <span style={{ fontWeight: 'bold', marginRight: '5px', fontStyle: 'italic', color:'#696969' }}>{user?.ten_chot}</span>
        <div className="c-avatar">

          <CImg
            src={logo}
            className="c-avatar-img"
            alt=""
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        {/* <CDropdownItem
          header
          tag="div"
          color="primary"
          className="text-center"
        >
          <strong>Tài khoản</strong>
        </CDropdownItem> */}
        {/* <CDropdownItem>
          <CIcon name="cil-bell" className="mfe-2" />
          Updates
          <CBadge color="info" className="mfs-auto">42</CBadge>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-envelope-open" className="mfe-2" />
          Messages
          <CBadge color="success" className="mfs-auto">42</CBadge>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-task" className="mfe-2" />
          Tasks
          <CBadge color="danger" className="mfs-auto">42</CBadge>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-comment-square" className="mfe-2" />
          Comments
          <CBadge color="warning" className="mfs-auto">42</CBadge>
        </CDropdownItem>
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Settings</strong>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-user" className="mfe-2" />Profile
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-settings" className="mfe-2" />
          Settings
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-credit-card" className="mfe-2" />
          Payments
          <CBadge color="secondary" className="mfs-auto">42</CBadge>
        </CDropdownItem>
        */}
        {/* <CDropdownItem name="reset_password" onClick={onClickRsPassword}>
          <MdEdit />
          <span style={{marginLeft: '5px' }}>Đổi mật khẩu</span>
        </CDropdownItem>
        <CDropdownItem divider /> */}
        <CDropdownItem color="secondary" name="dang_xuat" onClick={onClick}>
          <MdExitToApp />
          <span style={{ fontWeight: 'bold', marginLeft: '5px' }}>Đăng xuất</span>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
