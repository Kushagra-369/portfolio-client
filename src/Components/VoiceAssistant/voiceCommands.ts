
export type VoiceCommand =
  | "scroll-down"
  | "scroll-up"
  | "stop"
  | "faster"
  | "slower"
  | "top"
  | "projects"
  | "skills"
  | "about"
  | "contact"
  | "resume"
  | "back"
  | "unknown"
  | "experience"
  | "footer";

export function matchVoiceCommand(
  input: string
): VoiceCommand {
  const text = input.toLowerCase().trim();

  if (/\b(stop|ruk jao|bas|ruko)\b/.test(text))
    return "stop";


  if (
    /\b(experience|experiences|work experience|experience dikhao|experience pe)\b/.test(text)
  ) return "experience";

  if (
    /\b(footer|go to footer|show footer|footer dikhao|footer pe)\b/.test(text)
  ) return "footer";



  if (/\b(scroll faster|faster|tez karo|speed badhao)\b/.test(text))
    return "faster";

  if (/\b(scroll slowly|slower|dheere|slow karo)\b/.test(text))
    return "slower";

  if (/\b(scroll to top|go to top|top pe|upar shuru)\b/.test(text))
    return "top";

  if (/\b(projects|project section|projects pe|projects dikhao)\b/.test(text))
    return "projects";

  if (/\b(skills|skills dikhao|skills pe)\b/.test(text))
    return "skills";

  if (/\b(about|about me|mere baare mein)\b/.test(text))
    return "about";

  if (/\b(contact|contact me|contact pe|contact dikhao)\b/.test(text))
    return "contact";

  if (/\b(resume|cv|resume kholo|cv kholo)\b/.test(text))
    return "resume";

  if (/\b(go back|back|peeche jao)\b/.test(text))
    return "back";

  if (/\b(scroll down|neeche jao|neeche scroll)\b/.test(text))
    return "scroll-down";

  if (/\b(scroll up|upar jao|upar scroll)\b/.test(text))
    return "scroll-up";

  return "unknown";
}
