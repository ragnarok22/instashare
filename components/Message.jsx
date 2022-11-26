const Message = ({ type, message }) => {
  const color = (type) => {
    switch (type) {
      case "error":
        return "bg-red-100 text-red-700"
      case "info":
        return "bg-green-100 text-green-700"
    }
  }
  return (
    <div className={`rounded-lg py-5 px-6 text-base mb-3 ${color(type)}`} role="alert">
      {message}
    </div>
  )
}

export default Message