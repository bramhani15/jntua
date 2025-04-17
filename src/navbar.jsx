import { Link } from 'react-router-dom';
export default function Navbar() {
    return (
        <div>
            <Link to="/">Home</Link>
            <link to='/Contact'>Contact</link>
            <link to='/Product'>Product</link>
        </div>
    )
}