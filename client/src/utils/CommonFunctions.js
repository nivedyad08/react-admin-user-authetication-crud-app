import Cookies from "js-cookie"

const allowedPathsByRole = {
  user: ["/","/edit/profile"],
  admin: ["/", "/admin","/users"],
};

const handleLogout = ()=>{
  Cookies.remove("token")
}

export {
  handleLogout,
  allowedPathsByRole
}
// export const isPathAllowedByRole = (path, role) => {
//   const allowedPaths = allowedPathsByRole[role];
//   return allowedPaths ? allowedPaths.includes(path) : false;
// };