import React, { Component } from 'react';

const ProfilePage = () => {
    const showMessage = () => {
        alert('Подписались на юзера: ' + this.props.user);
    }

    const handleClick = () => {
        setTimeout(showMessage, 5000);
    }

    return <button onClick={handleClick}>Подписаться</button>;
}

export default ProfilePage;