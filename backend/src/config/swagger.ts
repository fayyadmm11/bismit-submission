import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BEM Connect API",
      version: "1.0.0",
      description: "API documentation for BEM Connect platform",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            username: { type: "string", example: "johndoe" },
            email: {
              type: "string",
              format: "email",
              example: "john@example.com",
            },
            created_at: { type: "string", format: "date-time" },
          },
        },
        Post: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            user_id: { type: "integer", example: 1 },
            content: {
              type: "string",
              example: "Halo, ini postingan pertamaku!",
            },
            image_url: {
              type: "string",
              nullable: true,
              example: "https://example.com/image.jpg",
            },
            created_at: { type: "string", format: "date-time" },
            updated_at: { type: "string", format: "date-time" },
            author: { type: "string", example: "johndoe" },
            avatar: { type: "string", example: "johndoe" },
          },
        },
        Error: {
          type: "object",
          properties: {
            message: { type: "string", example: "Internal server error" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api/doc", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
