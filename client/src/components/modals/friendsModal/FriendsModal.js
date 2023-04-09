import { useEffect, useState } from 'react';
import * as userService from '../../../service/userService'
import './friendsModal.css'
import { Link } from 'react-router-dom';

export const FriendsModal = ({ user, closeModal }) => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        userService.getAllUsers()
            .then(data => setUsers(data))

    }, [])

    return (
        <div className="modalContent">
            <div className="modal-overlay" onClick={closeModal}>
                <div className="modal">

                    <div className="errorContainer"></div>

                    <div className="content">
                        <h1>Recommended users</h1>

                        <div className="user-details-friends">
                            {users.length > 0 ? users.map((u) => <Link key={u._id} to={`/profile/${u._id}`}><p ><img src={u.profilePicture} alt='Nopicture' />{u.email}</p></Link>) : <p>No users</p>}

                        </div>
                    </div>
                </div>
            </div>
        </div >
    );



}