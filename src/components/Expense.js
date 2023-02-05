import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { expenseActions } from "../store/expenses";
import { themeActions } from "../store/theme";

const Expense = () => {
  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();

  const expenses = useSelector((state) => state.expenses.expenses);
  const premium = useSelector((state) => state.expenses.premium);
  const dispatch = useDispatch();

  useEffect(() => {
    getExpenses();
    // eslint-disable-next-line
  }, []);

  const getExpenses = async () => {
    try {
      const response = await fetch(
        "https://expense-tracker-aab49-default-rtdb.firebaseio.com/expenses.json"
      );
      const data = await response.json();
      if (!response.ok) {
        let errorMessage = data.error.message;

        throw new Error(errorMessage);
      }
      console.log(data);
      dispatch(expenseActions.setExpenses(data));
    } catch (error) {
      alert(error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const expense = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      category: categoryRef.current.value,
    };

    try {
      const response = await fetch(
        "https://expense-tracker-aab49-default-rtdb.firebaseio.com/expenses.json",
        {
          method: "POST",
          body: JSON.stringify(expense),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        let errorMessage = data.error.message;

        throw new Error(errorMessage);
      }
      console.log(data);
      getExpenses();
      amountRef.current.value = "";
      descriptionRef.current.value = "";
      categoryRef.current.value = "";
    } catch (error) {
      alert(error);
    }
  };

  const deleteExpense = async (expense) => {
    try {
      const response = await fetch(
        `https://expense-tracker-aab49-default-rtdb.firebaseio.com/expenses/${expense}.json`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        let errorMessage = data.error.message;
        throw new Error(errorMessage);
      }
      console.log(data);
      getExpenses();
    } catch (error) {
      alert(error);
    }
  };

  const editExpense = async (expense) => {
    amountRef.current.value = expenses[expense].amount;
    descriptionRef.current.value = expenses[expense].description;
    categoryRef.current.value = expenses[expense].category;

    deleteExpense(expense);
  };

  const themeHandler = () => {
    dispatch(themeActions.toggleTheme());
  };

  const downloadExpenses = (e) => {
    const arr = [["Amount", "Description", "Category"]];
    Object.values(expenses).map((item) => arr.push(Object.values(item)));
    const expenseData = arr.map((item) => item.join(",")).join("\n");
    console.log(expenseData);

    const blob = new Blob([expenseData]);
    e.target.href = URL.createObjectURL(blob);
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {premium && (
            <button
              className="btn btn-info col-4 offset-4 mb-3"
              onClick={themeHandler}
            >
              Activate Premium
            </button>
          )}
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
          <ul className="list-group">
            {expenses &&
              Object.keys(expenses).map((expense) => (
                <li key={expense} id={expense} className="list-group-item">
                  Rs {expenses[expense].amount} :{" "}
                  {expenses[expense].description} : {expenses[expense].category}
                  <button
                    className="btn btn-danger float-end"
                    onClick={() => deleteExpense(expense)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-warning float-end mx-2"
                    onClick={() => editExpense(expense)}
                  >
                    Edit
                  </button>
                </li>
              ))}
            {expenses && (
              <a
                className="btn btn-info col-4 offset-4 mt-3"
                onClick={downloadExpenses}
                download="expenses.csv"
                href="/"
              >
                Download File
              </a>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Expense;
