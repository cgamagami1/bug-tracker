import { DateTime } from "luxon";
import useTable from "../../utils/useTable";
import TableContainer from "../../components/TableContainer";
import trash from "../../assets/trash.svg";
import { ROLE } from "../Project/UsersTable";
import { ChangeEvent, FormEvent, useState } from "react";

export type Comment = {
  id: number;
  posterId: number;
  message: string;
  datePosted: DateTime;
}

const CommentsTable = () => {
  const comments = [
    {
      id: 0,
      posterId: 0,
      message: "This is a new comment",
      datePosted: DateTime.now()
    },
    {
      id: 1,
      posterId: 0,
      message: "This is a new comment",
      datePosted: DateTime.now()
    },
    {
      id: 2,
      posterId: 0,
      message: "This is a new comment",
      datePosted: DateTime.now()
    },
    {
      id: 3,
      posterId: 0,
      message: "This is a new comment",
      datePosted: DateTime.now()
    },
    {
      id: 4,
      posterId: 0,
      message: "This is a new comment",
      datePosted: DateTime.now()
    },
    {
      id: 5,
      posterId: 0,
      message: "This is a new comment",
      datePosted: DateTime.now()
    },
    {
      id: 6,
      posterId: 0,
      message: "This is a new comment",
      datePosted: DateTime.now()
    },
    {
      id: 7,
      posterId: 0,
      message: "This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment This is a comment",
      datePosted: DateTime.now()
    },
  ];
  const users = [
    {
      id: 0,
      name: "john1",
      email: "john@email.com",
      role: ROLE.DEVELOPER,
    },
    {
      id: 1,
      name: "john2",
      email: "john@email.com",
      role: ROLE.DEVELOPER,
    },
    {
      id: 2,
      name: "john3",
      email: "john@email.com",
      role: ROLE.DEVELOPER,
    },
    {
      id: 3,
      name: "john4",
      email: "john@email.com",
      role: ROLE.DEVELOPER,
    },
    {
      id: 4,
      name: "john5",
      email: "john@email.com",
      role: ROLE.DEVELOPER,
    },
    {
      id: 5,
      name: "john6",
      email: "john@email.com",
      role: ROLE.DEVELOPER,
    },
    {
      id: 6,
      name: "john7",
      email: "john@email.com",
      role: ROLE.DEVELOPER,
    },
  ]

  const [newComment, setNewComment] = useState("");

  const { 
    sortedEntries,
    currentPage, 
    handleOnNewPage,
    firstShownPageButton,
    footerInfo
  } = useTable(comments);

  const handleOnAddComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNewComment("");
  }

  const handleOnNewCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  }

  return (
    <TableContainer title="Comments" currentPage={currentPage} handleOnNewPage={handleOnNewPage} firstShownPageButton={firstShownPageButton} footerInfo={footerInfo}>

      <form className="px-2 pt-4 flex flex-col md:flex-row gap-4 mb-6" onSubmit={handleOnAddComment}>
        <input className="border flex-grow rounded-md px-2 focus:outline-none h-9" type="text" value={newComment} onChange={handleOnNewCommentChange} placeholder="Add a comment..." />
        <input type="submit" className="bg-purple-500 text-white p-2 select-none rounded-md hover:cursor-pointer hover:bg-purple-600" value="Add Comment" />
      </form>

      {
        sortedEntries.map(comment => (
          <div key={comment.id} className="flex px-2 mb-6 items-start gap-4 justify-between">
            <img className="rounded-full w-10" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="profile picture" />

            <div className="flex-grow">
              <p><span className="font-bold">{ users.find(user => user.id === comment.posterId)?.name }</span> { comment.datePosted.toISODate() }</p>
              <p className="inline-block">{ comment.message }</p>
            </div>

            <img className="w-4 hover:cursor-pointer" src={trash} alt="trash icon" />
          </div>
        ))
      }
    </TableContainer>
  );
}

export default CommentsTable;