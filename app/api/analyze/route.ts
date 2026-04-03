import { ChatGroq } from "@langchain/groq";
import { PromptTemplate } from "@langchain/core/prompts";
import { LLMChain } from "langchain/chains";

const model = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "llama-3.3-70b-versatile",
  temperature: 0.4,
});

const prompt = PromptTemplate.fromTemplate(`
You are an expert Bangladeshi lawyer who helps common people understand legal documents.
You explain everything in simple English AND Bangla.

The user has shared this legal document or question:
{input}

Your response must include:
1. 📋 SUMMARY — What is this document/situation about? (2-3 lines)
2. ⚖️ YOUR RIGHTS — What are the person's legal rights here?
3. ⚠️ RED FLAGS — Any dangerous clauses or things to be careful about?
4. ✅ WHAT TO DO — Simple step by step advice
5. 🗣️ SIMPLE BANGLA EXPLANATION — Explain the whole thing in simple Bangla in 3-4 lines

Always be helpful, clear, and honest. Never give advice that could harm the person.
`);

const chain = new LLMChain({ llm: model, prompt });

export async function POST(req: Request) {
  try {
    const { input } = await req.json();
    if (input.length > 8000) {
      return Response.json({ error: "Input too long" }, { status: 400 });
      // never reaches Groq, saves your quota
    }
    const result = await chain.call({ input });
    return Response.json({ result: result.text });
  } catch (error) {
    if (error.message?.includes("rate_limit") || error.status === 429) {
      return Response.json(
        {
          error: "আজকের জন্য সার্ভার ব্যস্ত। আগামীকাল আবার চেষ্টা করুন। 🙏",
        },
        { status: 429 },
      );
    }
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
