import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import { CCol, CLabel } from "@coreui/react";
import { Controller } from "react-hook-form";
const styleRequire = {
    color: "#FF0000",
    marginLeft: "2px",
}
export default function SelectTrNoLabel({ placeholder, dataOptions, handelOnChange, nameselect, setValueDefault, labelRequired, labelSelect }) {
    const [valuehientai, setvaluehientai] = useState('');
    useEffect(() => {
        if (setValueDefault != null && setValueDefault != '') {
            setvaluehientai(setValueDefault)
        }
    }, [setValueDefault])
    const handleOnSelectChange = (e, item) => {
        setvaluehientai(e);
        // console.log(e, item);
        handelOnChange(e);
    }
    const noOptionsMessage = () => {
        return "Không có dữ liệu!"
    }
    const colourStyles = {
        placeholder: (defaultStyles) => {
            return {
                ...defaultStyles,
                color: '#000000',
                fontStyle: 'italic'
            }
        }
    }
    return (

        <Select
            placeholder={placeholder}
            noOptionsMessage={noOptionsMessage}
            name={nameselect}
            value={valuehientai}
            options={dataOptions}
            onChange={handleOnSelectChange}
            styles={colourStyles}
        />

    )
}
