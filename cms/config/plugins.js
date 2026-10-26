module.exports = ({ env }) => ({
  'users-permissions': { config: { jwtSecret: env('JWT_SECRET') } },
  'color-picker': { enabled: true },
});
