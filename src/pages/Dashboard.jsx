import { useMutation } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";

import { API } from "../api";
import DeleteData from "../components/DeleteData";

function Dashboard() {
  let navigate = useNavigate();

  const handleAdd = () => {
    navigate("/add-data");
  };

  const [errMessage, setErrMessage] = useState(null);

  // Get Data
  const [employees, setEmployees] = useState([]);

  // set search query to empty string
  const [q, setQ] = useState("");

  const [searchParam] = useState(["nik", "fullName"]);

  let getEmployee = async () => {
    const res = await API.get("/employees");
    setEmployees(res.data);
  };

  useEffect(() => {
    getEmployee();
  }, []);

  const data = Object.values(employees);

  function search(items) {
    return items.filter((item) => {
      return searchParam.some((newItem) => {
        return (
          item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
        );
      });
    });
  }

  const handleDetail = (item) => {
    navigate("/employee/" + item);
  };

  const handleEdit = (item) => {
    navigate("/edit-employee/" + item);
  };

  // Show modal delete
  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const handleShowDelete = () => setShowDelete(true);
  const handleCloseDelete = () => setShowDelete(false);

  const handleDelete = (id) => {
    setIdDelete(id);
    handleShowDelete();
  };

  // variable delete
  const deleteById = useMutation(async (id) => {
    try {
      const res = await API.delete(`/employees/${id}`);
      console.log(res);
      const alert = (
        <Alert variant="success" className="my-1">
          Delete data Success. Please reload your browser
        </Alert>
      );
      setErrMessage(alert);

      navigate("/");
    } catch (error) {
      console.log(error);
      const alert = (
        <Alert variant="danger" className="my-1">
          Delete data Failed
        </Alert>
      );
      setErrMessage(alert);
    }
  });

  useEffect(() => {
    if (confirmDelete) {
      deleteById.mutate(idDelete);
      setConfirmDelete(null);
      handleCloseDelete();
      window.location.reload(false);
    }
  }, [confirmDelete]);

  return (
    <div className="container">
      {/* Title */}
      <h3>Aplikasi data pribadi</h3>
      {/* Search */}
      <div style={{ width: "30%" }}>
        <label htmlFor="nik" className="fw-bold">
          Search NIK or Name
        </label>
        <input
          type="search"
          placeholder="Search NIK or Name"
          id="nik"
          className="form-control"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      {/* Action */}
      <div className="my-3 d-flex justify-content-end">
        <button className="btn btn-primary" onClick={handleAdd}>
          Add Data
        </button>
      </div>

      {/* Table */}
      {errMessage && errMessage}
      <table className="table table-striped table-bordered">
        <thead>
          <tr className="text-center table-primary">
            <th width="10px">No</th>
            <th width="100px">NIK</th>
            <th width="150px">Nama</th>
            <th width="120px">Tanggal Lahir</th>
            <th width="120px">Jenis Kelamin</th>
            <th>Alamat</th>
            <th width="50px">Negara</th>
            <th width="218px">Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            <>
              {search(data).length > 0 ? (
                <>
                  {search(data).map((item, index) => (
                    <tr className="align-middle" key={item.id}>
                      <td className="text-center">{index + 1}</td>
                      <td>{item.nik}</td>
                      <td>{item.fullName}</td>
                      <td>{item.birthDay}</td>
                      <td>{item.gender}</td>
                      <td>{item.address}</td>
                      <td>{item.country}</td>
                      <td>
                        <button
                          className="btn btn-primary me-1"
                          onClick={() => handleDetail(item.id)}
                        >
                          Detail
                        </button>
                        <button
                          className="btn btn-success me-1"
                          onClick={() => handleEdit(item.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <tr className="text-center fw-bold">
                  <td colSpan={9}>No Data Employee</td>
                </tr>
              )}
            </>
          ) : (
            <tr className="text-center fw-bold">
              <td colSpan={9}>No Data Employee</td>
            </tr>
          )}
        </tbody>
      </table>
      <DeleteData
        show={showDelete}
        setConfirmDelete={setConfirmDelete}
        handleClose={handleCloseDelete}
      />
    </div>
  );
}

export default Dashboard;
