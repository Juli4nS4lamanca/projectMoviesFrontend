import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from '@components/Navbar.jsx';
import IndexPage from '@pages/IndexPage.jsx';
import MediasPage from '@pages/MediasPage.jsx';
import MediaForm from '@pages/MediaForm.jsx';
import DirectorsPage from '@pages/DirectorsPage.jsx';
import ProducersPage from '@pages/ProducersPage.jsx';
import GenresPage from '@pages/GenresPage.jsx';
import TypesPage from '@pages/TypesPage';
import LoginPage from '@pages/LoginPage.jsx';
import UsersPage from '@pages/UsersPage.jsx';
import Message from '@components/common/Message.jsx';
import ProtectedRoute from '@components/common/ProtectedRoute.jsx';
import { MessageProvider } from '@/utils/MessageContext.jsx';
import { AuthProvider } from '@/utils/AuthContext.jsx';
import '@/App.css';

const App = () => {
  return (
    <BrowserRouter>
      <MessageProvider>
        <AuthProvider>
          <Navbar />
          <Message />
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/' element={<IndexPage />} />
            <Route 
              path='/medias' 
              element={
                <ProtectedRoute requiredAnyRole={['docente', 'administrador']}>
                  <MediasPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path='/newMedia' 
              element={
                <ProtectedRoute requiredAnyRole={['docente', 'administrador']}>
                  <MediaForm />
                </ProtectedRoute>
              } 
            />
            <Route 
              path='/directors' 
              element={
                <ProtectedRoute requiredRole="administrador">
                  <DirectorsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path='/producers' 
              element={
                <ProtectedRoute requiredRole="administrador">
                  <ProducersPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path='/genres' 
              element={
                <ProtectedRoute requiredRole="administrador">
                  <GenresPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path='/types' 
              element={
                <ProtectedRoute requiredRole="administrador">
                  <TypesPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path='/users' 
              element={
                <ProtectedRoute requiredRole="administrador">
                  <UsersPage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </AuthProvider>
      </MessageProvider>
    </BrowserRouter>
  );
};

export default App;
