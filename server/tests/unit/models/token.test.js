import setupTestDB from '../../utils/setupTestDB.js';
import Token from '../../../src/models/token.js'; 

describe('Token Model Tests', () => {
    setupTestDB();

  test('should create a new token', async () => {
    const tokenData = {
      token: 'sampletoken123',
      user: mongoose.Types.ObjectId(),
      type: 'refreshToken',
      expires: new Date('2024-12-31'),
      blacklisted: false,
    };

    const token = await Token.create(tokenData);

    expect(token.token).toBe(tokenData.token);
    expect(token.user).toEqual(tokenData.user);
    expect(token.type).toBe(tokenData.type);
    expect(token.expires).toEqual(tokenData.expires);
    expect(token.blacklisted).toBe(tokenData.blacklisted);
    // Add more assertions as needed to validate the created token
  });

  test('should not create a token without required fields', async () => {
    const incompleteTokenData = {
      // Incomplete data without required fields
      // Add a partial set of required fields here to test validation
      token: 'sampletoken123',
      type: 'resetPasswordToken',
      expires: new Date('2024-12-31'),
    };

    let error;

    try {
      await Token.create(incompleteTokenData);
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.name).toBe('ValidationError'); // Assuming Mongoose throws a ValidationError for missing fields
    // Add more specific assertions based on your validation requirements
  });

  // Add more tests to cover other functionalities of the Token model
});
