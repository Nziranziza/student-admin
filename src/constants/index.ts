export enum HTTP_STATUS {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSED = 422,
  SERVER_ERROR = 500
}

export enum RESPONSE_MESSAGES {
  DELETED = 'deleted',
  GROUP_LIMIT = 'can only enroll to 4 study groups',
  NOT_MEMBER = 'you do not belongs to this group',
  LEFT = 'left',
  GROUP_NOT_FOUND = 'study group with such id is not found',
  STUDENT_NOT_FOUND = 'student with such id is not found',
  EMAIL_TAKEN = 'email already taken',
  SOMETHING_WRONG = 'something went wrong!'
}