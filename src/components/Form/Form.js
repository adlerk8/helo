import React, {Component} from 'react';

class Form extends Component {
    render() {
        return (
            <div className="form">
                <input>Title:</input>
                <input>Image URL:</input>
                <input>Content:</input>
            </div>
        )
    }
}

export default Form;