 <script>
    function filterBlogs(category) {
      const blogs = document.querySelectorAll('.blog-post');
      blogs.forEach(blog => {
        if (category === 'all' || blog.getAttribute('data-category') === category) {
          blog.style.display = 'block';
        } else {
          blog.style.display = 'none';
        }
      });
    window.onload = function () {
    const savedBlogs = JSON.parse(localStorage.getItem('blogPosts')) || [];
    const savedPostsContainer = document.getElementById('saved-posts');
  
    if (savedBlogs.length === 0) {
      savedPostsContainer.innerHTML = '<p>No blogs saved yet.</p>';
    } else {
      savedBlogs.forEach((blog, index) => {
        const blogDiv = document.createElement('div');
        blogDiv.classList.add('blog-post');
  
        const title = document.createElement('h2');
        title.textContent = blog.title;
  
        const date = document.createElement('p');
        date.classList.add('date');
        date.textContent = `Posted on: ${blog.date}`;
  
        const content = document.createElement('p');
        content.textContent = blog.content.length > 100 ? `${blog.content.substring(0, 100)}...` : blog.content;
  
        if (blog.image) {
          const img = document.createElement('img');
          img.src = blog.image;
          img.alt = 'Blog Image';
          img.classList.add('blog-image');
          blogDiv.appendChild(img);
        }
  
        blogDiv.appendChild(title);
        blogDiv.appendChild(date);
        blogDiv.appendChild(content);
  
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn');
        deleteButton.addEventListener('click', function () {
          savedBlogs.splice(index, 1); 
          localStorage.setItem('blogPosts', JSON.stringify(savedBlogs)); 
          savedPostsContainer.removeChild(blogDiv); 
        });
  
        blogDiv.appendChild(deleteButton);
  
        savedPostsContainer.appendChild(blogDiv);
      });
    }
  };
  </script>
