import React, {Component} from 'react';

class Auth extends Component {
    constructor() {
        super ();
        
        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    login = async () => {

    }

    register = async () => {

    };

    render() {
        return (
            <div>This is the Auth component
                <button>Login</button>
                <button>Register</button>
            </div>
        )
    }
}

export default Auth;