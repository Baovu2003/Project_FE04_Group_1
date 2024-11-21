import { CheckOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Select, Row, message, Form, DatePickerProps } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { bookingTable, Gift, TableWebsite } from "../../../actions/types";
import { get, patch, post } from "../../../Helpers/API.helper";
import { RootState } from "../../../store/store";
import './BookingTable.css';
import { showSuccessAlert } from "../../../Helpers/alerts";
import { useNavigate } from "react-router-dom";


function BookRoom() {
    const user = useSelector((state: RootState) => state.UserReducer);
    const [tables, setTables] = useState<TableWebsite[]>([]);
    const [gift, setGift] = useState<Gift[]>([]);
    const [giftUser, setGiftUser] = useState<string>('');
    const [spinCount, setSpinCount] = useState<number>(0);  // Track spin count
    const [form] = Form.useForm();

    const [data, setData] = useState<bookingTable>({
        table_id: '',
        user_id: user?.user._id || '',
        timeBook: '',
        dateBook: '',
        quantityUser: 0,
        gift: '',
        status: false,
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTables = async () => {
            try {
                const response = await get("http://localhost:5000/table");
                setTables(response.recordTables);
            } catch (error) {
                console.error("Error fetching tables:", error);
            }
        };
        fetchTables();
    }, []);

    useEffect(() => {
        const fetchTables = async () => {
            try {
                const response = await get("http://localhost:5000/admin/gift");
                setGift(response.recordGift);
            } catch (error) {
                console.error("Error fetching tables:", error);
            }
        };

        fetchTables();
    }, []);


    const optionsTime = [];
    for (let i = 7; i <= 22; i++) {
        optionsTime.push({
            value: i > 9 ? `${i} giờ` : `0${i} giờ`,
            label: i > 9 ? `${i} giờ` : `0${i} giờ`,
        });
    }

    const handleChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date)
        console.log(dateString)
        if (date) {
            setData(prevData => ({
                ...prevData,
                dateBook: dateString as string
            }));
        }
    };


    const handleChangeHours = (value: string) => {
        setData(prevData => ({
            ...prevData,
            timeBook: value
        }));
    };

    const handleSubmit = async () => {
        try {
            // Validate the form data
            await form.validateFields();

            // Prepare the booking data to send
            const bookingData = {
                table_id: data.table_id,
                user_id: data.user_id,
                timeBook: data.timeBook,
                dateBook: data.dateBook,
                quantityUser: data.quantityUser,
                gift: giftUser, // Include the selected gift if any
                status: true,   // Booking status
            };

            // Send the booking request to the server
            const response = await post("http://localhost:5000/table/bookingTable", bookingData);

            if (response && response.message === "Table booked successfully") {
                showSuccessAlert("Success!", "Table booked successfully!");

                await patch(`http://localhost:5000/admin/table/status/${data.table_id}`, { status: false });

                form.resetFields();
                setGiftUser('');
                setSpinCount(0);
                navigate('/');
            } else {
                message.error("Đặt bàn thất bại. Vui lòng thử lại.");
            }

        } catch (error) {
            console.error("Error submitting form:", error);
            message.error("Đặt bàn thất bại. Vui lòng thử lại.");
        }
    };


    const handleLuckyWheel = () => {


        if (gift.length > 0) {
            const randomGift = gift[Math.floor(Math.random() * gift.length)];
            setGiftUser(randomGift.name);
            setSpinCount(prev => prev + 1);

        } else {
            setSpinCount(prev => prev + 1);
            message.error("Chúc bạn may mắn lần sau ");
            setGiftUser('');
        }
    };

    const handleTableSelect = (value: string) => {
        setData(prevData => ({
            ...prevData,
            table_id: value
        }));
    };

    return (
        <div className="reservation-container">
            <div className="reservation-form">
                <h2>Đặt Bàn</h2>
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Row gutter={[20, 20]}>
                        <Col span={12}>
                            <Form.Item
                                label="Chọn bàn"
                                name="table_id"

                                rules={[{ required: true, message: 'Vui lòng chọn bàn' }]}
                            >
                                <Select
                                    placeholder="Chọn bàn"
                                    onChange={handleTableSelect}
                                    style={{ width: "100%" }}
                                >
                                    {tables.map(table => (
                                        <Select.Option key={table._id} value={table._id}>
                                            {table.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                label="Số lượng người"
                                name="quantityUser"
                                rules={[{ required: true, message: 'Vui lòng chọn số lượng người' }]}
                            >
                                <Select
                                    placeholder="Số lượng người"
                                    style={{ width: "100%" }}
                                    onChange={(value) => setData(prevData => ({
                                        ...prevData,
                                        quantityUser: value
                                    }))}
                                >
                                    {[2, 3, 4, 5, 6].map((num) => (
                                        <Select.Option key={num} value={num}>
                                            {num} người
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            {giftUser ? (
                                <>
                                    <p>Quà của bạn là:<strong>{giftUser}</strong></p>

                                </>
                            ) : (
                                <p>Click để nhận ngẫu nhiên quà:</p>
                            )}
                            <div style={{ marginTop: '10px' }}>  {/* Add margin or div for spacing */}
                                <Button
                                    type="primary"
                                    onClick={handleLuckyWheel}
                                    disabled={spinCount >= 1}  // Disable after 1 spin
                                >
                                    Quay may mắn
                                </Button>
                            </div>
                        </Col>


                        <Col span={12}>
                            <Form.Item
                                label="Chọn ngày"
                                name="dateBook"
                                rules={[{ required: true, message: 'Vui lòng chọn ngày' }]}
                            >
                                <DatePicker
                                    placeholder="Chọn ngày"
                                    format="DD-MM-YYYY"
                                    onChange={handleChangeDate}
                                    style={{ width: "100%" }}
                                />
                            </Form.Item>
                        </Col>
                    
                   
                    



                        <Col span={12}>
                            <Form.Item
                                label="Chọn giờ"
                                name="timeBook"
                                rules={[{ required: true, message: 'Vui lòng chọn giờ' }]}
                            >
                                <Select
                                    onChange={handleChangeHours}
                                    style={{ width: 120 }}
                                    options={optionsTime}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
                            <Button
                                style={{ width: "200px" }}
                                type="primary"
                                icon={<CheckOutlined />}
                                htmlType="submit"
                            >
                                Đặt bàn
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    );
}

export default BookRoom;