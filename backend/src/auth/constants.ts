export const jwtConstants = {
  secret: process.env.JWT_SECRET ?? 'default-jwt-secret',
  expiresIn: parseInt(process.env.JWT_EXPIRATION ?? '7d', 10),
};
