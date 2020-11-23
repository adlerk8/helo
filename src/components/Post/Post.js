import React, {Component} from 'react';
import axios from 'axios';

class Post extends Component {
    constructor() {
        super();
        
        this.state = {
            title: '',
            img: '',
            content: '',
            author: '',
            authorPicture: '',
        }
    }
    
    componentDidMount() {
        this.getPost();
    }

    getPost = () => {
        axios
        .get(`/api/post/${id}`)
        .then((res) => {
            console.log(res.data)
            this.setState({
                title: res.data
                
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render() {
        const {author, authorPicture, img, content} = this.state;
        return (
            <div>
                <div className="topPost">
                    <h2>Post Title</h2>
                    <div className="postAuthorInfo">
                        <p>by {author}</p>
                        <img src={authorPicture} alt="author"/>
                    </div>
                </div>
                <div className="bottomPost">
                    <img src={img} alt="posted content"/>
                    <p>{content}</p>
                </div>
            </div>
        )
    }
}

export default Post;