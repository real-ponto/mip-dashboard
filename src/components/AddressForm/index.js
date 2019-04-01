import React, { Component } from 'react'
import './index.css'
import "antd/dist/antd.css"
import { CEPInput } from '../../components/MaskedInput'

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
    const { form, onBlur } = this.props

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
        <h4 className="card-employee-title">DADOS DO ENDEREÇO</h4>
        <Form.Item
          label="Cep"
        >
          {getFieldDecorator('cep', {
            rules: [{
              required: true, message: 'Cep obrigatório',
            }],
          })(
            <CEPInput autoComplete="off"
              onBlur={e => onBlur(e)}
              style={{ width: '13%' }}
            />
          )}
        </Form.Item>
        <Form.Item
          label="Rua"
        >
          {getFieldDecorator('steet', {
            rules: [{
              required: true, message: 'Rua obrigatória',
            }],
          })(
            <Input autoComplete="off" style={{ width: '50%' }} />
          )}
        </Form.Item>
        <Form.Item label="Número">
          {
            getFieldDecorator('number', {
              rules: [{
                required: true, message: 'Número obrigatório',
              }],
            })(
              <Input
                autoComplete="off"
                style={{ width: '15%' }}
              />)
          }
        </Form.Item>
        <Form.Item label="Bairro">
          {
            getFieldDecorator('neighborhood', {
              rules: [{
                required: true, message: 'Bairro obrigatório',
              }],
            })(
              <Input
                autoComplete="off"
                style={{ width: '30%' }}
              />)
          }
        </Form.Item>
        <Form.Item label="Cidade">
          {
            getFieldDecorator('city', {
              rules: [{
                required: true, message: 'Cidade obrigatório',
              }],
            })(
              <Input
                autoComplete="off"
                style={{ width: '30%' }}
              />)
          }
        </Form.Item>
        <Form.Item label="UF">
          {
            getFieldDecorator('state', {
              rules: [{
                required: true, message: 'Estado obrigatório',
              }],
            })(
              <Input
                autoComplete="off"
                style={{ width: '10%' }}
              />)
          }
        </Form.Item>
        <Form.Item label="Complemento">
          {
            getFieldDecorator('complement', { })(
              <Input
                autoComplete="off"
                style={{ width: '70%' }}
              />)
          }
        </Form.Item>
        <Form.Item label="Ponto de referência">
          {
            getFieldDecorator('reference', { })(
              <Input
                autoComplete="off"
                style={{ width: '50%' }}
              />)
          }
        </Form.Item>
      </Form>
    );
  }
}

const AddressForm = Form.create({ name: 'register' })(RegistrationForm)

export default AddressForm