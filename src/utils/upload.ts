export async function uploadFile(files: any) {
  const formData = new FormData();
  formData.append("file", files[0]);
  try {
    const { fileUrl } = await (
      await fetch("http://localhost:4000/upload", {
        method: "POST",
        body: formData,
      })
    ).json();
    return fileUrl;
  } catch (error) {
    console.log(error);
    return "error";
  }
}
