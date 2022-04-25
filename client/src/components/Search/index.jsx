import { useState } from "react"
import './index.css'

export default (props) => {
    const [searchText, setSearchText] = useState('')

    return (
        <div className="container">
            <input
                className="search-input"
                placeholder="חפש מילואימניק"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
            />
        </div>
    )
}