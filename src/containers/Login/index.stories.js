import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import WrappedNormalLoginForm from '.'

storiesOf('Login', module)
  .add('Form default', () =>
    (
    <WrappedNormalLoginForm/>)
  )