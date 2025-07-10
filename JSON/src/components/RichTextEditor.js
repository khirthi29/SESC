import React, { Component, useState } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


 
export default function RichTextEditor(props) {

  const [state, setState] = useState(EditorState.createEmpty())
  const onEditorStateChange = state =>{ setState(state) }

  return (
    <Editor
    name={props.name}
    editorState={state}
    toolbarClassName="toolbarClassName"
    wrapperClassName="wrapperClassName"
    editorClassName="editorClassName"
    onEditorStateChange={onEditorStateChange}

  />
  )
}

/* class RichTextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={this.onEditorStateChange}
      />
    )
  }
}

export default RichTextEditor */