import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Detail from "./routes/Detail";
import Home from "./routes/Home";

export default () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/:coinId/*" element={<Detail />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
