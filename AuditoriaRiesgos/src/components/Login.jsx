import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Alert, Card, Typography, Spin } from 'antd';
import { UserOutlined, LockOutlined, SecurityScanFilled } from '@ant-design/icons';
import { login, isAuthenticated } from '../services/LoginService';

const { Title, Text } = Typography;

const Login = ({ onLoginSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTime, setLockTime] = useState(0);
  
  // Verificar si ya está autenticado al cargar el componente
  useEffect(() => {
    if (isAuthenticated()) {
      if (onLoginSuccess) {
        onLoginSuccess({ success: true, user: localStorage.getItem('user') });
      }
    }
  }, [onLoginSuccess]);

  // Temporizador para desbloqueo
  useEffect(() => {
    let timer;
    if (isLocked && lockTime > 0) {
      timer = setInterval(() => {
        setLockTime(prev => prev - 1);
      }, 1000);
    } else if (lockTime === 0 && isLocked) {
      setIsLocked(false);
      setLoginAttempts(0);
    }
    return () => clearInterval(timer);
  }, [isLocked, lockTime]);

  const onFinish = async (values) => {
    if (isLocked) return;
    
    const { username, password } = values;
    
    setLoading(true);
    setError('');
    
    try {
      // Simular delay de red para mayor realismo
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const response = await login(username, password);
      setLoading(false);
      
      if (response.success) {
        // Reiniciar contador de intentos en éxito
        setLoginAttempts(0);
        
        // Call the callback function to notify the parent component of successful login
        if (onLoginSuccess) {
          onLoginSuccess(response);
        }
      } else {
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        
        // Bloquear después de 3 intentos fallidos
        if (newAttempts >= 3) {
          setIsLocked(true);
          setLockTime(30); // 30 segundos de bloqueo
          setError('Demasiados intentos fallidos. Cuenta bloqueada por 30 segundos.');
        } else {
          setError(`Credenciales inválidas. Intentos restantes: ${3 - newAttempts}`);
        }
      }
    } catch (error) {
      setLoading(false);
      setError('Error de conexión. Por favor, intente nuevamente.');
    }
  };

  // Si la cuenta está bloqueada, mostrar mensaje de temporizador
  if (isLocked) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: '#f0f2f5'
      }}>
        <Card style={{ width: 400, textAlign: 'center', padding: '20px' }}>
          <SecurityScanFilled style={{ fontSize: '48px', color: '#ff4d4f', marginBottom: '16px' }} />
          <Title level={3}>Cuenta Temporalmente Bloqueada</Title>
          <Text>Por seguridad, su cuenta ha sido bloqueada debido a múltiples intentos fallidos.</Text>
          <div style={{ marginTop: '16px' }}>
            <Text strong>Tiempo restante: {lockTime} segundos</Text>
          </div>
          <Spin size="large" style={{ marginTop: '24px' }} />
        </Card>
      </div>
    );
  }

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <Card 
        style={{ 
          width: 400, 
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          borderRadius: '12px'
        }}
        bodyStyle={{ padding: '32px' }}
      >
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <SecurityScanFilled style={{ fontSize: '36px', color: '#1890ff', marginBottom: '8px' }} />
          <Title level={2} style={{ color: '#262626', marginBottom: '8px' }}>Sistema de Auditoría de Riesgos</Title>
          <Text type="secondary">Ingrese sus credenciales para acceder al sistema</Text>
        </div>
        
        {error && (
          <Alert 
            message={error} 
            type="error" 
            showIcon 
            style={{ marginBottom: 16, borderRadius: '6px' }} 
            closable
            onClose={() => setError('')}
          />
        )}
        
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: 'Por favor ingrese su nombre de usuario' },
              { min: 3, message: 'El usuario debe tener al menos 3 caracteres' }
            ]}
          >
            <Input 
              prefix={<UserOutlined style={{ color: '#bfbfbf' }} />} 
              placeholder="Usuario" 
              size="large"
              style={{ borderRadius: '6px' }}
              autoFocus
            />
          </Form.Item>
          
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Por favor ingrese su contraseña' },
              { min: 6, message: 'La contraseña debe tener al menos 6 caracteres' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: '#bfbfbf' }} />}
              placeholder="Contraseña"
              size="large"
              style={{ borderRadius: '6px' }}
            />
          </Form.Item>
          
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              block
              size="large"
              style={{ 
                height: '44px', 
                borderRadius: '6px',
                fontWeight: '600'
              }}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
          </Form.Item>
          
          <div style={{ 
            textAlign: 'center', 
            padding: '16px', 
            backgroundColor: '#f9f9f9', 
            borderRadius: '6px',
            marginTop: '16px'
          }}>
            <Text type="secondary" style={{ fontSize: '13px' }}>
              <strong>Credenciales de demostración:</strong><br />
              Usuario: <strong>admin</strong><br />
              Contraseña: <strong>123456</strong>
            </Text>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;