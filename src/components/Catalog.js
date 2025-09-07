import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BannerCarousel from './BannerCarousel';
import './Catalog.css';

const mockProducts = [
    {
        id: 1,
        name: 'Ledger Nano S',
        shortDescription: 'Холодный кошелек для BTC/ETH',
        price: 59.99,
        imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6AAAALUlEQVR4nGNgYGBgYGD4z8DAwMDAwMD/wMDAwMDAwP8AAAD//wMA3cwFZgAAAABJRU5ErkJggg==',
        category: 'Wallet',
    },
    {
        id: 2,
        name: 'Кожаный чехол',
        shortDescription: 'Чехол для холодного кошелька',
        price: 19.99,
        imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6AAAALUlEQVR4nGNgYGBgYGD4z8DAwMDAwMD/wMDAwMDAwP8AAAD//wMA3cwFZgAAAABJRU5ErkJggg==',
        category: 'Accessory',
    },
];

function Catalog() {
    const [products, setProducts] = useState(mockProducts);
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('none');

    const filteredProducts = products
        .filter((product) => {
            const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        })
        .sort((a, b) => {
            if (sortOrder === 'asc') return a.price - b.price;
            if (sortOrder === 'desc') return b.price - a.price;
            return 0;
        });

    useEffect(() => {
        setProducts(mockProducts);
    }, []);

    const addToCart = (product) => {
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
        <div className="catalog">
            <BannerCarousel />
            <h1>Каталог</h1>
            <div className="filters">
                <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                >
                    <option value="All">Все категории</option>
                    <option value="Wallet">Кошельки</option>
                    <option value="Accessory">Аксессуары</option>
                </select>
                <input
                    type="text"
                    placeholder="Поиск по названию..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="none">Без сортировки</option>
                    <option value="asc">По цене: возрастание</option>
                    <option value="desc">По цене: убывание</option>
                </select>
            </div>
            <div className="product-list">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div key={product.id} className="product-card">
                            <Link to={`/product/${product.id}`} className="product-link">
                                <img src={product.imageUrl} alt={product.name} />
                                <h3>{product.name}</h3>
                                <p>{product.shortDescription}</p>
                                <p className="price">{product.price} $</p>
                            </Link>
                            <button onClick={() => addToCart(product)}>В корзину</button>
                        </div>
                    ))
                ) : (
                    <p>Товары не найдены</p>
                )}
            </div>
        </div>
    );
}

export default Catalog;