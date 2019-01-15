import React from 'react';
import { notification, Icon } from 'antd';

const Notification = ({ title, content }) => {
  return notification.open({
    message: title,
    description: content,
    icon: <Icon type="smile" style={{ color: '#108ee9' }} />
  });
};

export default Notification;
