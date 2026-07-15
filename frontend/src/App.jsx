import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { ChatProvider } from '@/context/ChatContext';
import AppRouter from '@/routes/AppRouter';
import TaxCalculatorModal from '@/components/chat/TaxCalculatorModal';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ChatProvider>
          <AppRouter />
          <TaxCalculatorModal />
        </ChatProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
