import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, Trash2, MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { getAllOrders } from "../../utils/order-api.js";
import toast from "react-hot-toast";

export default function ManageOrders() {
  const [allOrders, setAllOrders] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

  // ✅ Fetch all orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAllOrders();
        console.log("response in get all orders: ", response);
        setAllOrders(response?.data || []); // API ka structure follow kare
      } catch (error) {
        console.error("Error fetching orders:", error.message);
        toast.error("Failed to load orders ❌");
      }
    };
    fetchOrders();
  }, []);

  const handleDelete = (orderId) => {
    setOrderToDelete(orderId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    toast.success("Order deleted 🗑️");
    setDeleteDialogOpen(false);
    // TODO: yahan API call lagao order delete ka
    setAllOrders(allOrders.filter((o) => o.id !== orderToDelete));
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Orders</h1>
      </div>

      {/* Orders List */}
      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Desktop Table */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Phone</TableHead>
                  {/* <TableHead>Status</TableHead> */}
                  <TableHead>shipping_Address</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      {order.first_name || order.last_name
                        ? `${order.first_name} ${order.last_name}`
                        : "Guest"}
                    </TableCell>
                    <TableCell>{order.phone_number || "-"}</TableCell>
                    <TableCell>{order.shipping_address || "N/A"}</TableCell>
                    {/* <TableCell>
                      <Badge
                        variant={
                          order.status === "pending"
                            ? "secondary"
                            : order.status === "completed"
                            ? "default"
                            : "destructive"
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell> */}
                    <TableCell>Rs. {order.total_amount}</TableCell>
                    <TableCell className="capitalize">
                      {order.payment_method.replace("_", " ")}
                    </TableCell>
                    <TableCell>
                      {new Date(order.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Link to={`/dashboard/order/${order.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2 p-2"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              className="text-red-600 focus:text-red-600 focus:bg-red-50"
                              onClick={(e) => {
                                e.preventDefault();
                                handleDelete(order.id);
                              }}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* ✅ Mobile Cards */}
          <div className="md:hidden space-y-4">
            {allOrders.map((order) => (
              <Card key={order.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Order #{order.id}</h3>
                    <p className="text-sm text-gray-500">
                      {order.first_name || order.last_name
                        ? `${order.first_name} ${order.last_name}`
                        : "Guest"}
                    </p>
                    <p className="text-xs text-gray-400">
                      {order.phone_number || "-"}
                    </p>
                  </div>
                  <Badge
                    variant={
                      order.status === "pending"
                        ? "secondary"
                        : order.status === "completed"
                        ? "default"
                        : "destructive"
                    }
                  >
                    {order.status}
                  </Badge>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm text-gray-500">Total</p>
                    <p>Rs. {order.total_amount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Payment</p>
                    <p className="capitalize">
                      {order.payment_method.replace("_", " ")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p>{new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="text-xs">{order.shipping_address}</p>
                  </div>
                </div>

                <div className="mt-3 flex justify-end gap-2">
                  <Link to={`/dashboard/order/${order.id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 p-2"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        className="text-red-600 focus:text-red-600 focus:bg-red-50"
                        onClick={(e) => {
                          e.preventDefault();
                          handleDelete(order.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              order.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={confirmDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
