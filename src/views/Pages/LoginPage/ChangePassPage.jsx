import React, { useEffect, useState } from "react";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CLabel
} from "@coreui/react";

import { useDispatch} from "react-redux";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { matchSorter } from "match-sorter";
import { khuCongNghiepService } from "../../../services";
import { commonConstants } from "../../../constants";
import { history } from "../../../helpers";
import { Loading } from "src/components/Loading/loading";

function ChangePassPage() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  let user = JSON.parse(localStorage.getItem("user"));

  const handelDeleteRow =(id) =>
  {
    if (window.confirm('Bạn có muốn xóa thông tin khai báo của: '+id.ho_ten +'?'))
    {
      khuCongNghiepService.deleteKhuCongNghiep(id.id)
      .then((res) => {
        if (res.success) {
          setLoading(false);
        } else {
          setLoading(false);
          alert("Không có dữ liệu");
        }
      });
    } else {
        return false;
    }
  }

  return (
    <div>
      {loading ? ( <Loading />) : (
        <CRow>
          <CCol>
            <CCard>
              <CCardBody>

              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      )}
    </div>
  );
}

export default ChangePassPage;
