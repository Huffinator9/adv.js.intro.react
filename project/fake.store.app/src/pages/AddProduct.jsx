// src/pages/AddProduct.jsx

import { useState } from 'react';
import axios from 'axios';
import {Container, Form, Button, Alert, Row, Col,} from 'react-bootstrap';

function AddProduct() {
  const [formData, setFormData] = useState({title: '', price: '', description: '', category: '',});
  const [successMessage, setSuccessMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
    
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await axios.post('https://fakestoreapi.com/products', {
        title: formData.title,
        price: parseFloat(formData.price),
        description: formData.description,
        category: formData.category,
      });

      if (response.status === 200 || response.status === 201) {
        setSuccessMessage('✅ Product created successfully!');
        setFormData({ title: '', price: '', description: '', category: '' });
      } else {
        setError('❌ Something went wrong.');
      }
    } catch (err) {
      console.error(err);
      setError('❌ Failed to create product.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h2> Add New Product </h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label> Title </Form.Label>
              <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="price">
              <Form.Label> Price </Form.Label>
              <Form.Control type="number" name="price" step="0.01" value={formData.price} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label> Description </Form.Label>
              <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="category">
              <Form.Label> Category </Form.Label>
              <Form.Control type="text" name="category" value={formData.category} onChange={handleChange} required />
            </Form.Group>

            <Button variant="outline-primary" type="submit" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Add Product'}
            </Button>
          </Form>

          {successMessage && (
            <Alert variant="success" className="mt-3">
              {successMessage}
            </Alert>
          )}
          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default AddProduct;
