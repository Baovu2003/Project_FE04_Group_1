

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { showConfirmationAlert, showSuccessAlert } from "../../../Helpers/alerts";

// Define interface for Blog data
interface Blog {
  _id: string;
  title: string;
  status: string;
  createdAt: string;
  thumbnail: string;
  position: number;
  deleted: boolean;
}

// Define interface for API response
interface BlogResponse {
  recordBlog: Blog[];
}

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [searchTitle, setSearchTitle] = useState<string>('');
  const [filterDate, setFilterDate] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get<BlogResponse>('http://localhost:5000/admin/blog/listBlog');
        setBlogs(response.data.recordBlog);
        setFilteredBlogs(response.data.recordBlog); // Initialize filtered blogs
        setError('');
      } catch (err) {
        setError('Failed to fetch blogs');
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleFilter = () => {
    let filtered = blogs;

    if (searchTitle.trim()) {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchTitle.toLowerCase())
      );
    }

    if (filterDate) {
      filtered = filtered.filter(blog =>
        new Date(blog.createdAt).toLocaleDateString('vi-VN') ===
        new Date(filterDate).toLocaleDateString('vi-VN')
      );
    }

    if (filterStatus) {
      filtered = filtered.filter(blog => blog.status === filterStatus);
    }

    setFilteredBlogs(filtered);
  };

  useEffect(() => {
    handleFilter();
  }, [searchTitle, filterDate, filterStatus]);

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  const handleChangeStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';

    const isConfirmed = await showConfirmationAlert(
      "Are you sure?",
      `Change status to "${newStatus}"?`,
      "Yes, change it!"
    );

    if (isConfirmed) {
      try {
        await axios.patch(`http://localhost:5000/admin/blog/change-status/${newStatus}/${id}`);
        setBlogs(blogs.map(blog =>
          blog._id === id ? { ...blog, status: newStatus } : blog
        ));
        showSuccessAlert("Success", `Blog status changed to ${newStatus}`);
      } catch (error) {
        console.error('Error changing status:', error);
        setError('Failed to change blog status');
      }
    }
  };

  const handleDelete = async (id: string) => {
    const isConfirmed = await showConfirmationAlert(
      "Are you sure?",
      "Do you want to delete this blog?",
      "Yes, delete it!"
    );

    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/admin/blog/delete/${id}`);
        setBlogs(blogs.filter(blog => blog._id !== id));
        showSuccessAlert("Success", "Blog deleted successfully");
      } catch (error) {
        console.error('Error deleting blog:', error);
        setError('Failed to delete blog');
      }
    }
  };

  return (
    <div className="blog-list">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2> Blog Management</h2>
        <Link to="create" className="btn btn-primary">
          Add New Blog
        </Link>
      </div>

      {/* Search and Filter Inputs */}
      <div className="d-flex mb-4">
        <input
          type="text"
          placeholder="Search by title"
          className="form-control me-2"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <input
          type="date"
          className="form-control me-2"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
        <select
          className="form-control"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Position</th>
            <th>Thumbnail</th>
            <th>Create date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredBlogs.map((blog, index) => (
            <tr key={blog._id}>
              <td>{index + 1}</td>
              <td>{blog.title}</td>
              <td>
                {blog.thumbnail && (
                  <img
                    src={`http://localhost:5000${blog.thumbnail}`}
                    alt={blog.title}
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  />
                )}
              </td>
              <td>{formatDate(blog.createdAt)}</td>
              <td>
                <button
                  className={`badge ${blog.status === 'active' ? 'bg-success' : 'bg-danger'}`}
                  onClick={() => handleChangeStatus(blog._id, blog.status)}
                  style={{ cursor: 'pointer', border: 'none' }}
                >
                  {blog.status}
                </button>
              </td>
              <td>
                <Link
                  to={`edit/${blog._id}`}
                  className="btn btn-warning btn-sm me-2"
                >
                  Update
                </Link>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(blog._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredBlogs.length === 0 && (
        <div className="text-center py-4">
          Không tìm thấy blog nào
        </div>
      )}
    </div>
  );
};

export default BlogList;
