import axios from 'axios';
import { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { BsFillPersonFill } from "react-icons/bs";
import { API_URL } from '../../global_api/GlobalApi';

const Profil = () => {

    const [user, setUser] = useState({});

    // get token from localStorage
    const token = localStorage.getItem('token');

    // get user to api
    const getData = async () => {

        // set axios header dengan type Authorization + Bearer token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // get user form rest api
        await axios.get(`${API_URL}/users`)
            .then((response) => {
                //set response user to state
                setUser(response.data);
            })
    }



    // handle logout system
    const handleLogout = async () => {
         // set axios header dengan type Authorization + Bearer token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // post api logout
        await axios.post(`${API_URL}/logout`)
            .then(() => {
                // remove token
                localStorage.removeItem('token');
                // reload page
                window.location.reload();
            });
    }

    useEffect(() => {
        getData();
    }, [])


    return (
        <>
            <div className="dropdown">
                <button className="btn btn-warning btn-sm dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    <BsFillPersonFill className='text-white' />
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><p className="dropdown-item">
                        {
                            // jika user not empty
                            (user.id !== undefined) && <Dropdown.Item >{`Username: ${ user.username }`}</Dropdown.Item>
                        }
                    </p></li>
                    <div className='btn d-flex gap-2'>
                        <li><p className="dropdown-item">
                                {
                                    // jika user not empty
                                    (user.id !== undefined) && <Dropdown.Item onClick={ handleLogout }>Logout</Dropdown.Item> 
                                }
                             </p>
                        </li>
                        <li><p className="dropdown-item">More</p></li>
                    </div>
                </ul>
            </div>
        </>
    )
}

export default Profil;