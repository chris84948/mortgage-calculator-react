import React from 'react'
import {
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
} from '@chakra-ui/react'

export default function NewMortgage(props) {

  const [data, setData] = React.useState({
    principal: 200000,
    interestRate: 4.0,
    loanTermYears: 30
  })

  const [result, setResult] = React.useState({
    monthlyPayment: 0,
    totalInterestPaid: 0
  })

  React.useEffect(() => {
    // M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]
    // P = Principal loan amount
    // i = monthly interest rate (yearly / 12)
    // n = length of loan in payments (usually months)

    var monthlyInterestRate = (data.interestRate * 0.01) / 12
    var numberPayments = data.loanTermYears * 12

    var monthlyPayment = (data.principal * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberPayments))) /
      (Math.pow(1 + monthlyInterestRate, numberPayments) - 1)
    var totalInterest = (monthlyPayment * numberPayments) - data.principal

    setResult({
      monthlyPayment: monthlyPayment,
      totalInterestPaid: totalInterest
    })
  }, [data])

  const formatCurrency = (val) => `$` + parseInt(val).toLocaleString()

  const handleChange = (name, value) => {
    setData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  return (
    <div className='new-mortgage'>
      <Text
        margin='8px 0 4px 4px'
      >Loan Amount or Principal</Text>
      <NumberInput
        step={10000}
        min={0}
        value={formatCurrency(data.principal)}
        onChange={(e) => handleChange('principal', e)}
        size='sm'>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>

      <Text
        margin='8px 0 4px 4px'
      >Interest Rate</Text>
      <NumberInput
        step={0.25}
        min={0}
        max={100}
        value={data.interestRate}
        onChange={(e) => handleChange('interestRate', e)}
        size='sm'>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>

      <Text
        margin='8px 0 4px 4px'
      >Loan Term in Years</Text>
      <NumberInput
        step={1}
        min={0}
        max={100}
        value={data.loanTermYears}
        onChange={(e) => handleChange('loanTermYears', e)}
        size='sm'>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>

      <div className='results'>
        {result.monthlyPayment && <Text >Monthly Payment: ${result.monthlyPayment.toLocaleString('en-US', { maximumFractionDigits: 2 })}</Text>}
        {result.totalInterestPaid && <Text >Total Interest Paid: ${result.totalInterestPaid.toLocaleString('en-US', { maximumFractionDigits: 2 })}</Text>}
      </div>
    </div>
  )
}