// import modal
import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { API_URL } from '../../global_api/GlobalApi';

// import sweetalert
import swal from 'sweetalert';

export const Login = (props) => {

//  define modal box
const [modalShow, setModalShow] = useState(false);

//   define state email and password
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

// define validation
const [validation, setValidation] = useState([]);

//   define login method
 const handleLogin = async (e) => {
    e.preventDefault();

    // define form data
    const formData = new FormData();

    formData.append('email', email);
    formData.append('password', password);

    // post data to api login
    await axios.post(`${API_URL}/login`, formData)
        .then(response => {
            // set token  from localStorage
            localStorage.setItem('token', response.data.token);
        
            // state empty
            setEmail('');
            setPassword('');
           
            // alert success
            swal({
                title: "Login Success",
                text: "You clicked the button!",
                icon: "success",
              });

            // reload page
            window.location.reload();
           
        })
        .catch((error) => {
            //assign error to state "validation"
            setValidation(error.response.data);
        })

 }

  return (
    <>
        <div className='login'>
            <h5 onClick={() => setModalShow(true)} className="btn-login btn btn-warning text-primary fw-bold shadow">Login</h5>
        </div>
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={modalShow}
            onHide={() => setModalShow(false)}
            >
            <Modal.Header closeButton className='bg-warning'>
                <Modal.Title className='mx-auto text-primary text-uppercase fw-lighter' id="contained-modal-title-vcenter">
                Login System
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    validation.message && (
                        <div className="alert alert-danger">
                            {validation.message}
                        </div>
                    )
                }
            <Form onSubmit={ handleLogin }>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email"  value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Form.Text className="text-muted">
                        Harus Email Yang Valid
                    </Form.Text>
                    {
                        validation.email && (
                            <div className="alert alert-danger">
                                {validation.email[0]}
                            </div>
                        )
                    }
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Form.Text className="text-muted">
                        Password Minimal 8 Karakter
                    </Form.Text>
                    {
                        validation.password && (
                            <div className="alert alert-danger">
                                {validation.password[0]}
                            </div>
                        )
                    }
                </Form.Group>
                {/* menambahkan onClick dan onSubmit saat post data */}
                <Button variant="primary" type="submit" onClick={ handleLogin }>
                    Login
                </Button>
            </Form>
            </Modal.Body>
        </Modal>
    </>
  );
}
