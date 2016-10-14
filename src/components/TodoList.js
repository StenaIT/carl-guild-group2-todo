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
          return <TodoItem item={item} key={key} />;
        })}
      </div>
    );
  }
}

TodoList.propTypes = {
  items: React.PropTypes.array
};

TodoList.defaultProps = {
  items: {}
};

export default TodoList;
