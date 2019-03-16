import React, { useState } from 'react'

import AdminLayout from '../../../CMS/Layout/Layout'

const CreatePostPage = () => {
  const [state, setState] = useState({
    title: '',
    body: '',
    image: '',
  })

  const handleOnChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }

  const handleFileInput = e => {
    const imageFile = e.target.files[0]
    console.log(imageFile)

    setState({
      ...state,
      file: imageFile,
    })
  }

  const clearForm = () => {
    setState({})
  }

  const handleOnSubmit = e => {
    e.preventDefault()
    console.log(state)
  }

  return (
    <AdminLayout>
      <h1>Create Post</h1>
      <form onSubmit={e => handleOnSubmit(e)}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={state.title}
          onChange={e => handleOnChange(e)}
        />
        <textarea
          type="text"
          name="body"
          placeholder="Post Body..."
          value={state.body}
          onChange={e => handleOnChange(e)}
        />
        <input type="file" name="image" onChange={e => handleFileInput(e)} />
        <button type="submit">Save</button>
        <button type="button" onClick={() => clearForm()}>





          Clear
        </button>
      </form>
    </AdminLayout>
  )
}

export default CreatePostPage
