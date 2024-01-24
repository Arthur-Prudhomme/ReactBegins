import React from 'react';
import { Link } from 'react-router-dom';
import { useBasket } from '../Contexts/BasketContext';
import styled from 'styled-components';

const Navbar = () => {
    const { state } = useBasket();

    const totalItems = state.items.reduce((total, itemObj) => total + itemObj.quantity, 0);

    return (
        <div>
            <nav>
                <NavBar>
                    <Link className={"removeLinkStyle"} to='/home'>
                        <h2>Acceuil</h2>
                    </Link>
                    <Link className={"removeLinkStyle"} to='/basket'>
                        <h2>Panier : {totalItems}</h2>
                    </Link>
                </NavBar>
            </nav>

        </div>
    );
};

const NavBar = styled.div`
display:flex;
justify-content:space-between;
padding: 15px;
background-color:#f5f5f5;
margin-bottom:15px;

-webkit-box-shadow: 5px 5px 15px 1px rgba(0,0,0,0.15); 
box-shadow: 5px 5px 15px 1px rgba(0,0,0,0.15);

.removeLinkStyle{
    text-decoration:none!important;
    color:black;
}
`

export default Navbar;