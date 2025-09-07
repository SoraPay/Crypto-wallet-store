import './BannerCarousel.css';

const banners = [
    {
        id: 1,
        imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6AAAAGUlEQVR4nGNgYGBgYGD4z8DAwMDAwP8AAAD//wMAV7gN1gAAAABJRU5ErkJggg==',
        title: 'Ledger Nano X',
        description: 'Максимальная безопасность для ваших активов',
    },
    {
        id: 2,
        imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6AAAAGUlEQVR4nGNgYGBgYGD4z8DAwMDAwP8AAAD//wMAV7gN1gAAAABJRU5ErkJggg==',
        title: 'Premium Чехол',
        description: 'Стиль и защита для вашего кошелька',
    },
];

function BannerCarousel() {
    return (
        <div className="banner-carousel">
            {banners.map((banner) => (
                <div key={banner.id} className="banner-item">
                    <img src={banner.imageUrl} alt={banner.title} />
                    <div className="banner-overlay">
                        <h3>{banner.title}</h3>
                        <p>{banner.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default BannerCarousel;