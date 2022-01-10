import React from 'react';
import Select from 'react-select';
import { CFormGroup, CLabel } from "@coreui/react";
const styleRequire = {
    color: "#FF0000",
    marginLeft: "2px",
}
function SelectV1(props){
    const {
        name,
        label,
        register,
        onChange,
        error = null,
        options,
        idDefault,
        labelRequired,
    } = props;

    return (
        <CFormGroup className="form-group">
            <CLabel htmlFor={name}>{label}</CLabel>
            <CLabel style={styleRequire}> {labelRequired}</CLabel>
            <Select
                name={name}
                label={label}
                ref={register}
                value={idDefault}
                onChange={onChange}
                className={`form-control ${error ? "is-invalid" : ""}`}
            >
                <option value="0">Tất cả</option>
                {options.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.title}
                    </option>
                ))}
            </Select>
            <div className="invalid-feedback">{error?.message}</div>
        </CFormGroup>
    );
}

export default SelectV1;