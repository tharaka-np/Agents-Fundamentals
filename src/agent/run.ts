import "dotenv/config";
import { generateText, type ModelMessage } from "ai";
import { openai } from "@ai-sdk/openai";

import { SYSTEM_PROMPT } from "./system/prompt";
import type { AgentCallbacks } from "../types";
import { tools } from "./tools/index.ts";
import { executeTool } from "./executeTool.ts";

const MODEL_NAME = "gpt-5-mini";

export async function runAgent(
  userMessage: string,
  conversationHistory?: ModelMessage[],
  callbacks?: AgentCallbacks
) {
  const { text, toolCalls } = await generateText({
    model: openai(MODEL_NAME),
    prompt: userMessage,
    system: SYSTEM_PROMPT,
    tools
  });

  console.log(text, toolCalls);

  for (const tc of toolCalls) {
    const result = await executeTool(tc.toolName, tc.input);
    console.log(result);
  }
};

runAgent("What is the current Date and Time?");
//runAgent("What is your training cut-off date?");