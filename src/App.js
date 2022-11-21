import { useEffect, useState } from "react";
import "./App.css";
import Auth from "./pages/Auth";
import jwtDecode from "jwt-decode";
import Home from "./pages/Home";
import { getUser } from "./services/api";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const Start = async () => {
			const jwt = localStorage.getItem("token");
			if (jwt) {
        console.log(jwt)
				const user_jwt = jwtDecode(jwt);
        const { data } = await getUser(user_jwt._id);
        setUser(data.data[0])
			}
		};
		Start();
  }, []);
  return (
    <div className="App">
      <div className="navbar">
        <h2>Auth Email</h2>
        <h4>
          {user ? (
            <button onClick={() => {
              localStorage.clear()
              setUser(null)
              }}>
              {user?.fullName}
            </button>
          ) : (
            "SignIn"
          )}
        </h4>
      </div>
      {user ? <Home user={user} /> : <Auth />}
    </div>
  );
}

export default App;
