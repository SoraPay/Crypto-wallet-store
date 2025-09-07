import { useEffect, useState } from 'react';
import './Profile.css';

function Profile() {
    const [user, setUser] = useState({ first_name: 'Гость' });

    useEffect(() => {
        const tg = window.Telegram?.WebApp || {};
        setUser(tg.initDataUnsafe?.user || { first_name: 'Гость' });
    }, []);

    return (
        <div className="profile">
            <h1>Профиль</h1>
            <p>Привет, {user.first_name}!</p>
            <button onClick={() => alert('Редактировать профиль (WIP)')}>Редактировать</button>
        </div>
    );
}

export default Profile;