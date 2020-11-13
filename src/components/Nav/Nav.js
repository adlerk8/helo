import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';


class Nav extends Component {
    render() {
        return (
            <div>
                <button><Link to="/dashboard">Home</Link></button>
                <button><Link to="/new">New Post</Link></button>
                <button><Link to="/">Logout</Link></button>
                <div>
                    <div>{this.props.user.username}</div>
                    <div>{this.props.user.profilePic}</div>
                </div>
            </div>
        )
    }
};

const mapStateToProps = state => state;
export default connect(mapStateToProps)(Nav);