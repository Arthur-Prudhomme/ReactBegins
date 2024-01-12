import { useGetProductsQuery } from "../Services/API"
import styled from 'styled-components';

export default function () {
    let { data, isFetching } = useGetProductsQuery();
    return <div>
        <h1>Products</h1>
        {
            isFetching ? <p>loading</p> : <div>
                <br />
                <ProductsList />
            </div>
        }
    </div>
}

function ProductsList() {
    let { data, isFetching } = useGetProductsQuery();
    const queryParameters = new URLSearchParams(window.location.search);
    const id = queryParameters.get("id")

    return <div>
        {
            data.filter((products) => (
                products.id === id
            )).map(p => (
                <div>
                    <img src={p.image} /><br />
                    <h3>{p.title}</h3>
                </div>
            ))
        }
    </div>
}