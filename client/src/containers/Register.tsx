import React from 'react';
import { Layout } from '../components/UI';
import { RegisterForm } from '../components/Auth/RegisterForm';
import { PageHeader } from '../components/UI/PageHeader';

export const Register = () => {
  return (
    <Layout>
      <PageHeader title="Crear una Cuenta" />
      <div className="row justify-content-center">
        <div className="col-md-6">
          <RegisterForm />
        </div>
      </div>
    </Layout>
  );
}; 