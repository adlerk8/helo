import React, {Component} from 'react';
import axios from 'axios';

class Post extends Component {
    constructor(props) {
        super(props);
        
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
        .get(`/api/post/${this.props.match.params.id}`)
        .then((res) => {
            console.log(res.data)
            this.setState({
                title: res.data.title,
                img: res.data.img,
                content: res.data.content,
                author: res.data.username,
                authorPicture: res.data.profile_pic
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render() {
        const {author, authorPicture, img, content, title} = this.state;
        return (
            <div>
                <div className="topPost">
                    <h2>{title}</h2>
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