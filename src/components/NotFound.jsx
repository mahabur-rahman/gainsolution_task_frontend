import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <>
      <div className="my-5 py-5 text-danger text-center">
        <h3>Oops! Not Found Page, 404</h3>
      <Link to={"/"}>Back to Home</Link>
      </div>
    
    </>
  )
}

export default NotFound
