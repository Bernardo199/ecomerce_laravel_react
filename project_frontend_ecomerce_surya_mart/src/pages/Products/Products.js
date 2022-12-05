// import react-icons
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useEffect, useState } from 'react';

import img from '../../assets/img/react.png';
import axios from 'axios';
import { API_URL } from '../../global_api/GlobalApi';

const Products = ({products, productsFromCategory, category, getProductsCart}) => {

    // set stiky product
    const [stiky, setStiky] = useState(false);

    // define token
    const token = localStorage.getItem('token');
    // define user 
    const [user, setUser] = useState({});
     // state counter
    const [qty, setQty] = useState(0);
    // state id
    const [id, setId] = useState(0);

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

    // method handle cart
    const handleCart = async (product_id) => {
        // define form data
        const formData = new FormData();
        formData.append('product_id', product_id);
        formData.append('user_id', user.id);
        formData.append('c_qty', qty);

        // post product to cart
        await axios.post(`${API_URL}/cart`, formData)
            .then(() =>{
                alert('succsess');
                setQty(0);  
                getProductsCart();
            } )
            .catch(err => console.log(err))
    }

    // format rupiah
    const rupiahFormat = (price) => {
        const numb = price;
        const format = numb.toString().split('').reverse().join('');
        const convert = format.match(/\d{1,3}/g);
        const rupiah = 'Rp ' + convert.join('.').split('').reverse().join('');
        return rupiah;
    }


    const setStikyProductHeader = () => {
        if(window.scrollY >= 400) {
            setStiky(true);
            if(window.screen.width <= 1000) {
                setStiky(false);
            }
        } else {
            setStiky(false);
        }
    }

    // method counter
    const increment = (id) => {
        setQty(qty + 1);
        setId(id);
    }
    const decrement = (id) => {
        if(qty > 0) {
            setQty(qty - 1);
            setId(id);
        }
    }
    
    const styleStiky = {
        position: 'fixed',
        top: '135px',
        zIndex: '999',
        padding: '6px 35px',
        backgroundColor: 'rgba(25, 25, 25, 0.3)'
    }

    const styleProduct = {
        position: 'relative'
    }

    window.addEventListener('scroll', setStikyProductHeader);

    useEffect(() => {
        getData();
    }, []);
   

    return (
        <div>
            {
                !category ? 
                    <h2 className='header-product bg-secondary text-white fw-lighter text-center py-1 text-uppercase' style={stiky ? styleStiky : styleProduct }>All Products</h2> :
                    productsFromCategory.map(category => (
                        <h2 className='header-product bg-secondary text-white fw-lighter text-center py-1 text-uppercase' style={stiky ? styleStiky : styleProduct }>Category {category.c_name }</h2>
                    ))
            }
            <div className="products border px-3 py-3 rounded" style={{ background: '#ccc' }}>
                <Row>
                    {   
                        !category ?
                            products.map(product => (
                                <Col key={product.id}>
                                    <Card className='card shadow mb-4'>
                                        <Card.Img className='img-product' variant="top" src={img} />
                                        <Card.Body>
                                            <Card.Title className='fs-3 fw-bold'>{product.p_name}</Card.Title>
                                            <Card.Text className='text-danger fw-bold'>
                                                {rupiahFormat(product.p_price)}
                                            </Card.Text>
                                            <div className='btn d-flex justify-content-between'>
                                                    {
                                                        token &&  
                                                                <Button onClick={() => handleCart(product.id) } variant="primary" className='shadow fw-bold me-4'>Keranjang</Button>
                                                                
                                                    }
                                                    {
                                                        token && <div className="counter mx-auto d-flex align-items-center my-auto">
                                                                    <div className='counter d-flex align-items-center'>
                                                                        <button  className="btn btn-warning btn-sm fw-bold" onClick={() => decrement(product.id) }>-</button>
                                                                        <input type='text' className="text-danger text-center fw-bold" style={{ width: '50px', height: '31px', border: 'none', boxShadow: 'inset 4px 4px 6px rgba(25, 25, 25, .7),inset 2px 2px 6px #ccc' }} value={product.id === id ? qty : 0} readOnly/>
                                                                        <button className="btn btn-warning btn-sm fw-bold" onClick={() => increment(product.id) }>+</button>
                                                                    </div>
                                                                </div>
                                                    }
                                                    
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )) : 

                            productsFromCategory.map(product => (
                                product.product.map(p => (
                                        <Col key={p.id}>
                                        {
                                            <Card className='card shadow mb-4'>
                                                <Card.Img className='img-product' variant="top" src={img} />
                                                <Card.Body>
                                                    <Card.Title>{p.p_name}</Card.Title>
                                                    <Card.Text>
                                                        {`Rp.${p.p_price}`}
                                                    </Card.Text>
                                                    <div className='btn d-flex justify-content-between'>
                                                        {
                                                            token &&  
                                                                    <Button onClick={() => handleCart(p.id) } variant="primary" className='shadow fw-bold me-4'>Keranjang</Button>
                                                                      
                                                        }
                                                        {
                                                            token && <div className="counter mx-auto d-flex align-items-center my-auto">
                                                                        <div className='counter d-flex align-items-center'>
                                                                            <button  className="btn btn-warning btn-sm fw-bold" onClick={() => decrement(p.id) }>-</button>
                                                                            <input type='text' className="text-danger text-center fw-bold" style={{ width: '50px', height: '31px', border: 'none', boxShadow: 'inset 4px 4px 6px rgba(25, 25, 25, .7),inset 2px 2px 6px #ccc' }} value={p.id === id ? qty : 0} readOnly/>
                                                                            <button className="btn btn-warning btn-sm fw-bold" onClick={() => increment(p.id) }>+</button>
                                                                        </div>
                                                                    </div>
                                                        }
                                                        
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        }
                                        </Col>
                                    
                                ))
                            ))
                    }
                </Row>
            </div>
        </div>
    )
}

export default Products;