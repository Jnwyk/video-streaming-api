/**
 * Specified path doesn't exist ettor class
 */
class InvalidPathError extends Error {
  constructor() {
    super();
    this.name = this.constructor.name;
    this.message = `This path does not exist`;
    this.statusCode = 404;
  }
}

/**
 * Specified ID was not found in database error class
 */
class IdNotFoundError extends Error {
  constructor() {
    super();
    this.name = this.constructor.name;
    this.message = `Specified id does not exist`;
    this.statusCode = 404;
  }
}

/**
 * User is forbidden to enter error class
 */
class NotAllowedError extends Error {
  constructor(userId) {
    super();
    this.name = this.constructor.name;
    this.message = `User ${userId} is watching too many streams`;
    this.statusCode = 403;
  }
}

module.exports = { InvalidPathError, IdNotFoundError, NotAllowedError };
