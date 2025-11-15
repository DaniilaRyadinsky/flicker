interface INotes {
  onSelectNote: (name: string) => void
  selectedId: string
}

const Notes = ({ onSelectNote, selectedId }: INotes) => {
  return <div>Notes</div>
}

export default Notes

    