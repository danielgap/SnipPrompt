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
      setError(err.response?.data?.message || 'Error fetching users.');
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
      setError(err.response?.data?.message || 'An error occurred while performing the action.');
      console.error(err);
    }
  };

  const handleDelete = (userId: number) => {
    if (window.confirm('Are you sure you want to delete this user? This action is irreversible.')) {
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
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div>
      <PageHeader title="User Management" />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.isActive ? 'Yes' : 'No'}</td>
              <td>
                <div className="btn-group" role="group">
                  {user.role !== 'admin' ? (
                    <button className="btn btn-sm btn-success" onClick={() => handlePromote(user.id)}>
                      Promote
                    </button>
                  ) : (
                    <button className="btn btn-sm btn-warning" onClick={() => handleDemote(user.id)} disabled={currentUser?.id === user.id}>
                      Demote
                    </button>
                  )}
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(user.id)} disabled={currentUser?.id === user.id}>
                    Delete
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