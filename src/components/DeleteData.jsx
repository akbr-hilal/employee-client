import React from 'react'
import { Modal, Button } from 'react-bootstrap'

function DeleteData({ show, handleClose, setConfirmDelete }) {
  const handleDelete = () => {
    setConfirmDelete(true)
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body>
        <h2 className='fw-bold text-center'>Delete Data</h2>
        <h5 className='text-center'>Are you sure to delete this data ?</h5>
        <hr />
        <div className='mt-3 text-center'>
          <Button onClick={handleDelete} size="sm" className="btn-danger me-2" style={{ width: "132px" }}>Yes</Button>
          <Button onClick={handleClose} size="sm" className="btn-primary" style={{ width: "132px" }}>No</Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default DeleteData