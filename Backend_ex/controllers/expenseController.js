const Expense = require('../Models/expenseModel');

// Create a new expense
exports.createExpense = async (req, res) => {
  try {
    // Ensure date field is in the request body
    const { description, amount, category, date } = req.body;
    const expense = new Expense({ description, amount, category, date });
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all expenses
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single expense by ID
exports.getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.status(200).json(expense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an expense by ID
exports.updateExpense = async (req, res) => {
  try {
    // Ensure date field is in the request body
    const { description, amount, category, date } = req.body;
    const expense = await Expense.findByIdAndUpdate(
      req.params.id,
      { description, amount, category, date },
      { new: true }
    );
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.status(200).json(expense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an expense by ID
exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.status(200).json({ message: 'Expense deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get category-wise total amounts
exports.getCategorySummary = async (req, res) => {
  try {
    const expenses = await Expense.find();
    const summary = expenses.reduce((acc, expense) => {
      const category = expense.category;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += expense.amount;
      return acc;
    }, {});

    const result = Object.keys(summary).map(category => ({
      category,
      totalAmount: summary[category]
    }));

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get expenses filtered by date range
exports.getExpensesByDateRange = async (req, res) => {
  try {
    const { startDate, endDate, category } = req.query;
    const query = {
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    };

    if (category) {
      query.category = category;
    }

    const expenses = await Expense.find(query);
    res.status(200).json(expenses);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }

};
