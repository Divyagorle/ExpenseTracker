import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]); // New state for categories
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryDescription, setCategoryDescription] = useState(''); // New state for category description
  const [date, setDate] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchExpenses();
    fetchCategories();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/expenses');
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const addExpense = async (e) => {
    e.preventDefault();
    if (!description || !amount || !selectedCategory || !date) return;

    try {
      const newExpense = {
        description,
        amount: parseFloat(amount),
        category: selectedCategory,
        date,
      };
      const response = await axios.post('http://localhost:5000/api/expenses', newExpense);
      if (response.status === 201) {
        setExpenses([...expenses, response.data]);
        resetForm();
      }
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const updateExpense = async (e) => {
    e.preventDefault();
    if (!description || !amount || !selectedCategory || !date) return;

    try {
      const updatedExpense = {
        description,
        amount: parseFloat(amount),
        category: selectedCategory,
        date,
      };
      const response = await axios.put(`http://localhost:5000/api/expenses/${editId}`, updatedExpense);
      if (response.status === 200) {
        setExpenses(expenses.map(expense =>
          expense._id === editId ? response.data : expense
        ));
        resetForm();
      }
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/expenses/${id}`);
      setExpenses(expenses.filter(expense => expense._id !== id));
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const editExpense = (id) => {
    const expense = expenses.find(exp => exp._id === id);
    setDescription(expense.description);
    setAmount(expense.amount);
    setSelectedCategory(expense.category);
    setDate(expense.date);
    setCategoryDescription(expense.categoryDescription || ''); // Set description for editing if available
    setIsEditing(true);
    setEditId(id);
    setShowModal(true);
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    const selectedCategory = categories.find(cat => cat._id === selectedCategoryId);
    if (selectedCategory) {
        setSelectedCategory(selectedCategory.category); // Assuming `category` is the field for category name
        setCategoryDescription(selectedCategory.description || '');
    } else {
        setSelectedCategory('');
        setCategoryDescription('');
    }
}


  const resetForm = () => {
    setDescription('');
    setAmount('');
    setSelectedCategory('');
    setCategoryDescription('');
    setDate('');
    setIsEditing(false);
    setEditId(null);
    setShowModal(false);
  };

  return (
    <div className="content">
      <h2>Expenses</h2>
      <Button onClick={() => setShowModal(true)} className="btn btn-primary mb-3">
        <FontAwesomeIcon icon={faPlus} /> Add
      </Button>
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
              <th>Category</th>
            <th>Description</th>
            <th>Amount</th>
          

            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense._id}>
              <td>{new Date(expense.date).toLocaleDateString()}</td>
              <td>{expense.category}</td>
              <td>{expense.description}</td>
              <td>${expense.amount}</td>
           
             
              <td>
                <Button onClick={() => editExpense(expense._id)} className="btn btn-secondary btn-sm">
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
                <Button onClick={() => deleteExpense(expense._id)} className="btn btn-danger btn-sm" style={{ marginLeft: '10px' }}>
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
              <label htmlFor="date" className="form-label">Date</label>
              <input
                type="date"
                className="form-control"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
           
            <div className="mb-3">
              <label htmlFor="category" className="form-label">Category</label>
              <select
                className="form-control"
                id="category"
                value={selectedCategory.id}
                onChange={handleCategoryChange}
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>
                    {cat.category}
                  </option>
                ))}
              </select>
            </div>
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
