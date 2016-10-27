import React from 'react';
import Uuid from 'node-uuid';

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
    this.props.addItem({
      todoId: Uuid.v4(),
      description: this.state.inputDescription,
      done: false
    });
    this.setState({
      inputDescription: ''
    });
  }

  render() {
    return (
      <div className="form-group formContainer">
          <label className="control-label">Add item</label>
          <div className="input-group">
            <span className="input-group-addon"></span>
            <input type="text" className="form-control" placeholder="Enter text"
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            value={this.state.inputDescription} />
            <span className="input-group-btn">
              <button className="btn btn-default" type="button" onClick={this.addTodoItem}>Add</button>
            </span>
          </div>
        </div>
    );
  }
}

SubmitForm.propTypes = {
  addItem: React.PropTypes.func.isRequired
};

export default SubmitForm;
