import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

    
export async function getRoleCookie() {
        const token = getCookie('ENJOYZIM_ROLE_COOKIE', { cookies });
        return token;
}