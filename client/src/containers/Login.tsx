import React from 'react';
import { Layout } from '../components/UI';
import { LoginForm } from '../components/Auth/LoginForm';
import { PageHeader } from '../components/UI/PageHeader';

export const Login = () => {
  return (
    <Layout>
      <PageHeader title="Acceso de Usuario" />
      <div className="row justify-content-center">
        <div className="col-md-6">
          <LoginForm />
        </div>
      </div>
    </Layout>
  );
}; 