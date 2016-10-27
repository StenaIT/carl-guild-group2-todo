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
    return <div className="itemRow"><div className="checkBoxDiv"><input type="checkbox" onChange={this.onChecked} /><span className="description">{this.props.item.description}</span></div></div>
  }
}

TodoItem.propTypes = {
  item: React.PropTypes.object.isRequired,
  key: React.PropTypes.number
};

export default TodoItem;
