import React, { Component, Fragment } from 'react';
import { graphql, withApollo } from 'react-apollo';
import { Button, Col, Row, Empty, Spin, Layout, Icon, Menu } from 'antd';

// components
import AddRecipeContainer from '../AddRecipeContainer';
import ViewRecipeModal from '../../components/modals/ViewRecipeModal';
import RecipeCard from '../../components/RecipeCard';

// queries
import GetAllPublishedRecipes from '../../graphql/queries/GetAllPublishedRecipes';
import GetSingleRecipe from '../../graphql/queries/GetSingleRecipe';

class AllRecipesContainer extends Component {
  state = {
    viewModalOpen: false,
    recipeData: []
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

  _handleCloseModal = () => {
    this.setState((prevState, nextProps) => ({
      viewModalOpen: false
    }));
  };

  render() {
    const { loading, recipes } = this.props.data;
    const { addModalOpen, viewModalOpen, recipeData } = this.state;
    const { Header, Content, Footer, Sider } = Layout;

    return (
      <Fragment>
        <ViewRecipeModal
          handleCloseModal={this._handleCloseModal}
          modalOpen={viewModalOpen}
          recipeData={recipeData}
        />

        <Layout className="cover">
          <Sider id="sider-menu" breakpoint="lg" collapsedWidth="0">
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['home']}>
              <Menu.Item key="home">
                <Icon type="user" />
                <span className="nav-text">Home</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }} />
            <Content style={{ margin: '24px 16px 0' }}>
              {loading ? (
                <div className="spin-container">
                  <Spin />
                </div>
              ) : recipes.length > 0 ? (
                <Row gutter={16}>
                  {recipes.map(recipe => (
                    <Col span={4} key={recipe.id}>
                      <RecipeCard
                        title={recipe.name}
                        recipeId={recipe.id}
                        content={recipe.title}
                        handleOnClick={this._handleOnClick}
                      />
                    </Col>
                  ))}
                </Row>
              ) : (
                <Empty />
              )}
              <AddRecipeContainer />
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              React prisma recipe app ©2018 Created by Brian Njenga
            </Footer>
          </Layout>
        </Layout>
      </Fragment>
    );
  }
}

export default graphql(GetAllPublishedRecipes)(withApollo(AllRecipesContainer));
