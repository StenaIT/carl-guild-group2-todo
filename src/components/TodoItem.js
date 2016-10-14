import React from 'react';

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>{this.props.item.description}</div>
  }
}

TodoItem.propTypes = {
  item: React.PropTypes.object.isRequired,
  key: React.PropTypes.number
};

export default TodoItem;
