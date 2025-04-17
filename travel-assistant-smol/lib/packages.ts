import type { ApiPackage } from "./api-client"

// Định nghĩa kiểu dữ liệu cho gói du lịch
export interface TravelPackage {
  id: string
  name: string
  destination: string
  price: number
  duration: string
  accommodation: string
  transportation: string
  activities: string[]
  rating: number
  image?: string
  description?: string
}

// Chuyển đổi từ ApiPackage sang TravelPackage
export function convertApiPackageToTravelPackage(apiPackage: ApiPackage): TravelPackage {
  console.log("Converting API package:", apiPackage)

  // Tạo các hoạt động mẫu dựa trên điểm đến
  const generateActivities = (destination: string): string[] => {
    const commonActivities = ["Sightseeing Tour", "Local Cuisine Tour"]

    const destinationActivities: Record<string, string[]> = {
      "Đà Nẵng": ["Bà Nà Hills", "Biển Mỹ Khê", "Cầu Rồng", "Phố cổ Hội An"],
      "Phú Quốc": ["Vinpearl Safari", "Bãi Sao", "Hòn Thơm", "Làng chài Hàm Ninh"],
      "Hà Nội": ["Phố cổ Hà Nội", "Vịnh Hạ Long", "Chùa Một Cột", "Văn Miếu"],
      Sapa: ["Trekking Fansipan", "Bản Cát Cát", "Thác Bạc", "Chợ Sapa"],
      "Vũng Tàu": ["Bãi Sau", "Tượng Chúa", "Hải đăng Vũng Tàu", "Bạch Dinh"],
    }

    const specificActivities = destinationActivities[destination] || [
      "City Tour",
      "Cultural Experience",
      "Nature Exploration",
    ]
    return [...specificActivities, ...commonActivities].slice(0, 4)
  }

  return {
    id: apiPackage.id,
    name: apiPackage.name,
    destination: apiPackage.destination,
    price: apiPackage.price,
    duration: apiPackage.duration,
    accommodation: "Khách sạn 4 sao", // Giá trị mặc định
    transportation: "Máy bay", // Giá trị mặc định
    activities: generateActivities(apiPackage.destination),
    rating: 4.5, // Giá trị mặc định
    image:
      apiPackage.image_url || `/placeholder.svg?height=96&width=200&text=${encodeURIComponent(apiPackage.destination)}`,
    description:
      apiPackage.description || `Khám phá vẻ đẹp của ${apiPackage.destination} với gói du lịch đặc biệt của chúng tôi.`,
  }
}

// Cache cho danh sách gói du lịch
const packagesCache: TravelPackage[] | null = null
const cacheTimestamp = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 phút

// Hàm lấy tất cả các gói du lịch
// Tạm thời sử dụng dữ liệu mẫu
export async function getAllTravelPackages(): Promise<TravelPackage[]> {
  // Trả về dữ liệu mẫu
  return getMockTravelPackages()
}

// Hàm tìm kiếm gói du lịch theo điểm đến
export async function findPackagesByDestination(destination: string): Promise<TravelPackage[]> {
  const mockPackages = getMockTravelPackages()
  const normalizedDestination = destination.toLowerCase().trim()
  return mockPackages.filter((pkg) => pkg.destination.toLowerCase().includes(normalizedDestination))
}

// Hàm tìm kiếm gói du lịch theo ID
export async function findPackageById(id: string): Promise<TravelPackage | undefined> {
  const mockPackages = getMockTravelPackages()
  return mockPackages.find((pkg) => pkg.id === id)
}

// Hàm lấy tất cả các điểm đến có sẵn
export async function getAllDestinations(): Promise<string[]> {
  try {
    const packages = await getAllTravelPackages()
    return [...new Set(packages.map((pkg) => pkg.destination))]
  } catch (error) {
    console.error("Error getting all destinations:", error)

    // Trả về danh sách điểm đến mẫu
    const mockPackages = getMockTravelPackages()
    return [...new Set(mockPackages.map((pkg) => pkg.destination))]
  }
}

// Dữ liệu mẫu để sử dụng khi API không khả dụng
function getMockTravelPackages(): TravelPackage[] {
  return [
    {
      id: "pkg-001",
      name: "Khám phá Đà Nẵng 3 ngày",
      destination: "Đà Nẵng",
      price: 3500000,
      duration: "3 ngày",
      accommodation: "Khách sạn 4 sao",
      transportation: "Máy bay",
      activities: ["Bà Nà Hills", "Biển Mỹ Khê", "Cầu Rồng", "Phố cổ Hội An"],
      rating: 4.7,
      image: "/placeholder.svg?height=96&width=200&text=Đà Nẵng",
      description: "Khám phá thành phố biển Đà Nẵng xinh đẹp với các điểm tham quan nổi tiếng và ẩm thực đặc sắc.",
    },
    {
      id: "pkg-002",
      name: "Phú Quốc nghỉ dưỡng 4 ngày",
      destination: "Phú Quốc",
      price: 5200000,
      duration: "4 ngày",
      accommodation: "Resort 5 sao",
      transportation: "Máy bay",
      activities: ["Vinpearl Safari", "Bãi Sao", "Hòn Thơm", "Làng chài Hàm Ninh"],
      rating: 4.9,
      image: "/placeholder.svg?height=96&width=200&text=Phú Quốc",
      description: "Tận hưởng kỳ nghỉ tuyệt vời tại đảo ngọc Phú Quốc với bãi biển cát trắng và nước biển trong xanh.",
    },
    {
      id: "pkg-003",
      name: "Hà Nội - Hạ Long 5 ngày",
      destination: "Hà Nội",
      price: 6800000,
      duration: "5 ngày",
      accommodation: "Khách sạn 4 sao",
      transportation: "Xe du lịch",
      activities: ["Phố cổ Hà Nội", "Vịnh Hạ Long", "Chùa Một Cột", "Văn Miếu"],
      rating: 4.6,
      image: "/placeholder.svg?height=96&width=200&text=Hà Nội",
      description: "Tour kết hợp thăm quan thủ đô Hà Nội và kỳ quan thiên nhiên Vịnh Hạ Long.",
    },
    {
      id: "pkg-004",
      name: "Sapa trekking 3 ngày",
      destination: "Sapa",
      price: 4200000,
      duration: "3 ngày",
      accommodation: "Homestay",
      transportation: "Xe khách + tàu hỏa",
      activities: ["Trekking Fansipan", "Bản Cát Cát", "Thác Bạc", "Chợ Sapa"],
      rating: 4.8,
      image: "/placeholder.svg?height=96&width=200&text=Sapa",
      description: "Khám phá vẻ đẹp hùng vĩ của núi rừng Tây Bắc và văn hóa độc đáo của đồng bào dân tộc thiểu số.",
    },
    {
      id: "pkg-005",
      name: "TP.HCM - Vũng Tàu 2 ngày",
      destination: "Vũng Tàu",
      price: 2500000,
      duration: "2 ngày",
      accommodation: "Khách sạn 3 sao",
      transportation: "Xe du lịch",
      activities: ["Bãi Sau", "Tượng Chúa", "Hải đăng Vũng Tàu", "Bạch Dinh"],
      rating: 4.5,
      image: "/placeholder.svg?height=96&width=200&text=Vũng Tàu",
      description: "Tour cuối tuần lý tưởng từ TP.HCM đến thành phố biển Vũng Tàu xinh đẹp.",
    },
  ]
}

