import React from 'react';
import { Modal, Form, Input, Switch } from 'antd';

const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 14 } };

const AddRecipeModal = ({
  modalOpen,
  handleSubmit,
  handleCloseModal,
  handleChecked,
  handleChange,
  text,
  name,
  title,
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
      <Form.Item label="Name" {...formItemLayout}>
        <Input
          value={name}
          onChange={handleChange}
          name="name"
          placeholder="recipe name"
        />
      </Form.Item>
      <Form.Item label="title" {...formItemLayout}>
        <Input
          value={title}
          onChange={handleChange}
          placeholder="recipe title"
          name="title"
        />
      </Form.Item>
      <Form.Item label="text" {...formItemLayout}>
        <Input.TextArea
          value={text}
          onChange={handleChange}
          placeholder="recipe instructions"
          name="text"
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
