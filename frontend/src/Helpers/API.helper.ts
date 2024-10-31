// Define the type of the response data
interface ApiResponse {
  id: number;
  name: string;
}

// // Helper function to get the token from cookies
// const getTokenFromCookies = (): string | null => {
//   const token = document.cookie
//     .split("; ")
//     .find((row) => row.startsWith("token="))
//     ?.split("=")[1];
//   return token || null;
// };

// Define the get function
export const get = async (url: string): Promise<ApiResponse> => {

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Ensure cookies are included
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: ApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error in GET request:", error);
    throw error;
  }
};

// Define the post function
export const post = async (url: string, data: object): Promise<ApiResponse> => {
  // const token = getTokenFromCookies();

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Ensure cookies are included
      body: JSON.stringify(data), // Convert the data object to JSON
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData: ApiResponse = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error in POST request:", error);
    throw error;
  }
};

// Define the patch function
export const patch = async (url: string, data: object): Promise<ApiResponse> => {

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Ensure cookies are included
      body: JSON.stringify(data), // Convert the data object to JSON
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData: ApiResponse = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error in PATCH request:", error);
    throw error;
  }
};

export const del = async (url: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Ensure cookies are included
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData: ApiResponse = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error in DELETE request:", error);
    throw error;
  }
};