import '@/styles/index.scss'
import React, { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from '@/router'
import { createTheme, ThemeProvider } from '@mui/material'
import useAppStore from '@/stores/modules/app.ts'
import ReactDOM from 'react-dom/client'

function App() {
  const darkMode = useAppStore((state) => state.darkMode)
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  })
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
