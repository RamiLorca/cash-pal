import React, { useState } from 'react'
import CurrencyInput from 'react-currency-input-field';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { addToBalance } from '../../utilities/UserUtils';
import { accountSlice } from '../../features/account';
import { createSelector } from '@reduxjs/toolkit';

const selectAccountId = (state: RootState) => state.account.account_id;

const accountSelector = createSelector(
  selectAccountId,
  (account_id) => ({
    account_id
  })
);

function AddBalanceForm() {
  const {account_id} = useSelector((accountSelector));

  const [amountToAdd, setAmountToAdd] = useState(0.00);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // TO DO: Add functionality to handle submit once the end point is made on the back end
    const updatedAmount = await addToBalance(account_id, amountToAdd);
    accountSlice.actions.setAccountBalance(updatedAmount);
  }

  return (
    <div>
      <h1>Add to Balance Form</h1>

      <form id="add-form" onSubmit={handleSubmit}>
        <CurrencyInput
        id="add-amount"
        name='amount'
        placeholder='0.00'
        decimalsLimit={2}
        prefix='$'
        value={amountToAdd}
        onValueChange={value => {
          const formattedValue = parseFloat(value || "0").toFixed(2);
          setAmountToAdd(parseFloat(formattedValue));
        }}
        />

        <br/>

        <button type='submit'>Add Funds</button>
      </form>
    </div>
  )
}

export default AddBalanceForm;