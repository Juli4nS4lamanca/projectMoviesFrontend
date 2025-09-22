import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from '@components/Navbar.jsx';
import IndexPage from '@pages/IndexPage.jsx';
import MediasPage from '@pages/MediasPage.jsx';
import MediaForm from '@pages/MediaForm.jsx';
import DirectorsPage from '@pages/DirectorsPage.jsx';
import ProducersPage from '@pages/ProducersPage.jsx';
import GenresPage from '@pages/GenresPage.jsx';
import TypesPage from '@pages/TypesPage';
import Message from '@components/common/Message.jsx';
import { MessageProvider } from '@/utils/MessageContext.jsx';
import '@/App.css';

const App = () => {
  return (
    <BrowserRouter>
      <MessageProvider>
        <Navbar />
        <Message />
        <Routes>
          <Route path='/medias' element={<MediasPage />} />
          <Route path='/newMedia' element={<MediaForm />} />
          <Route path='/directors' element={<DirectorsPage />} />
          <Route path='/producers' element={<ProducersPage />} />
          <Route path='/genres' element={<GenresPage />} />
          <Route path='/types' element={<TypesPage />} />
          <Route path='/' element={<IndexPage />} />
        </Routes>
      </MessageProvider>
    </BrowserRouter>
  );
};

export default App;
