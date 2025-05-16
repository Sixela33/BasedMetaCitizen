export const uploadFile = async (file: File): Promise<string> => {
    if (!file) throw new Error("Invalid File Loaded")
    const data = new FormData()
    data.set("file", file)
    
    const response = await fetch("/api/pinata/files", {
        method: "POST",
        body: data,
    })
    
    if (!response.ok) {
        throw new Error(`Failed to upload ${file.name}`)
    }
    
    const hash = await response.json()

    return hash
}

export const uploadJson = async (values: Record<string, unknown>): Promise<string> => {
    const response = await fetch("/api/pinata/json", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
    })

    if (!response.ok) {
        throw new Error("Failed to upload JSON")
    }

    const hash = await response.json()
    return hash
}