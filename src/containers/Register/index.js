import React, { Component } from 'react'
import './index.css'
import "antd/dist/antd.css"

import {
  Form, Input, Tooltip, Icon, Select, Button, AutoComplete,
} from 'antd';

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

class RegistrationForm extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <div className="employeeCard">
        <div className="card-employee-body">
          <Form {...formItemLayout} className='registerForm' onSubmit={this.handleSubmit}>
            <Form.Item
              label="Nome"
            >
              {getFieldDecorator('name', {
                rules: [{
                  required: true, message: 'Nome obrigatório',
                }],
              })(
                <Input />
              )}
            </Form.Item>
            <Form.Item
              label={(
                <span>
                  Usuário&nbsp;
            <Tooltip title="Qual será seu usuário?">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              )}
            >
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Coloque o nome do seu usuário!', whitespace: true }],
              })(
                <Input />
              )}
            </Form.Item>
            <Form.Item
              label="E-mail"
            >
              {getFieldDecorator('email', {
                rules: [{
                  type: 'email', message: 'Coloque seu email!',
                }, {
                  required: true, message: 'Email obrigatório',
                }],
              })(
                <Input />
              )}
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">Register</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm)

export default WrappedRegistrationForm