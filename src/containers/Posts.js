import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { API, Storage } from "aws-amplify";
import LoaderButton from "../components/LoaderButton";
import { s3Upload } from "../libs/awsLib";
import AwsConfig from "../util/AwsConfig";
import "./Posts.css";

export default class Posts extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      isLoading: null,
      isDeleting: null,        
      post: null,
      content: "",
      attachmentURL: null
    };
  }

  async componentDidMount() {
    try {
      let attachmentURL;
      const post = await this.getPost();
      const { content } = post;

      // if (attachment) {
      //   attachmentURL = await Storage.vault.get(attachment);
      // }

      this.setState({
        post,
        content,
        attachmentURL
      });
    } catch (e) {
      alert(e);
    }
  }

  getPost() {
    console.log('this.props: ' + this.props);
    console.log('JSON stringify: ' + JSON.stringify(this.props));
    console.log('this.props.id: ' + this.props.id);
    alert('make request');
    return API.get("community-posts", `/community-posts/${this.props.id}`);
  }

  validateForm() {
    return this.state.content.length > 0;
  }
  
  formatFilename(str) {
    return str.replace(/^\w+-/, "");
  }
  
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  
  handleFileChange = event => {
    this.file = event.target.files[0];
  }
  
  savePost(post) {
    return API.put("community-posts", `/community-posts/${this.props.id}`, {
      body: post
    });
  }
  
  handleSubmit = async event => {
    let attachment;
  
    event.preventDefault();
  
    if (this.file && this.file.size > AwsConfig.MAX_ATTACHMENT_SIZE) {
      alert(`Please pick a file smaller than ${AwsConfig.MAX_ATTACHMENT_SIZE/1000000} MB.`);
      return;
    }
  
    this.setState({ isLoading: true });
  
    try {
      if (this.file) {
        attachment = await s3Upload(this.file);
      }
  
      await this.savePost({
        content: this.state.content,
        attachment: attachment || this.state.post.attachment
      });
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }
  
  deletePost() {
    return API.del("community-posts", `/community-posts/${this.props.id}`);
  }
  
  handleDelete = async event => {
    event.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmed) {
      return;
    }

    this.setState({ isDeleting: true });
  
    try {
      await this.deletePost();
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isDeleting: false });
    }
  }
  
  render() {
    return (
      <div className="Posts">
        {this.state.post &&
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="content">
              <FormControl
                onChange={this.handleChange}
                value={this.state.content}
                componentClass="textarea"
              />
            </FormGroup>
            {this.state.post.attachment &&
              <FormGroup>
                <ControlLabel>Attachment</ControlLabel>
                <FormControl.Static>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={this.state.attachmentURL}
                  >
                    {this.formatFilename(this.state.post.attachment)}
                  </a>
                </FormControl.Static>
              </FormGroup>}
            <FormGroup controlId="file">
              {!this.state.post.attachment &&
                <ControlLabel>Attachment</ControlLabel>}
              <FormControl onChange={this.handleFileChange} type="file" />
            </FormGroup>
            <LoaderButton
              block
              bsStyle="primary"
              bsSize="large"
              disabled={!this.validateForm()}
              type="submit"
              isLoading={this.state.isLoading}
              text="Save"
              loadingText="Saving…"
            />
            <LoaderButton
              block
              bsStyle="danger"
              bsSize="large"
              isLoading={this.state.isDeleting}
              onClick={this.handleDelete}
              text="Delete"
              loadingText="Deleting…"
            />
          </form>}
      </div>
    );
  }

}