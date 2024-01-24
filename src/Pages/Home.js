import { useGetProductsQuery } from "../Services/API"
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../Components/Navbar';

export default function () {
    let { data, isFetching } = useGetProductsQuery();

    return <div>
        <Navbar />
        <h1>Products</h1>
        {
            isFetching ? <p>loading</p> :
                <div>
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
        const link = '/products?id=' + products.id;

        return <ProductCard><Link to={link}>
            <img src={products.image} /><br />
            <h2>{products.title}</h2>
            <h3>{products.price}€</h3>
        </Link></ProductCard>
    })
}

const ProductCard = styled.a`
height:auto;
width:150px;
img{
    width:100%;
    height:auto;
}
padding:15px;
border-radius:15px;
-webkit-box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.2); 
box-shadow: 5px 5px 15px 5px rgba(0,0,0,0.2);

&:hover{
}
`
const ProductsCardList = styled.div`
display:flex;
gap:25px;
`