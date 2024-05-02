import Notes from "@/components/Notes"
import VanillaForm from "@/components/VanillaForm"

export default function Home() {
  const list = [
    "GOTCHA!: Make sure that an input element has the same value for 'name' attribute and RHF's 'register' function's argument.",
  ]
  return (
    <main>
      <VanillaForm />
      <Notes list={list} />
    </main>
  )
}
