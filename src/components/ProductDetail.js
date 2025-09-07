import { useParams } from 'react-router-dom';
import './ProductDetail.css';

const mockProducts = [
    {
        id: 1,
        name: 'Ledger Nano S',
        shortDescription: 'Холодный кошелек для BTC/ETH',
        description: 'Ledger Nano S — компактный и надежный холодный кошелек для безопасного хранения Bitcoin, Ethereum и других криптовалют.',
        price: 59.99,
        imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAADICAYAAAD0jMlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6AAAAMUlEQVR4nO3BAQ0AAADCoPe3voOQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIC3AXjVAAFi6N5KAAAAAElFTkSuQmCC',
        category: 'Wallet',
    },
    {
        id: 2,
        name: 'Кожаный чехол',
        shortDescription: 'Чехол для холодного кошелька',
        description: 'Премиальный кожаный чехол для защиты вашего холодного кошелька. Стильный дизайн и высококачественные материалы.',
        price: 19.99,
        imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAADICAYAAAD0jMlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6AAAAMUlEQVR4nO3BAQ0AAADCoPe3voOQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIC3AXjVAAFi6N5KAAAAAElFTkSuQmCC',
        category: 'Accessory',
    },
];

function ProductDetail() {
    const { id } = useParams();
    const product = mockProducts.find((p) => p.id === parseInt(id));

    if (!product) {
        return <div className="product-detail">Товар не найден</div>;
    }

    const addToCart = () => {
        const tg = window.Telegram?.WebApp || {};
        tg.HapticFeedback?.impactOccurred && tg.HapticFeedback.impactOccurred('medium');
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingItem = cart.find((item) => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    return (
        <div className="product-detail">
            <img src={product.imageUrl} alt={product.name} />
            <h1>{product.name}</h1>
            <p className="price">{product.price} $</p>
            <p className="description">{product.description}</p>
            <button onClick={addToCart}>В корзину</button>
        </div>
    );
}

export default ProductDetail;