import { useGetProductsQuery } from "../Services/API"
import styled from 'styled-components';

export default function () {
    let { data, isFetching } = useGetProductsQuery();
    return <div><h1>Products</h1>
        {
            isFetching ? <p>loading</p> : <div>
                <br />
                Articles Count : {data.length}
                <ProductsCardList>
                    <ProductsList />
                </ProductsCardList>
            </div>
        }
    </div>
}

function ProductsList() {
    let { data, isFetching } = useGetProductsQuery();

    return data.map((products) => {
        return <ProductCard href={'http://localhost:3000/products?id=' + products.id}>
            <img src={products.image} /><br />
            <h3>{products.title}</h3>
        </ProductCard>
    })
}

const ProductCard = styled.a`
height:auto;
width:150px;
img{
    width:100%;
    height:auto;
}
border-radius:15px;
-webkit-box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.2); 
box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.2);

&:hover{
}
`
const ProductsCardList = styled.div`
display:flex;
gap:15px;
`