export enum Role {
  User = 'user',
  Admin = 'admin',
}

export enum TokenType {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
}

export enum ErrorCode {
  // Common error
  Unknown_Error = 'Unknown_Error',
  Invalid_Input = 'Invalid_Input',
  Not_Found = 'Not_Found',
  Token_Not_Exist = 'Token_Not_Exist',
  Forbidden_Resource = 'Forbidden_Resource',
  Unauthorized = 'Unauthorized',

  Email_Already_Exist = 'Email_Already_Exist',
  Email_Or_Password_Not_valid = 'Email_Or_Password_Not_valid',
  Resource_Already_Exists = 'Resource_Already_Exists',
  Can_Not_Disable_Default_language = 'Can_Not_Disable_Default_language',
  Old_Password_Incorrect = 'Old_Password_Incorrect',
}

export enum Action {
  Manage = 'manage',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export enum SearchIndex {
  Product = 'product',
}
