const BUCKET_EMPLOYEE = "schoolbus-systems-images";
const BUCKET_STRANGER = "schoolbus-systems-check";

const baseURL = "https://1yg1s6dez6.execute-api.us-east-1.amazonaws.com/dev";

export async function generateUploadURLForEmployee(imageName) {
  return `${baseURL}/${BUCKET_EMPLOYEE}/${imageName}`;
}

export async function generateUploadURLForStranger(imageName) {
  return `${baseURL}/${BUCKET_STRANGER}/${imageName}`;
}

export async function generateAuthURLForStranger(imageName) {
  return `${baseURL}/student?objectKey=${imageName}`;
}

export async function generateAuthURLForStudent(imageName) {
  return `${baseURL}/student?objectKey=${imageName}`;
}

export async function generateAuthURLForDriver(imageName) {
  return `${baseURL}/drivers?objectKey=${imageName}`;
}

export async function generateAuthURLForStudentGet() {
  return `${baseURL}/student`;
}
  

