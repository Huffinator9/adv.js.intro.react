// src/pages/ProductList.jsx

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Spinner, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
	axios.get('https://fakestoreapi.com/products')
	    .then((res) => {
		setProducts(res.data);
		setLoading(false);
	    })
	    .catch((err) => {
		console.error('Error fetching products:', err);
		setLoading(false);
	    });
    }, []);

    return (
	<Container className="mt-4">
	    <h2 className="text-center mb-4">Product Listing</h2>
	    {loading ? (
		<div className="text-center">
		    <Spinner animation="border" />
		</div>
	    ) : (
		<Row>
		    {products.map((product) => (
			<Col key={product.id} md={4} className="mb-4">
			    <Card>
				<Card.Img variant="top" src={product.image} style={{ height: '300px', objectFit: 'contain' }} />
				<Card.Body>
				    <Card.Title>{product.title}</Card.Title>
				    <Card.Text>${product.price}</Card.Text>
				    <Link to={`/products/${product.id}`}>
					<Button variant="outline-primary" size="md" className="m-3">View Details</Button>
				    </Link>
				    <Button variant="outline-success" size="md" className="m-3">Add to Cart</Button>
				</Card.Body>
			    </Card>
			</Col>
		    ))}
		</Row>
	    )}
	</Container>
    );
}

export default ProductList;
