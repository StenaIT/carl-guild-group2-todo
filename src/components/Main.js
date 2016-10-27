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
    this.updateItem = this.updateItem.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  componentDidMount() {
    this.socket.on('init', this.setItems);
    this.socket.on('item:added', this.setItems);
    this.socket.on('item:deleted', this.setItems);
    this.socket.on('item:updated', this.setItems);
    this.socket.on('error', this.handleError);
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

  updateItem(before, after) {
    console.log('Updating: ' + JSON.stringify(before) + '\n' + JSON.stringify(after));
    this.socket.emit('item:update', before, after);
  }

  handleError(error) {
    console.log(error);
  }

  render() {
    return (
      <div className="container">
        <TodoList updateItem={this.updateItem} items={this.state.todoItems} deleteItem={this.deleteItem} />
        <SubmitForm addItem={this.addItem} />
      </div>
    );
  }
}

export default Main;
