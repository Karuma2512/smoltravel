import { create } from "zustand"
import { persist } from "zustand/middleware"

// Define types for our state
interface User {
  id: string
  name: string
  email: string
  role: string
  status: string
}

interface Destination {
  id: string
  name: string
  country: string
  description: string
  featured: boolean
  status: string
  image: string
}

interface Package {
  id: string
  name: string
  destination: string
  duration: string
  price: number
  featured: boolean
  status: string
  image: string
  description?: string
}

interface Booking {
  id: string
  customerId: string
  packageId: string
  status: "pending" | "confirmed" | "cancelled"
  amount: number
  date: string
}

interface AppState {
  // Auth
  isAuthenticated: boolean
  currentUser: User | null

  // Data
  users: User[]
  destinations: Destination[]
  packages: Package[]
  bookings: Booking[]

  // UI State
  sidebarOpen: boolean

  // Actions
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  setSidebarOpen: (open: boolean) => void

  // User CRUD
  addUser: (user: Omit<User, "id">) => void
  updateUser: (id: string, userData: Partial<User>) => void
  deleteUser: (id: string) => void

  // Destination CRUD
  addDestination: (destination: Omit<Destination, "id">) => void
  updateDestination: (id: string, destinationData: Partial<Destination>) => void
  deleteDestination: (id: string) => void

  // Package CRUD
  addPackage: (pkg: Omit<Package, "id">) => void
  updatePackage: (id: string, packageData: Partial<Package>) => void
  deletePackage: (id: string) => void
}

// Create the store
export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      isAuthenticated: false,
      currentUser: null,
      users: [],
      destinations: [],
      packages: [],
      bookings: [],
      sidebarOpen: false,

      // Auth actions
      login: async (email, password) => {
        // In a real app, this would call your API
        // For demo purposes, we'll just simulate a successful login
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Find user with matching email
        const user = get().users.find((u) => u.email === email)

        if (user) {
          set({ isAuthenticated: true, currentUser: user })
          return true
        }

        return false
      },

      logout: () => {
        set({ isAuthenticated: false, currentUser: null })
      },

      // UI actions
      setSidebarOpen: (open) => {
        set({ sidebarOpen: open })
      },

      // User CRUD
      addUser: (userData) => {
        const newUser = {
          ...userData,
          id: crypto.randomUUID(),
        }

        set((state) => ({
          users: [...state.users, newUser],
        }))
      },

      updateUser: (id, userData) => {
        set((state) => ({
          users: state.users.map((user) => (user.id === id ? { ...user, ...userData } : user)),
        }))
      },

      deleteUser: (id) => {
        set((state) => ({
          users: state.users.filter((user) => user.id !== id),
        }))
      },

      // Destination CRUD
      addDestination: (destinationData) => {
        const newDestination = {
          ...destinationData,
          id: crypto.randomUUID(),
        }

        set((state) => ({
          destinations: [...state.destinations, newDestination],
        }))
      },

      updateDestination: (id, destinationData) => {
        set((state) => ({
          destinations: state.destinations.map((destination) =>
            destination.id === id ? { ...destination, ...destinationData } : destination,
          ),
        }))
      },

      deleteDestination: (id) => {
        set((state) => ({
          destinations: state.destinations.filter((destination) => destination.id !== id),
        }))
      },

      // Package CRUD
      addPackage: (packageData) => {
        const newPackage = {
          ...packageData,
          id: crypto.randomUUID(),
        }

        set((state) => ({
          packages: [...state.packages, newPackage],
        }))
      },

      updatePackage: (id, packageData) => {
        set((state) => ({
          packages: state.packages.map((pkg) => (pkg.id === id ? { ...pkg, ...packageData } : pkg)),
        }))
      },

      deletePackage: (id) => {
        set((state) => ({
          packages: state.packages.filter((pkg) => pkg.id !== id),
        }))
      },
    }),
    {
      name: "travel-admin-storage",
    },
  ),
)

