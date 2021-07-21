export default function truncate(content: string, start: number) {
  return content.split(" ").splice(start + 1).join(" ")
}
