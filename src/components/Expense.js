import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setExpenses([
      { id: 1, description: 'Groceries', amount: 50 },
      { id: 2, description: 'Utilities', amount: 100 },
      { id: 3, description: 'Rent', amount: 800 },
      { id: 4, description: 'Entertainment', amount: 50 },
      { id: 5, description: 'Transportation', amount: 70 },
    ]);
  }, []);

  const addExpense = (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    const newExpense = {
      id: expenses.length + 1,
      description,
      amount: parseFloat(amount),
    };

    setExpenses([...expenses, newExpense]);
    setDescription('');
    setAmount('');
    setShowModal(false);
  };

  const updateExpense = (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    setExpenses(expenses.map(expense =>
      expense.id === editId ? { ...expense, description, amount: parseFloat(amount) } : expense
    ));
    setDescription('');
    setAmount('');
    setIsEditing(false);
    setEditId(null);
    setShowModal(false);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const editExpense = (id) => {
    const expense = expenses.find(exp => exp.id === id);
    setDescription(expense.description);
    setAmount(expense.amount);
    setIsEditing(true);
    setEditId(id);
    setShowModal(true);
  };

  const resetForm = () => {
    setDescription('');
    setAmount('');
    setIsEditing(false);
    setEditId(null);
    setShowModal(false);
  };

  return (
    <div className="content">
      <h2 >Expenses</h2>
      <Button onClick={() => setShowModal(true)} className="btn btn-primary mb-3">
        <FontAwesomeIcon icon={faPlus} /> Add
      </Button>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.id}</td>
              <td>{expense.description}</td>
              <td>${expense.amount}</td>
              <td>
                <Button onClick={() => editExpense(expense.id)} className="btn btn-secondary btn-sm">
                  <FontAwesomeIcon icon={faEdit} /> 
                </Button>
                <Button onClick={() => deleteExpense(expense.id)} className="btn btn-danger btn-sm" style={{ marginLeft: '10px' }}>
                  <FontAwesomeIcon icon={faTrash} /> 
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showModal} onHide={resetForm}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Expense' : 'Add Expense'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={isEditing ? updateExpense : addExpense}>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="amount" className="form-label">Amount</label>
              <input
                type="number"
                className="form-control"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <Button type="submit" className="btn btn-primary">
              {isEditing ? 'Update' : 'Add'} Expense
            </Button>
            <Button onClick={resetForm} className="btn btn-secondary ml-2">
              Cancel
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Expenses;
