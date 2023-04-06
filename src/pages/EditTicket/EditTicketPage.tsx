import { FormEvent } from "react";
import { Link, useParams } from "react-router-dom";

const EditTicketPage = () => {
  const { ticketId } = useParams();

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  return (
    <div>
      <h2 className="text-xl mb-6"><Link to="/tickets">My Tickets</Link> &gt; <Link to={`/tickets/${ticketId}`}>This Ticket</Link> &gt; <Link  to={`/tickets/${ticketId}/edit`}>Edit</Link></h2>

      <div className="bg-white rounded-md px-6 py-2 text-sm">
        <h3 className="text-lg p-2">Edit Ticket</h3>
        <div className="text-left border-t border-gray-400 w-full">
          <form className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-8 px-2 py-4" onSubmit={handleOnSubmit}>
            <div className="flex flex-col col-span-2 gap-1">
              <label className="font-bold" htmlFor="title">Title</label>
              <input className="focus:outline-none border rounded-md h-9 px-2" type="text" id="title" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold" htmlFor="developer">Developer</label>
              <select className="focus:outline-none border rounded-md h-9 px-2" id="developer">
                <option value="John">John</option>
                <option value="John2">John2</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold" htmlFor="description">Type</label>
              <select className="focus:outline-none border rounded-md h-9 px-2" id="developer">
                <option value="Bug">Bug</option>
                <option value="UI">UI</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold" htmlFor="description">Priority</label>
              <select className="focus:outline-none border rounded-md h-9 px-2" id="developer">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold" htmlFor="description">Project</label>
              <select className="focus:outline-none border rounded-md h-9 px-2" id="developer">
                <option value="Low">Proj 1</option>
                <option value="Medium">Proj 2</option>
                <option value="High">Proj 3</option>
              </select>
            </div>
            <div className="flex flex-col col-span-2 gap-1">
              <label className="font-bold" htmlFor="description">Description</label>
              <textarea className="focus:outline-none border rounded-md resize-none px-2" id="description" rows={5}></textarea>
            </div>

            <div className="flex gap-4">
              <input className="bg-purple-500 text-white p-2 select-none rounded-md hover:cursor-pointer hover:bg-purple-600 w-40" type="submit" value="Save" />
              <Link to=".." relative="path" className="bg-gray-200 p-2 select-none rounded-md hover:cursor-pointer hover:bg-gray-300 w-40 text-center">Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditTicketPage;