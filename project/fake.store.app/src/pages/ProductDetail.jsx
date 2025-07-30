// src/pages/ProductDetail.jsx

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Image, Spinner, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch product:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="text-center mt-5">
        <p>Product not found.</p>
        <Link to="/products"><Button variant="secondary">Back to Products</Button></Link>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          <Image src={product.image} fluid style={{ maxHeight: '500px', objectFit: 'contain' }} />
        </Col>
        <Col md={6}>
          <h2>{product.title}</h2>
          <h4 className="text-muted">${product.price}</h4>
          <p><strong>Category:</strong> {product.category}</p>
          <p>{product.description}</p>
          <Link to="/products"><Button variant="primary">Back to Products</Button></Link>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetail;
