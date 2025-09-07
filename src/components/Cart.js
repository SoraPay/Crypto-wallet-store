import { useState, useEffect } from 'react';
import './Cart.css';

function Cart() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItems(cart);
    }, []);

    const updateQuantity = (id, delta) => {
        setCartItems((items) => {
            const updatedItems = items.map((item) =>
                item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
            );
            const filteredItems = updatedItems.filter((item) => item.quantity > 0);
            localStorage.setItem('cart', JSON.stringify(filteredItems));
            const tg = window.Telegram?.WebApp || {};
            tg.HapticFeedback?.impactOccurred && tg.HapticFeedback.impactOccurred('light');
            return filteredItems;
        });
    };

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

    const handleCheckout = () => {
        const tg = window.Telegram?.WebApp || {};
        tg.HapticFeedback?.impactOccurred && tg.HapticFeedback.impactOccurred('medium');
        alert('Оформление заказа (WIP)');
    };

    return (
        <div className="cart">
            <h1>Корзина</h1>
            {cartItems.length > 0 ? (
                <>
                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <div key={item.id} className="cart-item">
                                <img src={item.imageUrl || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6AAAAL0lEQVR4nGNgYGBgYGD4z8DAwMDAwMD/wMDAwMDAwP8AAAD//wMAAAD//wMAp8IFZgAAAABJRU5ErkJggg=='}
                                    alt={item.name} />
                                <div className="cart-item-details">
                                    <h3>{item.name}</h3>
                                    <p className="price">{item.price} $</p>
                                    <div className="quantity-controls">
                                        <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-total">
                        <p>Итого: <span className="price">{totalPrice} $</span></p>
                        <button onClick={handleCheckout}>Оформить заказ</button>
                    </div>
                </>
            ) : (
                <p>Корзина пуста</p>
            )}
        </div>
    );
}

export default Cart;