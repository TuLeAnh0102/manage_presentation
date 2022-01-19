import React, { useEffect, useState } from "react";
import { Loading } from 'src/components/Loading/loading';
import "react-table-v6/react-table.css";
import { useParams } from "react-router-dom";

import { history } from 'src/helpers';
import SlideshowGallery from 'src/containers/TheSlider'; 
import { managerContentService } from "src/services/managerContent.service";
// const collection = [
//     { src: "https://slider.vnptschool.com.vn/Chart/KetQuaTieuHoc.aspx", caption: "", type: "iframe"},
//     { src: "https://www.w3schools.com/howto/img_mountains_wide.jpg", caption: "Caption one", type: "image"},
//     { src: "https://www.w3schools.com/howto/img_snow_wide.jpg", caption: "Caption two", type: "image"},
//     { src: "", caption: "", type: "text", data: "<ol><li>Trực (quy định 24h)</li></ol><ul><li>Trực ngày thường, t7, cn thì nghỉ 1 ngày</li><li>Trực ngày lễ thì được nghỉ 2&nbsp;</li><li>Trực ngày thường, t7, cn thì nghỉ 1 ngày</li><li>Trực ngày lễ thì được nghỉ 2&nbsp;</li><li>Trực ngày thường, t7, cn thì nghỉ 1 ngày</li><li>Trực ngày lễ thì được nghỉ 2&nbsp;</li><li>Trực ngày thường, t7, cn thì nghỉ 1 ngày</li><li>Trực ngày lễ thì được nghỉ 2&nbsp;</li><li>Trực ngày thường, t7, cn thì nghỉ 1 ngày</li><li>Trực ngày lễ thì được nghỉ 2&nbsp;</li></ul>"},
//     { src: "", caption: "", type: "text", data: "<figure class=\"table\"><table><tbody><tr><td>thứ 2</td><td>thứ 3</td><td>thứ 4</td><td>thứ 5</td><td>thứ 6</td></tr><tr><td>A</td><td>B</td><td>C</td><td>D</td><td>E</td></tr></tbody></table></figure>"}
// ];

function SlideShow(props) {
    // functions to build form returned by useForm() hook
    const { id } = useParams();
    const initState = {
        id: id,
        title: "",
        description: ""
    }
    const [loading, setLoading] = useState(false);
    const [collection, setCollection] = useState([]);
    const [timeout, setTimeout] = useState([]);

    useEffect(() => {
        loadData();
    }, [])

    const loadData = () => {
        managerContentService.getAllByUserId('61e7670a6f2569d64f2b2074').then(response => {
            // changeTimeout(response);
            setCollection(response['data']);
            // console.log(response);
        });
    }

    const changeTimeout = (e) => {
        // setTimeout(e.map(({ time_interval }) => time_interval));
        //console.log(e.target.value);
        // return e.target.value;
    }
    return (
        <div>
            {loading ? (<Loading />) : (
                <div className="c-app c-default-layout">
                    
                    <div className="c-wrapper">
                        {/* <TheNewHeader/> */}
                        <div className="c-body">
                            <SlideshowGallery
                                input={collection}
                                ratio={`4:3`}
                                mode={`automatic`}
                                timeout={timeout}
                            />
                        </div>
                    </div>
                </div>

            )}
        </div>
    );
}

export default SlideShow;
