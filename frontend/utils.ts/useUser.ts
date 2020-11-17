import Cookie from 'js-cookie';

export const useUser = () => {
  const firstName = Cookie.get("firstName");
  const lastName = Cookie.get("lastName");
  const fullName = firstName ? `${firstName} ${lastName}` : 'AnonimousUser';
  return { fullName, firstName, lastName }
}