import React, { Component } from 'react'
import "antd/dist/antd.css"
import { TELInput } from '../../components/MaskedInput'

import {
  Form, Input, Tooltip, Icon, AutoComplete,
} from 'antd';


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

  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
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

    return (
      <Form {...formItemLayout} className='registerForm' onSubmit={this.handleSubmit}>
       <h4 className="card-employee-title">DADOS DO CONTATO</h4>
        <Form.Item
          label="Nome"
        >
          {getFieldDecorator('name', {
            rules: [{
              required: true, message: 'Nome obrigatório',
            }],
          })(
            <Input  style={{ width: '70%' }}/>
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
            <Input  style={{ width: '60%' }} />
          )}
        </Form.Item>
        <Form.Item
          label="Telefone"
        >
          {getFieldDecorator('phone', {
            rules: [{
              required: true, message: 'Telefone obrigatório',
            }],
          })(
            <TELInput  style={{ width: '22%' }}/>
          )}
        </Form.Item>
      </Form>
    );
  }
}

const ContactForm = Form.create({ name: 'register' })(RegistrationForm)

export default ContactForm