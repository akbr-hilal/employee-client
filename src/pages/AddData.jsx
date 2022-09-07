import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react'
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { API } from '../api';
import { listCountry } from '../data/listCountry';


function AddData() {
  let navigate = useNavigate()

  const handleCancel= () => {
    navigate("/")
  }

  const [validated, setValidated] = useState(false);
  const [errMessage, setErrMessage] = useState(null)
  const [form, setForm] = useState({
    nik: "",
    fullName: "",
    birthDay: "",
    gender: "",
    address: "",
    country: ""
  })

  const { nik, fullName, birthDay, address, country } = form;

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  // console.log(form)

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault()

      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      }

      const formData = new FormData()
      formData.set("nik", form.nik)
      formData.set("fullName", form.fullName)
      formData.set("birthDay", form.birthDay)
      formData.set("gender", form.gender)
      formData.set("address", form.address)
      formData.set("country", form.country)

      const alert = (
        <Alert variant='success' className='my-1'>
          Add data success
        </Alert>
      )

      setErrMessage(alert)
      
      const res = await API.post("/employees", formData, config)
      console.log(res)
      navigate("/")
    } catch (error) {
      console.log(error)
      const alert = (
        <Alert variant='danger' className='my-1'>
          Add data Failed
        </Alert>
      )
      setErrMessage(alert)
    }
  })
  return (
    <div className="container">
      <h1 className="fw-bold text-center">Add Data</h1>
      {errMessage && errMessage}
      <div className="d-flex justify-content-center">
        <form onSubmit={(e) => handleSubmit.mutate(e)} style={{ width: "500px" }} className="needs-validation">
          <div className="mb-3">
            <label htmlFor="nik">NIK</label>
            <input type="number" name="nik" id="nik" className='form-control col-12' value={nik} onChange={handleChange} required/>
            <div class="invalid-tooltip">
              Silakan masukkan NIK.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="fullName">Nama Lengkap</label>
            <div className="input-group has-validation">
              <input type="text" name="fullName" id="fullName" className='form-control col-12' value={fullName} onChange={handleChange} required/>
              <div class="invalid-tooltip">
                Silakan masukkan Nama Lengkap.
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="gender">Jenis Kelamin</label>
            <div>
              <input type="radio" className='form-check-input' name="gender" id="gender-male" value="Laki-laki" onChange={handleChange} /> 
              <label htmlFor="gender-male" className="ms-1"> Laki-laki </label>
              <input type="radio" className='form-check-input ms-4' name="gender" id="gender-female" value="Perempuan" onChange={handleChange} />
              <label htmlFor="gender-female" className="ms-1"> Perempuan </label>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="birthDay">Tanggal Lahir</label>
            <input type="date" name="birthDay" id="birthDay" className='form-control' value={birthDay} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="address">Alamat Lengkap</label>
            <textarea name="address" id="address" rows={3} className="form-control" onChange={handleChange} value={address}></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="country">Negara</label>
            <select name="country" id="country" onChange={handleChange} value={country} className='form-select'>
              <option value="" selected hidden > Pilih Negara </option>
              {listCountry.map(item => (
                <option value={item.name} key={item.code}>{item.name}</option>
              ))}
            </select>
          </div>
          <div>
            <button type="submit" className="btn btn-primary">Submit</button>
            <button className="btn btn-warning ms-2" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
    
  )
}

export default AddData