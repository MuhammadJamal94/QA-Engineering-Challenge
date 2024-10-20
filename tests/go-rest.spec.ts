import { test, expect } from "@playwright/test";
import goRestData from "../data/goRestData.json";
import { createUser, deleteUser } from "../utils/goRestUtils";

const { BASE_URL, TOKEN, newUser, updatedUser } = goRestData;
let userId: number | undefined;
let uniqueEmail: string;

test.describe("GoRest API Tests", () => {

  test.beforeEach(async ({ request }) => {
    const user = await createUser(request, BASE_URL, TOKEN, newUser);
    userId = user.userId;
    uniqueEmail = user.email;
  });

  test.afterEach(async ({ request }) => {
    await deleteUser(request, BASE_URL, TOKEN, userId);
  });

  test("GET /users - should return a list of users", async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    expect(response.status()).toBe(200);
    const users = await response.json();
    expect(Array.isArray(users)).toBeTruthy();
  });

  test("POST /users - should create a new user", async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    expect(response.status()).toBe(200);
    const createdUser = await response.json();
    expect(createdUser).toMatchObject({ ...newUser, email: uniqueEmail });
  });

  test("GET /users/:id - should return a user by ID", async ({ request }) => {
    // Fetch the user created in beforeEach by ID
    const response = await request.get(`${BASE_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    expect(response.status()).toBe(200);
    const user = await response.json();
    expect(user.id).toBe(userId);
    expect(user.email).toBe(uniqueEmail);
  });

  test("PUT /users/:id - should update a user by ID", async ({ request }) => {
    const response = await request.put(`${BASE_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      data: updatedUser,
    });

    expect(response.status()).toBe(200);
    const updatedUserResponse = await response.json();
    expect(updatedUserResponse).toMatchObject(updatedUser);
  });

  test("DELETE /users/:id - should delete a user by ID", async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    expect(response.status()).toBe(204);
    userId = undefined; // Ensure userId is cleared so afterEach doesn't attempt another delete
  });

  test("CRUD operations for /users", async ({ request }) => {
    // User is already created in beforeEach

    // Read the created user
    const readResponse = await request.get(`${BASE_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    expect(readResponse.status()).toBe(200);
    const readUser = await readResponse.json();
    expect(readUser.id).toBe(userId);
    expect(readUser.email).toBe(uniqueEmail);

    // Update the created user
    const updateResponse = await request.put(`${BASE_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      data: updatedUser,
    });

    expect(updateResponse.status()).toBe(200);
    const updatedUserResponse = await updateResponse.json();
    expect(updatedUserResponse).toMatchObject(updatedUser);

    // User deletion is handled by afterEach
  });
});
