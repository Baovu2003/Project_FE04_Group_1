import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Define interface for Blog data
interface Blog {
  _id: string;
  title: string;
  status: string;
  createdAt: string;
  thumbnail: string;
  position: number;
}

// Define interface for API response
interface BlogResponse {
  recordBlog: Blog[];
}

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get<BlogResponse>('http://localhost:5000/admin/blog/listBlog');
        setBlogs(response.data.recordBlog);
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

  return (
    <div className="blog-list">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Quản lý Blog</h2>
        <Link to="create" className="btn btn-primary">
          Thêm mới Blog
        </Link>
      </div>
      
      <table className="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tiêu đề</th>
            <th>Hình ảnh</th>
            <th>Ngày tạo</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog, index) => (
            <tr key={blog._id}>
              <td>{blog.position}</td>
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
                <span className={`badge ${blog.status === 'active' ? 'bg-success' : 'bg-danger'}`}>
                  {blog.status}
                </span>
              </td>
              <td>
                <Link 
                  to={`edit/${blog._id}`} 
                  className="btn btn-warning btn-sm me-2"
                >
                  Sửa
                </Link>
                <button 
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    // Implement delete functionality
                    if (window.confirm('Bạn có chắc chắn muốn xóa blog này?')) {
                      // Add delete logic here
                    }
                  }}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {blogs.length === 0 && (
        <div className="text-center py-4">
          Chưa có blog nào được tạo
        </div>
      )}
    </div>
  );
};

export default BlogList;