const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

// Expense routes
router.post('/expenses', expenseController.createExpense);
router.get('/expenses', expenseController.getExpenses);
router.get('/expenses/:id', expenseController.getExpenseById);
router.put('/expenses/:id', expenseController.updateExpense);
router.delete('/expenses/:id', expenseController.deleteExpense);

router.get('/date-range', expenseController.getExpensesByDateRange);
router.get('/category-summary', expenseController.getCategorySummary);
module.exports = router;
