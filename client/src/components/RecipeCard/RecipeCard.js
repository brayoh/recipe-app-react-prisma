import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';

const RecipeCard = ({ title, content, recipeId, handleOnClick }) => {
  return (
    <Card
      hoverable
      title={title}
      bordered={false}
      extra={<p onClick={() => handleOnClick(recipeId)}>View</p>}
      style={{
        marginBottom: '50px'
      }}
    >
      {content}
    </Card>
  );
};

export default RecipeCard;
