import { getDateTime } from "./dateTime.ts";
import { openai } from "@ai-sdk/openai";

// All tools combined for the agent
export const tools = {
  getDateTime, //application defined tool
  webSearch: openai.tools.webSearch() //provider defined tool
};