import axios from 'axios';
import { useEffect, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import { API_URL } from '../../global_api/GlobalApi';

const Category = ({getProductsFromCategory, categoryActive}) => {

    // set stiky sidebar category
    const [stiky, setStiky] = useState(false);
    // state category date
    const [categorys, setCategorys] = useState([]);

    const setStikySidebar = () => {
        if(window.scrollY >= 400) {
            setStiky(true);
            if(window.screen.width <= 1000) {
                setStiky(false);
            }
        } else {
            setStiky(false);
        }
    }

    // style sticky
    const styleStiky = {
        position: 'fixed',
        top: '135px',
        width: '21%'
    }

    const styleSidebar = {
        position: 'relative'
    }

    window.addEventListener('scroll', setStikySidebar);

    // get date categorys
    const getCategorys = async () => {
        await axios.get(`${API_URL}/category`)
        .then(json => {
            const data = json.data.data
            setCategorys(data)
        })
        .catch(err => {
            if (err.name === "AbortError") {
                console.log("fetch aborted.");
            }
        })
    }

    useEffect(() => {
        getCategorys();
    }, [])

    return (
        
            <ListGroup as="ol" style={stiky ? styleStiky : styleSidebar} className='category'>
                <ListGroup.Item
                    as="li"
                    className="d-flex justify-content-center align-items-start bg-secondary"
                >
                    <div className="ms-2">
                        <div className="fw-bold"><h3 className='text-white text-uppercase fw-lighter'>Category</h3></div>
                    </div>
                </ListGroup.Item>
                {
                    categorys.map(category => (
                        <ListGroup.Item
                            key={category.id}
                            as="li"
                            className={ categoryActive == category.id ? "d-flex justify-content-between align-items-start bg-warning rounded" : "d-flex justify-content-between align-items-start" }
                            style={{ cursor: 'pointer' }} 
                            onClick={() => getProductsFromCategory(category.id)}
                            >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{category.c_name}</div>
                            </div>
                            <Badge bg="primary" pill>
                           {
                               category.product.length
                           }
                            </Badge>
                        </ListGroup.Item>
                    ))
                }
               
            </ListGroup>
    )
}

export default Category;