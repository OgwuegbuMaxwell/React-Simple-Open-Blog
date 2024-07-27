import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';
import Post from './Post'
import NewPost from './NewPost';

const BASE_URL = 'http://127.0.0.1:8000/'

function App() {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    // Fetch posts from the server
    fetch(BASE_URL + 'post/all')
      .then(response => {
        // Convert the response to JSON
        return response.json().then(data => {
          // Check if the response was successful
          if (!response.ok) {
            // If not successful, throw an error
            throw new Error('Network response was not ok');
          }
          // Log the fetched data to the console for debugging
          console.log("Fetched data:", data);
          
          // If successful, reverse the data array to display the newest posts first
          setPosts(data.reverse());
        })
      })
      .catch(error => {
        // Log any errors that occur during the fetch operation
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []); // The empty dependency array means this effect runs only once after the initial render
  

  return (
    <div className="App">
      <div className='blog_title'>Open Mic Blog</div>
  
      <div className='app_posts'>
        {
          posts.map(post => (
            // Use a unique identifier from each post as the key, like an id
            <Post key={post.id} post={post} />
          ))
        }
      </div>

        <div className='new_post'>
          <NewPost />
        </div>

    </div>
  );
  


}

export default App;
