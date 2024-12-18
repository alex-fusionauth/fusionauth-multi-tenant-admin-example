// export async function getCurrentUser() {
//   const session = await getServerSession(auth);
//   return session?.user;
// }

export function hasRole(user: any, role: string) {
  return user?.roles?.includes(role) ?? false;
}

export function hasAnyRole(user: any, roles: string[]) {
  return roles.some((role) => hasRole(user, role));
}