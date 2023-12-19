import DisplayBalance from "../components/home components/DisplayBalance.component";
import AddBalanceForm from "../components/home components/AddBalanceForm.component";

const Funds = () => {
  return (
    <div className="flex flex-col justify-between h-full">
      <DisplayBalance />
      <AddBalanceForm />
    </div>
  );
};

export default Funds;