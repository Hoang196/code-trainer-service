import jwtDecode from 'jwt-decode';

const decodeJWT = (token: string) => {
  const decoded = jwtDecode(token);
  return decoded;
};

export { decodeJWT };
