import { useGetProductsQuery, useGetProductsCommentsQuery, useCreateProductsCommentsMutation } from "../Services/API"
import styled from 'styled-components';
import { useBasket } from '../Contexts/BasketContext';
import Navbar from '../Components/Navbar';

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
        <Navbar />
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
                    <button onClick={() => handleAddToBasket(p)}>Ajouter au panier</button>
                    <div>
                        {
                            isLoading ? <p>loading</p> :
                                commentData.map(comment => (
                                    <p>{comment.comment} par <strong>{comment.username}</strong></p>
                                ))
                        }
                    </div>
                </div>
            ))
        }
    </div>
}