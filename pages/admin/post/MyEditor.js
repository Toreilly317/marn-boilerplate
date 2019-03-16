import React, { useState } from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'

const PostEditor = props => {
  const [state, setState] = useState({ editorState: EditorState.createEmpty() })

  const onChange = editorState => setState({ editorState })

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      onChange(newState)
      return 'handled'
    }
    return 'not-handled'
  }

  const onBoldClick = () => {
    onChange(RichUtils.toggleInlineStyle(state.editorState, 'BOLD'))
  }

  return (
    <div>
      <button type="button" onClick={onBoldClick}>Bold
      </button>
      <Editor
        editorState={state.editorState}
        handleKeyCommand={handleKeyCommand}
        onChange={onChange}
      />
    </div>
  )
}

export default PostEditor
