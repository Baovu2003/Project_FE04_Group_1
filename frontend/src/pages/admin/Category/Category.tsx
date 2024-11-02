import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { del, get, patch } from "../../../Helpers/API.helper";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store"; // Adjust this import based on your store setup
import { ProductCategory } from "../../../actions/types";
import { showConfirmationAlert, showSuccessAlert } from "../../../Helpers/alerts";

const Category: React.FC = () => {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const account = useSelector((state: RootState) => state.AccountReducer);

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const data = await get("http://localhost:5000/admin/products-category");
      console.log("data.records:", data.recordsCategory);
      setCategories(data.recordsCategory);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleStatusChange = async (productId: string, currentStatus: "active" | "inactive") => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";

    const isConfirmed = await showConfirmationAlert("Are you sure?", `Change status to "${newStatus}"?`, "Yes change it!");

    if (isConfirmed) {
      try {
        const data = await patch(
          `http://localhost:5000/admin/products-category/change-status/${newStatus}/${productId}`, { status: newStatus }
        );
        console.log(data);
        showSuccessAlert("Success", `Trạng thái đã được cập nhật thành "${newStatus}".`);
        fetchCategory();

      } catch (error) {
        console.error("Error changing status:", error);
      }
    }
  };

  const handleDelete = async (productId: string, deleted: string) => {
    console.log(deleted);
    let isConfirmed;
    let actionMessage; 

    if (deleted === "active") {
      isConfirmed = await showConfirmationAlert("Are you sure?", "Do you want to Undelete this category?", "Yes Undelete it!");
      actionMessage = ("Khôi phục thành công"); 
    } else {
      isConfirmed = await showConfirmationAlert("Are you sure?", "Do you want to delete this category?", "Yes delete it!");
      actionMessage = "Xóa thành công"; 
    }

    if (isConfirmed) {
      try {
        await del(
          `http://localhost:5000/admin/products-category/delete/${productId}`
        );
        showSuccessAlert("Success", actionMessage);
        fetchCategory();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };


  const renderTableRows = (records: ProductCategory[], level: number = 1) => {
    return records.map((item, index) => {
      const prefix = Array(level).join("-- ");
      return (
        <React.Fragment key={item._id}>
          <tr>
            <td>{index + 1}</td>
            <td>
              <img
                src={
                  item.thumbnail
                    ? item.thumbnail.startsWith("http")
                      ? item.thumbnail
                      : `http://localhost:5000${item.thumbnail}`
                    : "http://localhost:5000/path-to-placeholder-image.png" // Placeholder image URL
                }
                alt={item.title || "Placeholder Image"}
                width="100px"
                height="auto"
              />
            </td>
            <td>
              {prefix} {item.title}
            </td>
            <td>
              <input
                type="number"
                defaultValue={item.position}
                min="1"
                style={{ width: "60px", borderRadius: "5px" }}
                name="position"
                readOnly
              />
            </td>
            <td>
              {account && account.role.permission.includes("products-category_create") && (
                <Button
                  variant={item.status === "active" ? "success" : "danger"}
                  onClick={() => handleStatusChange(item._id, item.status)}
                >
                  {item.status === "active" ? "Active" : "Inactive"}
                </Button>
              )}
            </td>
            <td>
              {item.deleted ? (
                <h6 className="text-danger">Đã xóa</h6>
              ) : (
                <h6 className="text-success">Chưa xóa</h6>
              )}
            </td>
            <td>
              <Link to={`detail/${item._id}`} className="btn btn-primary me-2">
                Detail
              </Link>
              {account && account.role.permission.includes("products-category_create") && (
                <Link to={`edit/${item._id}`} className="btn btn-warning me-2">
                  Update
                </Link>
              )}
              {account && account.role.permission.includes("products-category_delete") && (
                <Button
                  variant={item.deleted ? "success" : "danger"}
                  onClick={() => handleDelete(item._id, item.deleted ? "active" : "deleted")}
                  className="ms-2"
                >
                  {item.deleted ? "Undeleted" : "Deleted"}
                </Button>
              )}
            </td>
          </tr>
          {item.children && item.children.length > 0 && renderTableRows(item.children, level + 1)}
        </React.Fragment>
      );
    });
  };

  return (
    <div>
      {account && account.role.permission.includes("products-category_view") && (
        <>
          <h1 className="mb-4">Category Management</h1>
          {account.role.permission.includes("products-category_create") && (
            <Row>
              <Col md={12} className="d-flex justify-content-end mb-4">
                <Link to="/admin/products-category/create" className="btn btn-success">
                  Create category
                </Link>
              </Col>
            </Row>
          )}

          <form action="" method="POST" data-path={`admin/products-category/delete`} id="form-delete-item">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Thumbnail</th>
                  <th>Title</th>
                  <th>Position</th>
                  <th>Status</th>
                  <th>isDeleted</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{renderTableRows(categories)}</tbody>
            </table>
          </form>
        </>
      )}
    </div>
  );
};

export default Category;
