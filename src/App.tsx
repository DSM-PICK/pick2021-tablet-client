import { Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Attendance, MainPage, Calendar, FirstPage, Login } from "./components";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={FirstPage} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/main" component={MainPage} exact />
      <Route path="/attendance" component={Attendance} exact />
      <Route path="/calendar" component={Calendar} exact />
    </BrowserRouter>
  );
}

export default App;
