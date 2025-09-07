import './Settings.css';

function Settings() {
    return (
        <div className="settings">
            <h1>Настройки</h1>
            <p>Настройки приложения (WIP)</p>
            <button onClick={() => alert('Сохранить настройки (WIP)')}>Сохранить</button>
        </div>
    );
}

export default Settings;