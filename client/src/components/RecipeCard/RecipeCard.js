import React, { Fragment } from 'react';
import { Popconfirm, Card, Icon } from 'antd';

const RecipeCard = ({
  title,
  content,
  id,
  handleOnClick,
  handleOnEdit,
  handleOnDelete,
  directions,
  ingredients,
  published
}) => {
  return (
    <Card
      // hoverable
      title={title}
      bordered={false}
      extra={
        <Fragment>
          <span
            className="pointer"
            onClick={() =>
              handleOnEdit({ id, directions, ingredients, title, published })
            }
          >
            <Icon
              style={{
                fontSize: '1.25rem',
                color: '#08c',
                marginRight: '0.625rem'
              }}
              type="edit"
            />
          </span>
          <Popconfirm
            title="Are you sure delete this recipe?"
            onConfirm={() =>
              handleOnDelete({
                id,
                directions,
                ingredients,
                title
              })
            }
            okText="Yes"
            cancelText="No"
          >
            <span className="pointer">
              <Icon
                style={{
                  fontSize: '1.25rem',
                  color: '#08c',
                  marginRight: '0.625rem'
                }}
                type="delete"
              />
            </span>
          </Popconfirm>
          <span className="pointer">
            <Icon
              style={{
                fontSize: '1.25rem',
                color: '#08c'
              }}
              type="eye"
              onClick={() => handleOnClick(id)}
            />
          </span>
        </Fragment>
      }
      style={{
        marginBottom: '50px'
      }}
    >
      {content}
    </Card>
  );
};

export default RecipeCard;
