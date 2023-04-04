import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import './optionsmodal.css'
import { useForm } from 'react-hook-form';

export function OptionsModal({ closeModal, profileEditHandler }) {

    const { auth } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const optionsValidation = {
        image: {
            validate: {
                fileTypes: (value) => {
                    if (value.length === 0) {
                        return "Please upload an image file";
                    }
                    const fileType = value[0].type.split("/")[0];
                    if (fileType !== "image") {
                        return "Please upload an image file";
                    }
                },
                fileSize: (value) => {
                    if (value.length === 0) {
                        return "Please upload an image file";
                    }
                    const fileSize = value[0].size / 1024 / 1024; // in MB
                    if (fileSize > 10) {
                        return "Image size cannot exceed 10MB";
                    }
                },
            },
        },
        email: {
            pattern: {
                value: /^\S+@\S+$/i,
                message: "Please enter a valid email address",
            },
        },
        country: {
            required: 'Please add Country',
            pattern: {
                value: /^[A-Za-z ]+$/,
                message: "Please enter a valid country name",
            },
        },
        city: {
            required: 'Please add City',

            pattern: {
                value: /^[A-Za-z ]+$/,
                message: "Please enter a valid city name",
            },
        },
        relationship: {
            required: "Please select a relationship status",
        },
    };


    const onSubmit = (data) => {
        console.log(data);
        profileEditHandler(data, auth._id)
    };

    return (
        <div className="modalContent">
            <div className="modal-overlay" onClick={closeModal}>


                <div className="modal">
                    <div className="errorContainer">
                        {errors.image && (
                            <p className="fade-in">{errors.image.message}</p>
                        )}
                        {/* {errors.backgroundImage && (
                        <p className="fade-in">{errors.backgroundImage.message}</p>
                    )} */}
                        {/* {errors.fullName && (
                        <p className="fade-in">{errors.fullName.message}</p>
                    )} */}
                        {errors.email && (
                            <p className="fade-in">{errors.email.message}</p>
                        )}
                        {errors.country && (
                            <p className="fade-in">{errors.country.message}</p>
                        )}
                        {errors.city && (
                            <p className="fade-in">{errors.city.message}</p>
                        )}
                        {errors.relationship && (
                            <p className="fade-in">{errors.relationship.message}</p>
                        )}
                    </div>
                    <span className="close" onClick={closeModal}>&times;</span>
                    <div className="content">
                        <div className="image-container">
                            <img src={auth.profilePicture} alt=""
                                className="image-option-modal" />
                        </div>
                        <div className="user-details">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <p>User Id: <strong>{auth._id}</strong></p>
                                <p>Profile Image: <input type="file" name="image" {...register('image')} /></p>
                                <p>Background Image: <input type="file" name="backgroundImage" {...register('backgroundImage')} /></p>

                                <p>
                                    Full Name:
                                    <input
                                        type="text"
                                        defaultValue={auth.username}
                                        {...register('fullName')}
                                    />
                                </p>

                                <p>Email:<input type="text" {...register('email')} value={auth.email} placeholder='Please Add Email(Optional)' /></p>
                                <p>Country: <strong><input type="text" {...register('country', optionsValidation.country)} placeholder='Please Add Country(Optional)' /></strong></p>
                                <p>
                                    City:
                                    <strong><input type="text" {...register('city', optionsValidation.city)} placeholder='Please Add City(Optional)' /></strong>
                                </p>
                                <p>Relationship:
                                    <label htmlFor="Single">
                                        Single
                                        <input type="radio" value="Single" {...register('relationship', optionsValidation.relationship)} name="relationship" />
                                    </label>

                                    |

                                    <label htmlFor="inRelation">
                                        inRelationship
                                        <input type="radio" value="inRelationship" {...register('relationship', optionsValidation.relationship)} name="relationship" />
                                    </label>
                                </p>

                                <p>Created on: <strong>{auth.createdAt}</strong></p>
                                <p>Modified on: <strong>{auth.updatedAt}</strong></p>
                                <button className='button-upload' type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
