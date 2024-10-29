import { config } from "dotenv";
config();

export const app_configuration ={
    port: process.env.PORT || "5000",
    enable_request_timeout: process.env.ENABLE_REQUEST_TIMEOUT || true,
    f4b_base_url: process.env.F4B_BASE_URL || "http://localhost:9329"
}