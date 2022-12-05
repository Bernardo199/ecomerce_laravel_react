// import Components
import Corousel from '../../components/Corousel/Corousel';

// import component icons
import Search from "../../components/Search/Search";
import {Cart} from "../../components/Cart/Cart";
import Profil from '../../components/Profil/Profil';

// import responsive css
import NavbarHeader from "../../components/NavbarHeader/NavbarHeader";

import '../../assets/css/responsive-header.css';

// send props from App
const Header = ({productsCart, getProductsCart}) => {

    return (
        <div>
            <div className="header  position-fixed top-0 start-0 end-0" style={{ zIndex: '999'}}>
                {/* start nav header */}
                <NavbarHeader />
                {/* end nav header */}
                {/* start header logo */}
                <div className="bg-primary container-fluid d-flex justify-content-center py-2">
                    <div className="icon-header text-white fw-bold fs-4 d-flex align-items-center justify-content-center gap-5 position-relative">
                        <Search />
                        <Cart productsCart={productsCart} getProductsCart={getProductsCart} />
                        <Profil />
                    </div>
                </div>
                {/* end header logo */}
             </div>
             <div className="corousel mb-5">
                {/* start corousel */}
                <Corousel />
                {/* end corousel */}
             </div>
        </div>
    )
}

export default Header;