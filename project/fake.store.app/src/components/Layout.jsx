// src/components/Layout.jsx

import NavigationBar from './NavigationBar';
import { Container } from 'react-bootstrap';

function Layout({ children }) {
    return (
	<>
	    <NavigationBar />
	    <Container className="pt-4">
		{children}
	    </Container>
	</>
    );
}

export default Layout;
