import { useGetProductsQuery, useGetProductsCommentsQuery, useCreateProductsCommentsMutation } from "../Services/API"
import styled from 'styled-components';
import { useBasket } from '../Contexts/BasketContext';
import Navbar from '../Components/Navbar';
import React, { useState } from 'react';

export default function () {
    let { data, isFetching } = useGetProductsQuery();

    return <div>
        <Navbar />
        {
            isFetching ? <p>loading</p> : <div>
                <ProductsList />
                <Comments />
            </div>
        }
    </div>
}

function Comments() {
    const [createComment] = useCreateProductsCommentsMutation();
    const [commentText, setCommentText] = useState('');

    const queryParameters = new URLSearchParams(window.location.search);
    const id = queryParameters.get("id");
    const { data: commentData, isLoading } = useGetProductsCommentsQuery(id);

    const handleInputChange = (event) => {
        setCommentText(event.target.value);
    };

    const handleCreateComment = () => {
        const params = {
            id: id,
            body: {
                username: 'default',
                comment: commentText
            }
        };
        createComment(params);
        setCommentText('');
    };

    return (
        <div>
            <input
                type="text"
                value={commentText}
                onChange={handleInputChange}
                placeholder="Votre commentaire"
            />
            <button onClick={handleCreateComment}>Ajouter</button>
            <div>
                {
                    isLoading ? <p>loading</p> :
                        commentData.map(comment => (
                            <p>{comment.comment} par <strong>{comment.username}</strong></p>
                        ))
                }
            </div>
        </div>
    );
}

function ProductsList() {
    const { data: productData } = useGetProductsQuery();
    const queryParameters = new URLSearchParams(window.location.search);
    const id = queryParameters.get("id");

    const { addToBasket } = useBasket();
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
                </div>
            ))
        }
    </div>
}