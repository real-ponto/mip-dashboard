import React from 'react'
import InputMask from 'react-input-mask'
import { Input } from 'antd'

const CustomInputMask = props => (
  <InputMask
    {...props}
  >
    {inputProps => <Input {...inputProps} />}
  </InputMask>
)

CustomInputMask.defaultProps = {
  disabled: false,
}

export default CustomInputMask

const CPFInput = props => <CustomInputMask {...props} mask="999.999.999-99"/>
const CEPInput = props => <CustomInputMask {...props} mask="99999-999"/>
const CNPJInput = props => <CustomInputMask {...props} mask="99.999.999/9999-99" />
const TELInput = props => <CustomInputMask {...props} mask="(99)9999-9999"/>
const CELInput = props => <CustomInputMask {...props} mask="(99)99999-9999"/>

export {
  CPFInput,
  CNPJInput,
  TELInput,
  CELInput,
  CEPInput
}
