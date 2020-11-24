import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            search: '',
            userposts: true
        }
    }

    componentDidMount() {
        this.searchPosts();
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    searchPosts = () => {
        axios.get(`/api/posts/${this.props.userId}`)
        .then((res) => {
            this.setState({
                posts: res.data
            })
        }).catch(err => {console.log(err)})
    }

    unseeMyPosts = () => {
        this.setState({
            userposts: false
        })
    }

    resetSearch = () => {
        this.setState({
            search: ''
        })
    }

    render() {
        const {search, posts} = this.state;
        console.log(posts)
        const displayPosts = posts.map((e) => {
            return <div key={e.id} to="/post/post:id">
                <div>
                    <Link to={`/post/post${e.id}`}>{e.title}</Link>
                    by: {e.username}
                    <img src={e.profile_pic}/>
                </div>
            </div>
        });
        return (
            <div>
                <div>
                    <form className="searchBar">
                        <input
                            name="search"
                            value={search}
                            placeholder="Search..."
                            onChange={e => this.handleChange(e)}
                        />
                    </form>
                    <button onClick={this.searchPosts}>Search</button>
                    <button onClick={this.resetSearch}>Reset</button>
                    <input type="checkbox" name="myposts" onChange={this.unseeMyPosts}/>
                    <label htmlFor="myposts">My Posts</label>
                </div>
                <div className="postsBox">
                    {displayPosts}
                </div>
            </div>
        )
    }
}

const mapStatetoProps = state => state;

export default connect(mapStatetoProps)(Dashboard);