import './optionsmodal.css'

export const OptionsModal = ({ user, onClose }) => {

    return (<div className="overlay">
        <div className="backdrop" onClick={onClose} />
        <div className="modal" >
            <div className="detail-container">

                <div className="content">
                    <div className="image-container">
                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" alt=""
                            className="image" />
                    </div>
                    <div className="user-details">
                        <p>User Id: <strong></strong></p>
                        <p>
                            Full Name:
                            <strong> </strong>
                        </p>
                        <p>Email: <strong></strong></p>
                        <p>Phone Number: <strong></strong></p>
                        <p>
                            Address:
                            <strong>  </strong>
                        </p>

                        <p>Created on: <strong>Wednesday, June 28, 2022</strong></p>
                        <p>Modified on: <strong>Thursday, June 29, 2022</strong></p>
                    </div>
                </div>
            </div>
        </div>
    </div>)



}