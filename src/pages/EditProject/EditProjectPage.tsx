import { FormEvent } from "react";
import { Link, useParams } from "react-router-dom";

const EditProjectPage = () => {
  const { ticketId } = useParams();

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  return (
    <div>
      <h2 className="text-xl mb-6"><Link to="/tickets">My Tickets</Link> &gt; <Link to={`/tickets/${ticketId}`}>This Ticket</Link> &gt; <Link  to={`/tickets/${ticketId}/edit`}>Edit</Link></h2>

      <div className="bg-white rounded-md px-6 py-2 text-sm">
        <h3 className="text-lg p-2">Edit Project</h3>
        <div className="text-left border-t border-gray-400 w-full">
          <form className="flex flex-col gap-4 px-2 py-4" onSubmit={handleOnSubmit}>
            <div className="flex flex-col">
              <label className="font-bold" htmlFor="title">Title</label>
              <input className="focus:outline-none border rounded-md h-9 px-2" type="text" id="title" />
            </div>
            
            <div className="flex flex-col col-span-2">
              <label className="font-bold" htmlFor="description">Description</label>
              <textarea className="focus:outline-none border rounded-md resize-none px-2" id="description" rows={5}></textarea>
            </div>

            <div className="flex flex-col">
              <label className="font-bold" htmlFor="startDate">Start Date</label>
              <input className="focus:outline-none border rounded-md h-9 w-40 px-2" id="startDate" type="date" />
            </div>

            <div className="flex flex-col">
              <label className="font-bold" htmlFor="endDate">End Date</label>
              <input className="focus:outline-none border rounded-md h-9 w-40 px-2" id="endDate" type="date" />
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

export default EditProjectPage;