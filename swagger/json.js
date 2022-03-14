exports.mySwaggerJson = {
  "openapi": "3.0.1",
  "info": {
    "title": "Yo!Photo 👻",
    "version": "1.0.0"
  },
  "servers": [
    {
      "url": "http://localhost:8000/api"
    },
    {
      "url": "http://localhost:8000/api/v1"
    },
    {
      "url": "http://localhost:8000/api/v2"
    }
  ],
  "tags": [
    {
      "name": "User"
    },
    {
      "name": "Profile"
    },
    {
      "name": "Photo"
    },
    {
      "name": "Album"
    }
  ],
  "paths": {
    "/users": {
      "get": {
        "tags": [
          "User"
        ],
        "summary": "Get all user",
        "operationId": "getMany",
        "parameters": [
          {
            "name": "skip",
            "in": "query",
            "description": "skip",
            "required": false,
            "schema": {
              "type": "integer",
              "example": 0
            }
          },
          {
            "name": "take",
            "in": "query",
            "description": "take",
            "required": false,
            "schema": {
              "type": "integer",
              "example": 100
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "$ref": "#/components/schemas/User"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/users/id/{id}": {
      "get": {
        "tags": [
          "User"
        ],
        "summary": "Get specific user by id",
        "operationId": "getUserById",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "User ID",
            "required": true,
            "schema": {
              "type": "string",
              "example": "02252e26-64ff-45c2-9aa0-14ca5d7a0e70"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "$ref": "#/components/schemas/User"
                  }
                }
              }
            }
          }
        }
      },
      "delete": {
        "tags": [
          "User"
        ],
        "summary": "Delete sepecific user by id",
        "operationId": "deleteUser",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "User ID",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/User"
                }
              }
            }
          }
        }
      }
    },
    "/users/signup": {
      "post": {
        "tags": [
          "User"
        ],
        "summary": "Create user",
        "operationId": "createUser",
        "requestBody": {
          "required": true,
          "content": {
            "application/x-www-form-urlencoded": {
              "schema": {
                "type": "object",
                "properties": {
                  "userName": {
                    "type": "string",
                    "example": "broto"
                  },
                  "email": {
                    "type": "string",
                    "example": "broto@mantab.io"
                  },
                  "password": {
                    "type": "string",
                    "example": "Pass123?"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "default": {
            "description": "successful operation",
            "content": {}
          }
        },
        "x-codegen-request-body-name": "body"
      }
    },
    "/users/login": {
      "post": {
        "tags": [
          "User"
        ],
        "summary": "User login",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/LoginJSON"
              },
              "examples": {
                "userName arman": {
                  "value": {
                    "userName": "arman",
                    "password": "Pass123?"
                  }
                },
                "userName jhony": {
                  "value": {
                    "userName": "jhony",
                    "password": "Pass123?"
                  }
                },
                "userName alice": {
                  "value": {
                    "userName": "alice",
                    "password": "Pass123?"
                  }
                },
                "userName bob": {
                  "value": {
                    "userName": "bob",
                    "password": "Pass123?"
                  }
                },
                "email arman": {
                  "value": {
                    "userName": "arman@maulana.com",
                    "password": "Pass123?"
                  }
                },
                "email jhony": {
                  "value": {
                    "userName": "jhony@kawasaki.com",
                    "password": "Pass123?"
                  }
                },
                "email alice": {
                  "value": {
                    "userName": "alice@prisma.io",
                    "password": "Pass123?"
                  }
                },
                "email bob": {
                  "value": {
                    "userName": "bob@prisma.io",
                    "password": "Pass123?"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "default": {
            "description": "successful operation",
            "content": {}
          }
        }
      }
    },
    "/users/password": {
      "put": {
        "tags": [
          "User"
        ],
        "summary": "Change user pasword",
        "operationId": "changeUserPassword",
        "requestBody": {
          "required": true,
          "content": {
            "application/x-www-form-urlencoded": {
              "schema": {
                "type": "object",
                "properties": {
                  "password": {
                    "type": "string",
                    "example": "Newpass123?"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "default": {
            "description": "successful operation",
            "content": {}
          }
        },
        "x-codegen-request-body-name": "body"
      }
    },
    "/users/profile/": {
      "get": {
        "tags": [
          "Profile"
        ],
        "summary": "Get all profiles",
        "parameters": [
          {
            "name": "skip",
            "in": "query",
            "description": "skip",
            "required": false,
            "schema": {
              "type": "integer",
              "example": 0
            }
          },
          {
            "name": "take",
            "in": "query",
            "description": "take",
            "required": false,
            "schema": {
              "type": "integer",
              "example": 100
            }
          }
        ],
        "responses": {
          "default": {
            "description": "successful operation",
            "content": {}
          }
        },
        "x-codegen-request-body-name": "body"
      },
      "put": {
        "tags": [
          "Profile"
        ],
        "summary": "Update users own profile",
        "requestBody": {
          "required": false,
          "content": {
            "application/x-www-form-urlencoded": {
              "schema": {
                "type": "object",
                "properties": {
                  "id": {
                    "type": "string",
                    "example": '947fbd10-aa2d-4a80-b609-c26ac36397a1'
                  },
                  "name": {
                    "type": "string",
                    "example": "Arman Maulalan"
                  },
                  "address": {
                    "type": "string",
                    "example": "Jl. Kimia IV No. 165"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "default": {
            "description": "successful operation",
            "content": {}
          }
        },
        "x-codegen-request-body-name": "body"
      }
    },
    "/users/profile/userid/{id}": {
      "get": {
        "tags": [
          "Profile"
        ],
        "summary": "Gets profile by userId",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "User ID",
            "required": true,
            "schema": {
              "type": "string",
              "example": "4b6ddf52-40f9-4545-ab3a-bdd6eb44746b"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Profile"
                }
              }
            }
          }
        }
      }
    },
    "/users/profile/username/{userName}": {
      "get": {
        "tags": [
          "Profile"
        ],
        "summary": "Gets specific profile by Username",
        "parameters": [
          {
            "name": "userName",
            "in": "path",
            "description": "User name",
            "required": true,
            "schema": {
              "type": "string",
              "example": "alice"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Profile"
                }
              }
            }
          }
        }
      }
    },
    "/photos": {
      "get": {
        "tags": [
          "Photo"
        ],
        "summary": "Get all photos from database with limit",
        "parameters": [
          {
            "name": "limit",
            "in": "query",
            "description": "limit",
            "required": true,
            "schema": {
              "type": "integer",
              "example": 100
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "properties": {
                    "status": {
                      "type": "integer"
                    },
                    "message": {
                      "type": "string"
                    },
                    "data": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "type": "object"
                        },
                        "$ref": "#/components/schemas/Photo",
                        "additionalProperties": {
                          "$ref": "#/components/schemas/PhotoDetail"
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "default": {
            "description": "Unexpected error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          }
        }
      },
      "put": {
        "tags": [
          "Photo"
        ],
        "summary": "Update photo detail by photo Id",
        "requestBody": {
          "required": false,
          "content": {
            "application/x-www-form-urlencoded": {
              "schema": {
                "type": "object",
                "properties": {
                  "title": {
                    "type": "string",
                    "example": "This is a new title"
                  },
                  "description": {
                    "type": "string",
                    "example": "This should be a very long description"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Photo"
                }
              }
            }
          }
        }
      }
    },
    "/photos/user/{id}": {
      "get": {
        "tags": [
          "Photo"
        ],
        "summary": "Get all photos from a specific user",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "User ID",
            "required": true,
            "schema": {
              "type": "string",
              "example": '02252e26-64ff-45c2-9aa0-14ca5d7a0e70'
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Photo"
                }
              }
            }
          }
        }
      }
    },
    "/photos/{photoId}": {
      "get": {
        "tags": [
          "Photo"
        ],
        "summary": "Get a specific photo by photo ID",
        "parameters": [
          {
            "name": "photoId",
            "in": "path",
            "description": "photo ID",
            "required": true,
            "schema": {
              "type": "string",
              "example": '0099b5e3-b13d-4975-aaa3-956859c76226'
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Photo"
                }
              }
            }
          }
        }
      }
    },
    "/photos/upload": {
      "post": {
        "tags": [
          "Photo"
        ],
        "summary": "Upload photo to collection User",
        "description": "Logged user only",
        "operationId": "uploadePhoto",
        "requestBody": {
          "content": {
            "multipart/form-data": {
              "schema": {
                "type": "object",
                "properties": {
                  "photo": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "format": "binary"
                    },
                    "oneOf": [
                      {
                        "minItems": 1,
                        "maxItems": 1
                      },
                      {
                        "minItems": 3,
                        "maxItems": 3
                      }
                    ]
                  }
                }
              }
            }
          }
        },
        "responses": {
          "default": {
            "description": "successful operation",
            "content": {}
          }
        },
        "x-codegen-request-body-name": "body"
      }
    },
    "/albums/galleryall": {
      "get": {
        "tags": [
          "Album"
        ],
        "summary": "Get one most updated album from all users, ordered by createdAt",
        "parameters": [
          {
            "name": "skip",
            "in": "query",
            "description": "skip",
            "required": false,
            "schema": {
              "type": "integer",
              "example": 0
            }
          },
          {
            "name": "take",
            "in": "query",
            "description": "take",
            "required": false,
            "schema": {
              "type": "integer",
              "example": 100
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "$ref": "#/components/schemas/Album"
                }
              }
            }
          }
        }
      }
    },
    "/albums": {
      "post": {
        "tags": [
          "Album"
        ],
        "summary": "Create an album",
        "requestBody": {
          "description": "Create an album",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "title": {
                    "type": "string",
                    "example": "Swimming in Sabana, Merauke"
                  }
                }
              }
            },
            "application/x-www-form-urlencoded": {
              "schema": {
                "type": "object",
                "properties": {
                  "title": {
                    "type": "string",
                    "example": "Swimming in Sabana, Merauke"
                  }
                }
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "$ref": "#/components/schemas/Album"
                }
              }
            }
          }
        }
      },
      "get": {
        "tags": [
          "Album"
        ],
        "summary": "Get all albums in the database, with skip and take query, ordered by createdAt",
        "description": "Get all albums in the database, with skip and take query, ordered by createdAt\n",
        "parameters": [
          {
            "name": "skip",
            "in": "query",
            "description": "skip",
            "required": true,
            "schema": {
              "type": "integer",
              "example": 0
            }
          },
          {
            "name": "take",
            "in": "query",
            "description": "take",
            "required": true,
            "schema": {
              "type": "integer",
              "example": 5
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "$ref": "#/components/schemas/Album"
                }
              }
            }
          }
        }
      },
      "put": {
        "tags": [
          "Album"
        ],
        "summary": "Update detail of specific album, by album Id",
        "requestBody": {
          "description": "Update detail of specific album, by album Id",
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/UpdateAlbumDetail"
              },
              "example": {
                "albumId": "f503adb6-3bd4-48a2-9b24-77eb1bae8238",
                "title": "Flying in The Dark",
                "description": "This is how I fly in the Dark",
                "coverPhotoId": 7,
                "isPrivate": true,
                "isDownloadable": true
              }
            }
          },
          "required": true
        },
        "responses": {
          "200": {
            "description": "Successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "$ref": "#/components/schemas/Album"
                }
              }
            }
          }
        }
      }
    },
    "/albums/id/{albumId}": {
      "get": {
        "tags": [
          "Album"
        ],
        "summary": "Get a specific album by album id, include its photos",
        "parameters": [
          {
            "name": "albumId",
            "in": "path",
            "description": "albumId",
            "required": true,
            "schema": {
              "type": "string",
              "format": "uuid",
              "example": "82b097b2-f349-42b3-8e1e-34ee8233b1f0"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "$ref": "#/components/schemas/AlbumNested"
                }
              }
            }
          }
        }
      }
    },
    "/albums/userid/{userId}": {
      "get": {
        "tags": [
          "Album"
        ],
        "summary": "Get all albums from specific Username",
        "parameters": [
          {
            "name": "userId",
            "in": "path",
            "description": "userId",
            "required": true,
            "schema": {
              "type": "string",
              "example": "4b6ddf52-40f9-4545-ab3a-bdd6eb44746b"
            }
          },
          {
            "name": "skip",
            "in": "query",
            "description": "skip",
            "required": false,
            "schema": {
              "type": "integer",
              "example": 0
            }
          },
          {
            "name": "take",
            "in": "query",
            "description": "take",
            "required": false,
            "schema": {
              "type": "integer",
              "example": 100
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "$ref": "#/components/schemas/Album"
                }
              }
            }
          }
        }
      }
    },
    "/albums/username/{userName}": {
      "get": {
        "tags": [
          "Album"
        ],
        "summary": "Get all albums from specific Username",
        "parameters": [
          {
            "name": "userName",
            "in": "path",
            "description": "username",
            "required": true,
            "schema": {
              "type": "string",
              "example": "arman"
            }
          },
          {
            "name": "skip",
            "in": "query",
            "description": "skip",
            "required": true,
            "schema": {
              "type": "integer",
              "example": 0
            }
          },
          {
            "name": "take",
            "in": "query",
            "description": "take",
            "required": true,
            "schema": {
              "type": "integer",
              "example": 5
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "$ref": "#/components/schemas/Album"
                }
              }
            }
          }
        }
      }
    },
    "/albums/search/username/{string}": {
      "get": {
        "tags": [
          "Album"
        ],
        "summary": "Search all albums whose username contain certain string",
        "parameters": [
          {
            "name": "string",
            "in": "path",
            "description": "username that containt string",
            "required": true,
            "schema": {
              "type": "string",
              "example": "arm"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "$ref": "#/components/schemas/Album"
                }
              }
            }
          }
        }
      }
    },
    "/albums/search/title/{string}": {
      "get": {
        "tags": [
          "Album"
        ],
        "summary": "Search all albums by albums's name that contain certain string",
        "parameters": [
          {
            "name": "string",
            "in": "path",
            "description": "album title that contain string",
            "required": true,
            "schema": {
              "type": "string",
              "example": "Dark"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful operation",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "$ref": "#/components/schemas/Album"
                }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "examples": {
      "ObjectLoginByUserName": {
        "value": {
          "username": "arman",
          "password": "Pass123?"
        }
      },
      "skip": {
        "value": 0
      },
      "take": {
        "value": 100
      }
    },
    securitySchemes: {
      jwt: {
        type: "http",
        scheme: "bearer",
        // scheme: 'authorization',
        in: "header",
        bearerFormat: "JWT",
        value: 'dfdfdfdfdfdfdfd'
      },
    },
    "schemas": {
      "User": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "example": "947fbd10-aa2d-4a80-b609-c26ac36397a1"
          },
          "userName": {
            "type": "string",
            "example": "arman"
          },
          "email": {
            "type": "string",
            "example": "arman@maulana.com"
          },
          "password": {
            "type": "string",
            "example": "$2a$10$TS.BNhA5sBBqu2l5Vx4Z/.AZOdVCbyUAfZzI3bo3RrjQL455eyWZ."
          },
          "role": {
            "type": "string",
            "example": "USER"
          },
          "isActive": {
            "type": "boolean",
            "example": true
          },
          "lastLoginAt": {
            "type": "string",
            "format": "date-time",
            "example": "2022-03-06T23:16:15.850Z"
          },
          "createdAt": {
            "type": "string",
            "format": "date-time",
            "example": "2022-03-03T19:38:30.610Z"
          },
          "updatedAt": {
            "type": "string",
            "format": "date-time",
            "example": "2022-03-03T19:38:30.611Z"
          }
        }
      },
      "Profile": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "addres": {
            "type": "string"
          },
          "profilePhoto": {
            "type": "string"
          },
          "coverPhoto": {
            "type": "string"
          },
          "userId": {
            "type": "integer",
            "format": "int64"
          },
          "createdAt": {
            "type": "string",
            "format": "date-time"
          },
          "updatedAt": {
            "type": "string",
            "format": "date-time"
          }
        }
      },
      "Photo": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer"
          },
          "title": {
            "type": "string"
          },
          "description": {
            "type": "string"
          },
          "path": {
            "type": "string"
          },
          "userId": {
            "type": "integer",
            "format": "int64"
          },
          "createdAt": {
            "type": "string",
            "format": "date-time"
          },
          "updatedAt": {
            "type": "string",
            "format": "date-time"
          }
        }
      },
      "PhotoDetail": {
        "type": "object",
        "properties": {
          "photoId": {
            "type": "string"
          },
          "fileName": {
            "type": "string"
          },
          "originalName": {
            "type": "string"
          },
          "mimeType": {
            "type": "string"
          },
          "encoding": {
            "type": "string"
          },
          "size": {
            "type": "integer"
          },
          "isPrivate": {
            "type": "boolean"
          },
          "views": {
            "type": "integer"
          },
          "likes": {
            "type": "integer"
          },
          "downloaded": {
            "type": "integer"
          },
          "starRating": {
            "type": "integer"
          },
          "cameraMake": {
            "type": "string"
          },
          "shutterSpeed": {
            "type": "string"
          },
          "aperture": {
            "type": "string"
          },
          "focalLength": {
            "type": "number",
            "format": "float"
          },
          "iso": {
            "type": "integer"
          }
        }
      },
      "Album": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "title": {
            "type": "string"
          },
          "description": {
            "type": "string"
          },
          "coverPhotoId": {
            "type": "string"
          },
          "isPrivate": {
            "type": "boolean"
          },
          "isDownloadable": {
            "type": "boolean"
          },
          "createdAt": {
            "type": "string",
            "format": "date-time"
          },
          "updatedAt": {
            "type": "string",
            "format": "date-time"
          }
        }
      },
      "AlbumNested": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "format": "uuid"
          },
          "title": {
            "type": "string"
          },
          "description": {
            "type": "string"
          },
          "coverPhotoId": {
            "type": "string"
          },
          "user": {
            "type": "object",
            "$ref": "#/components/schemas/User"
          },
          "userId": {
            "type": "integer"
          },
          "isPrivate": {
            "type": "boolean"
          },
          "isDownloadable": {
            "type": "boolean"
          },
          "photos": {
            "type": "object",
            "$ref": "#/components/schemas/Photo"
          },
          "createdAt": {
            "type": "string",
            "format": "date-time"
          },
          "updatedAt": {
            "type": "string",
            "format": "date-time"
          }
        }
      },
      "UpdateAlbumDetail": {
        "type": "object",
        "properties": {
          "albumId": {
            "type": "string",
            "format": "uuid"
          },
          "title": {
            "type": "string"
          },
          "description": {
            "type": "string"
          },
          "coverPhotoId": {
            "type": "string"
          },
          "isPrivate": {
            "type": "boolean"
          },
          "isDownloadable": {
            "type": "boolean"
          }
        }
      },
      "SuccessResponseObject": {
        "type": "object",
        "properties": {
          "status": {
            "type": "integer",
            "format": "int32"
          },
          "message": {
            "type": "string"
          },
          "data": {
            "type": "object"
          }
        }
      },
      "SuccessResponseArray": {
        "type": "object",
        "properties": {
          "status": {
            "type": "integer",
            "format": "int32"
          },
          "message": {
            "type": "string"
          },
          "data": {
            "type": "array",
            "items": {
              "type": "object"
            }
          }
        }
      },
      "ErrorResponse": {
        "type": "object",
        "properties": {
          "status": {
            "type": "integer",
            "format": "int32"
          },
          "code": {
            "type": "string"
          },
          "message": {
            "type": "string"
          }
        }
      },
      "LoginJSON": {
        "type": "object",
        "properties": {
          "userName": {
            "type": "string"
          },
          "password": {
            "type": "string"
          }
        },
        "example": {
          "userName": "arman",
          "password": "Pass123?"
        }
      }
    }
  }
}