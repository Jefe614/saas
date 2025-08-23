import React from 'react';
import { Button, Result } from 'antd';
import { FrownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <Result
        icon={<FrownOutlined style={{ fontSize: '80px', color: '#ff4d4f' }} />}
        status="404"
        title={<span className="text-4xl font-bold text-gray-800">404</span>}
        subTitle={<span className="text-lg text-gray-600">Sorry, the page you visited does not exist.</span>}
        extra={
          <Button 
            type="primary" 
            size="large" 
            className="rounded-xl shadow-md" 
            onClick={() => navigate('/')}
          >
            Back Home
          </Button>
        }
      />
    </div>
  );
};

export default NotFoundPage;
