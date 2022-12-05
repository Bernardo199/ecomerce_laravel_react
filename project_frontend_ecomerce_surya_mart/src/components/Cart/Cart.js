
// import icon
import axios from "axios";
import { useEffect, useState } from "react";
import { BsFillCartPlusFill} from "react-icons/bs";
import { API_URL } from "../../global_api/GlobalApi";

// send props from App
export const Cart = ({productsCart, getProductsCart}) => {

    // state user
    const [user, setUser] = useState({});

    // method array count products cart
    const arrCartProduct = () => {
        let arrProduct = [];

        (user.id !== undefined) &&
            productsCart.map(pCart => (
                 (user.id === pCart.user_id)  ? arrProduct.push(pCart) : null
            ))
            
       
        return arrProduct;
    }


    // get token from localstorage
    const token = localStorage.getItem('token');

    const notifStyle = {
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        fontSize: '11px',
        position: 'absolute',
        left: '85px',
        bottom: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

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

    // delete product from cart by id
    const deleteCartById = async (id) => {
        // get route cart and send id
        await axios.delete(`${API_URL}/cart/${id}`)
            .then(() => {
                // display cart products realtime after delete
                getProductsCart();
            })
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

    useEffect(() => {
        getData();
    });

    
    return (
        <> 
            <span className="bg-danger" style={notifStyle}>
                {
                    // count array cart products
                   arrCartProduct().length
                }
                
            </span>
            <BsFillCartPlusFill
                style={{ cursor: 'pointer' }}
                data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"
            />
            {/* offCanvas boostrapt 5 */}
            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel"style={{ width: '600px' }}>
                <div className="offcanvas-header bg-warning">
                    <h5 className='offcanvas-title text-dark' id="offcanvasExampleLabel">Halaman Keranjang</h5>
                    <button type="button" className='btn-close text-reset' data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
            <div className="offcanvas-body">
                <ol className="list-group list-group-numbered" style={{ height: '70vh', overflow: 'scroll', overflowX: 'hidden' }}>
                    {
                        (user.id !== undefined) ? 
                            productsCart.map(pCart => ( 
                                (pCart.user_id === user.id) &&  
                                    <li key={pCart.id} className="list-group-item d-flex justify-content-between align-items-start position-relative shadow">
                                        <div className="ms-2 me-auto">
                                        <div className="fw-bold fs-4">{ pCart.product.p_name }</div>
                                            <span className="fs-6 text-danger">
                                                <span className="text-secondary">Harga: </span>
                                                { 
                                                rupiahFormat(pCart.product.p_price)
                                                }
                                            </span> <br />
                                            <span className="fs-6 text-danger">
                                                <span className="text-secondary">Jumlah: </span>
                                                { 
                                                pCart.c_qty 
                                                }
                                            </span>
                                        </div>
                                            <span className="fs-6 text-white bg-primary px-3 py-3 rounded shadow mx-auto mt-4 ms-4">
                                                <span className="text-white">Sub Total: </span>
                                                { 
                                                pCart.id && rupiahFormat(pCart.product.p_price * pCart.c_qty)
                                                }
                                            </span>
                                        <span onClick={() => deleteCartById(pCart.id)} className="badge text-secondary fs-3 position-absolute fw-lighter" style={{ top: '-5px', right: '-5px', cursor: 'pointer' }}>X</span>
                                    </li>
                            )) : 
                            null
                    }
                    
                
                </ol>
                <div className="checkout d-flex justify-content-center mt-4">
                    <button className="btn btn-success btn-xl">Checkout</button>
                </div>
            </div>
            </div>
            
        </>
      );
    }


