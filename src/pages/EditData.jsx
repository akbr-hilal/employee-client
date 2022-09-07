import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert } from 'react-bootstrap'
import { useMutation } from '@tanstack/react-query'

import { API } from '../api'
import { listCountry } from '../data/listCountry';

function EditData() {
  let navigate = useNavigate()
  let { id } = useParams()

  const [errMessage, setErrMessage] = useState(null)
  const [employees, setEmployees] = useState({})
  const [form, setForm] = useState({
    nik: "",
    fullName: "",
    birthDay: "",
    gender: "",
    address: "",
    country: ""
  })

  let getData = async () => {
    const res =  await API.get("/employees/" + id)
    setEmployees(res.data)
    setForm({
      ...form,
      nik: res.data.nik,
      fullName: res.data.fullName,
      birthDay: res.data.birthDay,
      gender: res.data.gender,
      address: res.data.address,
      country: res.data.country
    })
  }

  useEffect(() => {
    getData()
  },[])

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault()

      const config = {
        headers: {
          "Content-Type": "multipart/form-data"
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
      
      const res = await API.patch(`/employees/${employees.id}` , formData, config)
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

  const handleBack = () => {
    navigate("/")
  }
  return (
    <div className="container">
      <h1 className="fw-bold text-center">Edit Data</h1>
      {errMessage && errMessage}
      <div className="d-flex justify-content-center">
        <form style={{ width: "500px" }} onSubmit={e => handleSubmit.mutate(e)}>
          <div className="mb-3">
            <label htmlFor="nik">NIK</label>
            <input 
              name='nik'
              id='nik'
              type="text"  
              value={form?.nik}
              onChange={handleChange} 
              className='form-control' 
              readOnly
              disabled
            />
          </div>
          <div className="mb-3">
            <label htmlFor="fullName">Nama Lengkap</label>
            <input 
              name='fullName'
              id='fullname'
              type="text"  
              value={form?.fullName} 
              className='form-control'
              onChange={handleChange} 
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="gender">Jenis Kelamin</label>
            <div>
              <input 
                type="radio" 
                name="gender"
                id="gender" 
                className='form-check-input'
                checked={form?.gender === "Laki-laki"} 
                value="Laki-laki" 
                onChange={handleChange}
              />
              <label htmlFor="gender-male" className="ms-1"> Laki-laki </label>
              <input 
                type="radio" 
                name="gender" 
                id="gender" 
                className='form-check-input ms-4'
                checked={form?.gender === "Perempuan"} 
                value="Perempuan" 
                onChange={handleChange}
              />
              <label htmlFor="gender-male" className="ms-1"> Perempuan </label>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="birthDay">Tanggal Lahir</label>
            <input 
              type="date" 
              name="birthDay" 
              id="birthDay" 
              value={form?.birthDay}
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address">Alamat Lengkap</label>
            <textarea 
              name="address"
              id="address"
              value={form?.address}
              rows={3}
              className="form-control"
              onChange={handleChange}
            ></textarea>

          </div>
          <div className="mb-3">
            <label htmlFor="country">Negara</label>
            <select 
              name="country" 
              id="country" 
              value={form?.country} 
              className='form-select'
              onChange={handleChange}
            >
              <option value="" selected hidden>Pilih Negara</option>
              {listCountry.map(item => (
                <option value={item.name} key={item.code}>{item.name}</option>
              ))}
            </select>
          </div>
          <div>
            <button className="btn btn-primary" type='submit'>Edit Data</button>
            <button className="btn btn-warning ms-2" onClick={handleBack}>Back</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditData