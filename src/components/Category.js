import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setCategories([
      { id: 1, name: 'Groceries' },
      { id: 2, name: 'Utilities' },
      { id: 3, name: 'Rent' },
      { id: 4, name: 'Entertainment' },
      { id: 5, name: 'Transportation' },
    ]);
  }, []);

  const addCategory = (e) => {
    e.preventDefault();
    if (!name) return;

    const newCategory = {
      id: categories.length + 1,
      name,
    };

    setCategories([...categories, newCategory]);
    setName('');
    setShowModal(false);
  };

  const updateCategory = (e) => {
    e.preventDefault();
    if (!name) return;

    setCategories(categories.map(category =>
      category.id === editId ? { ...category, name } : category
    ));
    setName('');
    setIsEditing(false);
    setEditId(null);
    setShowModal(false);
  };

  const deleteCategory = (id) => {
    setCategories(categories.filter(category => category.id !== id));
  };

  const editCategory = (id) => {
    const category = categories.find(cat => cat.id === id);
    setName(category.name);
    setIsEditing(true);
    setEditId(id);
    setShowModal(true);
  };

  const resetForm = () => {
    setName('');
    setIsEditing(false);
    setEditId(null);
    setShowModal(false);
  };

  return (
    <div className="content">
      <h2 style={{ position: 'fixed', top: '10px', left: '220px', zIndex: '1000' }}>Categories</h2>
      <Button
        style={{  left: '220px', zIndex: '1000' }}
        onClick={() => setShowModal(true)}
        className="btn btn-primary mb-3"
      >
        <FontAwesomeIcon icon={faPlus} /> Add
      </Button>
      <div style={{  position: 'relative' }}>
        <table className="table" style={{ padding: '10px' }}>
          <thead style={{ position: 'sticky', top: '0', backgroundColor: 'white', zIndex: '1000' }}>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
        </table>
        <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
          <table className="table">
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>
                    <Button onClick={() => editCategory(category.id)} className="btn btn-secondary btn-sm">
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <Button onClick={() => deleteCategory(category.id)} className="btn btn-danger btn-sm" style={{ marginLeft: '10px' }}>
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal show={showModal} onHide={resetForm}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Category' : 'Add Category'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={isEditing ? updateCategory : addCategory}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
