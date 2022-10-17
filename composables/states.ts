import { IUserInfo } from "~~/interfaces/topic"

// 用户信息
export const useUserInfo = () => useState(() => ({} as Partial<IUserInfo>))