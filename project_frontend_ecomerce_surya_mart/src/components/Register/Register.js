// import react hook
import React, {useState} from 'react';
// import component modal
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
// import api url
import { API_URL } from '../../global_api/GlobalApi';
import axios from 'axios';

// import sweetalert
import swal from 'sweetalert';

const Register = (props) => {
        
  // define modal
  const [modalShow, setModalShow] = useState(false);

  //define state from data
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

//   define validation
  const [validation, setValidation] = useState([]);


//   handle Method form
    const handleRegister= async (e) => {
        // set remove default from element
        e.preventDefault();

        // initialize formData //method bawaan agar mempermudah kita dalam mengelompokan data sebelum dikirimkan ke dalam server.
        const formData = new FormData();

        // append data to formData //append(key, state)
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('password_confirmation', passwordConfirmation);

        // send data to server //await = tidak perlu menunggu kode selesai dieksekusi //post(url, data)
        await axios.post(`${API_URL}/register`, formData)
            .then(() => {
                // set input empty
                setUsername('');
                setEmail('');
                setPassword('');
                setPasswordConfirmation('');

                 // alert success
                swal({
                    title: "Register Success",
                    text: "You clicked the button!",
                    icon: "success",
                });
                
            })
            .catch((error) => {
                //assign error to state "validation"
                setValidation(error.response.data);
            })
    };

  return (
    <>
        <div className='register'>
            <h5 onClick={() => setModalShow(true)} className="btn-register btn btn-outline-warning text-primary fw-bold shadow">Register</h5>
        </div>
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={modalShow}
            onHide={() => setModalShow(false)}
            >
            <Modal.Header closeButton className='bg-warning'>
                <Modal.Title className='mx-auto text-primary text-uppercase fw-lighter' id="contained-modal-title-vcenter">
                Register System
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
            <Form onSubmit={ handleRegister }>
                <div className='row'>
                <Form.Group className="mb-3 col-md-6 col-sm-auto" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <Form.Text className="text-muted">
                        Username Yang Valid
                    </Form.Text>
                    {
                        validation.username && (
                            <div className="alert alert-danger">
                                {validation.username[0]}
                            </div>
                        )
                    }
                </Form.Group>

                <Form.Group className="mb-3 col-md-6 col-sm-auto" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
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
                </div>
                
                <div className='row'>
                <Form.Group className="mb-3 col-md-6 col-sm-auto" controlId="formBasicPassword">
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

                <Form.Group className="mb-3 col-md-6 col-sm-auto" controlId="formBasicPassword">
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
                    <Form.Text className="text-muted">
                        Confirmation password
                    </Form.Text>
                </Form.Group>
                </div>

                {/* menambahkan onClick dan onSubmit saat post data */}
                <Button variant="primary" type="submit" onClick={ handleRegister }>
                    Register
                </Button>
            </Form>
            </Modal.Body>
        </Modal>
    </>
  );
}


export default Register;