declare const _default: {
    definition: {
        openapi: string;
        info: {
            title: string;
            version: string;
            description: string;
            contact: {
                name: string;
                url: string;
                email: string;
            };
        };
        consumes: string[];
        produces: string[];
        schemes: string[];
        components: {
            schemas: any;
            securitySchemes: {
                Bearer: {
                    type: string;
                    name: string;
                    in: string;
                };
            };
        };
        securityDefinitions: {
            Bearer: {
                type: string;
                name: string;
                in: string;
            };
        };
        security: {
            Bearer: never[];
        };
    };
    apis: string[];
};
export default _default;
