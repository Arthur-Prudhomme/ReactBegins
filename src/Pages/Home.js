import { useGetProductsQuery } from "../Services/API"
import styled from 'styled-components';

export default function () {
    let { data, isFetching } = useGetProductsQuery();
    return <div>Home

        {
            isFetching ? <p>ça fetch</p> : <div>
                <br />
                Articles Count : {data.length}
                <ProductsList />
            </div>
        }
    </div>
}

function ProductsList() {
    let { data, isFetching } = useGetProductsQuery();

    return data.map((products) => {
        return <ProductCard>
            <img src={products.image} /><br />
            <h3>{products.title}</h3>
        </ProductCard>
    })
}

const ProductCard = styled.div`
height:150px;
width:80px;
img{
    width:100%;
    height:auto;
}

&:hover{
  color:black;
  background-color: cyan;
}
`