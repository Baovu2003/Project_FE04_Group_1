import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { get } from '../../../Helpers/API.helper';
import { ProductCategory, ApiResponse } from '../../../actions/types';
import { Card, Spin, Typography } from 'antd';

const { Title, Paragraph } = Typography;

function DetailCategory() {
    const { id } = useParams();
    const [category, setCategory] = useState<ProductCategory | null>(null);
    const [categories, setCategories] = useState<ProductCategory[]>([]);
    const [parentCategory, setParentCategory] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Hàm đệ quy để tìm danh mục cha trong nhiều cấp
    const findParentCategory = (categories: ProductCategory[], parentId: string): ProductCategory | null => {
        console.log({parentId})
        for (const category of categories) {
            console.log(category)
            if (category._id === parentId) {
                return category;
            }
            // Nếu danh mục có children, tìm trong các children
            if (category.children && category.children.length > 0) {
                const found = findParentCategory(category.children, parentId);
                if (found) return found;
            }
        }
        return null;
    };

    useEffect(() => {
        const fetchCategoryDetails = async () => {
            try {
                // Lấy dữ liệu chi tiết danh mục
                const categoryResponse: ApiResponse = await get(`http://localhost:5000/admin/products-category/detail/${id}`);
                setCategory(categoryResponse.detailCategory);

                // Lấy tất cả danh mục
                const categoriesResponse = await get("http://localhost:5000/admin/products-category");
                setCategories(categoriesResponse.recordsCategory);

                // Tìm danh mục cha nếu có parent_id
                if (categoryResponse.detailCategory.parent_id) {
                    const parent = findParentCategory(categoriesResponse.recordsCategory, categoryResponse.detailCategory.parent_id);
                    setParentCategory(parent ? parent.title : "Không tìm thấy danh mục cha");
                }
            } catch (error) {
                console.error("Error fetching category details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryDetails();
    }, [id]);
    console.log(categories)

    return (
        <div style={{ padding: '20px' }}>
            <Title level={2}>Detail Category</Title>
            {loading ? (
                <Spin size="large" />
            ) : category ? (
                <Card style={{ width: 300 }}>
                    <Title level={3}>{category.title}</Title>
                    <Paragraph><strong>ID:</strong> {category._id}</Paragraph>
                    <Paragraph><strong>Parent Category:</strong> {parentCategory || "Không có danh mục cha"}</Paragraph>
                    <Paragraph><strong>Description:</strong> {category.description || "No description available."}</Paragraph>
                    <Paragraph><strong>Status:</strong> {category.status}</Paragraph>
                    <Paragraph><strong>Position:</strong> {category.position}</Paragraph>
                    <Paragraph><strong>Slug:</strong> {category.slug}</Paragraph>
                    <Paragraph><strong>Deleted:</strong> {category.deleted ? "Yes" : "No"}</Paragraph>
                    {/* <Paragraph><strong>Created At:</strong> {category.createdBy.createdAt ? new Date(category.createdBy.createdAt).toLocaleString() : "N/A"}</Paragraph> */}
                </Card>
            ) : (
                <p>Category not found.</p>
            )}
        </div>
    );
}

export default DetailCategory;
