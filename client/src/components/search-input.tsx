import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export default function SearchInput() {
  return <label className="d-flex align-items-center p-2 search-input">
    <FontAwesomeIcon icon={faSearch} />
    <input className="w-100 border-0 bg-transparent outline-none" />
  </label>
}