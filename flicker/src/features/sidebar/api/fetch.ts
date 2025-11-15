import { API_BASE_URL } from '../../../shared/consts'

/**
 * Читает текст из текстового файла
 * @param file - файл для чтения
 * @returns Promise с текстом файла
 */
export const readTextFromFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      const text = event.target?.result as string
      resolve(text)
    }

    reader.onerror = (error) => {
      reject(new Error(`Ошибка при чтении файла: ${error}`))
    }

    reader.readAsText(file, 'UTF-8')
  })
}

export interface FileUploadResponse {
  [key: string]: unknown
}

export interface GenerateMdResponse {
  markdown: string
}

export const uploadFile = async (
  file: File,
  onSuccess?: (data: FileUploadResponse) => void,
  onError?: (error: Error | string) => void
): Promise<void> => {
  if (!file) {
    const error = new Error('Файл не выбран')
    onError?.(error)
    return
  }

  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await fetch(`${API_BASE_URL}/api/ai/file2db`, {
      method: 'POST',
      body: formData
    })

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`)
    }

    const data = await response.json()
    onSuccess?.(data)
  } catch (error) {
    const errorMessage = error instanceof Error ? error : new Error(String(error))
    onError?.(errorMessage)
  }
}

export const generateMarkdown = async (
  content: string,
  onSuccess?: (data: GenerateMdResponse) => void,
  onError?: (error: Error | string) => void
): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/ai/generatemd`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content })
    })

    const status = response.status

    if (status === 200) {
      const json = await response.json()
      onSuccess?.(json)
    } else {
      let errorMessage: string
      switch (status) {
        case 500:
          errorMessage = 'Ошибка сервера 500'
          break
        case 502:
          errorMessage = 'Ошибка сервера 502'
          break
        default:
          errorMessage = `Ошибка: ${status}`
      }
      onError?.(errorMessage)
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error : new Error(String(error))
    onError?.(errorMessage)
  }
}

