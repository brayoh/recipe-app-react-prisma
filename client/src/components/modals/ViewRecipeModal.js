import React from 'react';
import { Modal } from 'antd';

const ViewRecipeModal = ({ modalOpen, recipeData, handleCloseModal }) => (
  <Modal
    title={`${recipeData.name} - ${recipeData.title}`}
    centered
    visible={modalOpen}
    onOk={handleCloseModal}
    onCancel={handleCloseModal}
  >
    <p>{recipeData.text}</p>
  </Modal>
);

export default ViewRecipeModal;
