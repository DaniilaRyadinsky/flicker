import { createContext, useContext, useState, type ReactNode } from 'react'

type SideBarModes = 'Main' | 'Chat' | 'Subject' 

export const SideBarModes = {  
  Main: 'Main' as const,
  Chat: 'Chat' as const,
  Subject: 'Subject' as const
} satisfies Record<string, SideBarModes>

interface FileContextType {
  file: File | undefined
  setFile: (file: File | undefined) => void
  text: string | undefined
  setText: (text: string | undefined) => void
  mode: SideBarModes
  setMode: (mode: SideBarModes) => void
  loading: boolean
  setLoading: (loading: boolean) => void
} 


const FileContext = createContext<FileContextType | undefined>(undefined)

export const FileProvider = ({ children }: { children: ReactNode }) => {
  const [file, setFile] = useState<File | undefined>(undefined)
  const [text, setText] = useState<string | undefined>(undefined)
  const [mode, setMode] = useState<SideBarModes>(SideBarModes.Main)
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <FileContext.Provider value={{ file, setFile, text, setText, mode, setMode, loading, setLoading }}>
      {children}
    </FileContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useFile = () => {
  const context = useContext(FileContext)
  if (context === undefined) {
    throw new Error('useFile must be used within a FileProvider')
  }
  return context
}

