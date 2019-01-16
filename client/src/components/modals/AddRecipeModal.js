import React from 'react';
import { Modal, Form, Input, Switch } from 'antd';

const formItemLayout = { labelCol: { span: 5 }, wrapperCol: { span: 14 } };

const AddRecipeModal = ({
  modalOpen,
  handleSubmit,
  handleCloseModal,
  handleChecked,
  handleChange,
  title,
  ingredients,
  directions,
  published,
  ...props
}) => (
  <Modal
    title="Add new recipe"
    centered
    visible={modalOpen}
    onOk={handleSubmit}
    onCancel={handleCloseModal}
  >
    <Form layout="horizontal">
      <Form.Item label="Title" {...formItemLayout}>
        <Input
          value={title}
          onChange={handleChange}
          placeholder="recipe title"
          name="title"
        />
      </Form.Item>
      <Form.Item label="Ingredients" {...formItemLayout}>
        <Input.TextArea
          value={ingredients}
          onChange={handleChange}
          name="ingredients"
          placeholder="recipe ingredients"
        />
      </Form.Item>
      <Form.Item label="Directions" {...formItemLayout}>
        <Input.TextArea
          value={directions}
          onChange={handleChange}
          placeholder="recipe directions"
          name="directions"
        />
      </Form.Item>
      <Form.Item label="Published" {...formItemLayout}>
        <Switch checked={published} onChange={handleChecked} />
      </Form.Item>
    </Form>
  </Modal>
);

const WrappedForm = Form.create({ name: 'add-new-recipe' })(AddRecipeModal);

export default WrappedForm;
