import React, { PureComponent } from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';
import "./User_Analytics.css"
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Legend, ResponsiveContainer, Tooltip,LineChart, Line, XAxis, YAxis, CartesianGrid, } from 'recharts';
import Navbar from '../../Navbar/Navbar';

const User_Analytics = () => {
    const navigate = useNavigate();

    const [UsersData, setUsersData] = useState([]);
    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate("/signup")
        }
    }, [])

    useEffect(() => {
        const url = `http://localhost:5000/auth/getUserByMonth`
        try {
            axios({
                method: "get",
                url: url,
            }).then((res) => {
                let arrOfUser = [];
                for (const key in res.data) {
                    arrOfUser.push({ name: key, value: res.data[key] });
                }
                setUsersData(arrOfUser)
                console.log(typeof (UsersData));
                setIsShow(true);
            })
        } catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <div className='User_Analytics container m-auto'>
            <Navbar />
            {isShow && (
                <div className="question justify-content-center m-auto ">
                <h4 className="my-4 d-flex m-auto ">Users Register</h4>
                    <div className="question-container">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart width={400} height={400}>
                                <Pie dataKey="value" isAnimationActive={false} data={UsersData} cx="50%" cy="50%"
                                    outerRadius={80}
                                    fill="#8884d8"
                                    label
                                />
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}
        </div>
    )
}

export default User_Analytics