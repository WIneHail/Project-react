
interface ErrorFallbackProps {
  error: Error
}

export const ErrorFallback = ({ error }: ErrorFallbackProps) => {

  return (
    < span style={{
      display: "flex",
      justifyContent: "center",
      color: 'red',
      alignItems: 'center',
      height: "50vh", margin: "auto"
    }}>{`Error occured: ${error.message}`}</span>
  )
}