import React from 'react';

class SubmitForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputDescription: ''
    };

    this.setupBindings();
  }

  setupBindings() {
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.addTodoItem = this.addTodoItem.bind(this);
  }

  handleChange(event) {
    this.setState({inputDescription: event.target.value});
    event.preventDefault();
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.addTodoItem();
    }
  }

  addTodoItem() {
    this.props.addItem({description: this.state.inputDescription});
    this.setState({
      inputDescription: ''
    });
  }

  render() {
    return (
      <div>
      <input type="text" placeholder="Enter text"
        onChange={this.handleChange}
        onKeyPress={this.handleKeyPress}
        value={this.state.inputDescription} />
      <button onClick={this.addTodoItem}>Add</button>
      </div>
    );
  }
}

SubmitForm.propTypes = {
  addItem: React.PropTypes.func.isRequired
};

export default SubmitForm;
