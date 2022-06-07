import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

type SearchInputProps = {
  onSearch?: (text: string) => void
}

export default function SearchInput({
  onSearch = () => {}
}: SearchInputProps): JSX.Element {
  return <label className="d-flex align-items-center p-2 search-input">
    <FontAwesomeIcon icon={faSearch} />
    <input onChange={(e) => onSearch(e.target.value)} className="w-100 border-0 bg-transparent outline-none" />
  </label>
}