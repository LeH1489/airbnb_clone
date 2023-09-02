export { default } from "next-auth/middleware";

//những trang này muốn vào thì phải đăng nhập
export const config = {
  matcher: ["/trips", "/reservations", "/properties", "/favorites"],
};
