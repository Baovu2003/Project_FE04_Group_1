import React, { useEffect, useState } from 'react';
import { ApiResponse, Order, Product } from '../../../actions/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { get } from '../../../Helpers/API.helper';
import { Button, Table } from 'react-bootstrap';

function OrderUser() {
    const [orders, setOrders] = React.useState<Order[]>([]); // Initialize as an empty array
    const [products, setProducts] = useState<Product[]>([]); // Store products details

    const user = useSelector((state: RootState) => state.UserReducer);
    const user_id = user?.user._id;

    useEffect(() => {
        const fetchApiOrderByUserId = async () => {
            try {
                const data: ApiResponse = await get(`http://localhost:5000/orders/${user_id}`);
                setOrders(data.OrderByUserId);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        if (user_id) {
            fetchApiOrderByUserId();
        }
    }, [user_id]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await get(`http://localhost:5000/products`);
                console.log(data.recordsProduct);
                setProducts(data.recordsProduct);
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };

        fetchProduct();
    }, []);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Button>Đơn hàng của tôi</Button>
            </div>


            {orders && orders.length > 0 ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                    <Table
                        hover
                        striped
                        bordered
                        cellPadding="5"
                        cellSpacing="0"
                        style={{
                            width: '80%', // You can adjust the width of the table as needed
                            textAlign: 'left',
                            fontSize: '14px',  // Smaller font size for the table
                        }}
                    >
                        <thead>
                            <tr>
                                <th>Tên</th>
                                <th>Email</th>
                                <th>Số điện thoại</th>
                                <th>Địa chỉ</th>
                                <th>Sản phẩm</th>
                                <th>Phương thức thanh toán</th>
                                <th>Tổng tiền</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order.userInfo.fullname}</td>
                                    <td>{order.userInfo.email}</td>
                                    <td>{order.userInfo.phone}</td>
                                    <td>{order.userInfo.address}</td>
                                    <td>
                                        <ul style={{ paddingLeft: "20px" }}>
                                            {order.products.map((productInOrder, index) => {
                                                const productDetail = products.find((product) => product._id === productInOrder.product_id);

                                                return productDetail ? (
                                                    <li key={index} style={{ marginBottom: '5px' }}>
                                                        <p style={{ margin: '0' }}>Tên sản phẩm: {productDetail.title}</p>
                                                        <p style={{ margin: '0' }}>Số lượng: {productInOrder.quantity}</p>
                                                        <p style={{ margin: '0' }}>Giá: {productDetail.price.toLocaleString('vi-VN')}đ</p>
                                                    </li>
                                                ) : (
                                                    <li key={index}>Sản phẩm không tìm thấy</li>
                                                );
                                            })}
                                        </ul>
                                    </td>
                                    <td>{order.paymentMethod === '1' ? 'Thanh toán trực tiếp' : 'Thanh toán trên QR'}</td>
                                    <td>{order.total.toLocaleString('vi-VN')}đ</td>
                                    <td>{order.status === 'pending' ? 'Chưa thanh toán' : 'Đã thanh toán'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>

            ) : (
                <p>Bạn chưa có đơn hàng nào.</p>
            )}
        </div>
    );
}

export default OrderUser;
