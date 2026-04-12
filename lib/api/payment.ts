import { apiRequest } from "./client";

export async function createCheckout(): Promise<{ sessionId: string; url: string }> {
  const res = await apiRequest<{ sessionId: string; url: string }>("/payment/checkout", {
    method: "POST",
  });
  return res.data;
}

export async function redirectToCheckout() {
  const { url } = await createCheckout();
  window.location.href = url;
}

export async function openBillingPortal() {
  const res = await apiRequest<{ url: string }>("/payment/portal", { method: "POST" });
  window.location.href = res.data.url;
}

export async function verifyPayment(sessionId: string) {
  const res = await apiRequest<{ paid: boolean; userId: string; amount: number }>( 
    `/payment/verify/${sessionId}`
  );
  return res.data;
}
