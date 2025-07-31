// src/pages/EditProduct.jsx

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Container, Form, Button, Alert, Row, Col, Spinner,} from 'react-bootstrap';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({title: '', price: '', description: '', category: '',});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  // Load existing product data
  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        const { title, price, description, category } = res.data;
        setFormData({ title, price, description, category });
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load product:', err);
        setError('Failed to load product.');
        setLoading(false);
      });
  }, [id]);

  // Update input values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission (PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccessMessage('');

    try {
      const res = await axios.put(`https://fakestoreapi.com/products/${id}`, {
        ...formData,
        price: parseFloat(formData.price),
      });

      if (res.status === 200) {
        setSuccessMessage('Product updated successfully!');
      } else {
        setError('Failed to update product.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while updating.');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle product delete
  const handleDelete = async () => {
    const confirm = window.confirm('Are you sure you want to delete this product?');
    if (!confirm) return;

    try {
      await axios.delete(`https://fakestoreapi.com/products/${id}`);
      navigate('/products');
    } catch (err) {
      console.error(err);
      setError('Failed to delete product.');
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h2>Edit Product</h2>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required /> </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" name="price" step="0.01" value={formData.price} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control type="text" name="category" value={formData.category} onChange={handleChange} required />
            </Form.Group>

            <div className="d-flex justify-content-between align-items-center">
              <Button variant="outline-primary" type="submit" disabled={submitting}>
                {submitting ? 'Saving...' : 'Update Product'}
              </Button>
              <Button variant="outline-danger" onClick={handleDelete}>
                Delete Product
              </Button>
            </div>
          </Form>

          {successMessage && (
            <Alert variant="outline-success" className="mt-3">
              {successMessage}
            </Alert>
          )}
          {error && (
            <Alert variant="outline-danger" className="mt-3">
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default EditProduct;
