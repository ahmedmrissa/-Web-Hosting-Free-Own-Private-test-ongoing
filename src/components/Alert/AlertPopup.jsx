import React, { useEffect, useState } from 'react'
import { AlertType } from './alert.actions'
import { useAlert } from './AlertContext'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import {BiErrorCircle} from 'react-icons/bi'

function AlertPopup() {
    const [state, dispatch] = useAlert()

    const [open, setOpen] = useState(false)
    const [alertType, setAlertType] = useState(AlertType.NONE)
    const [message, setMessage] = useState('')
    const [iconColor, setIconColor] = useState('black')



    useEffect(() => {
        const { message, type,iconColor } = state.alertShower
        setAlertType(type)
        setMessage(message)
        setIconColor(iconColor)

        if (type !== AlertType.NONE) setOpen(true)
    }, [state.alertShower])

    const handleClose = () => setOpen(false)
    
  

    return (

        <div className="modal show" style={{ display: 'block', position: 'initial' }}>
            <Modal   size="lg" show={open} backdrop={'static'} centered onHide={()=>{handleClose()}}>
                <Modal.Header closeButton>
                    <Modal.Title><BiErrorCircle size="2em" style={{color:iconColor}}/>{alertType.toUpperCase()}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{message}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClose()}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>

    )
}

export default AlertPopup