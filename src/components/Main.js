import React from 'react';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>Hello from {this.props.sender}</div>
      </div>
    );
  }
}

export default Main;
