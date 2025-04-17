import { useState, useEffect } from "react"

const useAuth = () => {
  const [user, setUser] = useState<any>(null) // hoặc thay `any` bằng kiểu user cụ thể nếu có
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    if (storedToken) {
      setToken(storedToken)
      fetchProfile(storedToken)
    } else {
      setLoading(false)
    }
  }, [])

  const fetchProfile = async (authToken: string) => {
    try {
      const res = await fetch("http://localhost:8000/api/profile", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      if (!res.ok) throw new Error("Unauthorized")
      const data = await res.json()
      setUser(data)
    } catch (err) {
      console.error(err)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
    setToken(null)
  }

  return { user, token, logout, loading }
}

export default useAuth
