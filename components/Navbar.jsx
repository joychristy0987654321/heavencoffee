// import { Link } from "react-router-dom";

// function Navbar() {
//   return (
//     <nav
//       style={{
//         background: "#3E2723",
//         color: "white",
//         padding: "15px 30px",
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//       }}
//     >
//       <h2>☕ Coffee Haven</h2>

//       <div
//         style={{
//           display: "flex",
//           gap: "20px",
//         }}
//       >
//         <Link to="/" style={{ color: "white", textDecoration: "none" }}>
//           Home
//         </Link>

//         <Link to="/menu" style={{ color: "white", textDecoration: "none" }}>
//           Menu
//         </Link>

//         <Link to="/cart" style={{ color: "white", textDecoration: "none" }}>
//           Cart
//         </Link>

//         <Link
//           to="/favourite"
//           style={{ color: "white", textDecoration: "none" }}
//         >
//           Favourite
//         </Link>

//         <Link
//           to="/dashboard"
//           style={{ color: "white", textDecoration: "none" }}
//         >
//           Dashboard
//         </Link>

//         <Link
//           to="/admin"
//           style={{ color: "white", textDecoration: "none" }}
//         >
//           Admin
//         </Link>

//         <Link
//           to="/reports"
//           style={{ color: "white", textDecoration: "none" }}
//         >
//           Reports
//         </Link>

//         <Link
//           to="/login"
//           style={{ color: "white", textDecoration: "none" }}
//         >
//           Login
//         </Link>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;





import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        background: "#3E2723",
        color: "white",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h2>☕ Coffee Haven</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Home
        </Link>

        <Link to="/menu" style={{ color: "white", textDecoration: "none" }}>
          Menu
        </Link>

        <Link to="/cart" style={{ color: "white", textDecoration: "none" }}>
          Cart
        </Link>

        <Link
          to="/favourite"
          style={{ color: "white", textDecoration: "none" }}
        >
          Favourite
        </Link>

        {/* Payment */}
        <Link
          to="/payment"
          style={{ color: "white", textDecoration: "none" }}
        >
          Payment
        </Link>

        <Link
          to="/dashboard"
          style={{ color: "white", textDecoration: "none" }}
        >
          Dashboard
        </Link>

        <Link
          to="/admin"
          style={{ color: "white", textDecoration: "none" }}
        >
          Admin
        </Link>

        <Link
          to="/reports"
          style={{ color: "white", textDecoration: "none" }}
        >
          Reports
        </Link>

        <Link
          to="/login"
          style={{ color: "white", textDecoration: "none" }}
        >
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;