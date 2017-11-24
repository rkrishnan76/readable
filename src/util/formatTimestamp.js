export default function formatTimestamp(timestamp) {
  return new Date(timestamp).toUTCString().split(" ").slice(0,4).join(" ")
}
