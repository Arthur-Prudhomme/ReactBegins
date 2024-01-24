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
            isFetching ? <p>loading</p> : <Global>
                <ProductsList />
                <Comments />
            </Global>
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
            <CommentActions>
                <Input
                    type="text"
                    value={commentText}
                    onChange={handleInputChange}
                    placeholder="Votre commentaire"
                />
                <Button onClick={handleCreateComment}>Ajouter</Button>
            </CommentActions>

            <CommentList>
                {
                    isLoading ? <p>loading</p> :
                        commentData.map(comment => (
                            <Comment>
                                <h3><strong>{comment.username}</strong></h3>
                                <p>{comment.comment}</p>
                            </Comment>
                        ))
                }
            </CommentList>
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
                    <ProductCard>
                        <div>
                            <img src={p.image} />
                        </div>
                        <div>
                            <h1>{p.title} - {p.price}€</h1>
                            <h2>En stock : {p.quantity}</h2>
                            <Button onClick={() => handleAddToBasket(p)}>Ajouter au panier</Button>
                        </div>
                    </ProductCard>
                </div>
            ))
        }

    </div>
}

const ProductCard = styled.div`
height:auto;
width:fit-content;
display:flex;
padding:10px;

img{
    width:300px;
    height:auto;
}
padding:15px;
border-radius:15px;

-webkit-box-shadow: 5px 5px 15px 1px rgba(0,0,0,0.15); 
box-shadow: 5px 5px 15px 1px rgba(0,0,0,0.15);
`

const Global = styled.div`
height:auto;
width:auto;
display:flex;
maring:auto;
gap:5%;

padding:15px;
border-radius:15px;
`

const Comment = styled.div`
display:flex;
flex-direction:column;
padding:5px;
border-radius:15px;

p,h3{
    margin:0;
}

-webkit-box-shadow: 5px 5px 15px 1px rgba(0,0,0,0.15); 
box-shadow: 5px 5px 15px 1px rgba(0,0,0,0.15);
`

const CommentList = styled.div`
display:flex;
flex-direction:column;
border-radius:15px;
gap:15px;
`

const Button = styled.button`
display: inline-block;
color: black;
font-size: 1em;
padding: 0.25em 1em;
border: 2px solid #f5f5f5;
border-radius:5px;
display: block;
`;

const Input = styled.input`
width:70%;
padding: 0.5em;
color: black;
background: #f5f5f5;
border: none;
border-radius: 5px;
`;

const CommentActions = styled.div`
  display:flex;
  justify-content:space-between;
`;