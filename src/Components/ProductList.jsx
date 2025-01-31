import React, { useEffect, useState } from 'react';
import './ProductList.css'; 
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from './CartSlice';

const ProductList = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.cartItems)
    const [disabledProducts, setDisabledProducts] = useState([])

    const products = [
        { id: 1, name: 'Product A', price: 60 },
        { id: 2, name: 'Product B', price: 75 },
        { id: 3, name: 'Product C', price: 30 },
    ];

    const handleAddToCart = (product) => {
        dispatch(addItemToCart(product));
        setDisabledProducts([...disabledProducts, product.id]);
    }

    const log = () => {
        console.log(disabledProducts)
        console.log('-------')
        console.log(cartItems)
        console.log('=======')
    }

    useEffect(() => {
        let keyNotIncluded;
        disabledProducts.forEach(key => {
            if (!(cartItems.some(item => item.id == key))) {
                setDisabledProducts(disabledProducts.filter((productID) => productID != key))
            }
        })
    }, [cartItems])

    return (
    <div className="product-list">
      <h2 className="product-list-title">Products</h2>
      <ul className="product-list-items">
        {products.map(product => (
            <li key={product.id} className='product-list-item'>
                <span>{product.name} - ${product.price}</span>
                <button
                className={`add-to-cart-btn ${disabledProducts.includes(product.id) ? 'disabled' : ''}`}
                onClick={() => handleAddToCart(product)}
                disabled={disabledProducts.includes(product.id)}>
                    {disabledProducts.includes(product.id) ? 'Disabled' : 'Add to Cart'}
                </button>
            </li>
        ))}
      </ul>
      <button onClick={log}>Log</button>
    </div>
  );
};

export default ProductList;
