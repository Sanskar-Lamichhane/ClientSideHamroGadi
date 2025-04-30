import { useSelector } from "react-redux";

function ProtectedComponent({ role, children }) {
  const userRedux = useSelector((store) => {
    return store.user.value;
  });

  return (
    <>{userRedux ? (userRedux?.role === role ? children : null) : children}</>
  );
}

export default ProtectedComponent;
