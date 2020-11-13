import React, {Component} from 'react';
import {connect} from 'react-redux';

class Dashboard extends Component {
    constructor() {
        super();

        this.state = {
            posts: [],
            search: '',
            userposts: true
        }
    }
    render() {
        return (
            <div>Dashboard</div>
        )
    }
}

const mapStatetoProps = state => state;

export default connect(mapStatetoProps)(Dashboard);