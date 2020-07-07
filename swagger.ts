export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'Ed Voter Api Documentation',
    description: 'Lets voter smart',
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
  },
  servers: [
    {
      url: '/',
      description: 'Local Dev or from Heroku',
    },
  ],
  tags: [
    {
      name: 'Auth',
      description: 'API for authentication in the system',
    },
    {
      name: 'Aspirant',
      description: 'API for aspirant in the system',
    },
    {
      name: 'PollAgent',
      description: 'API for poll-agent in the system',
    },
    {
      name: 'Voter',
      description: 'API for voter in the system',
    },
    {
      name: 'UploadImage',
      description: 'API for upload in the system',
    },
    {
      name: 'Vote',
      description: 'API for vote in the system',
    },
  ],

  consumes: ['application/json'],
  produces: ['application/json'],
  paths: {
    '/auth': {
      get: {
        tags: ['Auth'],
        summary: 'Get all Auth in system',
        responses: {
          '200': {
            description: 'OK',
            schema: {
              $ref: '#/definitions/Auth',
            },
          },
        },
      },
      post: {
        tags: ['Auth'],
        summary: 'Create a new Auth in system',
        requestBody: {
          description: 'Auth Object',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/definitions/Auth',
              },
            },
          },
        },
        produces: ['application/json'],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              $ref: '#/definitions/id',
            },
          },
          '400': {
            description: 'Failed. Bad post data.',
          },
        },
      },
    },
    '/auth/{id}': {
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID of the auth that we want to match',
          type: 'string',
        },
      ],
      get: {
        tags: ['Auth'],
        summary: 'Auth with given ID',
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            description: 'Auth with id',
            schema: {
              $ref: '#/definitions/id',
            },
          },
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              $ref: '#/definitions/Auth',
            },
          },
          '404': {
            description: 'Failed. Auth not found.',
          },
        },
      },
      put: {
        summary: 'Update Auth with given ID',
        tags: ['Auth'],
        requestBody: {
          description: 'Auth Object',
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/definitions/Auth',
              },
            },
          },
        },
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            description: 'Auth with new values of properties',
            schema: {
              $ref: '#/definitions/id',
            },
          },
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              $ref: '#/definitions/Auth',
            },
          },
          '400': {
            description: 'Failed. Bad post data.',
          },
          '404': {
            description: 'Failed. Cat not found.',
          },
        },
      },
      delete: {
        summary: 'Delete cat with given ID',
        tags: ['Auth'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            description: 'Delete Auth with id',
            schema: {
              $ref: '#/definitions/id',
            },
          },
        ],
        responses: {
          '200': {
            description: 'OK',
            schema: {
              $ref: '#/definitions/id',
            },
          },
          '404': {
            description: 'Failed. Auth not found.',
          },
        },
      },
    },
  },
  definitions: {
    id: {
      properties: {
        uuid: {
          type: 'string',
        },
      },
    },
    Auth: {
      type: 'object',
      properties: {
        genus: {
          type: 'string',
        },
        name: {
          type: 'string',
        },
        isHungry: {
          type: 'boolean',
        },
        lastFedDate: {
          type: 'string',
        },
      },
    },
    Auths: {
      type: 'object',
      properties: {
        auths: {
          type: 'object',
          additionalProperties: {
            $ref: '#/definitions/auth',
          },
        },
      },
    },
  },
};
