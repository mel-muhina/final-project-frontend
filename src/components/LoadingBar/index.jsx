import Spinner from 'react-bootstrap/Spinner';
import './LoadingBar.css'

export default function LoadingBar() {
  return (
    <Spinner animation="border" role="status" className='spinner' size='sm'>
    <span className="visually-hidden">Loading...</span>
  </Spinner>
  )
}
