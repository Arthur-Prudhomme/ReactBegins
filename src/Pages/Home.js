import { useGetProductsQuery } from "../Services/API"
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../Components/Navbar';

export default function () {
    let { data, isFetching } = useGetProductsQuery();

    return <div>

        <Navbar />
        <Global>
            <h1>Produits</h1>
            {
                isFetching ? <p>CHARGEMENT</p> :
                    <div>
                        <ProductsCardList>
                            <ProductsList />
                        </ProductsCardList>
                    </div>
            }
        </Global>
    </div>
}

function ProductsList() {
    let { data } = useGetProductsQuery();

    return data.map((products) => {
        const link = '/products?id=' + products.id;

        return <ProductCard><Link className={"removeLinkStyle"} to={link}>
            <img src={products.image} /><br />
            <div>
                <h3>{products.title}</h3>
                <h4>{products.price}€</h4>
            </div>
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

-webkit-box-shadow: 5px 5px 15px 1px rgba(0,0,0,0.15); 
box-shadow: 5px 5px 15px 1px rgba(0,0,0,0.15);

.removeLinkStyle{
    text-decoration:none!important;
    color:black;
}
`
const ProductsCardList = styled.div`
display:flex;
justify-content:center;
gap:25px;
`
const Global = styled.div`
display:flex;
flex-direction:column;
text-align:center;
`