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
  const { account_id } = useSelector((accountSelector));

  const [amountToAdd, setAmountToAdd] = useState("");
  const [currentAmount, setCurrentAmount] = useState(0.00);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(currentAmount);
    const updatedAmount = await addToBalance(account_id, currentAmount);
    accountSlice.actions.setAccountBalance(updatedAmount);
  }

  return (
    <div className="bg-zinc-800 shadow-md rounded-2xl px-8 pt-6 pb-8 ml-0 mr-0 my-auto w-fit flex flex-col justify-between gap-y-5">
      <h1>
        Add to Balance Form
      </h1>

      <form id="add-form" onSubmit={handleSubmit}>

        <CurrencyInput
          id="add-amount"
          className='bg-zinc-700 appearance-none border-gray-200 rounded-full w-full py-2 px-4 text-stone-950 leading-tight focus:outline-none focus:bg-zinc-600 focus:border-zinc-600"'
          name="amount"
          placeholder="$0.00"
          allowDecimals={true}
          allowNegativeValue={false}
          decimalsLimit={2}
          prefix='$'
          value={amountToAdd}
          onValueChange={(value) => {
            const formattedValue = parseFloat(value || "0").toFixed(2);
            setCurrentAmount(parseFloat(formattedValue));
            setAmountToAdd(value || "");
          }}
        />

        <button type='submit'>Add Funds</button>
      </form>
    </div>
  )
}

export default AddBalanceForm;