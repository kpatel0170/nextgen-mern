import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import UserModel from "../../../src/models/user.js";

describe('User Model Tests', () => {
  beforeAll(async () => {
    // Establish a connection to an in-memory MongoDB server
    await mongoose.connect('mongodb://localhost:27017/testdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  });

  afterAll(async () => {
    // Close the mongoose connection after all tests
    await mongoose.connection.close();
  });

  afterEach(async () => {
    // Clear the User collection after each test
    await UserModel.deleteMany({});
  });

  test('should create a new user', async () => {
    const userData = {
      email: 'test@example.com',
      name: 'Test User',
      password: 'password123',
      // Add other required fields here
    };

    const user = await UserModel.create(userData);

    // Validate the created user
    expect(user.email).toBe(userData.email);
    expect(user.name).toBe(userData.name);
  });

  test('should hash the password before saving', async () => {
    const userData = {
      email: 'test@example.com',
      name: 'Test User',
      password: 'password123',
    };

    const user = await UserModel.create(userData);

    // Check if the password is hashed
    expect(user.password).not.toBe(userData.password);
    const isMatch = await bcrypt.compare(userData.password, user.password);
    expect(isMatch).toBe(true);
  });

  test('should check if email is taken', async () => {
    const existingUser = await UserModel.create({
      email: 'existing@example.com',
      name: 'Existing User',
      password: 'existingPassword',
    });

    const isTaken = await UserModel.isEmailTaken(existingUser.email);
    expect(isTaken).toBe(true);

    const nonExistingEmail = 'nonexisting@example.com';
    const isNotTaken = await UserModel.isEmailTaken(nonExistingEmail);
    expect(isNotTaken).toBe(false);
  });

  test('should check if password matches', async () => {
    const userData = {
      email: 'test@example.com',
      name: 'Test User',
      password: 'password123',
    };

    const user = await UserModel.create(userData);

    const correctPassword = 'password123';
    const incorrectPassword = 'wrongpassword';

    const isMatch = await user.isPasswordMatch(correctPassword);
    const isNotMatch = await user.isPasswordMatch(incorrectPassword);

    expect(isMatch).toBe(true);
    expect(isNotMatch).toBe(false);
  });

  describe('User validation', () => {
    let newUser;
    beforeEach(() => {
      const userData = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123',
        // Add other required fields here
      };
    });

    test('should correctly validate a valid user', async () => {
      await expect(new User(newUser).validate()).resolves.toBeUndefined();
    });

    test('should throw a validation error if email is invalid', async () => {
      newUser.email = 'invalidEmail';
      await expect(new User(newUser).validate()).rejects.toThrow();
    });

    test('should throw a validation error if password length is less than 8 characters', async () => {
      newUser.password = 'passwo1';
      await expect(new User(newUser).validate()).rejects.toThrow();
    });

    test('should throw a validation error if password does not contain numbers', async () => {
      newUser.password = 'password';
      await expect(new User(newUser).validate()).rejects.toThrow();
    });

    test('should throw a validation error if password does not contain letters', async () => {
      newUser.password = '11111111';
      await expect(new User(newUser).validate()).rejects.toThrow();
    });

    test('should throw a validation error if role is unknown', async () => {
      newUser.role = 'invalid';
      await expect(new User(newUser).validate()).rejects.toThrow();
    });
  });
});