type NotesProps = {
  list: string[]
}

export default function Notes({ list }: NotesProps) {
  return (
    <ol className="my-4 list-inside list-decimal space-y-2 rounded bg-gray-100 p-4">
      {list.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ol>
  )
}
