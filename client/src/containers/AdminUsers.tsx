import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { User } from '../typescript/interfaces';
import { PageHeader } from '../components/UI';
import { useAuth } from '../store/AuthContext';

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user: currentUser } = useAuth();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users');
      setUsers(response.data.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar los usuarios.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAction = async (action: () => Promise<any>) => {
    try {
      await action();
      fetchUsers();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ocurrió un error al realizar la acción.');
      console.error(err);
    }
  };

  const handleDelete = (userId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario? Esta acción es irreversible.')) {
      handleAction(() => api.delete(`/users/${userId}`));
    }
  };

  const handlePromote = (userId: number) => {
    handleAction(() => api.put(`/users/${userId}/promote`));
  };

  const handleDemote = (userId: number) => {
    handleAction(() => api.put(`/users/${userId}/demote`));
  };

  if (loading) {
    return <p>Cargando usuarios...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div>
      <PageHeader title="Gestión de Usuarios" />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.isActive ? 'Sí' : 'No'}</td>
              <td>
                <div className="btn-group" role="group">
                  {user.role !== 'admin' ? (
                    <button className="btn btn-sm btn-success" onClick={() => handlePromote(user.id)}>
                      Promover
                    </button>
                  ) : (
                    <button className="btn btn-sm btn-warning" onClick={() => handleDemote(user.id)} disabled={currentUser?.id === user.id}>
                      Degradar
                    </button>
                  )}
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user.id)} disabled={currentUser?.id === user.id}>
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers; 