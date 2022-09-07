import axios from 'axios'

export const API = axios.create({
  baseURL: 'https://server-employee.herokuapp.com/api/v1'
})