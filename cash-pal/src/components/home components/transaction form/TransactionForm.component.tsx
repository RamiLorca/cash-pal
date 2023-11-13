import './TransactionForm.styles.scss';
import React, { useEffect, useState } from "react";
import { RootState } from "../../../store";
import { fetchOtherUserId } from "../../../utilities/UserUtils";
import { useSelector } from "react-redux";
import CurrencyInput from "react-currency-input-field";
import { createSelector } from "reselect";
import { useSuggestions } from "../../../context/SuggestionsContext";
import {
  transactionRequest,
  fetchTransfers,
  fetchUsernameSuggestions,
} from "../../../utilities/TransferUtils";

const selectAccountId = (state: RootState) => state.account.account_id;
const selectAccountUsername = (state: RootState) => state.account.username;

const accountSelector = createSelector(
  selectAccountId,
  selectAccountUsername,
  (account_id, account_username) => ({
    account_id,
    account_username,
  })
);

const TransactionForm = () => {

  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const { suggestions } = useSuggestions();
  const { account_id, account_username } = useSelector(accountSelector);
  const [activeButton, setActiveButton] = useState("Send Money");
  const [currentAmount, setCurrentAmount] = useState(0);
  const [otherUsername, setOtherUsername] = useState("");
  const [amountInputValue, setAmountInputValue] = useState("");

  useEffect(() => {
    const filtered = suggestions.filter(suggestion => {
      const searchTerm = otherUsername.toLowerCase();
      const fullUsername = suggestion.toLowerCase();
      return searchTerm && fullUsername.startsWith(searchTerm) && fullUsername !== searchTerm;
    });

    setFilteredSuggestions(filtered);
  }, [suggestions, otherUsername]);

  const fetchAndSetFilteredSuggestions = async (usernameInput: string) => {
    await fetchUsernameSuggestions(usernameInput);
  };

  const handleUsernameInput = (usernameInput: string) => {
    if (!usernameInput) {
      setFilteredSuggestions([]);
    } else {
      fetchAndSetFilteredSuggestions(usernameInput);
    }
  };

  const handleButtonClick = (buttonType: string) => {
    setActiveButton(buttonType);
  };

  const resetForm = () => {
    setOtherUsername("");
    setCurrentAmount(0);
    setAmountInputValue("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const otherUserId = await fetchOtherUserId(otherUsername);

    if (activeButton === "Send Money") {
      try {
        const response = await transactionRequest(
          account_username,
          account_id,
          account_username,
          otherUserId,
          otherUsername,
          currentAmount
        );
        console.log(response);

        console.log("Sending money...");

        fetchTransfers(account_id);
        resetForm();
      } catch (error) {
        console.error(error);
      }
    } else if (activeButton === "Request Money") {
      try {
        const response = await transactionRequest(
          account_username,
          otherUserId,
          otherUsername,
          account_id,
          account_username,
          currentAmount
        );
        console.log(response);

        console.log("Requesting money...");

        fetchTransfers(account_id);
        resetForm();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleUsernameClick = (suggestion: string) => {
    setOtherUsername(suggestion);
    setHighlightedIndex(null);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHighlightedIndex((prevIndex) => 
        prevIndex === null || prevIndex === filteredSuggestions.length - 1 ? 0 : prevIndex + 1
      );
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlightedIndex((prevIndex) => 
        prevIndex === null || prevIndex === 0 ? filteredSuggestions.length - 1 : prevIndex - 1
      );
    } else if (event.key === 'Enter' && highlightedIndex !== null) {
      event.preventDefault();
      handleUsernameClick(filteredSuggestions[highlightedIndex]);
    }
  };

  return (
    <div>
      <h1>Transaction Form</h1>

      <button onClick={() => handleButtonClick("Send Money")}>
        Send Money
      </button>
      <button onClick={() => handleButtonClick("Request Money")}>
        Request Money
      </button>

      <form id="transfer-form" onSubmit={handleSubmit}>

        <div className='search-container'>

          <div className='search-inner'>
            <input
              id="username-input"
              type="text"
              placeholder="Enter username"
              value={otherUsername}
              onChange={(event) => {
                setOtherUsername(event.target.value);
                handleUsernameInput(event.target.value);
              }}
              onKeyDown={handleKeyDown}
              autoComplete="off"
            />
          </div>

          <div 
            className="dropdown"
          >
            {filteredSuggestions
            .slice(0, 20)
            .map((suggestion, index) => (
              <div 
                className={`dropdown-row ${highlightedIndex === index ? 'highlighted' : ''}`}
                key={suggestion}
                onClick={() => handleUsernameClick(suggestion)}
              >
                  {suggestion}
              </div>
            ))}
          </div>

        </div>

        <br />

        <CurrencyInput
          id="amount-input"
          name="amount"
          placeholder="$0.00"
          decimalsLimit={2}
          prefix="$"
          value={amountInputValue}
          onValueChange={(value) => {
            const formattedValue = parseFloat(value || "0").toFixed(2);
            setCurrentAmount(parseFloat(formattedValue));
            setAmountInputValue(value || "");
          }}
        />

        <br />

        <input type="submit" value={activeButton} />
      </form>

      <br />

    </div>
  );
};

export default TransactionForm;
