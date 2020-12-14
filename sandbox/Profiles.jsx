import React, { Component } from "react";
import ProfilePageFunction from './components/profiles/function';
import ProfilePageClass from './components/profiles/class';

class Profiles extends Component {
    state = {
        user: 'Сергей',
    };
    render() {
        return (
            <>
                <label>
                    <b>Выберите профиль: </b>
                    <select
                        value={this.state.user}
                        onChange={e => this.setState({ user: e.target.value })}
                    >
                        <option value="Сергей">Сергей</option>
                        <option value="Максим">Максим</option>
                        <option value="Виктория">Виктория</option>
                    </select>
                </label>
                <h1>Имя владельца аккаунта: {this.state.user}</h1>
                <p>
                    <ProfilePageFunction user={this.state.user} />
                    <b> (функция)</b>
                </p>
                <p>
                    <ProfilePageClass user={this.state.user} />
                    <b> (класс)</b>
                </p>
            </>
        )
    }
}

export default Profiles;
