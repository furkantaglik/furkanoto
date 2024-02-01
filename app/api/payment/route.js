import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { addPurchasedCar, getUser } from "@/lib/actions";

export async function POST(req) {
  try {
    const url = await req.nextUrl.clone();
    url.pathname = "/";

    const user = await getUser();
    if (!user) {
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
            images: [data.image1],
          },
          unit_amount: parseInt(data.price),
        },
      },
    ];

    const purchased = await addPurchasedCar(user.id, data.carId);
    if (!purchased) {
      return NextResponse.json({ url: `${url}/Payment-Failed` });
    }

    const session = await stripe.checkout.sessions.create({
      ui_mode: "hosted",
      line_items,
      mode: "payment",
      success_url: `${url}/Payment-Success`,
      cancel_url: `${url}/Payment-Failed`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    // console.log("[CHECKOUT_ERROR]", error);
    return NextResponse.json({ status: error.message });
  }
}
