import { Show, SignInButton, SignUpButton, useAuth, UserButton } from '@clerk/react'
import { Button } from '@heroui/react';
import { WallpaperProvider } from './context/WallpaperContext'
import { ThemeProvider } from './context/ThemeContext'
import { Navigate, Route, Routes } from 'react-router'
import ChatPage from './pages/ChatPage'
import AuthPage from './pages/AuthPage'
import PageLoader from './components/PageLoader'
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast'

function App() {

  const { isSignedIn, isLoaded } = useAuth()
  
  // option 1
  // const { isCheckingAuth, checkAuth, clearAuth } = useAuthStore()

  // option 2 - better for performance
  const isCheckingAuth = useAuthStore(state => state.isCheckingAuth)
  const checkAuth = useAuthStore(state => state.checkAuth)
  const clearAuth = useAuthStore(state => state.clearAuth)

  useEffect(() => {
    if (!isLoaded) return

    if (isSignedIn) checkAuth()
    else clearAuth()
  }, [isLoaded, isSignedIn, checkAuth, clearAuth])


  if (!isLoaded || (isSignedIn && isCheckingAuth)) <PageLoader />
 
  return (
    <ThemeProvider>
      <WallpaperProvider>
        <Routes>
          <Route path='/' element={isSignedIn ? <ChatPage /> : <Navigate to={'/auth'} replace />} />
          <Route path='/auth' element={!isSignedIn ? <AuthPage /> : <Navigate to={'/'} replace />} />
        </Routes>
        <Toaster />
      </WallpaperProvider>
    </ThemeProvider>
  )
}

export default App
