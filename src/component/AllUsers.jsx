import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useAuth from "@/hooks/useAuth";
import axios from "@/api/axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { LogOut, Loader2 } from "lucide-react";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/getAllUsers");
        setUsers(response?.data?.users);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

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
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-blue-600 border-b-2 border-blue-600 pb-4">
            All Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
              <span className="ml-2 text-gray-600">Loading users...</span>
            </div>
          ) : users.length === 0 ? (
            <p className="text-center text-gray-600 py-4">No users found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-600 hover:bg-blue-600">
                  <TableHead className="text-white font-semibold py-3 px-4">#</TableHead>
                  <TableHead className="text-white font-semibold py-3 px-4">Name</TableHead>
                  <TableHead className="text-white font-semibold py-3 px-4">Email</TableHead>
                  <TableHead className="text-white font-semibold py-3 px-4">Mobile</TableHead>
                  <TableHead className="text-white font-semibold py-3 px-4">Roles</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user, index) => (
                  <TableRow key={user._id}>
                    <TableCell className="py-3 px-4 font-medium">{index + 1}</TableCell>
                    <TableCell className="py-3 px-4">{user.name}</TableCell>
                    <TableCell className="py-3 px-4">{user.email}</TableCell>
                    <TableCell className="py-3 px-4">{user.mobile || "N/A"}</TableCell>
                    <TableCell className="py-3 px-4">
                      {user.roles?.join(", ") || "User"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          <div className="flex justify-center gap-4 mt-6">
            <Button asChild variant="outline">
              <Link to="/">Back to Home</Link>
            </Button>
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
};

export default AllUsers