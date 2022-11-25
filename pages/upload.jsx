export default function Upload() {
  return (
    <form action="post">
      <input type="file" />
      <input type="name" />
      <span>size</span>
      <button type="submit">Upload</button>
    </form>
  )
}