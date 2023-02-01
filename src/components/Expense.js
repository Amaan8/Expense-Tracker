import { useRef, useState } from "react";

const Expense = () => {
  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();

  const [expenses, setExpenses] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();

    const expense = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      category: categoryRef.current.value,
    };
    setExpenses((prevState) => [...prevState, expense]);
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form className="border p-3 mb-3" onSubmit={submitHandler}>
            <h3 className="text-center">EXPENSES</h3>
            <div className="mb-3">
              <label htmlFor="amount" className="form-label">
                Expense Amount
              </label>
              <input
                type="text"
                className="form-control"
                id="amount"
                required
                ref={amountRef}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                ref={descriptionRef}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <select className="form-select" id="category" ref={categoryRef}>
                <option>Study</option>
                <option>Food</option>
                <option>Movies</option>
                <option>Travel</option>
              </select>
            </div>
            <button type="submit" className="btn btn-info col-4 offset-4">
              Add Expense
            </button>
          </form>
          <ul className="list-unstyled text-center">
            {expenses.map((expense, index) => (
              <li key={index}>
                Rs {expense.amount} : {expense.description} : {expense.category}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Expense;
