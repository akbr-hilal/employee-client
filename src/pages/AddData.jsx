import React, { useState } from 'react'
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { API } from '../api';
import { listCountry } from '../data/listCountry';
import FormControl from '../components/form/FormControl';


function AddData() {
  let navigate = useNavigate()

  const handleCancel= () => {
    navigate("/")
  }

  const [errMessage, setErrMessage] = useState(null)

  const genderOptions = [
    {
      key: "Laki-laki",
      value: "Laki-laki"
    },
    {
      key: "Perempuan",
      value: "Perempuan"
    }
  ]

  const initialValue = {
    nik: "",
    fullName: "",
    birthDay: "",
    gender: "",
    address: "",
    country: ""
  }
  
  const validationSchema = yup.object({
    nik: yup.string().required("Isikan NIK"),
    fullName: yup.string().required("Isikan Nama Lengkap"),
    birthDay: yup.string(),
    gender: yup.string(),
    address: yup.string(),
    country: yup.string()
  })

  const onSubmit = async (values) => {
    try {

      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      }

      const alert = (
        <Alert variant='success' className='my-1'>
          Add data success
        </Alert>
      )

      setErrMessage(alert)

      const res = await API.post("/employees", values, config)
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
  }

  return (
    <div className='container'>
      <h1 className='fw-bold text-center'>Add Data</h1>
      {errMessage && errMessage}
      <div className='d-flex justify-content-center'>
        <div style={{ width: "500px" }}>
          <Formik
            initialValues={initialValue}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {formik => (
              <Form>
                <FormControl control="input" type="number" label="NIK" name="nik" />
                <FormControl control="input" type="text" label="Nama Lengkap" name="fullName" />
                <FormControl control="radio" label="Jenis Kelamin" name="gender" options={genderOptions} />
                <FormControl control="input" type="date" label="Tanggal Lahir" name="birthDay"/>
                <FormControl control="textarea" label="Alamat Tempat Tinggal" name="address"/>
                <FormControl control="select" label="Negara" name="country" options={listCountry}/>
                <button type="submit" className='btn btn-primary'>Add Data</button>
                <button className='btn btn-danger ms-2' onClick={handleCancel}>Cancel Add</button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default AddData