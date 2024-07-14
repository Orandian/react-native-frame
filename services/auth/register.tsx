import axios from "axios";
import { BASE_URL } from "@/constants/App";

const register = async (email: string, password: string) => {
  try {
    return await axios.post(`${BASE_URL}/register`, { email, password });
  } catch (error) {
    return { error: true, msg: (error as any).response.data.message };
  }
};

export default register;
