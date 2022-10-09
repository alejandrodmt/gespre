import useApi from "src/composables/useApi";

export default function authService() {
  const { login } = useApi("gespre/auth/");

  return {
    login,
  };
}
