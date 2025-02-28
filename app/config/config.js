//config/config.js
export const MONGODB_CONNECTION="mongodb+srv://ajoypalraj:1234@cluster0.b9hlp.mongodb.net/chatnewdb";

export const JWT_KEY = "5EC7CEFA1BE7C9354A639369A2AA8";
export const JWT_EXPIRE_TIME = 60*60*24*30;

export const EMAIL_HOST = "smtp.titan.email";
export const EMAIL_PORT = "465";
export const EMAIL_USER = "support@laravelpoint.com";
export const EMAIL_PASSWORD = "Rup77_4827";
export const MAIL_ENCRYPTION="ssl"


export const MAX_JSON_SIZE = "50mb";
export const URL_ENCODED = true;


export const REQUEST_LIMIT_TIME = 15 * 60 * 1000; // 15 Min
export const REQUEST_LIMIT_NUMBER = 3000; // Per 15 Min 3000 Request Allowed


export const WEB_CACHE=false;
export const PORT=8000
