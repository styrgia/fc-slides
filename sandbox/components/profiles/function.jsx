import React from 'react'

const ProfilePage = (props) => {
    const showMessage = () => {
        alert('Подписались на' + props.user);
    }

    const handleClick = () => {
        setTimeout(showMessage, 5000);
    }

    return (
        <button onClick={handleClick}>Подписаться</button>
    );
}

export default ProfilePage;