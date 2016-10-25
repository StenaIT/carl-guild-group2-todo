import React from 'react';

class TodoItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      done: false
    };

    this.onChecked = this.onChecked.bind(this);
  }

  onChecked(e) {
    this.setState({
      done: e.target.checked
    });
  }

  render() {
    return <div><input type="checkbox" onChange={this.onChecked} />{this.props.item.description}</div>
  }
}

TodoItem.propTypes = {
  item: React.PropTypes.object.isRequired,
  key: React.PropTypes.number
};

export default TodoItem;
