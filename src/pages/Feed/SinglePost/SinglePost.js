import React, { Component } from 'react';

import Image from '../../../components/Image/Image';
import './SinglePost.css';

class SinglePost extends Component {
  state = {
    title: '',
    author: '',
    date: '',
    image: '',
    content: '',
  };

  componentDidMount() {
    const postId = this.props.match.params.postId;
    const graphqlQuery = {
      query: ` {
        loadSinglePost(postId: "${postId}") {
         title
         creator {
           name
           }
          createdAt 
          content
          imageUrl
         }
        }
      `,
    };
    fetch('http://localhost:8080/graphql', {
      method: 'POST',
      body: JSON.stringify(graphqlQuery),
      headers: {
        Authorization: `Bearer ${this.props.token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        if (resData.errors) {
          throw new Error(' Single post fetch failed');
        }
        const {
          data: { loadSinglePost },
        } = resData;
        this.setState({
          title: loadSinglePost.title,
          author: loadSinglePost.creator.name,
          image: 'http://localhost:8080/' + loadSinglePost.imageUrl,
          date: new Date(loadSinglePost.createdAt).toLocaleDateString('en-US'),
          content: loadSinglePost.content,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <section className="single-post">
        <h1>{this.state.title}</h1>
        <h2>
          Created by {this.state.author} on {this.state.date}
        </h2>
        <div className="single-post__image">
          <Image contain imageUrl={this.state.image} />
        </div>
        <p>{this.state.content}</p>
      </section>
    );
  }
}

export default SinglePost;
