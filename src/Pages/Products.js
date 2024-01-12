import { useGetProductsQuery, useGetProductsCommentsQuery } from "../Services/API"
import styled from 'styled-components';

export default function () {
    let { data, isFetching } = useGetProductsQuery();
    return <div>
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
                </div>
            ))
        }
    </div>
}