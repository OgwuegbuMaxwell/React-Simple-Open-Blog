import React, {useState} from "react";
import './NewPost.css'

const BASE_URL = 'http://127.0.0.1:8000/'


function NewPost() {
    // State hooks to manage form data and image file
    const [image, setImage] = useState(null)
    const [creator, setCreator] = useState('')
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')

    // Handles image file input changes
    const handleImageUpload = (e) => {
        if (e.target.files[0]) {
            // Set the image file to state
            setImage(e.target.files[0])
        }
    }

    // Handles the submit action for creating a new post
    const handleCreate = (e) => {
        // Prevent the default form submit action
        e?.preventDefault()

        const formData = new FormData()
         // Append the image file to the FormData object
        formData.append('image', image)

        // Define request options for image upload
        const requestOptions = {
            method: 'POST',
            // Send the FormData object as the body
            body: formData
        }

        // Make a POST request to upload the image
        fetch(BASE_URL + 'post/image', requestOptions)
        .then(response => {
            if (response.ok) {
                // If upload is successful, parse the JSON response
                return response.json()
            }
            // If upload fails, throw the response to catch any errors
            throw response
        })
        .then(data => {
            // Call createPost with the returned image filename
            creatPost(data.filename)
        })
        .catch(error => {
            // Log any errors during the upload process
            console.log(error)
        })
        .finally(() => {
             // Reset the image in state
            setImage(null)
            // Reset the file input form
            document.getElementById('fileInput').value = null
        })
    }

    // Function to create the post with the image URL and other post data
    const creatPost = (imageUrl) => {
        // Create a JSON string with the post data
        const json_string = JSON.stringify({
            // Include the image URL received from the upload step
            'image_url': imageUrl,
            'title': title,
            'content': text,
            'creator': creator
        })

        // Define request options for creating the post
        const requestOptions = {
            method: 'Post',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            // Send the JSON string as the body
            body: json_string
        }

        // Make a POST request to create the post
        fetch(BASE_URL + 'post', requestOptions)
            .then(response => {
                if (response.ok) {
                    // If post creation is successful, parse the JSON response
                    return response.json()
                }
                // If post creation fails, throw the response to catch errors
                throw response
            })
            .then(data => {
                // Reload the page to reflect the new post
                window.location.reload()
                 // Scroll to the top of the page
                window.scrollTo(0, 0)
            })
            .catch(error => {
                // Log any errors during the post creation process
                console.log(error);
            })
    }

    return (
        <div className="newpost_content">
            <div className="newpost_image">
                <input type="file" id="fileInput" onChange={handleImageUpload} />
            </div>

            <div className="newpost_creator">
                <input className="newpost_creator" type="text" id="creator_input" 
                placeholder="Creator" onChange={(event) => setCreator(event.target.value)} 
                value={creator}  />
            </div>

            <div className="newpost_title">
                <input className="newpost_title" type="text" id="title_input" 
                placeholder="Title" onChange={(event) => setTitle(event.target.value)} 
                value={title}  />
            </div>

            <div className="newpost_text">
                <textarea className="newpost_text" rows='10' id="content_input" 
                placeholder="Content" onChange={(event) => setText(event.target.value)} 
                value={text}  />
            </div>

            <div>
                <button className="create_button" onClick={handleCreate} > Create </button>
            </div>


        </div>
    )

}

export default NewPost



