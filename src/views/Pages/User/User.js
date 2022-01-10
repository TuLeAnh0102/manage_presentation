import React, { useEffect, useState } from "react";
import {
    CBadge,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CButton,
    CRow,
    CLabel,
    CFormGroup,
    CSelect,
} from "@coreui/react";
import { Loading } from 'src/components/Loading/loading';
import { userService } from 'src/services/user.service';
import CIcon from "@coreui/icons-react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { history } from 'src/helpers';
import ModalInsert from './Modal';

const styles = {
    textAlign: "center"
}

const styleStatusActive = {
    border: "1px solid",
    // width: "fit-content",
    padding: "inherit",
    borderRadius: "5px",
    fontWeight: "bold",
    textAlign: "center",
    color: "green"
    // color: "#124543",
    // backgroundColor: "rgba(255, 255, 255, 123)"
}

const styleStatusInactive = {
    border: "1px solid",
    // width: "fit-content",
    padding: "inherit",
    borderRadius: "5px",
    fontWeight: "bold",
    textAlign: "center",
    color: "red"
}

const stylesBtn = {
    cursor: "pointer",
    border: "1px solid"
}
function User() {
    const [rows, setrows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isOpenModal, setisOpenModal] = useState(false);
    const [data, setdata] = useState({});
    const [keyForEdit, setkeyForEdit] = useState(0)

    const loadData = async () => {
        setLoading(true);
        const users = await userService.getAllUser();
        console.log(users.user);
        setrows(users.user);
        setLoading(false);
    }

    useEffect(() => {
        loadData();
    }, [])

    const Add_Edit_Row = async (id) => {
        console.log(id);
        setkeyForEdit(id);
        setisOpenModal(true);
    }

    const handelBlockUser = async (id) => {
        // console.log(id);



    }

    const propOnClose = () => {
        setisOpenModal(false);
    }

    return (
        <div>
            {loading ? (<Loading />) : (
                <CRow>
                    <CCol>
                        <CCard>
                            <CCardHeader>
                                <b>DANH SÁCH TÀI KHOẢN
                                    <div className="card-header-actions">
                                        <CButton
                                            color="info"
                                            onClick={() => Add_Edit_Row(0)}
                                            className="mr-1"
                                        >
                                            Thêm mới
                                        </CButton>

                                    </div>
                                </b>
                                <ModalInsert

                                    propOnClose={propOnClose}
                                    keyForEdit={keyForEdit}
                                    propShow={isOpenModal} />
                            </CCardHeader>

                            <CCardBody>
                                {loading && <em>Loading users...</em>}
                                {rows && (
                                    <ReactTable
                                        data={rows}
                                        previousText="Previous"
                                        nextText="Next"
                                        loadingText="Loading..."
                                        noDataText="No rows found"
                                        pageText="Trang"
                                        ofText="của"
                                        rowsText="dòng"

                                        defaultFilterMethod={(filter, row) =>
                                            String(row[filter.id]) === filter.value
                                        }
                                        columns={[
                                            {
                                                Header: "id",
                                                id: "id",
                                                accessor: (c) => c.id,
                                                Cell: (props) => (
                                                    <div style={styles}>
                                                        {props.original.id}
                                                    </div>
                                                )
                                            },
                                            {
                                                Header: "Tên tài khoản",
                                                id: "username",
                                                accessor: (c) => c.username,
                                                Cell: (props) => (
                                                    <div style={styles}>
                                                        {props.original.username}
                                                    </div>
                                                )
                                            },
                                            {
                                                Header: "Trạng thái",
                                                id: "isDelete",
                                                accessor: (c) => c.isDelete,
                                                Cell: (props) => (
                                                    <div style={props.original.isDelete ? styleStatusInactive : styleStatusActive}>
                                                        {props.original.isDelete ? "inActive" : "Active"}
                                                    </div>
                                                ),
                                                width: 100
                                            },

                                            {
                                                Header: "Thao tác",
                                                filterable: false,
                                                accessor: "id",
                                                width: 250,
                                                Cell: (props) => (
                                                    <div style={styles}>
                                                        <CButton
                                                            title="Khóa tài khoản"
                                                            style={stylesBtn}
                                                            onClick={() => handelBlockUser(props.original.id)}
                                                        >
                                                            <CIcon size="lg" name="cil-lock-locked" />
                                                        </CButton>
                                                        {"  "}
                                                        <CButton
                                                            title="Đổi mật khẩu"
                                                            style={stylesBtn}
                                                            onClick={() => Add_Edit_Row(props.original.id)}
                                                        >
                                                            <CIcon size="lg" name="cil-brush" />
                                                        </CButton>
                                                    </div>
                                                ),
                                            },
                                        ]}
                                        defaultPageSize={10}
                                        className="-striped -highlight"
                                    />
                                )}
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            )}
        </div>
    );
}

export default User;
