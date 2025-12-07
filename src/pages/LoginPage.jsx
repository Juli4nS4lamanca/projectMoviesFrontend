import { useState } from 'react';
import { useAuth } from '@/utils/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { useMessage } from '@/utils/MessageContext.jsx';
import InputText from '@components/common/Inputs/InputText.jsx';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { showMessage } = useMessage();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const result = await login(email, password);
    
    if (result.success) {
      showMessage(`Bienvenido ${result.user?.email || email}`, 'success');
      navigate('/');
    } else {
      showMessage(result.error || 'Error al iniciar sesión', 'error');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Iniciar Sesión</h2>
              <form onSubmit={handleSubmit}>
                <InputText
                  name="email"
                  value={email}
                  text="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                />
                <InputText
                  name="password"
                  value={password}
                  text="Contraseña"
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  required
                />
                <div className="d-grid gap-2 mt-3">
                  {isLoading ? (
                    <button type="submit" className="btn btn-primary" disabled>
                      Iniciando sesión...
                    </button>
                  ) : (
                    <button type="submit" className="btn btn-primary">
                      Iniciar Sesión
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
