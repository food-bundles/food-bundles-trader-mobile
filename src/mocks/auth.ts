/**
 * Mock authenticated trader. No network calls — this is the only "session"
 * the app ever has.
 */
import { UserRole, type TraderUser } from "../types/domain";

export const MOCK_TRADER: TraderUser = {
  id: "trader-001",
  username: "Jean Pierre Habimana",
  email: "jp.habimana@foodbundles.rw",
  phone: "+250 788 123 456",
  role: UserRole.TRADER,
  profileImage: "https://i.pravatar.cc/150?img=33",
  agreementAccepted: true,
  twoFactorEnabled: false,
};

/** A second mock account used to demonstrate the "wrong role" rejection. */
export const MOCK_NON_TRADER_EMAIL = "admin@foodbundles.rw";
