import React from 'react';
import TodoItem from './TodoItem';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.items.map((item, key) => {
          return <TodoItem onChecked={this.props.updateItem} item={item} key={key} />;
        })}
      </div>
    );
  }
}

TodoList.propTypes = {
  items: React.PropTypes.array,
  updateItem: React.PropTypes.func.isRequired
};

TodoList.defaultProps = {
  items: []
};

export default TodoList;
