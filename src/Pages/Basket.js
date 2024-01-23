import { useGetProductsQuery, useGetProductsCommentsQuery, useCreateProductsCommentsMutation } from "../Services/API"
import styled from 'styled-components';
import { useBasket } from '../Contexts/BasketContext';

export default function () {

    return <div>
        {
            <BasketContent />
        }
    </div>
}

function BasketContent() {
    const { state, addToBasket, emptyBasket } = useBasket();

    return <div>
        {
            <div>
                <h2>Basket</h2>
                <ul>
                    {state.items.map((itemObj, index) => (

                        <li key={index}>
                            {itemObj.item.title} - Quantity: {itemObj.quantity}
                        </li>
                    ))}
                </ul>
                <button onClick={emptyBasket}>Empty Cart</button>
            </div>
        }
    </div>
}