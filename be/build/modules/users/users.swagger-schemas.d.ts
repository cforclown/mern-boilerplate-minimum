export declare const UsersSwaggerSchemas: {
    updateUser: {
        type: string;
        properties: {
            username: {
                type: string;
                default: null;
            };
            email: {
                type: string;
                default: null;
            };
            fullname: {
                type: string;
                default: null;
            };
        };
    };
    changePassword: {
        type: string;
        properties: {
            currentPassword: {
                type: string;
                required: boolean;
            };
            newPassword: {
                type: string;
                required: boolean;
            };
            confirmNewPassword: {
                type: string;
                required: boolean;
            };
        };
    };
};
