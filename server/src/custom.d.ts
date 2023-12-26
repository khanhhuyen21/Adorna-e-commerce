// custom.d.ts

declare namespace Express {
  export interface Request {
    user?: any; // Đây là ví dụ, bạn có thể thay đổi kiểu dữ liệu của 'user' nếu cần thiết
  }
}
