import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import Layout from './components/Layout';

function App() {
    return (
	<Router>
	    <Layout>
		<Routes>
		    <Route path="/" element={<Home />} />
		    <Route path="/products" element={<ProductList />} />
		    <Route path="/products/:id" element={<ProductDetail />} />
		    <Route path="/products/:id/edit" element={<EditProduct />} />
		    <Route path="/add-product" element={<AddProduct />} />
		</Routes>
	    </Layout>
	</Router>
    );
}

export default App;
