import { NextResponse, NextRequest } from "next/server";
import { stripe } from "@/lib/stripe";
import { addPurchasedCar, getUserId } from "@/lib/actions";

export async function POST(req) {
  try {
    const url = await req.nextUrl.clone();
    url.pathname = "/";

    // const userId = await getUserId();
    // if (!userId) {
    //   return NextResponse.json({ url: `${url}/sign-in` });
    // }

    // const data = await req.json();
    const line_items = [
      {
        quantity: 1,
        price_data: {
          currency: "TRY",
          product_data: {
            name: `asdasd`,
            description: "sdsdffd",
          },
          unit_amount: Math.round(100 * 100),
        },
      },
    ];

    // const purchased = await addPurchasedCar(userId, data.carId);
    // if (!purchased) {
    //   return NextResponse.json({ url: `${url}/Payment-Failed` });
    // }

    const session = await stripe.checkout.sessions.create({
      ui_mode: "hosted",
      line_items,
      mode: "payment",
      success_url: `${url}/Payment-Success`,
      cancel_url: `${url}/Payment-Failed`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.log("[CHECKOUT_ERROR]", error);
    return NextResponse.json({ status: error.message });
  }
}

// export async function GET(req) {
//   try {
//     const sessionId = req.nextUrl.searchParams.get("session_id");
//     if (!sessionId) {
//       return NextResponse.json({ error: "missing session id" });
//     }
//     const session = await stripe.checkout.sessions.retrieve(sessionId);

//     return NextResponse.json({
//       status: session.status,
//       customer_email: session.customer_details.email,
//     });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ message: err.message });
//   }
// }
