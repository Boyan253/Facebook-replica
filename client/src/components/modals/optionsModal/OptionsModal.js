import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import './optionsmodal.css'

export function OptionsModal({ closeModal }) {

    const { auth } = useContext(AuthContext)
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
                                <input type="text" value={auth.username} />
                            </p>
                            <p>Email:<input type="text" value={auth.email} placeholder='Please Add Email(Optional)' /></p>
                            <p>Country: <strong><input type="text" placeholder='Please Add Country(Optional)' /></strong></p>
                            <p>
                                City:
                                <strong><input type="text" placeholder='Please Add City(Optional)' /></strong>
                            </p>
                            <p>Relationship: <label htmlFor="Single">Single</label><input type="radio" value='Single' name='Single' />   | <label htmlFor="inRelation">inRelationShip</label><input type="radio" value='Married' /></p>
                            <p>Created on: <strong>{auth.createdAt}</strong></p>
                            <p>Modified on: <strong>{auth.updatedAt}</strong></p>
                            <button className='button-upload'>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}


