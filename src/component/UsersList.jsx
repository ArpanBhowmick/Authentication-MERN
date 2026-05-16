// import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "@/api/axios";
import useAuth from "@/hooks/useAuth";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { LogOut } from "lucide-react";

function UsersList() {
  
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const user = auth.user;

  

  const handleLogout = async () => {
    try {
      await axios.post("/logout", {}, { withCredentials: true });
      setAuth({});
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      setAuth({});
      navigate("/login");
    }
  };


  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-blue-600 border-b-2 border-blue-600 pb-4">
            All Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!user ? (
            <p className="text-center text-gray-600 py-4">No users found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-600 hover:bg-blue-600">
                  <TableHead className="text-white font-semibold py-3 px-4">
                    Username
                  </TableHead>
                  <TableHead className="text-white font-semibold py-3 px-4">
                    Email
                  </TableHead>
                  <TableHead className="text-white font-semibold py-3 px-4">
                    Role
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow key={user._id || user.id}>
                  <TableCell className="py-3 px-4">{user.name}</TableCell>
                  <TableCell className="py-3 px-4">{user.email}</TableCell>
                  <TableCell className="py-3 px-4">
                    {user.roles?.join(", ") || "User"}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          )}
          <div className="flex justify-center mt-6">
            <Button asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
          <div className="flex justify-center mt-4">
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default UsersList;
