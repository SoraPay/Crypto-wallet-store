import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
    return (
        <nav className="navigation">
            <NavLink to="/catalog" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} title="Каталог">
                <i className="fas fa-store"></i>
            </NavLink>
            <NavLink to="/cart" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} title="Корзина">
                <i className="fas fa-shopping-cart"></i>
            </NavLink>
            <NavLink to="/profile" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} title="Профиль">
                <i className="fas fa-user"></i>
            </NavLink>
            <NavLink to="/settings" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} title="Настройки">
                <i className="fas fa-cog"></i>
            </NavLink>
        </nav>
    );
}

export default Navigation;