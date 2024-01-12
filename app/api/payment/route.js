import { NextResponse, NextRequest } from "next/server";
import { stripe } from "@/lib/stripe";
import { addPurchasedCar, getUserId } from "@/lib/actions";

export async function POST(req) {
  try {
    const url = req.nextUrl.clone();
    url.pathname = "/";

    const userId = await getUserId();
    if (!userId) {
      return NextResponse.json({ url: `${url}/sign-in` });
    }

    const data = await req.json();
    const line_items = [
      {
        quantity: 1,
        price_data: {
          currency: "TRY",
          product_data: {
            name: `${data.name}`,
            description: data.description,
          },
          unit_amount: Math.round(100 * 100),
        },
      },
    ];

    const purchased = await addPurchasedCar(userId, data.carId);
    if (!purchased) {
      return NextResponse.json({ url: `${url}/Payment-Failed` });
    }

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${url}/Payment-Success`,
      cancel_url: `${url}/payment-Failed`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.log("[CHECKOUT_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
