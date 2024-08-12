import axios from "axios";
import {
  generateAuthURLForStranger,
  generateUploadURLForEmployee,
  generateUploadURLForStranger,
  generateAuthURLForStudent,
  generateAuthURLForDriver,
  generateAuthURLForStudentGet
} from "./url";

export const putImageToEmployee = async (image, name) => {
  const url = await generateUploadURLForEmployee(name);
  const res = await axios.put(url, image, {
    headers: {
      "Content-Type": "image/jpeg",   
    },
  });
  return res;
};

export const putImageToStranger = async (image, name) => {
  const url = await generateUploadURLForStranger(name);
  const res = await axios.put(url, image, {
    headers: {
      "Content-Type": "image/jpeg", 
    },
  });
  return res;
};

// Hiển thị data nè
export const authenticateImage = async (objectKey) => {
  const url = await generateAuthURLForStranger(objectKey);
  const res = await axios.get(url, {
    headers: {
      "Content-Type": "application/json", 
    },
  });
  return res;
};

export const putInfoToDriver = async (objectKey, data) => {
  const url = await generateAuthURLForDriver(objectKey);
  const res = await axios.put(url, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const getInfoToDriver = async (objectKey) => {
  const url = await generateAuthURLForDriver(objectKey);
  const res = await axios.get(url, data,{
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const postInfoToDriver = async (objectKey, data) => {
  const url = await generateAuthURLForDriver(objectKey);
  const res = await axios.post(url, data, {
    headers: {
      "Content-Type": "application/json", 
    },
  });
  return res;
};

export const deleteInfoToDriver = async (objectKey) => {
  const url = await generateAuthURLForDriver(objectKey);
  const res = await axios.delete(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const patchInfoToDriver = async (objectKey) => {
  const url = await generateAuthURLForDriver(objectKey);
  const res = await axios.get(url, {
    headers: {
      "Content-Type": "application/json", 
    },
  });
  return res;
};

export const getInfoToStudent = async () => {
  const url = await generateAuthURLForStudentGet();
  const res = await axios.get(url, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded, charset=UTF-8,application/json",
    },
  });
  return res;
};

export const deleteInfoToStudent = async (objectKey) => {
  const url = await generateAuthURLForStudent(objectKey);
  const res = await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};
