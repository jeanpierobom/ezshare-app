import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { API } from "aws-amplify";

import { s3Upload } from "../libs/awsLib";
import LoaderButton from "../components/LoaderButton";
import AwsConfig from "../util/AwsConfig";
import "./NewPost.css";
import { navigate } from "@reach/router";

export default class NewPost extends Component {
  constructor(props) {
    super(props);

    this.file = null;

    this.state = {
      isLoading: null,
      content: ""
    };
  }

  validateForm() {
    return this.state.content.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleFileChange = event => {
    this.file = event.target.files[0];
  }

  handleSubmit = async event => {
    event.preventDefault();
  
    if (this.file && this.file.size > AwsConfig.MAX_ATTACHMENT_SIZE) {
      alert(`Please pick a file smaller than ${AwsConfig.MAX_ATTACHMENT_SIZE/1000000} MB.`);
      return;
    }
  
    this.setState({ isLoading: true });
  
    try {
      const attachment = this.file
        ? await s3Upload(this.file)
        : null;
  
      await this.createPost({
        attachment,
        content: this.state.content
      });
      navigate("/")
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }
  
  createPost(post) {
    return API.post("community-posts", "/community-posts", {
      body: post
    });
  }

  render() {
    return (
      <div className="NewPost">
        <h2>New Community Post</h2>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="content">
            <FormControl
              onChange={this.handleChange}
              value={this.state.content}
              componentClass="textarea"
            />
          </FormGroup>
          <FormGroup controlId="file">
            <ControlLabel>Attachment</ControlLabel>
            <FormControl onChange={this.handleFileChange} type="file" />
          </FormGroup>
          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Create"
            loadingText="Creating…"
          />
        </form>
      </div>
    );
  }
}