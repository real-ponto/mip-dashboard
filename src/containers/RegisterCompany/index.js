import React, { Component } from 'react'
import './index.css'
import "antd/dist/antd.css"
import { CNPJInput } from '../../components/MaskedInput'
import ContactForm from '../../components/ContactForm'
import AddressForm from '../../components/AddressForm'
import RegisterRelógioForm from '../../components/RegisterRelógioForm'
import RegisterModuloForm from '../../components/RegisterModuloForm'

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

  validateAbreviacao = (value) => {
    if (!value) {
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

    return (
      <div className="employeeCard">
        <div className="card-employee-body">
          <Form {...formItemLayout} className='registerForm' onSubmit={this.handleSubmit}>
            <h4 className="card-employee-title">DADOS DA EMPRESA</h4>
            <Form.Item
              label="Cnpj"
            >
              {getFieldDecorator('cnpj', {
                rules: [{
                  required: true, message: 'Cnpj obrigatório',
                }],
              })(
                <CNPJInput  style={{ width: '23AddressForm%' }}/>
              )}
            </Form.Item>
            <Form.Item
              label="Razão Social"
            >
              {getFieldDecorator('razaoSocial', {
                rules: [{
                  required: true, message: 'Razão Social obrigatória',
                }],
              })(
                <Input />
              )}
            </Form.Item>

            <Form.Item
              label="Nome abreviado"
            >
              {getFieldDecorator('abreviacao', {
                rules: [{
                  required: true, message: 'Coloque o nome abreviado!',
                }, {
                  validator: this.validateAbreviacao,
                }],
              })(
                <Input  style={{ width: '20%' }}/>
              )}
            </Form.Item>

            <Form.Item
              label="N° Contrato"
            >
              {getFieldDecorator('numberContract', {
                rules: [{
                  required: true, message: 'Número do contrato obrigatório!',
                }],
              })(
                <Input  style={{ width: '25%' }} />
              )}
            </Form.Item>
          </Form>
        <AddressForm/>
        <ContactForm/>
        <RegisterRelógioForm/>
        <RegisterModuloForm/>
        </div>
      </div>
      
    );
  }
}

const RegisterCompanyForm = Form.create({ name: 'register' })(RegistrationForm)

export default RegisterCompanyForm