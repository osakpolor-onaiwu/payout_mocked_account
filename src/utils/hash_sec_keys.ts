import crypto from 'crypto';

export const hash_secret_key = (secret_key: string) => {
    return crypto.createHash("sha256").update(secret_key, "utf-8").digest("hex");
}