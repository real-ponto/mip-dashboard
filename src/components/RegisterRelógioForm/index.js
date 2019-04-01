import React, { Component } from 'react'
import "antd/dist/antd.css"

import {
  Form, Input, AutoComplete,
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
      <h4 className="card-employee-title">DADOS DO RELÓGIO</h4>
      <Form.Item
          label="N° Série"
        >
          {getFieldDecorator('serieNumber', {
            rules: [{
              required: true, message: 'N° Série obrigatório!',
            }],
          })(
            <Input style={{ width: '30%' }} />
          )}
        </Form.Item>

        <Form.Item
          label="Porta"
        >
          {getFieldDecorator('port', {
            rules: [{
              required: true, message: 'Porta obrigatório!',
            }],
          })(
            <Input style={{ width: '10%' }}/>
          )}
        </Form.Item>
        <Form.Item
          label="Modelo"
        >
          {getFieldDecorator('model', {
            rules: [{
              required: true, message: 'Modelo do relógio obrigatório!',
            }],
          })(
            <Input style={{ width: '55%' }} />
          )}
        </Form.Item>
      </Form>
    );
  }
}

const RegisterRelógioForm = Form.create({ name: 'register' })(RegistrationForm)

export default RegisterRelógioForm