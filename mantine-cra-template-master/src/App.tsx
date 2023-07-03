import { ThemeProvider } from "./ThemeProvider";
import { SignUp } from "./Pages/SignUp";
import { LogIn } from "./Pages/LogIn";
import { NothingFoundBackground } from "./Pages/NotFound";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import { Item } from "./Pages/Item";

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/:title/:id" element={<Item />} />
          <Route path="*" element={<NothingFoundBackground />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
