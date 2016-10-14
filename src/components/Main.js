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
    this.socket.on('new:item', this.itemAdded);
  }

  initialize(items) {
    this.setState({
      todoItems: items
    });
  }

  itemAdded(newItems) {
    this.setState({
      todoItems: newItems
    });
  }

  addItem(item) {
    console.log('Adding: ' + JSON.stringify(item));
    this.socket.emit('add:item', item);
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