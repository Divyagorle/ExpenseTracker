import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories');
      console.log('Fetched Categories:', response.data); // Debugging
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const addCategory = async (e) => {
    e.preventDefault();
    if (!category || !description) return;

    try {
      const newCategory = { category, description };
      const response = await axios.post('http://localhost:5000/api/categories', newCategory);
      console.log('Added Category:', response.data); // Debugging
      if (response.status === 201) {
        setCategories([...categories, response.data]);
        resetForm();
      }
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const updateCategory = async (e) => {
    e.preventDefault();
    if (!category || !description) return;

    try {
      const updatedCategory = { category, description };
      const response = await axios.put(`http://localhost:5000/api/categories/${editId}`, updatedCategory);
      console.log('Updated Category:', response.data); // Debugging
      if (response.status === 200) {
        setCategories(categories.map(cat =>
          cat._id === editId ? response.data : cat
        ));
        resetForm();
      }
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`);
      console.log('Deleted Category ID:', id); // Debugging
      setCategories(categories.filter(cat => cat._id !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const editCategory = (id) => {
    const cat = categories.find(c => c._id === id);
    if (!cat) {
      console.error('Category not found:', id); // Debugging
      return;
    }
    setCategory(cat.category);
    setDescription(cat.description);
    setIsEditing(true);
    setEditId(id);
    setShowModal(true);
  };

  const resetForm = () => {
    setCategory('');
    setDescription('');
    setIsEditing(false);
    setEditId(null);
    setShowModal(false);
  };

  return (
    <div className="content">
      <h2>Categories</h2>
      <Button onClick={() => setShowModal(true)} className="btn btn-primary mb-3">
        <FontAwesomeIcon icon={faPlus} /> Add
      </Button>
      <table className="table">
        <thead>
          <tr>
            
            <th>Category</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat._id}>
              
              <td>{cat.category}</td>
              <td>{cat.description}</td>
              <td>
                <Button onClick={() => editCategory(cat._id)} className="btn btn-secondary btn-sm">
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
                <Button onClick={() => deleteCategory(cat._id)} className="btn btn-danger btn-sm" style={{ marginLeft: '10px' }}>
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={showModal} onHide={resetForm}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Category' : 'Add Category'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={isEditing ? updateCategory : addCategory}>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">Category</label>
              <input
                type="text"
                className="form-control"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
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
            <Button type="submit" className="btn btn-primary">
              {isEditing ? 'Update' : 'Add'} Category
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

export default Category;
