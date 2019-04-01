import React, { Component } from 'react'
import { message } from 'antd'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import LoginContainer from '../../../containers/Login'
import AuthService from '../../../services/auth'
import { login } from '../../../redux/actions/session'

const success = () => {
  message.success('Bem Vindo ao Connecta Care!')
}

const error = (text) => {
  message.error(
    text,
  )
}

class Login extends Component {
  authService = null
  state = {
    loading: false,
  }

  componentDidMount () {
    this.authService = new AuthService()
  }

  onSubmit = (value) => {
    this.setState({ loading: true }, async () => {
      try {
        const { data: { login: loginData, session } } = await this.authService.login(value)
        this.setState({ loading: false }, () => {
          success()
          this.props.login({ ...loginData, session })
        })
      } catch (err) {
        this.setState({
          loading: false,
        }, () => error('Falha ao logar!'))
      }
    })
  }

  render () {
    const { loading } = this.state

    return !this.props.isLogged ? (
      <LoginContainer
        onSubmit={this.onSubmit}
        loading={loading}
      />
    ) : <Redirect to="/logged" />
  }
}

const mapStatetoProps = state => ({
  isLogged: Boolean(state.session),
})
const mapDispatchToProps = dispatch => ({
  login: (data) => {
    dispatch(login(data))
  },
})

export default connect(mapStatetoProps, mapDispatchToProps)(Login)
