import React, { useEffect, useState } from "react";
import { Table, Spin, Alert, message } from "antd";
import { get } from "../../../Helpers/API.helper";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { bookingTable, TableWebsite } from "../../../actions/types";
import axios from "axios";
import { Button } from "react-bootstrap";



const HistoryBooking: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<bookingTable[]>([]);
  const [tables, setTables] = useState<TableWebsite[]>([]);
  const [error, setError] = useState<string | null>(null);

  const user = useSelector((state: RootState) => state.UserReducer);
  const user_id = user?.user._id;

  // Fetch tables
  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await get("http://localhost:5000/table/getAllTables");
        setTables(response.recordTables || []);
      } catch (error) {
        console.error("Error fetching tables:", error);
      }
    };
    fetchTables();
  }, []);

  // Fetch booking history
  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await get(`http://localhost:5000/table/historyBookingTable/${user_id}`);
        
        setData(data.recordBookingTables || []);
    } catch (error) {
        if (axios.isAxiosError(error)) {
          // Handle errors from the backend
          const backendMessage = error.response?.data?.message || "An error occurred. Please try again later.";
          message.error(backendMessage); // Display error message from the backend
        } else if (error instanceof Error) {
  
          message.error(error.message);
        } else {
          message.error("An unknown error occurred.");
        }
      
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [user_id]); // Add user_id as a dependency

  // Map table_id to tableName
  const getTableName = (table_id: string) => {
    console.log(table_id)
    const table = tables.find((t) => t._id === table_id);
    return table?.name || "Unknown Table";
  };

 console.log( getTableName("6734c5f41aed2c9ccb11ef92"))
 console.log(data)
 console.log(tables)
  // Define columns for Ant Design Table
  const columns = [
    {
      title: "Table Name",
      dataIndex: "table_id",
      key: "table_id",
      render: (table_id: string) => getTableName(table_id),
    },
    {
      title: "Date Booked",
      dataIndex: "dateBook",
      key: "dateBook",
    },
    {
      title: "Time Booked",
      dataIndex: "timeBook",
      key: "timeBook",
    },
    {
      title: "Quantity",
      dataIndex: "quantityUser",
      key: "quantityUser",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: boolean) => (status ? "Active" : "Inactive"),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleString(),
    },
  ];

  return (
    <div>
         <div style={{ textAlign: 'center', margin: '20px 0' }}>
                <Button variant="primary">Lịch sử đặt bàn của tôi</Button>
            </div>

      {/* Handle loading state */}
      {loading && <Spin size="large" />}

      {/* Handle error state */}
      {error && <Alert message="Error" description={error} type="error" showIcon />}

      {/* Display table */}
      {!loading && !error && (
        <Table
          dataSource={data}
          columns={columns}
          rowKey="_id" // Use _id as unique key
          pagination={{ pageSize: 5 }}
        />
      )}
    </div>
  );
};

export default HistoryBooking;
