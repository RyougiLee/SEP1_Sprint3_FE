export const useAuth = () => {

  const userJson = localStorage.getItem('user');
  const user = userJson ? JSON.parse(userJson) : null;

  return {
    user,
    isAuthenticated: !!user,
    userId: user?.id
  };
};