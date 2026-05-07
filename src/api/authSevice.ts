import api from "./axiosInstance"

export const AuthService = {
  async login(userName: string, password: string) {
    try {
      const {data} = await api.post("/accaunt/login", {
        userName: userName,
        password: password
      })
      if(!data || !data.value) {
      alert(data?.error?.message)
      return null
      };

      console.log(data.value)
      localStorage.setItem("login", JSON.stringify(data.value));
      return data
    }
    catch (err: unknown) {
     (err)
    }
  }
}