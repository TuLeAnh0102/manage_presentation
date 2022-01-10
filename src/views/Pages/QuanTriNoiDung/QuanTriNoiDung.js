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
import { managerContentService } from 'src/services/managerContent.service';
import CIcon from "@coreui/icons-react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { history } from 'src/helpers'

const styles = {
  textAlign: "center"
}

const stylesBtn = {
  cursor: "pointer",
  border: "1px solid"
}
function QuanTriNoiDung() {
  const [rows, setrows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState({});
  const [selectedAll, setSelectedAll] = useState(0);

  const loadData = () => {
    setLoading(true);
    managerContentService.getAllContent().then((content) => {
      setrows(content);
      setLoading(false);
    });

  }

  useEffect(() => {
    loadData();
  }, [])

  function toggleRow(id) {
    const newSelected = Object.assign({}, selected);
    // click at old row to set false
    newSelected[id] = !selected[id];
    setSelected(newSelected);
    setSelectedAll(2);
    console.log('checked', id, selected);
  }

  function toggleSelectAll() {
    let newSelected = {};

    if (selectedAll === 0) {
      rows.forEach(x => {
        newSelected[x.ma_cong_nhan] = true;
      });
    }

    setSelected(newSelected);
    setSelectedAll(selectedAll === 0 ? 1 : 0)
    console.log('checkedAll');
  }

  function log(props){
    console.log(props);
  }

  function handelDeleteRow(id){
    let YNQ = window.confirm("Bạn có chắc muốn xóa ?");
    if(YNQ){
      managerContentService.deleteTutorialById(id).then(response => {
        alert("Xoá thành công !!");
        loadData();
      })
    }
    console.log(id);
  }

  function Add_Edit_Row(id){
    history.push("/quan-tri-chi-tiet-noi-dung/" + id);
  }
  
  const Set_Time_Out = () => {
    let t = window.prompt("Cấu hình thời gian", "5");

    // console.log(t);
    localStorage.setItem('time_out', t + "000");
  }
  return (
    <div>
      {loading ? (<Loading />) : (
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader><b>DANH SÁCH NỘI DUNG
                <div className="card-header-actions">
                  <CButton
                    color="info"
                    onClick={() => Add_Edit_Row(0)}
                    className="mr-1"
                  >
                    Thêm mới
                  </CButton>
                  {" "}
                  <CButton
                    color="success"
                    onClick={Set_Time_Out}
                    className="mr-1"
                  >
                    Cấu hình thời gian
                  </CButton>
                </div>  
              </b></CCardHeader>

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
                        Header: "Mã",
                        id: "id",
                        accessor: (c) => c.id,
                        width: 200,
                        Cell: (props) => (
                          <div style={styles}>
                            {props.original.id}
                          </div>
                        )
                      },
                      {
                        Header: "Tiêu đề",
                        id: "tieu-de",
                        accessor: (c) => c.title,
                      },
                      {
                        Header: "Loại nội dung",
                        id: "typeContent",
                        accessor: (c) => c.typeContent,
                      },
                      {
                        Header: "Thao tác",
                        filterable: false,
                        accessor: "id",
                        width: 250,
                        Cell: (props) => (
                          <div style={styles}>
                            <CButton
                              title="Xóa"
                              style={stylesBtn}
                              onClick={() => handelDeleteRow(props.original.id)}
                            >
                              <CIcon size="lg" name="cil-delete" />
                            </CButton>
                            {"  "}
                            <CButton
                              title="Sửa"
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

export default QuanTriNoiDung;
