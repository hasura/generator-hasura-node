// Set globals from env variables
const globals = {
  namespace: process.env.NAMESPACE,
  projectDomain: process.env.BASE_DOMAIN,
  scheme: process.env.SCHEME
};

export default globals;
