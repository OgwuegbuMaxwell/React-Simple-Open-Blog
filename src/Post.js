import React, {useState, useEffect} from "react";
import './Post.css'
const BASE_URL = 'http://127.0.0.1:8000/'

function Post({post}) {
    const [imageUrl, setimageUrl] = useState('')
    
    useEffect(() => {
        const completeUrl = BASE_URL + post.image_url;
        // console.log("Complete Image URL:", completeUrl); // Debug: Log the URL to check correctness
        setimageUrl(completeUrl);
    }, [post.image_url]); // Ensure the effect updates if post.imageUrl changes
    
    const handleDelete = (event) => {
        // Prevent the default form submit action
        event?.preventDefault()

        // Define request options for deleting a post
        const requestOptions = {
            method: 'DELETE'
        }

        fetch(BASE_URL + 'post/' + post.id, requestOptions)
            .then(response => {
                if (response.ok) {
                    window.location.reload()
                }
                throw response
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="post">
            <img className="post_image" src={imageUrl} alt="Post Content" />
            <div className="post_content">
                <div className="post_title">{post.title}</div>
                <div className="post_creator">{post.creator}</div>
                <div className="post_text">{post.content}</div>
                <div className="post_delete">
                    <button onClick={handleDelete}>Delete post</button>
                </div>
            </div>

        </div>
    )

}

export default Post;



