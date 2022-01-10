import React, { useEffect, useState } from "react";
import {
    CFormGroup,
    CLabel,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CButton,
    CRow
} from "@coreui/react";
import { Loading } from 'src/components/Loading/loading';

import "react-table-v6/react-table.css";
import { useParams } from "react-router-dom";

import { CKEditor } from '@ckeditor/ckeditor5-react';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { useForm } from "react-hook-form";
import { history } from 'src/helpers';
import { managerContentService } from "src/services/managerContent.service";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
// import Image from '@ckeditor/ckeditor5-image/src/image';
// import ImageResizeEditing from '@ckeditor/ckeditor5-image/src/imageresize/imageresizeediting';
// import ImageResizeHandles from '@ckeditor/ckeditor5-image/src/imageresize/imageresizehandles';
import config from 'src/configs/config';
const user = JSON.parse(localStorage.getItem('user'));

function ChiTietNoiDung(props) {
    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, errors, control } = useForm({
        // resolver: yupResolver(
        //     loai_di_chuyen ? validationSchemaQuaCanh : validationSchemaGiaoHang
        // ),
    });
    const { id } = useParams();
    const initState = {
        title: "",
        description: "",
        typeContent: "text",
        time_interval: "5",
        id_user: user.user['id']
    }
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState(initState);
    // load data
    const loadData = () => {
        setLoading(true);
        managerContentService.getContentById(id).then((content) => {
            console.log(content);
            setContent(content);
            setLoading(false);
        });
    }

    const content_type = [
        { value: 'text', label: 'text' },
        { value: 'iframe', label: 'iframe' },
        // { value: 'image', label: 'image' }
    ]

    useEffect(() => {
        console.log(user);
        if(id != 0){
            loadData();
        }
    }, [id])

    function save() {
        console.log(content);
        if(id == 0) {
            managerContentService.createContent(content).then(response => {
                if (response.id) {
                    alert('Tạo nội dung thành công !!');
                    history.push('/quan-tri-noi-dung');
                } else {
                    alert('Tạo nội dung không thành công !!');
                }
            })
        }else{
            managerContentService.updateTutorialById(id, content).then(response =>{
                console.log(response);
                alert('Cập nhật thành công !!');
                history.push('/quan-tri-noi-dung');
            })
        }
    }

    function cancel() {
        history.push("/quan-tri-noi-dung");
    }

    return (
        <div>
            {loading ? (<Loading />) : (
                <CRow>
                    <CCol>
                        <CCard>
                            <CCardHeader><b>CHI TIẾT NỘI DUNG</b></CCardHeader>
                            <CCardBody>
                                <div className="container">
                                    <div className="declare-title row">
                                        <div className="title col-lg-6 col-md-6 col-xs-6">
                                            <form>
                                                <div className="form-group">
                                                    <label htmlFor="title">Tiêu đề</label>
                                                    <input type="text" className="form-control" id="title"
                                                        onChange={e => setContent({ ...content, title: e.target.value })} value={content.title} />
                                                </div>

                                            </form>
                                        </div>
                                        <div className="type-content col-lg-3 col-md-3 col-xs-3" >
                                            <div className="form-group">
                                                <label htmlFor="type_content">Loại nội dung</label>
                                                <select className="form-control" id="type_content" onChange={e => setContent({ ...content, typeContent: e.target.value })} value={content.typeContent}>
                                                    {content_type.map((i, index) => {
                                                        return (
                                                            <option key={index} value={i.value}>{i.label}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="type-content col-lg-3 col-md-3 col-xs-3" >
                                            <div className="form-group">
                                                <label htmlFor="time_interval">Thời gian trình chiếu <i>(đơn vị: giây)</i></label>
                                                <input type="text" className="form-control" id="time_interval"
                                                    onChange={e => setContent({ ...content, time_interval: e.target.value })} value={content.time_interval} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="content">
                                        <p>Nội dung</p>
                                        {
                                            content.typeContent === 'text' ? (
                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    config={
                                                        {
                                                            ckfinder: {
                                                                // Upload the images to the server using the CKFinder QuickUpload command
                                                                // You have to change this address to your server that has the ckfinder php connector
                                                                uploadUrl: `${config.apiUrl}/uploads`
                                                            }
                                                        }
                                                    }
                                                    data={(content.description)}
                                                    // data={"<p>xxx</p>"}
                                                    onReady={editor => {
                                                        // console.log(editor.getData());
                                                        // You can store the "editor" and use when it is needed.
                                                        // console.log('Editor is ready to use!', editor);
                                                    }}
                                                    onChange={(event, editor) => {
                                                        const data = editor.getData();
                                                        setContent({ ...content, description: data });
                                                        // console.log('xxxxxxxxxx', editor.excute);
                                                    }}
                                                    onBlur={(event, editor) => {
                                                        console.log('Blur.', editor);
                                                    }}
                                                    onFocus={(event, editor) => {
                                                        console.log('Focus.', editor);
                                                    }}
                                                // config={{
                                                //     extraPlugins: [EasyImage],
                                                // }}
                                                v

                                                />
                                            ) : (

                                                <form>
                                                    <div className="form-group">
                                                        <input type="text" className="form-control"
                                                            onChange={e => setContent({ ...content, description: e.target.value })} value={content.description} />
                                                    </div>

                                                </form>

                                            )
                                        }
                                    </div>
                                    <div>
                                         
                                    </div>
                                    <div className="form-actions float-right" style={{ margin: "1em" }}>
                                        <CButton
                                            type="submit"
                                            color="danger"
                                            value="btnLuu"
                                            className="mr-2"
                                            onClick={() => cancel()}
                                        >
                                            {"Hủy"}
                                        </CButton>

                                        <CButton
                                            type="submit"
                                            color="success"
                                            value="btnLuu"
                                            className="mr-2"
                                            onClick={() => save()}
                                        >
                                            {"Lưu"}
                                        </CButton>
                                    </div>
                                </div>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            )}
        </div>
    );
}

export default ChiTietNoiDung;
