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
    this.setItems = this.setItems.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  componentDidMount() {
    this.socket.on('init', this.setItems);
    this.socket.on('item:new', this.setItems);
    this.socket.on('item:deleted', this.setItems);
  }

  initialize(items) {
    this.setState({
      todoItems: items
    });
  }

  setItems(items) {
    this.setState({
      todoItems: items
    });
  }

  addItem(item) {
    console.log('Adding: ' + JSON.stringify(item));
    this.socket.emit('item:add', item);
  }

  deleteItem(item) {
    console.log('Deleting: ' + JSON.stringify(item));
    this.socket.emit('item:delete', item);
  }

  render() {
    return (
      <div className="container">
        <TodoList items={this.state.todoItems} deleteItem={this.deleteItem} />
        <SubmitForm addItem={this.addItem} />
      </div>
    );
  }
}

export default Main;
