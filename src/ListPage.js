import React, { Component } from 'react'
import {
  createFragmentContainer,
  graphql
} from 'react-relay'
import { Link } from 'react-router'
import Post from './Post'

class ListPage extends Component {
  render() {
    return (
      <div className="w-100 flex justify-center">
        <Link to="/create" className="fixed bg-white top-0 right-0 pa4 ttu dim black no-underline">
          + New post
        </Link>
        <div className="w-100" style={{maxWidth: 400}}>
          {this.props.viewer.allPosts.edges.map(({ node }) => (
              <Post key={node.__id} post={node} viewer={this.props.viewer} />
            ))}
        </div>
      </div>
    )
  }
}

export default createFragmentContainer(
  ListPage,
  graphql`
    fragment ListPage_viewer on Viewer {
      ...Post_viewer
      allPosts(last: 100, orderBy: createdAt_DESC) @connection(key: "ListPage_allPosts", filters: []) {
        edges {
          node {
            ...Post_post
          }
        }
      }
    }
  `
)
