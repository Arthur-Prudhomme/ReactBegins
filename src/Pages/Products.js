import { useGetProductsQuery, useGetProductsCommentsQuery, useCreateProductsCommentsMutation } from "../Services/API"
import styled from 'styled-components';
import { useBasket } from '../Contexts/BasketContext';

export default function () {
    let { data, isFetching } = useGetProductsQuery();
    let [createComment, { isLoading }] = useCreateProductsCommentsMutation();

    const queryParameters = new URLSearchParams(window.location.search);
    const id = queryParameters.get("id");

    const params = {
        id: id,
        body: {
            username: 'test',
            comment: 'commentaire test 4'
        }
    };

    return <div>
        <button onClick={() => {
            createComment(params)
        }}>create comment</button>

        {
            isFetching ? <p>loading</p> : <div>
                <ProductsList />
            </div>
        }
    </div>
}

function ProductsList() {
    const { data: productData, isFetching } = useGetProductsQuery();
    const queryParameters = new URLSearchParams(window.location.search);
    const id = queryParameters.get("id");
    const { data: commentData, isLoading } = useGetProductsCommentsQuery(id);

    const { state, addToBasket, emptyBasket } = useBasket();
    const handleAddToBasket = (product) => {
        addToBasket(product);
    };

    return <div>
        {
            productData.filter((products) => (
                products.id === id
            )).map(p => (
                <div>
                    <h1>{p.title}</h1>
                    <img src={p.image} /><br />
                    <div>
                        {
                            isLoading ? <p>loading</p> :
                                commentData.map(comment => (
                                    <p>{comment.comment} par <strong>{comment.username}</strong></p>
                                ))
                        }
                    </div>

                    <div>
                        <button onClick={() => handleAddToBasket(p)}>Add to Cart</button>
                    </div>
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
            ))
        }
    </div>
}