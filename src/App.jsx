import React, { Component } from 'react';


const withLikeLogic = (WrappedComponent) => {
  return class WithLikeLogic extends Component {
    constructor(props) {
      super(props);
      this.state = {
        likes: 0,
      };
    }

    handleLike = () => {
      this.setState((prevState) => ({ likes: prevState.likes + 1 }));
    };

    render() {
      return (
        <WrappedComponent
          likes={this.state.likes}
          handleLike={this.handleLike}
          {...this.props}
        />
      );
    }
  };
};

// Render Props example
class LikeLogic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: 0,
    };
  }

  handleLike = () => {
    this.setState((prevState) => ({ likes: prevState.likes + 1 }));
  };

  render() {
    return this.props.children({
      likes: this.state.likes,
      handleLike: this.handleLike,
    });
  }
}

// Component using HOC
class LikeImageWithHOC extends Component {
  render() {
    return (
      <div>
        <h2>Like Image with HOC</h2>
        <p>Likes: {this.props.likes}</p>
        <button onClick={this.props.handleLike}>Like Image</button>
      </div>
    );
  }
}

// Component using Render Props
class LikeImageWithRenderProps extends Component {
  render() {
    return (
      <LikeLogic>
        {({ likes, handleLike }) => (
          <div>
            <h2>Like Image with Render Props</h2>
            <p>Likes: {likes}</p>
            <button onClick={handleLike}>Like Image</button>
          </div>
        )}
      </LikeLogic>
    );
  }
}

// Usage of components
const App = () => {
  const LikeImageHOC = withLikeLogic(LikeImageWithHOC);

  return (
    <div>
      <h1>Combined Example</h1>
      <LikeImageHOC />
      <LikeImageWithRenderProps />
    </div>
  );
};

export default App;
