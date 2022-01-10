import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Controls from "../../../components/Controls/Controls";
import {
    CButton,
    CCardBody,
    CForm,
    CModal,
    CModalBody,
    CModalHeader,
    CModalTitle,
    CCol,
    CFormGroup,
    CInputRadio,
    CLabel,
} from "@coreui/react";
import { userService } from "src/services";

function ModalInsert(props) {
    const {keyForEdit, propShow, propOnClose } = props;
    // form validation rules
    const validationSchema = Yup.object().shape({
        username: Yup.string().required("Vui lòng nhập tên người dùng"),
        password: Yup.string().required("Vui lòng nhập mật khẩu"),
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, errors } = useForm({
        resolver: yupResolver(validationSchema),
    });

    useEffect(() => {
        console.log(keyForEdit);
        if (!keyForEdit) {
            reset({});
        } else {
            async function getUserById(){
                return await userService.getUserById(keyForEdit);
            }
            getUserById().then(data => {
                // console.log(username, password);
                setValue('username', data.username);
                setValue('password', data.password);
            })
        }
    }, [keyForEdit]);

    

    function onSubmit(data) {
        console.log(keyForEdit);
        return !keyForEdit ? createRecord(data) : updateRecord(keyForEdit, data);
    }

    function createRecord(data) {
        console.log('create', data);
        userService.createUser(data).then(data => {
            console.log(data);
        });
    }

    function updateRecord(id, data) {
        console.log('update', id, data);
        userService.updateUser(id, data).then(data => {
            console.log('updated');
        })
    }

    function setValueForm(){
        
    }

    return (
        <CModal
            show={propShow}
            closeOnBackdrop={false}
            onClose={propOnClose}
            size="lg"
        >
            <CModalHeader closeButton>
                <CModalTitle>{keyForEdit === 0 ? "Thêm mới" : "Cập nhật"} </CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CCardBody className="pt-0 pb-0">
                    <CForm onSubmit={handleSubmit(onSubmit)}>
                        <CFormGroup row className="my-0">
                            <CCol xs="12" lg="6">
                                <Controls.Input
                                    label="Tên người dùng"
                                    name="username"
                                    type="text"
                                    register={register}
                                    error={errors.username}
                                />
                            </CCol>
                            <CCol xs="12" lg="6">
                                <Controls.Input
                                    label="Mật khẩu"
                                    name="password"
                                    type="text"
                                    register={register}
                                    error={errors.password}
                                />
                            </CCol>
                        </CFormGroup>
                        <div className="form-actions float-right">
                            <CButton type="submit" color="success" className="mr-2">
                                Lưu
                            </CButton>
                            <CButton color="secondary" onClick={propOnClose}>
                                Thoát
                            </CButton>
                        </div>
                    </CForm>
                </CCardBody>
            </CModalBody>
        </CModal>
    );
}


export default React.memo(ModalInsert);