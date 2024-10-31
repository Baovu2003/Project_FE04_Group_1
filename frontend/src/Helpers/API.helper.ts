// Define the type of the response data
interface ApiResponse {
    id: number;
    name: string;
  }
  
  export const get = async (url: string): Promise<ApiResponse> => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
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
  
  // Define the type for the response data
// Define the post function
export const post = async (url: string, data: object): Promise<ApiResponse> => {
  try {
      const response = await fetch(url, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(data), // Convert the data object to JSON
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData: ApiResponse = await response.json(); // Adjust the type as needed
      return responseData;
  } catch (error) {
      console.error("Error in POST request:", error);
      throw error;
  }
};

// Define the type for the response data (can be adjusted based on your API)

// Define the patch function
export const patch = async (url: string, data: object): Promise<ApiResponse> => {
  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Convert the data object to JSON
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData: ApiResponse = await response.json(); // Adjust the type as needed
    return responseData;
  } catch (error) {
    console.error("Error in PATCH request:", error);
    throw error;
  }
};

