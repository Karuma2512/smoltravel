const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"
console.log("API_BASE_URL:", API_BASE_URL)

export interface ApiPackage {
  id: string
  name: string
  destination: string
  duration: string
  price: number
  description: string | null
  status: "active" | "inactive"
  featured: boolean
  image_url: string | null
  created_at?: string
  updated_at?: string
  deleted_at?: string | null
}

// Lấy danh sách tất cả các gói du lịch
// Thêm log để debug
export async function getAllPackages(): Promise<ApiPackage[]> {
  try {
    console.log("Fetching packages from:", `${API_BASE_URL}/packages`)
    const response = await fetch(`${API_BASE_URL}/packages`)

    if (!response.ok) {
      console.error("API error status:", response.status)
      const errorText = await response.text()
      console.error("API error response:", errorText)
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    console.log("API response data:", data)
    return data
  } catch (error) {
    console.error("Error fetching packages:", error)
    return []
  }
}

// Lấy chi tiết một gói du lịch theo ID
export async function getPackageById(id: string): Promise<ApiPackage | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/packages/${id}`)

    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error(`Error fetching package ${id}:`, error)
    return null
  }
}

// Lấy các gói du lịch theo điểm đến
export async function getPackagesByDestination(destination: string): Promise<ApiPackage[]> {
  try {
    const allPackages = await getAllPackages()
    const normalizedDestination = destination.toLowerCase().trim()

    return allPackages.filter(
      (pkg) => pkg.status === "active" && pkg.destination.toLowerCase().includes(normalizedDestination),
    )
  } catch (error) {
    console.error(`Error fetching packages for destination ${destination}:`, error)
    return []
  }
}

