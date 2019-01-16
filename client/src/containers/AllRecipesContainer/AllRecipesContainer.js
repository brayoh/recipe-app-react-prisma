import React, { Component, Fragment } from 'react';
import { graphql, compose, withApollo } from 'react-apollo';
import { Card, Col, Row, Empty, Spin, Button, notification } from 'antd';

// components
import ViewRecipeModal from '../../components/modals/ViewRecipeModal';
import AddRecipeModal from '../../components/modals/AddRecipeModal';
import RecipeCard from '../../components/RecipeCard';

// queries
import GetAllPublishedRecipes from '../../graphql/queries/GetAllPublishedRecipes';
import GetSingleRecipe from '../../graphql/queries/GetSingleRecipe';

// mutations
import UpdateRecipe from '../../graphql/mutations/UpdateRecipe';
import AddNewRecipe from '../../graphql/mutations/AddNewRecipe';
import SideBar from '../../components/SideBar/SideBar';

const initialState = {
  form: {
    directions: '',
    ingredients: '',
    title: '',
    published: false
  },
  notification: {
    notificationOpen: false,
    message: '',
    title: '',
    type: ''
  },
  viewModalOpen: false,
  addModalOpen: false,
  recipeData: {},
  recipeId: '',
  isEditing: false
};

class AllRecipesContainer extends Component {
  state = initialState;

  _handleResetState = () => {
    this.setState({ ...initialState });
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

  _handleOnClick = recipeId => {
    this.props.client
      .query({
        query: GetSingleRecipe,
        variables: {
          recipeId
        }
      })
      .then(res => {
        this.setState((prevState, nextProps) => ({
          viewModalOpen: true,
          recipeData: res.data.recipe
        }));
      });
  };

  _handleOpenAddModal = () => {
    this.setState((prevState, nextProps) => ({
      addModalOpen: true
    }));
  };

  _handleOnEdit = ({ id, directions, ingredients, title, published }) => {
    this.setState((prevState, nextProps) => ({
      form: {
        directions,
        ingredients,
        title,
        published
      },
      modalOpen: true,
      isEditing: true,
      recipeId: id
    }));
  };

  _handleCloseModal = () => {
    this.setState((prevState, nextProps) => ({
      viewModalOpen: false,
      isEditing: false,
      addModalOpen: false
    }));
  };

  _updateRecipe = ({
    id,
    directions,
    ingredients,
    title,
    published,
    action
  }) => {
    this.props
      .updateRecipeMutation({
        variables: {
          id,
          directions,
          title,
          ingredients,
          published
        },
        refetchQueries: [
          {
            query: GetAllPublishedRecipes
          }
        ]
      })
      .then(res => {
        if (res.data.updateRecipe.id) {
          this.setState(
            (prevState, nextProps) => ({
              isEditing: false
            }),
            () =>
              this.setState(
                (prevState, nextProps) => ({
                  notification: {
                    notificationOpen: true,
                    type: 'success',
                    message: `recipe ${title} ${action} successfully`,
                    title: 'Success'
                  }
                }),
                () => this._handleResetState()
              )
          );
        }
      })
      .catch(e => {
        this.setState((prevState, nextProps) => ({
          notification: {
            ...prevState.notification,
            notificationOpen: true,
            type: 'error',
            message: e.message,
            title: 'Error Occured'
          }
        }));
      });
  };

  _handleOnDelete = ({ id, directions, ingredients, title }) => {
    this._updateRecipe({
      id,
      directions,
      ingredients,
      title,
      published: false,
      action: 'deleted'
    });
  };

  _handleSubmit = event => {
    const { directions, ingredients, title, published } = this.state.form;
    const { recipeId, isEditing } = this.state;

    if (isEditing) {
      this._updateRecipe({
        id: recipeId,
        directions,
        ingredients,
        title,
        published,
        action: 'edited'
      });
    } else {
      this.props
        .addNewRecipeMutation({
          variables: {
            directions,
            title,
            ingredients,
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
            this.setState(
              (prevState, nextProps) => ({
                addModalOpen: false
              }),
              () =>
                this.setState(
                  (prevState, nextProps) => ({
                    notification: {
                      notificationOpen: true,
                      type: 'success',
                      message: `recipe ${title} added successfully`,
                      title: 'Success'
                    }
                  }),
                  () => this._handleResetState()
                )
            );
          }
        })
        .catch(e => {
          this.setState((prevState, nextProps) => ({
            notification: {
              ...prevState.notification,
              notificationOpen: true,
              type: 'error',
              message: e.message,
              title: 'Error Occured'
            }
          }));
        });
    }
  };

  _renderNotification = () => {
    const { notificationOpen, type, title, message } = this.state.notification;

    if (notificationOpen) {
      notification[type]({
        message: title,
        description: message
      });
    }
  };
  render() {
    const { loading, recipes } = this.props.data;
    const { viewModalOpen, recipeData, isEditing, addModalOpen } = this.state;

    return (
      <Fragment>
        <ViewRecipeModal
          handleCloseModal={this._handleCloseModal}
          modalOpen={viewModalOpen}
          recipe={recipeData}
        />

        <SideBar>
          {loading ? (
            <div className="spin-container">
              <Spin />
            </div>
          ) : recipes.length > 0 ? (
            <Row gutter={16}>
              {recipes.map(recipe => (
                <Col span={6} key={recipe.id}>
                  <RecipeCard
                    title={recipe.title}
                    content={
                      <Fragment>
                        <Card
                          type="inner"
                          title="Ingredients"
                          style={{ marginBottom: '15px' }}
                        >
                          {`${recipe.ingredients.substring(0, 50)}.....`}
                        </Card>
                        <Card type="inner" title="Directions">
                          {`${recipe.directions.substring(0, 50)}.....`}
                        </Card>
                      </Fragment>
                    }
                    handleOnClick={this._handleOnClick}
                    handleOnEdit={this._handleOnEdit}
                    handleOnDelete={this._handleOnDelete}
                    {...recipe}
                  />
                </Col>
              ))}
            </Row>
          ) : (
            <Empty />
          )}
          <AddRecipeModal
            modalOpen={addModalOpen || isEditing}
            handleCloseModal={this._handleCloseModal}
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
              onClick={this._handleOpenAddModal}
            />
          </div>
          {this._renderNotification()}
        </SideBar>
      </Fragment>
    );
  }
}

export default compose(
  graphql(UpdateRecipe, { name: 'updateRecipeMutation' }),
  graphql(AddNewRecipe, { name: 'addNewRecipeMutation' }),
  graphql(GetAllPublishedRecipes)
)(withApollo(AllRecipesContainer));
