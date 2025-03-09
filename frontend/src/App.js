import React from "react";
import { Router, Route, Switch, Redirect } from "wouter";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import Dashboard from "./pages/Dashboard.js";
import ProtectedRoute from "./components/ProtectedRoute.js";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
    return (
        <Router>
            <Switch>
                {/* Redirect home `/` to `/login` */}
                <Route path="/" component={() => <Redirect to="/login" />} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/dashboard" component={() => (
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                )} />
            </Switch>
        </Router>
    );
};

export default App;
