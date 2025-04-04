type NotesProps = {
  list: string[]
}

export default function Notes({ list }: NotesProps) {
  return (
    <ol className="space-y-2 bg-gray-100 my-4 p-4 rounded-md list-decimal list-inside">
      {list.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ol>
  )
}
