export const env = {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  AERODATABOX_API_KEY: process.env.AERODATABOX_API_KEY,
  UNSPLASH_ACCESS_KEY: process.env.UNSPLASH_ACCESS_KEY,
  AMADEUS_API_KEY: process.env.AMADEUS_API_KEY,
  AMADEUS_API_SECRET: process.env.AMADEUS_API_SECRET,
}

// Validate required environment variables
export function validateEnv() {
  const requiredEnvVars = ["OPENAI_API_KEY"]
  const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar])

  if (missingEnvVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingEnvVars.join(", ")}`)
  }
}

