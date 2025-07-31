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
		<Link to="/products"><Button variant="outline-secondary">Back to Products</Button></Link>
	    </Container>
	);
    }

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
	    <Row>
		<Col md={6}>
		    <Image src={product.image} fluid style={{ maxHeight: '500px', objectFit: 'contain' }} />
		</Col>
		<Col md={6}>
		    <h2>{product.title}</h2>
		    <h4 className="text-muted">${product.price}</h4>
		    <p><strong>Category:</strong> {product.category}</p>
		    <p>{product.description}</p>
		    <Link to="/products"><Button variant="outline-primary" className="m-3"> Back to Products </Button></Link>
		    <Button variant="outline-success" className="m-3"> Add to Cart </Button>
		    <Link to={`/products/${product.id}/edit`}><Button variant="outline-warning" className="m-3"> Edit </Button></Link>
		    <Button variant="outline-danger" className="m-3" onClick={handleDelete}>
			Delete Product
		    </Button>
		</Col>
	    </Row>
	</Container>
    );
}

export default ProductDetail;
