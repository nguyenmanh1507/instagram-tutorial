import React, { Component } from 'react'
import {
  QueryRenderer,
  graphql,
} from 'react-relay'
import { withRouter } from 'react-router'
import environment from './Environment'
import CreatePostMutation from './CreatePostMutation'

const CreatePageViewerQuery = graphql`
  query CreatePageViewerQuery {
    viewer {
      id
    }
  }
`

class CreatePage extends Component {
  state = {
    description: '',
    imageUrl: '',
  }

  _handlePost = (viewerId) => {
    const { description, imageUrl } = this.state
    CreatePostMutation(description, imageUrl, viewerId, () => this.props.router.replace('/'))
  }

  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={CreatePageViewerQuery}
        render={({error, props}) => {
          if (error) {
            return <div>{error.message}</div>
          } else if (props) {
            return (
              <div className="w-100 pa4 flex justify-center">
                <div style={{maxWidth: 400}}>
                  <input type="text"
                    className="w-100 pa3 mv2"
                    value={this.state.description}
                    placeholder="Description"
                    onChange={(e) => this.setState({description: e.target.value})}
                  />
                  <input type="text"
                    className="w-100 pa3 mv2"
                    value={this.state.imageUrl}
                    placeholder="Image Url"
                    onChange={(e) => this.setState({imageUrl: e.target.value})}
                  />
                  {this.state.imageUrl && (
                    <img src={this.state.imageUrl} className="w-100 mv3" alt={this.state.description} />
                  )}
                  {this.state.description && this.state.imageUrl && (
                    <button className="pa3 bg-black-10 bn dim ttu pointer" onClick={() => this._handlePost(props.viewer.id)}>Post</button>
                  )}
                </div>
              </div>
            )
          }

          return <div>Loading...</div>
        }}
      />
    )
  }
}

export default withRouter(CreatePage)
