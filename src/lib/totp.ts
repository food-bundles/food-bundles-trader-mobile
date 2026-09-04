/**
 * Mocked TOTP secret generation for the 2FA setup screen. No real TOTP
 * algorithm or backend — `expo-crypto` supplies random bytes so the secret
 * looks authentic (Base32, 32 chars), matching the shape a real
 * authenticator app would expect to scan.
 */
import * as Crypto from "expo-crypto";

const BASE32_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
const SECRET_LENGTH = 32;

/** Generates a mock Base32 TOTP secret (32 characters, e.g. for QR display). */
export function generateMockTotpSecret(): string {
  const bytes = Crypto.getRandomBytes(SECRET_LENGTH);
  let secret = "";
  for (let i = 0; i < SECRET_LENGTH; i += 1) {
    const byte = bytes[i] ?? 0;
    secret += BASE32_ALPHABET[byte % BASE32_ALPHABET.length];
  }
  return secret;
}

/** Builds the `otpauth://` URI a real authenticator app would encode as a QR. */
export function buildOtpAuthUri(secret: string, account: string, issuer = "FoodBundles"): string {
  const label = encodeURIComponent(`${issuer}:${account}`);
  const params = `secret=${secret}&issuer=${encodeURIComponent(issuer)}`;
  return `otpauth://totp/${label}?${params}`;
}
