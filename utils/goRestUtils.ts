export async function createUser(
  request: any,
  baseUrl: string,
  token: string,
  userData: any
): Promise<{ userId: number; email: string }> {
  const uniqueEmail = `john.doe.${Date.now()}.${Math.floor(
    Math.random() * 10000
  )}@example.com`; // Ensure unique email for each user

  const response = await request.post(`${baseUrl}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: {
      ...userData,
      email: uniqueEmail,
    },
  });

  if (response.status() !== 201) {
    throw new Error(`Failed to create user: ${response.status()}`);
  }

  const createdUser = await response.json();
  return { userId: createdUser.id, email: uniqueEmail };
}

export async function deleteUser(
  request: any,
  baseUrl: string,
  token: string,
  userId: number | undefined
): Promise<void> {
  if (!userId) return;

  const response = await request.delete(`${baseUrl}/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status() !== 204) {
    throw new Error(`Failed to delete user: ${response.status()}`);
  }
}
