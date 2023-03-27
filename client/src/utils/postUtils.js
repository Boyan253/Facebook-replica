export const editOptions = {
    title: {
        required: "Title is required",
        minLength: {
            value: 5,
            message: "Title must have at least 5 characters"
        },
        maxLength: {
            value: 100,
            message: "Title must have at most 100 characters"
        }
    },
    location: {
        required: "Location is required",
        minLength: {
            value: 5,
            message: "Location must have at least 5 characters"
        },
        maxLength: {
            value: 50,
            message: "Location must have at most 50 characters"
        }
    },
    tags: {
        required: "Tags are required"
    },
    image: {
        required: "Image is required",
        pattern: {
            value: /\.(gif|jpe?g|png)$/i,
            message: "Image must be a valid image file"
        }
    },
    description: {
        required: "Description is required",
        minLength: {
            value: 10,
            message: "Description must have at least 10 characters"
        },
        maxLength: {
            value: 500,
            message: "Description must have at most 500 characters"
        }
    }
};
