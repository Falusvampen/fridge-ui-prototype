export interface FridgeItem {
  name: string;
  icon?: string;
  expiry: string; // ISO date string (YYYY-MM-DD)
  category?: string; // e.g. "Mejeri", "Skafferi", "Grönsaker", "Övrigt"
}
