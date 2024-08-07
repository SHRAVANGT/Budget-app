import Container from "react-bootstrap/Container";
import { Stack, Button } from "react-bootstrap";
import BudgetCard from "./components/BudgetCard";
import AddBudgetModal from "./components/AddBudgetModel";
import ViewExpensesModal from "./components/ViewExpensesModal";
import { useState } from "react";
import { UNCATEGORIZED_BUDGET_ID, UseBudgets } from "./contexts/BudgetsContext";
import AddExpenseModal from "./components/AddExpenseModel";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";

function App() {
  const [showAddBudgetModal, setShowBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [viewExpensesModalBudgetId, setviewExpensesModalBudgetId] = useState();
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
  const { budgets, getBudgetExpenses } = UseBudgets();

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  }
  // useEffect(() => {
  //   console.log("Budgets updated:", budgets);
  // }, [budgets]);
  // useEffect(() => {
  //   console.log(
  //     "Expenses updated:",
  //     getBudgetExpenses(addExpenseModalBudgetId)
  //   );
  // }, [showAddExpenseModal, addExpenseModalBudgetId]);

  return (
    <>
      <Container className="my-4">
        <Stack direction="horizontal" gap={2} className="mb-4">
          <h1 className="me-auto">BUDGETs</h1>
          <Button variant="primary" onClick={() => setShowBudgetModal(true)}>
            Add Budget
          </Button>
          <Button variant="outline-primary" onClick={openAddExpenseModal}>
            Add Expense
          </Button>
        </Stack>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))}",
            gap: "1rem",
            alignItems: "Flex-start",
          }}
        >
          {budgets.map((budget) => {
            const amount = getBudgetExpenses(budget.id).reduce(
              (total, expense) => total + expense.amount,
              0
            );
            // console.log(amount);
            //{budgets.map((budget) => {
            //   // const expenses = getBudgetExpenses(budget.id);
            // // console.log(`Expenses for budget ${budget.id}:`, expenses);
            // const amount = expenses.reduce(
            //   (total, expense) => total + expense.amount,
            //   0
            // );

            // // console.log(`Budget: ${budget.name}, Calculated Amount: ${amount}`);

            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpenseClick={() =>
                  setviewExpensesModalBudgetId(budget.id)
                }
              />
            );
          })}
          <UncategorizedBudgetCard
            onAddExpenseClick={openAddExpenseModal}
            onViewExpenseClick={() =>
              setviewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)
            }
          />
          <TotalBudgetCard />
        </div>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => setShowBudgetModal(false)}
      />
      <AddExpenseModal
        // show={true}
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        // handleClose
        handleClose={() => setShowAddExpenseModal(false)}
      />
      <ViewExpensesModal
        budgetId={viewExpensesModalBudgetId}
        handleClose={() => setviewExpensesModalBudgetId()}
      />
    </>
  );
}
export default App;
