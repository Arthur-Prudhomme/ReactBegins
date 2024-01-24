import React from 'react';
import { Link } from 'react-router-dom';
import { useBasket } from '../Contexts/BasketContext';

const Navbar = () => {
    const { state } = useBasket();

    const totalItems = state.items.reduce((total, itemObj) => total + itemObj.quantity, 0);

    return (
        <div>
            <nav>
                <div>
                    <Link to='/basket'>
                        <p>Panier : {totalItems}</p>
                    </Link>
                </div>
            </nav>

        </div>
    );
};

export default Navbar;