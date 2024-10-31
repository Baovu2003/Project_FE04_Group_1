// src/utils/alerts.ts
import Swal from "sweetalert2";

// Function to show a confirmation alert
export const showConfirmationAlert = async (title: string, text: string) => {
  const result = await Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, update it!"
  });
  return result.isConfirmed; // Returns true if confirmed
};

// Function to show a success alert
export const showSuccessAlert = (title: string, text: string) => {
  Swal.fire({
    title,
    text,
    icon: "success",
    timer: 1000,
    showConfirmButton: false
  });
};

// Function to show an error alert
export const showErrorAlert = (title: string, text: string) => {
  Swal.fire({
    title,
    text,
    icon: "error"
  });
};
