import Cookie from 'js-cookie';

export const useUser = () => {
  const firstName = Cookie.get("firstName");
  const lastName = Cookie.get("lastName");
  const fullName = firstName ? `${firstName} ${lastName}` : 'AnonimousUser';
  const userId = Cookie.get('userId');
  return { fullName, firstName, lastName, userId }
}