export const WaitlistService = {
  async addToWaitlist(formData) {
    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

    // 1. Safety Check: Ensure the URL exists
    if (!GOOGLE_SCRIPT_URL) {
      console.error("Missing GOOGLE_SCRIPT_URL in environment variables.");
      throw new Error("Service unavailable");
    }

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        // 'text/plain' is the "hack" that ensures Apps Script accepts the POST
        headers: { 'Content-Type': 'text/plain' }, 
        body: JSON.stringify(formData),
      });

      // 2. Apps Script usually returns 200 even if the internal code fails,
      // so we parse the JSON result carefully.
      const result = await response.json();

      return result;

    } catch (error) {
      console.error("Waitlist Service Error:", error);
      return { result: "error", error: error.message };
    }
  }
};