// const api = `http://localhost:3005/blogpost/blogposts`;

window.addEventListener('load', () => {
  console.log("Ready to AJAX")

  const blogpostTitleListEl = document.querySelector('#blogpost-title-list');
  const mainPanelEl = document.querySelector('#main-panel');
  const baseURL = `http://localhost:3005/blogposts`

  const createBlogpost = event => {
    event.preventDefault()
    const title = document.querySelector('#input-title').value
    const content = document.querySelector('#textarea-content').value
    axios.post(baseURL, { title, content})
      .then(response => {
        loadTitles();
        showBlogPost(response.data)
      })
      .catch(error => console.error(error))
  }

  const editBlogpost = blogpost => {
    mainPanelEl.innerHTML = `
      <h3>Edit Blog Post</h3>
      <form>
        <label for="title">Title: </label>
        <input type="text" name="title" id="input-title-edit" /> <br></br>
        <label for="content">Content: </label>
        <textarea name="content" id="textarea-content-edit"></textarea>
        <button id="update-button">Edit</button>
      </form>
    `
    document.querySelector('#input-title-edit').value = blogpost.title;
    document.querySelector('#textarea-content-edit').value = blogpost.content
    document.querySelector('#update-button').addEventListener('click',
  () => { updateBlogpost(blogpost)})
  }

  const deleteBlogpost = blogpost => {
    axios.delete(`${baseURL}/${blogpost.id}`)
      .then(response => {
        loadTitles();
        mainPanelEl.innerHTML = '';
      })
      .catch((error) => console.error(error))
  }

  const newBlogPost = () => {
    mainPanelEl.innerHTML = `
      <h3>New Blogpost</h3>
      <form>
        <label for="title">Title: </label>
        <input type="text" name="title" id="input-title" /> <br></br>
        <label for="content" id="">Content</label>
        <textarea name="content" id="textarea-content"></textarea>
        <button id="create-button">Create</button>
      </form>
    `
    document.querySelector('#create-button').addEventListener('click', createBlogpost);
  }

  const updateBlogpost = blogpost => {
    event.preventDefault();
    const title = document.querySelector('#input-title-edit').value;
    const content = document.querySelector('#textarea-content-edit').value;
    axios.put(`${baseURL}/${blogpost.id}/`, {title, content})
      .then(response => {
        loadTitles()
        showBlogPost(response.data)
      })
      .catch(error => console.error(error));
  }

  const showBlogPost = blogpost => {
    mainPanelEl.innerHTML = '';
    const focusTitleEl = document.createElement('h3');
    const focusContentEl = document.createElement('p');
    focusTitleEl.innerHTML = blogpost.title;
    focusContentEl.innerHTML = blogpost.content;
    const editButtonEl = document.createElement('button')
    const deleteButtonEl = document.createElement('button')
    editButtonEl.id = "edit-button"
    deleteButtonEl.id = "delete-button"
    editButtonEl.innerHTML = "Edit"
    deleteButtonEl.innerHTML = "Delete"
    mainPanelEl.appendChild(focusTitleEl)
    mainPanelEl.appendChild(focusContentEl)
    mainPanelEl.appendChild(editButtonEl)
    mainPanelEl.appendChild(deleteButtonEl)

    document.querySelector('#edit-button').addEventListener('click', () => {
      editBlogpost(blogpost);
    })
    document.querySelector('#delete-button').addEventListener('click', () => {
      deleteBlogpost(blogpost);
    })
  }

  const loadTitles = () => {
    axios.get(`http://localhost:3005/blogposts`)
      .then( response => {
        blogpostTitleListEl.innerHTML = ""
        response.data.forEach( blogpost => {
        const blogpostTitleEl = document.createElement('li');
        blogpostTitleEl.innerHTML = blogpost.title;
        blogpostTitleListEl.appendChild(blogpostTitleEl);
        blogpostTitleEl.addEventListener('click', () => showBlogPost(blogpost))
      })
    })
    .catch( error => console.error(error));
  }

  loadTitles();
  document.querySelector('#new-blogpost').addEventListener('click', newBlogPost)
})
