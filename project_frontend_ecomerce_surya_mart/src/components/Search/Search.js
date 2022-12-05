// import component react-boostrapt
import React, { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';

// icons
import { BsSearch, BsFillXCircleFill } from "react-icons/bs";

const Search = () => {
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(true);

    const handleShow = () => {
        setOpen(!open);
        setShow(false);   
    }

    const handleClose = () => {
        setOpen(!open);
        setShow(true);   
    }

    return (
        <>
            {
                (show) ? <BsSearch
                            onClick={handleShow}
                            aria-controls="input-search"
                            aria-expanded={open}
                            style={{ cursor: 'pointer' }}
                        /> : 
                        <BsFillXCircleFill style={{ cursor: 'pointer' }} onClick={handleClose} />
            }
           
            <Collapse in={open}>
                <div className='input-search position-absolute' id="input-search" style={{ right: '220px', marginBottom: '5px' }}>
                    <input className='px-4 py-2 fs-5 border border-warning text-dark' style={{ height: '33px', width: '300px', outline: 'none' }} type='text' placeholder='search product' />
                </div>
            </Collapse>
        </>
    )
}

export default Search;