import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { API } from '../api'
import { listCountry } from '../data/listCountry';

function DetailData() {
  let navigate = useNavigate()

  let { id } = useParams()

  let {data: employees} = useQuery(['employeeCache'], async() => {
    try {
      const response = await API.get('/employees/' + id)
      return response.data
    } catch (error) {
      console.log(error)
    }
  })


  const handleBack = (e) => {
    e.preventDefault()
    navigate("/")
  }
  return (
    <div className="container">
      <h1 className="fw-bold text-center">Detail Data</h1>
      <div className="d-flex justify-content-center">
        <form style={{ width: "500px" }}>
          <div className="mb-3">
            <label htmlFor="nik">NIK</label>
            <input 
              type="text" 
              readOnly 
              value={employees?.nik} 
              className='form-control' 
              disabled
            />
          </div>
          <div className="mb-3">
            <label htmlFor="fullName">Nama Lengkap</label>
            <input 
              type="text" 
              readOnly 
              value={employees?.fullName} 
              className='form-control' 
              disabled
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
                checked={employees?.gender === "Laki-laki"} 
                value="Laki-laki" 
                readOnly
                disabled
              />
              <label htmlFor="gender-male" className="ms-1"> Laki-laki </label>
              <input 
                type="radio" 
                name="gender" 
                id="gender" 
                className='form-check-input ms-4'
                checked={employees?.gender === "Perempuan"} 
                value="Perempuan" 
                readOnly
                disabled
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
              value={employees?.birthDay}
              className="form-control"
              readOnly
              disabled
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address">Alamat Lengkap</label>
            <textarea 
              name="address"
              id="address"
              value={employees?.address}
              rows={3}
              className="form-control"
              readOnly
              disabled
            ></textarea>

          </div>
          <div className="mb-3">
            <label htmlFor="country">Negara</label>
            <select name="country" id="country" value={employees?.country} className='form-select' disabled>
              <option value="" selected>Pilih Negara</option>
              {listCountry.map(item => (
                <option value={item.value} key={item.key}>{item.value}</option>
              ))}
            </select>
          </div>
          <div>
            <button className="btn btn-primary" onClick={handleBack}>Back</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default DetailData


