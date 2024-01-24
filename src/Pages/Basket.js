import { useGetProductsQuery, useGetProductsCommentsQuery, useCreateProductsCommentsMutation } from "../Services/API"
import styled from 'styled-components';
import { useBasket } from '../Contexts/BasketContext';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';

export default function () {
    const { state, emptyBasket } = useBasket();

    const totalItems = state.items.reduce((total, itemObj) => total + itemObj.quantity, 0);

    return <div>
        <Navbar />
        {
            <Global>
                {
                    totalItems > 0 ? <Button onClick={emptyBasket}>Vider le Panier</Button> : <p></p>
                }

                <BasketCardList>
                    <BasketContent />
                </BasketCardList>
            </Global>

        }
    </div>
}

function BasketContent() {
    const { state } = useBasket();

    return state.items.map((itemObj, index) => (

        <BasketCard><Link className={"removeLinkStyle"} to={'/products?id=' + itemObj.item.id}>
            <img src={itemObj.item.image} />
            <div>
                <h3>{itemObj.item.title} - x{itemObj.quantity}</h3>
                <h4>{itemObj.item.price}€</h4>
            </div>
        </Link></BasketCard>
    ))
}

const Button = styled.button`
display: inline-block;
color: black;
font-size: 1em;
padding: 0.25em 1em;
border: 2px solid #f5f5f5;
border-radius:5px;
display: block;
margin:auto auto 15px auto;
width:20em;
`;
const BasketCard = styled.div`
height:auto;
width:200px;
img{
    width:100%;
    height:auto;
}
padding:15px;
border-radius:15px;

-webkit-box-shadow: 5px 5px 15px 1px rgba(0,0,0,0.15); 
box-shadow: 5px 5px 15px 1px rgba(0,0,0,0.15);

.removeLinkStyle{
    text-decoration:none!important;
    color:black;
}
`;
const BasketCardList = styled.div`
display:flex;
flex-direction:row;
justify-content:center;
gap:25px;
margin:auto;
`;
const Global = styled.div`
display:flex;
flex-direction:column;
text-align:center;
`