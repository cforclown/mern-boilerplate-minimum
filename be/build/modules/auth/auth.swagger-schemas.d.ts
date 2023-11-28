export declare const AuthSwaggerSchemas: {
    login: {
        type: string;
        properties: {
            username: {
                type: string;
                required: boolean;
            };
            password: {
                type: string;
                required: boolean;
            };
        };
    };
    register: {
        type: string;
        properties: {
            username: {
                type: string;
                required: boolean;
            };
            email: {
                type: string;
                required: boolean;
            };
            fullname: {
                type: string;
                required: boolean;
            };
            password: {
                type: string;
                required: boolean;
            };
            confirmPassword: {
                type: string;
                required: boolean;
            };
        };
    };
    refreshToken: {
        type: string;
        properties: {
            refreshToken: {
                type: string;
                required: boolean;
            };
        };
    };
};
