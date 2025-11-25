export default function ValidationMessage({validationResult = ""}: {validationResult?: string}) {
  //kondicionálisan megjelenített, előre styleolt elem
  return (
    <p className={validationResult !== "" ? "validation-active" : "validation-inactive"}>
      {validationResult}
    </p>
  )
}