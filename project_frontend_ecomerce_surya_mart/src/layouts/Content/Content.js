// import component react-boostrapt
import { Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// import component
import Category from "../../components/Category/Category";
import Products from "../../pages/Products/Products";

import '../../assets/css/responsive-content.css';
import { useEffect, useState } from "react";
import { API_URL } from "../../global_api/GlobalApi";
import axios from "axios";

// send props fromApp
const Content = ({getProductsCart}) => {
    // state products date
    const [products, setProducts] = useState([]);
    // state products from category
    const [productsFromCategory, setProductsFromCategory] = useState([]);
    // state category boolean
    const [category, setCategory] = useState(false);
    // set category active
    const [categoryActive, setCategoryActive] = useState(0);

     // get data products
     const getProducts = async () => {
        await axios.get(`${API_URL}/product`)
        .then(json => {
            const data = json.data.data
            setProducts(data);
        })
        .catch(err => {
            if (err.name === "AbortError") {
                console.log("fetch aborted.");
            }
        })
    }

    // get data products from category
    const getProductsFromCategory = async (id) => {
        await axios.get(`${API_URL}/category/${id}`)
        .then(json => {
            // set data category product
            const data = json.data.data
            setProductsFromCategory(data);

            // set category
            setCategory(true);

            // set category active
            setCategoryActive(id);
        })
        .catch(error => {
            console.log(error)
        })
    }

    // saat component di mounting maka get products
    useEffect(() => {
        getProducts();
    }, [])

    return (
        <Container fluid>
             <Row className="content-wrapper mx-md-5">
                <Col xl={3} lg={3}>
                    <Category getProductsFromCategory={getProductsFromCategory} categoryActive={categoryActive} />
                </Col>
                <Col xl={9} lg={9}>
                   <Products products={products} productsFromCategory={productsFromCategory} category={category} getProductsCart={getProductsCart} />
                </Col>
            </Row>
        </Container>
    )
}

export default Content;