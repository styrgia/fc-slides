import React, { Component } from 'react';

class ProfilePage extends Component {
    showMessage = () => {
        alert('Подписались на юзера: ' + this.props.user);
    }

    handleClick = () => {
        setTimeout(this.showMessage, 5000);
    }

    render() {
        return <button onClick={this.handleClick}>Подписаться</button>;
    }
}

export default ProfilePage;