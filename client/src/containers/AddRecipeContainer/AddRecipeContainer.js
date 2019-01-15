import React, { Component, Fragment } from 'react';
import { graphql } from 'react-apollo';
import { notification, Button } from 'antd';

// components
import AddRecipeModal from '../../components/modals/AddRecipeModal';

// mutations
import AddNewRecipe from '../../graphql/mutations/AddNewRecipe';
import GetAllPublishedRecipes from '../../graphql/queries/GetAllPublishedRecipes';

const initialState = {
  form: {
    name: '',
    text: '',
    title: '',
    published: false
  },
  notification: {
    notificationOpen: false,
    message: '',
    title: '',
    type: ''
  },
  modalOpen: false
};

class AddRecipeContainer extends Component {
  state = initialState;

  _handleOpenModal = () => {
    this.setState((prevState, nextProps) => ({
      modalOpen: true
    }));
  };

  _handleCloseModal = () => {
    this.setState((prevState, nextProps) => ({
      modalOpen: false
    }));
  };

  _handleChange = event => {
    event.persist();

    this.setState((prevState, nextProps) => ({
      form: { ...prevState.form, [event.target.name]: event.target.value }
    }));
  };

  _handleChecked = checked => {
    this.setState((prevState, nextProps) => ({
      form: { ...prevState.form, published: checked }
    }));
  };

  _handleSubmit = event => {
    const { name, text, title, published } = this.state.form;

    this.props
      .mutate({
        variables: {
          name,
          title,
          text,
          published
        },
        refetchQueries: [
          {
            query: GetAllPublishedRecipes
          }
        ]
      })
      .then(res => {
        if (res.data.createRecipe.id) {
          this.setState((prevState, nextProps) => ({
            notification: {
              notificationOpen: true,
              type: 'success',
              message: `recipe ${name} added successfully`,
              title: 'Success'
            },
            modalOpen: false
          }));
        }
      })
      .catch(e => {
        this.setState((prevState, nextProps) => ({
          notification: {
            ...prevState.notification,
            notificationOpen: false,
            type: 'error',
            message: e.message,
            title: 'Error Occured'
          }
        }));
      });
  };

  render() {
    const { modalOpen } = this.state;
    const { notificationOpen, title, message, type } = this.state.notification;

    return (
      <Fragment>
        <AddRecipeModal
          handleCloseModal={this._handleCloseModal}
          modalOpen={modalOpen}
          handleSubmit={this._handleSubmit}
          handleChecked={this._handleChecked}
          handleChange={this._handleChange}
          {...this.state.form}
        />
        <div className="fab-container">
          <Button
            type="primary"
            shape="circle"
            icon="plus"
            size="large"
            onClick={this._handleOpenModal}
          />
        </div>
        {notificationOpen &&
          notification[type]({
            message: title,
            description: message
          })}
      </Fragment>
    );
  }
}

export default graphql(AddNewRecipe)(AddRecipeContainer);
