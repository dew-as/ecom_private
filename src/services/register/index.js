// Function for registering a new user via API
export const registerNewUser = async (formData) => {
    try {
      // Making a POST request to the "/api/register" endpoint
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      // Parsing and returning the response data
      const finalData = await response.json();
      return finalData;
    } catch (e) {
      console.log("error", e);
    }
  };

//   Use
//   The registerNewUser function is intended for use on the client side to make a POST request to the user registration API endpoint.