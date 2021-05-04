import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const NewPost = () => {

    const [blogPost, setBlogPost] = useState({ title: '', text: '' });
    const history = useHistory();

    const onSubmitClick = () => {
        const AddPost = async () => {
            await axios.post('/api/blogs/newpost', blogPost);
            history.push("/");
        }
        AddPost();
    }

    const OnTextChange = e => {
        const copy = { ...blogPost };
        copy[e.target.name] = e.target.value;
        setBlogPost(copy);
    }

    return (
        <div className="col-md-8 offset-md-2 card card-body bg-light">
            <h3>Add new post</h3>
            <input className="form-control" placeholder="Title" name="title" onChange={OnTextChange} />
            <br />
            <textarea name="text" placeholder="What's on your mind?" className="form-control" rows="20" onChange={OnTextChange}></textarea>
            <br />
            <button className="btn btn-primary" disabled={blogPost.text.length === 0 || blogPost.title.length === 0} onClick={onSubmitClick}>Submit</button>
        </div>
    );
}

export default NewPost;

