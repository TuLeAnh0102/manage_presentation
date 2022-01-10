import React, { useEffect, useState } from "react";
import { CFormGroup, CLabel } from "@coreui/react";

export default function Select(props) {

  useEffect(() => {

  });

  const {
    name,
    label,
    register,
    onChange,
    error = null,
    options,
    idDefault,
  } = props;

  return (
    <CFormGroup className="form-group">
      <CLabel htmlFor={name}>{label}</CLabel>
      <div class='input-group date' id='datetimepicker1'>
        <input type='text' class="form-control" onChange ={onChange}/>
          <span class="input-group-addon">
            <span class="glyphicon glyphicon-calendar"></span>
          </span>
        </div>
      <div className="invalid-feedback">{error?.message}</div>
    </CFormGroup>
  );
}
