import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Post from '../Post/Post';

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
        axios.get(`/api/posts/${props.userId}`)
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

        const displayPosts = posts.map((e, id) => {
            return <Post key={e.id} to="/post/post:id">{e}</Post>
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