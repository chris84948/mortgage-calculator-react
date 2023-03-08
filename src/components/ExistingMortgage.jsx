import React from 'react'
import {
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
} from '@chakra-ui/react'

export default function ExistingMortgage(props) {

  const [data, setData] = React.useState({
    principal: 250000,
    interestRate: 4.0,
    monthlyPayment: 1600,
    extraPayment: 0
  })

  const [result, setResult] = React.useState({
    totalPaid: 0,
    totalInterestPaid: 0,
    numberPayments: 0,
    paymentSchedule: []
  })

  React.useEffect(() => {
    var monthlyInterestRate = (data.interestRate * 0.01) / 12

    var totalInterestPaid = 0
    var totalPaid = 0;
    var principal = data.principal
    var paymentSchedule = []
    var numberPayments = 0
    var extraPayment = parseFloat(data.extraPayment)

    while (principal > 0 && numberPayments < 361) {
      // Calculat the interest on this month
      var interestPayment = monthlyInterestRate * data.principal

      // Now figure out how much principal will actually be paid
      var principalPayment = (data.monthlyPayment - interestPayment) + extraPayment

      // Don't go negative
      if (principalPayment > principal)
        principalPayment = principal

      principal -= principalPayment

      // Update all the extra information
      totalInterestPaid += interestPayment
      totalPaid += (interestPayment + principalPayment)
      paymentSchedule.push({
        numberPayments: numberPayments,
        principalPayment: principalPayment,
        interestPayment: interestPayment,
        principal: principal
      })

      numberPayments++
    }

    setResult({
      totalPaid: totalPaid,
      totalInterestPaid: totalInterestPaid,
      numberPayments: numberPayments,
      paymentSchedule: paymentSchedule
    })
  }, [data])

  const formatCurrencyFloat = (val) => `$` + parseFloat(val).toLocaleString()

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
        value={formatCurrencyFloat(data.principal)}
        onChange={(e) => handleChange('principal', e)}
        precision={2}
        size='sm'>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>

      <Text
        margin='8px 0 4px 4px'
      >Interest Rate (%)</Text>
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
      >Current Monthly Payment (Principal + Interest)</Text>
      <NumberInput
        step={100}
        min={0}
        value={formatCurrencyFloat(data.monthlyPayment)}
        onChange={(e) => handleChange('monthlyPayment', e)}
        precision={2}
        size='sm'>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>

      <Text
        margin='8px 0 4px 4px'
      >Extra Payment</Text>
      <NumberInput
        step={100}
        min={0}
        value={formatCurrencyFloat(data.extraPayment)}
        onChange={(e) => handleChange('extraPayment', e)}
        precision={2}
        size='sm'>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>

      <div className='results'>
        {result.totalPaid > 0 && result.numberPayments < 361 && <Text >Total Paid: ${result.totalPaid.toLocaleString('en-US', { maximumFractionDigits: 2 })}</Text>}
        {result.totalInterestPaid > 0 && result.numberPayments < 361 && <Text >Total Interest Paid: ${result.totalInterestPaid.toLocaleString('en-US', { maximumFractionDigits: 2 })}</Text>}
        {result.numberPayments === 361 ?
          <Text >Time Until Pay-Off: 30+ Years</Text> :
          <Text >Time Until Pay-Off: {Math.floor(result.numberPayments / 12)} Years, {result.numberPayments % 12} Months</Text>}
      </div>
    </div>
  )
}