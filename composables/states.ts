import { IUserInfo } from "~~/interfaces/topic"

export const useTheme = () => useState(() => useColorMode())

// 用户信息
export const useUserInfo = () => useState(() => ({} as Partial<IUserInfo>))