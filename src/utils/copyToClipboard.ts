// This is only work with the HTTPS

// const handleCopyClick = () => {
//   const url = `${window.location?.origin}/view-po/${record?._id}`;
//   navigator.clipboard.writeText(url).then(
//     () => {
//       message.success("Link copied to clipboard!");
//     },
//     (_err) => {
//       message.error("Failed to copy text. Please try again.");
//     }
//   );
// };

// Work around code for HTTP
export const handleCopyClick = (content: string) => {
  const textArea = document.createElement("textarea");
  textArea.value = content;

  textArea.style.position = "fixed";
  textArea.style.opacity = "0";

  document.body.appendChild(textArea);
  textArea.select();

  try {
    const isCopied = document.execCommand("copy");
    if (isCopied) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error copying text:", error);
    return false;
  }
  document.body.removeChild(textArea);
};
