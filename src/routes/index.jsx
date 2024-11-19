import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Register from '../pages/Register'
import Admin from "../pages/Admin";
import Private from "./private";

export default function RoutesApp() {
    return (
        <Routes>
            <Route path="/">
                <Route path="/" element={<Home />} />
                <Route path="register" element={<Register />} />
                <Route path="admin" element={<Private><Admin /></Private>} />
            </Route>
        </Routes>
    )
}