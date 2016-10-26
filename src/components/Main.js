import React from 'react';
import io from 'socket.io-client';
import TodoList from './TodoList';
import SubmitForm from './SubmitForm';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.socket = io();
    this.state = {
      todoItems: []
    };
    this.setupBindings();
  }

  setupBindings() {
    this.initialize = this.initialize.bind(this);
    this.itemAdded = this.itemAdded.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  componentDidMount() {
    this.socket.on('init', this.initialize);
    this.socket.on('item:new', this.itemAdded);
  }

  initialize(items) {
    this.setState({
      todoItems: items
    });
  }

  itemAdded(newItems) {
    console.log('New item added');
    // this.setState({
    //   todoItems: newItems
    // });
  }

  addItem(item) {
    console.log('Adding: ' + JSON.stringify(item));
    this.socket.emit('item:add', item, 'todo');
  }

  render() {
    return (
      <div>
        <TodoList items={this.state.todoItems} />
        <SubmitForm addItem={this.addItem} />
      </div>
    );
  }
}

export default Main;
