import React from 'react';
import { Card, Modal } from 'antd';

const ViewRecipeModal = ({ modalOpen, recipe, handleCloseModal }) => (
  <Modal
    title={recipe.title}
    centered
    visible={modalOpen}
    onOk={handleCloseModal}
    onCancel={handleCloseModal}
  >
    <Card type="inner" title="Ingredients" style={{ marginBottom: '15px' }}>
      {recipe.ingredients}
    </Card>
    <Card type="inner" title="Directions">
      {recipe.directions}
    </Card>
  </Modal>
);

export default ViewRecipeModal;
