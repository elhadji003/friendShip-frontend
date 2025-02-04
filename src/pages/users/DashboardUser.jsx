import React from 'react';
import { Link } from 'react-router-dom';
import { useGetMeQuery } from '../../features/auth/authApi';

const DashboardUser = () => {
    const { data: user, error, isLoading } = useGetMeQuery();

    // Handle loading state
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Handle error state
    if (error) {
        return <div>Error loading user data. Please try again later.</div>;
    }

    // Handle case where user data is not available
    if (!user) {
        return <div>No user data available.</div>;
    }

    return (
        <div>
            Welcome {user.name} | Your email: {user.email}
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae, corrupti. Vel quisquam quia recusandae optio libero quis similique eum! Assumenda odit tempora minus voluptates eius. Ea a veniam ipsa nobis.</p>
            <Link to={'/profile'}>Profile</Link>
        </div>
    );
};

export default DashboardUser;
