export async function POST(req: Request) {
  const { message } = await req.json();

  const url = process.env.NEXT_PUBLIC_N8N_URL;
  try {
    const res = await fetch(`${url}/webhook/scopsis-chatbot`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: message }),
    });
    const data = await res.json();

    const formattedMessage = data.message
      ? data.message.replace(/\\n/g, "\n")
      : data.message;
    return Response.json({ message: formattedMessage });
  } catch (error) {
    console.error("Error calling external API:", error);
    return Response.json(
      { message: "Sorry, I encountered an error. Please try again." },
      { status: 500 }
    );
  }
}
