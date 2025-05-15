// Function to generate a random 16-digit string
export function generateRandomId(): string {
  return Math.random().toString(36).substring(2, 18)
}

// Function to upload a file to Pinata
export async function uploadToPinata(content: string, filename: string): Promise<string> {
  try {
    // Create a file from the content
    const file = new File([content], filename, { type: "text/plain" })

    // Create form data
    const formData = new FormData()
    formData.append("file", file)

    // Replace with your Pinata API credentials
    const pinataApiKey = process.env.NEXT_PUBLIC_PINATA_API_KEY || ""
    const pinataSecretApiKey = process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY || ""

    // Upload to Pinata
    const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataSecretApiKey,
      },
      body: formData,
    })

    const data = await response.json()

    // Return the IPFS hash/CID
    if (data.IpfsHash) {
      return `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`
    } else {
      throw new Error("Failed to upload to Pinata")
    }
  } catch (error) {
    console.error("Error uploading to Pinata:", error)
    throw error
  }
}
