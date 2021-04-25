import React from "react";
import axios from "axios";
import './App.scss';

class App extends React.Component {

  // state = {
  //   title: '',
  //   body: ''
  // };
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      posts: []
    };
  }

  getBlogPost = () => {
    axios.get('/api')
      .then((response) => {
        const data = response.data;
        this.setState({posts: data});
      })
      .catch(() => {
        alert("There was an error retrieving that data.");
      })
  }

  handleChange = (event) => {
  // handleChange = ({ target }) => {
  //    const{ name, value } = target;
  // above replaces the next three lines
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({ [name]: value });
  };

  submitForm = (event) => {
    event.preventDefault();

    const payload = {
      title: this.state.title,
      body: this.state.body
    };

    axios({
      url: '/api/save',
      method: 'POST',
      data: payload
    })
    .then(() => {
      console.log('Data has been sent to the server.');
      this.resetFields();
      this.getBlogPost();
    })
    .catch(() => {
      console.log('Server error! Lore must have sabotaged it!');
    });
  }

  resetFields = () => {
    this.setState({
      title: '',
      body: ''
    });
  }

  displayBlogPost = (posts) => {
    if (!posts.length) return null;

    return posts.map((post, index) => (
      <div key={index} className="row">
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ));
  };

  componentDidMount = () => {
    this.getBlogPost();
  }

  render() {
    console.log('State: ', this.state);
    return(
      <div className="container">
        <div className="row">
          <h2>Welcome to My App!</h2>
        </div>
        <div className="row">
          <form onSubmit={this.submitForm}>
            <div className="form-group">
              <input type="text" name="title" value={this.state.title} placeholder="Post Title" className="form-control" onChange={this.handleChange} />
            </div>
            <div className="form-group">
              <textarea name="body" id="blogcontent" value={this.state.body} placeholder="Write your post..." className="form-control" onChange={this.handleChange}></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Post It!</button>
          </form>
        </div>
        <div className="blog-posts container">
          {this.displayBlogPost(this.state.posts)}
        </div>
      </div>
    );
  }
}

export default App;
