import React from 'react';

class TodoItem extends React.Component {
  constructor(props) {
    super(props);

    this.onChecked = this.onChecked.bind(this);
  }

  onChecked(e) {
    this.props.onChecked({
      description: this.props.item.description,
      done: this.props.item.done
    }, {
      description: this.props.item.description,
      done: !this.props.item.done
    });
  }

  render() {
    let inputItem;
    if (this.props.item.done) {
      inputItem = <input type="checkbox" onChange={this.onChecked} checked />;
    } else {
      inputItem = <input type="checkbox" onChange={this.onChecked} />
    }
    return <div className="itemRow"><div className="checkBoxDiv">{inputItem}<span className="description">{this.props.item.description}</span></div></div>
  }
}

TodoItem.propTypes = {
  item: React.PropTypes.object.isRequired,
  key: React.PropTypes.number,
  onChecked: React.PropTypes.func.isRequired
};

export default TodoItem;
