import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import './optionsmodal.css'

export function OptionsModal({ closeModal }) {

    const { auth } = useContext(AuthContext)
console.log(auth);
    return (
        <div className="modalContent"  >
            <div className="modal-overlay" onClick={closeModal} >
                <div className="modal" >
                    <span className="close" onClick={closeModal}>&times;</span>
                    <div className="content"  >
                        <div className="image-container">
                            <img src={auth.profilePicture} alt=""
                                className="image" />
                        </div>
                        <div className="user-details">
                            <p>User Id: <strong>{auth._id}</strong></p>
                            <p>
                                Full Name:
                                <input type="text" value={ auth.username } />
                            </p>
                            <p>Email:<input type="text" value={ auth.email } placeholder='Please Add Email'/></p>
                            <p>Phone Number: <strong><input type="number" name="" id="" /></strong></p>
                            <p>
                                Address:
                                <strong><input type="text" /></strong>
                            </p>

                            <p>Created on: <strong>{auth.createdAt}</strong></p>
                            <p>Modified on: <strong>{auth.updatedAt}</strong></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}


