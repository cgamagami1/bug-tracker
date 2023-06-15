import { ChangeEvent, useContext, useState } from "react";
import { TicketContext } from "../context/TicketContext";
import searchIcon from "../assets/search.svg";
import { Link } from "react-router-dom";

type SearchBoxProps = {
  isSearchBoxOpen: boolean;
  handleOnSearchBoxClick: () => void;
}

const SearchBox = ({ isSearchBoxOpen, handleOnSearchBoxClick }: SearchBoxProps) => {
  const { tickets } = useContext(TicketContext);
  const [search, setSearch] = useState("");
  const filteredTickets = search ? tickets.filter(ticket => ticket.title.toLowerCase().includes(search.toLowerCase()) || ticket.description.toLowerCase().includes(search.toLowerCase())) : [];

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

  return (
    <div className="scale-150 w-48 mr-12 rounded-md pl-2 flex border border-gray-300" onClick={handleOnSearchBoxClick}>
      <img src={searchIcon} alt="search icon" className="w-3.5" />
      <input 
        type="text" 
        className="focus:outline-none bg-transparent text-xs pl-2 text-black"  
        placeholder="Search..." 
        value={search}
        onChange={handleOnChange}
      />
      {isSearchBoxOpen && <div className="w-48 h-64 bg-white border border-gray-100 shadow-md absolute top-6 right-0 rounded-md px-4 overflow-y-scroll">
        {filteredTickets.map(ticket => (
          <Link 
            to={`tickets/${ticket.id}`} 
            key={ticket.id} 
            className="block w-full border-b border-gray-300 py-1 text-xs"
          >
            <p className="font-semibold">{ ticket.title }</p>
            <p>{ ticket.description }</p>
          </Link>
        ))}
      </div>}
    </div>
  );
}

export default SearchBox;