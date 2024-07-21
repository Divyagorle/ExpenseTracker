import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Form, Spinner, Table } from 'react-bootstrap';

const Dashboard = () => {
  const [categorySummary, setCategorySummary] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategorySummary();
    fetchCategories();
  }, []);

  const fetchCategorySummary = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/category-summary');
      setCategorySummary(response.data);
    } catch (error) {
      console.error('Error fetching category summary:', error);
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

  const handleFilter = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/date-range', {
        params: {
          startDate,
          endDate,
          category: selectedCategory
        },
      });
      setFilteredExpenses(response.data);
    } catch (error) {
      console.error('Error fetching filtered expenses:', error);
    }
    setLoading(false);
  };

  const downloadReport = (data, filename) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{marginLeft:'9cm'}}>
    <div className="container mt-4">
      <div className="row">
        {/* Category-wise Amount Card */}
        <div className="col-md-6">
          <Card>
            <Card.Body>
              <Card.Title>Category-wise Amount</Card.Title>
              {categorySummary.length > 0 ? (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Total Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categorySummary.map((item) => (
                      <tr key={item.category}>
                        <td>{item.category}</td>
                        <td>${item.totalAmount.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p>No data available</p>
              )}
              <Button 
                variant="primary" 
                onClick={() => downloadReport(categorySummary, 'category-summary.json')}
              >
                Download Report
              </Button>
            </Card.Body>
          </Card>
        </div>
        <div style={{padding:'5px'}}></div>
        {/* Date Range & Category Selector Card */}
        <div className="col-md-6">
          <Card>
            <Card.Body>
              <Card.Title>Filter Expenses</Card.Title>
              <Form>
                <Form.Group>
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category.category}>
                        {category.category}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control 
                    type="date" 
                    value={startDate} 
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>End Date</Form.Label>
                  <Form.Control 
                    type="date" 
                    value={endDate} 
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </Form.Group>
                <Button 
                  variant="primary" 
                  onClick={handleFilter}
                  className="mt-2"
                >
                  Filter
                </Button>
              </Form>
              {loading && <Spinner animation="border" className="mt-2" />}
              {filteredExpenses.length > 0 && (
                <div className="mt-3">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredExpenses.map((expense) => (
                        <tr key={expense._id}>
                          <td>{expense.description}</td>
                          <td>${expense.amount.toFixed(2)}</td>
                          <td>{expense.category}</td>
                          <td>{new Date(expense.date).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <Button 
                    variant="primary" 
                    onClick={() => downloadReport(filteredExpenses, 'filtered-expenses.json')}
                  >
                    Download Report
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
